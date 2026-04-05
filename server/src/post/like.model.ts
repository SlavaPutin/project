import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { Post } from "src/post/post.model";

interface SendLikeAttr{
    postId: number;
    userId: number
}



@Table({ tableName: 'post_likes', createdAt: false, updatedAt: false })
export class PostLike extends Model<PostLike, SendLikeAttr> {
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId!: number;

    @ForeignKey(() => Post)
    @Column({ type: DataType.INTEGER })
    postId!: number;
}