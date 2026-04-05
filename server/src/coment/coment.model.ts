import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, BelongsToMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Post } from "src/post/post.model";
import { User } from "src/users/user.model";
import { ComentLike } from "./like.model";

interface CreateComentAttr{
    content: string;
    postId: number;
    userId: number;
}

@Table({tableName: 'coment'})
export class Coment extends Model<Coment, CreateComentAttr>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    @ApiProperty({example: '1', description: "Id"})
    declare id: number;

    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({example: 'Неплохой мем', description: "Содержание коментария"})
    content!: string;

    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    @ApiProperty({example: '1', description: "Количество лайков"})
    like!: number;

    @ForeignKey(() => Post)
    @ApiProperty({example: '1', description: "Id поста"})
    @Column({type: DataType.INTEGER, allowNull: false})
    postId!: number

    @ForeignKey(() => User)
    @ApiProperty({example: '2', description: "Id пользователя"})
    @Column({type: DataType.INTEGER, allowNull: false})
    userId!: number

    @BelongsTo(() => Post)
    @ApiProperty({example: 'Mem', description: "Пост под которым коментарий"})
    post!: Post

    @BelongsTo(() => User)
    @ApiProperty({example: 'USER', description: "Автор коментария"})
    author!: User

    @BelongsToMany(() => User, () => ComentLike)
    likedBy!: User[];
}