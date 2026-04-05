import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { Coment } from "./coment.model";

interface SendLikeAttr{
    comentId: number;
    userId: number
}



@Table({ tableName: 'post_likes', createdAt: false, updatedAt: false })
export class ComentLike extends Model<ComentLike, SendLikeAttr> {
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId!: number;

    @ForeignKey(() => Coment)
    @Column({ type: DataType.INTEGER })
    comentId!: number;
}