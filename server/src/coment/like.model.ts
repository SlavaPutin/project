import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { Coment } from "./coment.model";
import { ApiProperty } from "@nestjs/swagger";

interface SendLikeAttr{
    comentId: number;
    userId: number
}



@Table({ tableName: 'coment_likes', createdAt: false, updatedAt: false })
export class ComentLike extends Model<ComentLike, SendLikeAttr> {
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    @ApiProperty({example: '1', description: "Id пользователя, который поставил лайк"})
    userId!: number;

    @ForeignKey(() => Coment)
    @Column({ type: DataType.INTEGER })
    @ApiProperty({example: '1', description: "Id коментария, на который поставили лайк"})
    comentId!: number;
}