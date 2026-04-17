import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Coment } from './coment.model';
import { writeComentDto } from './dto/writeComent.dto';
import { UsersService } from 'src/users/users.service';
import { PostService } from 'src/post/post.service';
import { ComentLike } from './like.model';
import { User } from 'src/users/user.model';

@Injectable()
export class ComentService {

    constructor(@InjectModel(Coment) private comentModel: typeof Coment,
                private userService: UsersService,
                private postService: PostService,
                @InjectModel(ComentLike) private comentLikeModel : typeof ComentLike
){}

    async write(dto: writeComentDto, postId: number, userId: number){
        const post = await this.postService.findPostById(postId)
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
        const coment = await this.comentModel.findByPk(comentId);
        if (!coment) throw new HttpException("Коментарий не найден", HttpStatus.NOT_FOUND);

        const existingLike = await this.comentLikeModel.findOne({
            where: { comentId, userId }
        });

        if (existingLike) {
            await existingLike.destroy();
            await coment.decrement('like')
            return { liked: false, message: "Лайк удален", likesCount: coment.like };
        }

        await this.comentLikeModel.create({ comentId, userId });
        await coment.increment('like');
        return { liked: true, message: "Лайк поставлен", likesCount: coment.like };
    }

    async getComents(postId: number, userId: number) {
        const coments = await this.comentModel.findAll({
            where: { postId },
            include: [
                { model: User, as: 'author', attributes: ['id', 'name'] },
                { 
                    model: User, 
                    as: 'likedBy', 
                    attributes: ['id'],
                    through: { attributes: [] } 
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        return coments.map(coment => {
            const comentPlain = coment.get({ plain: true }) as any;
            
            comentPlain.isLikedByMe = coment.likedBy?.some(u => u.id === userId) || false;
            
            delete comentPlain.likedBy; 
            
            return comentPlain;
        });
    }
}
