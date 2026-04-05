import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { Post } from "src/post/post.model";
import { ApiProperty } from "@nestjs/swagger";

interface SendLikeAttr{
    postId: number;
    userId: number
}



@Table({ tableName: 'post_likes', createdAt: false, updatedAt: false })
export class PostLike extends Model<PostLike, SendLikeAttr> {
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    @ApiProperty({example: '1', description: "Id пользователя, который поставил лайк"})
    userId!: number;

    @ForeignKey(() => Post)
    @ApiProperty({example: '1', description: "Id поста, на который поставили лайк"})
    @Column({ type: DataType.INTEGER })
    postId!: number;
}