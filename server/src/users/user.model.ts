import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, BelongsToMany, HasMany } from "sequelize-typescript";
import { Coment } from "src/coment/coment.model";
import { Post } from "src/post/post.model";
import { Role } from "src/role/role.model";
import { UserRole } from "src/role/user-role.model";

interface CreateUserAttr{
    name: string;
    password: string;
}

@Table({tableName: 'user'})
export class User extends Model<User, CreateUserAttr>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    @ApiProperty({example: '1', description: "Id"})
    declare id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    @ApiProperty({example: 'USER', description: "Имя пользователя"})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({example: '12345', description: "Пароль"})
    password: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    @ApiProperty({example: 'true', description: "Забанен ли"})
    banned!: boolean;

    @Column({type: DataType.STRING, allowNull: true})
    @ApiProperty({example: 'Просто так', description: "Причина бана"})
    banReason: string | null;
    
    @Column({ type: DataType.STRING, allowNull: true })
    @ApiProperty({example: 'Данные токена', description: "Токен с помощью которого обновляется access токен"})
    refreshToken: string | null;

    @BelongsToMany(() => Role, () => UserRole)
    @ApiProperty({example: 'USER, ADMIN', description: "Роли"})
    role: Role[]

    @HasMany(() => Post)
    @ApiProperty({example: 'Mem', description: "Посты пользователя"})
    posts: Post[]

    @HasMany(() => Coment)
    @ApiProperty({example: 'Коментарий', description: "Коментарии пользователя"})
    coments: Coment[]
}