import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { createPostDto } from './dto/createPost.dto';
import { UsersService } from 'src/users/users.service';
import { FileService } from 'src/file/file.service';
import { PostLike } from './like.model';

@Injectable()
export class PostService {

    constructor(@InjectModel(Post) private postModel: typeof Post,
                private userService: UsersService,
                private fileService: FileService,
                @InjectModel(PostLike) private postLikeModel: typeof PostLike
){}

    async getAllPost(){
        const posts = await this.postModel.findAll()
        return posts
    }

    async createPost( dto: createPostDto, image: any, userId: number){
        const user = await this.userService.getProfile(userId)
        if(!user){
            throw new HttpException("Пользователя не существует", HttpStatus.NOT_FOUND)
        }
        const imageName = await this.fileService.createdFile(image)
        const post = await this.postModel.create({title: dto.title, image: imageName, userId})
        return post
    }

    async removePost(postId: number, userId: number){
        const post = await this.findPostById(postId)
        if(!post){
            throw new HttpException("Этот пост уже был удален", HttpStatus.NOT_FOUND)
        }
        if(post.userId == userId){
            await post.destroy()
            return {message: "Пост успешно удален"}
        }
        throw new HttpException("Вы не можете удалить этот пост", HttpStatus.BAD_REQUEST)
    }

    async removePostAdmin(postId: number){
        const post = await this.findPostById(postId)
        if(!post){
            throw new HttpException("Этот пост уже был удален", HttpStatus.NOT_FOUND)
        }
        await post.destroy()
        return {message: "Пост успешно удален"}
    }

    async findPostById(postId: number){
        const post = await this.postModel.findByPk(postId, {include: {all: true}} )
        if(!post){
            throw new HttpException("Пост не найден", HttpStatus.NOT_FOUND)
        }
        return post
    }

    async toggleLike(postId: number, userId: number) {
        const existingLike = await this.postLikeModel.findOne({
            where: { postId, userId }
        });

        if (existingLike) {
            await existingLike.destroy();
            return { liked: false, message: "Лайк удален" };
        }

        await this.postLikeModel.create({ postId, userId });
        return { liked: true, message: "Лайк поставлен" };
    }
}
