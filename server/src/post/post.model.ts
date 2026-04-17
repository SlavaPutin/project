import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, BelongsToMany, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Coment } from "src/coment/coment.model";
import { User } from "src/users/user.model";
import { PostLike } from "./like.model";

interface CreatePostAttr{
    title: string;
    image: string;
    userId: number;
}

@Table({tableName: 'post'})
export class Post extends Model<Post, CreatePostAttr>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    @ApiProperty({example: '1', description: "Id"})
    declare id: number;

    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({example: 'Mem', description: "Название мема"})
    title!: string;
    
    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({example: 'Mem.jpg', description: "Картинка"})
    image!: string;

    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    @ApiProperty({example: '1', description: "Количество лайков"})
    like!: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    @ApiProperty({example: '1', description: "Id пользователя, который создал"})
    userId!: number;

    @BelongsTo(() => User)
    @ApiProperty({ type: () => User, description: "Автор" })
    author!: User;

    @HasMany(() => Coment)
    @ApiProperty({example: 'Коментарий', description: "Коментарии под постом"})
    coments!: Coment[]
    
    @BelongsToMany(() => User, () => PostLike)
    likedBy!: User[];

    @Column(DataType.VIRTUAL)
    isLikedByMe!: boolean;
}