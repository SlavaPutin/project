import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/UserCreate.dto';
import { RoleService } from 'src/role/role.service';
import * as bcrypt from 'bcryptjs'
import { addRoleDto } from './dto/addRole.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private UserModel: typeof User,
                private roleService: RoleService                
){}

    async create(dto: CreateUserDto){
        try{
            const user = await this.UserModel.create(dto)
            const role = await this.roleService.getRoleByvalue('USER')
            if(!user){
                throw new HttpException('Не удалось создать аккаунт', HttpStatus.BAD_REQUEST)
            }
            if(!role){
                throw new HttpException('Роль не найдена', HttpStatus.NOT_FOUND)
            }
            await user.$set('role', [role.id])
            return await user.reload({ include: { all: true } });
        } catch(e){
            console.log(e)
        }
    }

    async getAllUsers(){
        try{
            const users = await this.UserModel.findAll({include: {all: true}})
            return users
        } catch(e){
            console.log(e)
        }
    }

    async getUserByName(name: string){
        const user = await this.UserModel.findOne({where: {name}, include: {all: true}})
        return user
    }

    async updateRefreshToken(userId: number, refreshToken: string | null) {
        const hashedToken = refreshToken ? await bcrypt.hash(refreshToken, 5) : null;
        
        await this.UserModel.update(
            { refreshToken: hashedToken }, 
            { where: { id: userId } }
        );
    }

    async getProfile(name: string){
        const user = await this.UserModel.findOne({where: {name}, attributes: { exclude: ['password', 'refreshToken', 'createdAt', 'updatedAt'] }})
        return user
    }

    async addRole(dto: addRoleDto){
        try{
            const user = await this.UserModel.findOne({where: {name: dto.name}})
            const role = await this.roleService.getRoleByvalue(dto.role)
            if (!user || !role){
                throw new HttpException("Пользователь или роль не найдены", HttpStatus.NOT_FOUND)
            }
            await user.$add('role', role)
            return await user.reload({ include: { all: true } });
        } catch(e){
            throw new HttpException("Не удалось добавить роль", HttpStatus.BAD_REQUEST)
        }
    }

    async removeToken(name: string) {
    await this.UserModel.update(
        { refreshToken: null },
        { where: { name } } 
    );
    const user = await this.getUserByName(name)
    return user
}
}
