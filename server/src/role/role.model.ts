import { Column, DataType, Table, Model, BelongsToMany } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { UserRole } from "./user-role.model";

interface CreateRoleAttr{
    value: string;
    description: string
}

@Table({tableName: 'role'})
export class Role extends Model<Role, CreateRoleAttr>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    declare id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value!: string;

    @Column({type: DataType.STRING, allowNull: false})
    description!: string;

    @BelongsToMany(() => User, () => UserRole)
    user!: User[]
}