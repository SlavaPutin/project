import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Coment } from './coment.model';
import { writeComentDto } from './dto/writeComent.dto';
import { UsersService } from 'src/users/users.service';
import { PostService } from 'src/post/post.service';
import { ComentLike } from './like.model';

@Injectable()
export class ComentService {

    constructor(@InjectModel(Coment) private comentModel: typeof Coment,
                private userService: UsersService,
                private postService: PostService,
                @InjectModel(ComentLike) private comentLikeModel : typeof ComentLike
){}

    async write(dto: writeComentDto, postId: number, userId: number){
        const user = await this.userService.getProfile(userId)
        const post = await this.postService.findPostById(postId)
        if(!user){
            throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND)
        }
        if(!post){
            throw new HttpException("Пост не найден", HttpStatus.NOT_FOUND)
        }
        const coment = await this.comentModel.create({content: dto.content, postId, userId})
        return coment
    }

    async remove(comentId: number, userId: number){
        const coment = await this.comentModel.findByPk(comentId)
        if(!coment){
            throw new HttpException("Этот коментарий уже был удален", HttpStatus.NOT_FOUND)
        }
        if(coment.userId == userId){
            await coment.destroy()
            return {message: "Коментарий успешно удален"}
        }
        throw new HttpException("Вы не можете удалить этот коментарий", HttpStatus.BAD_REQUEST)
    }


    async toggleLike(comentId: number, userId: number) {
        const existingLike = await this.comentLikeModel.findOne({
            where: { comentId, userId }
        });

        if (existingLike) {
            await existingLike.destroy();
            return { liked: false, message: "Лайк удален" };
        }

        await this.comentLikeModel.create({ comentId, userId });
        return { liked: true, message: "Лайк поставлен" };
    }
}
