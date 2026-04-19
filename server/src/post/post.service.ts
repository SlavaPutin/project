import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { createPostDto } from './dto/createPost.dto';
import { UsersService } from 'src/users/users.service';
import { FileService } from 'src/file/file.service';
import { PostLike } from './like.model';
import { User } from 'src/users/user.model';
import { Coment } from 'src/coment/coment.model';

@Injectable()
export class PostService {

    constructor(@InjectModel(Post) private postModel: typeof Post,
                private userService: UsersService,
                private fileService: FileService,
                @InjectModel(PostLike) private postLikeModel: typeof PostLike
){}

    async getAllPost(userId: number) {
        const posts = await this.postModel.findAll({
            include: [
                { model: User, as: 'author', attributes: ['id', 'name'] },
                { model: Coment },
                { 
                    model: User, 
                    as: 'likedBy', 
                    attributes: ['id'], // Нам нужны только ID для проверки
                    through: { attributes: [] } 
                }
            ]
        });

        return posts.map(post => {
            const postPlain = post.get({ plain: true }) as any;
            postPlain.isLikedByMe = post.likedBy?.some(u => u.id === userId) || false;
            // Удаляем массив пользователей, чтобы не перегружать ответ
            delete postPlain.likedBy; 
            return postPlain;
        });
    }

    async createPost( dto: createPostDto, image: any, userId: number){
        const imageName = await this.fileService.createdFile(image)
        const post = await this.postModel.create({title: dto.title, image: imageName, userId})
        console.log(post)
        return await this.findPostById(post.id);
    }

    async removePost(postId: number, userId: number){
        const post = await this.findPostById(postId)
        if(!post){
            throw new HttpException("Этот пост уже был удален", HttpStatus.NOT_FOUND)
        }
        if(post.userId == userId){
            await post.destroy()
            return {message: "Пост успешно удален", post}
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
        const post = await this.postModel.findByPk(postId, {include: [{all: true}]} )
        if(!post){
            throw new HttpException("Пост не найден", HttpStatus.NOT_FOUND)
        }
        return post
    }

    async toggleLike(postId: number, userId: number) {
        const post = await this.postModel.findByPk(postId);
        if (!post) throw new HttpException("Мем не найден или удален", HttpStatus.NOT_FOUND);

        const existingLike = await this.postLikeModel.findOne({
            where: { postId, userId }
        });

        if (existingLike) {
            await existingLike.destroy();
            await post.decrement('like')
            return { liked: false, message: "Лайк удален", likesCount: post.like  };
        }

        await this.postLikeModel.create({ postId, userId });
        await post.increment('like');
        return { liked: true, message: "Лайк поставлен", likesCount: post.like };
    }
}
