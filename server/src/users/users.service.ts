import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/UserCreate.dto';
import { RoleService } from 'src/role/role.service';
import * as bcrypt from 'bcryptjs'
import { addRoleDto } from './dto/addRole.dto';
import { banDto } from './dto/ban.dto';
import { Role } from 'src/role/role.model';
import { Post } from 'src/post/post.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private UserModel: typeof User,
                private roleService: RoleService                
){}

    async create(dto: CreateUserDto){
        try{
            const role = await this.roleService.getRoleByvalue('ADMIN')
            if(!role){
                throw new HttpException('Роль не найдена', HttpStatus.NOT_FOUND)
            }
            const user = await this.UserModel.create(dto)
            await user.$set('role', [role.id])
            return await user.reload({ include: {  model: Role }});
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

    async getOneUser(id: number){
        const user = await this.UserModel.findByPk(id, {
            include: [
                {
                    model: Role,
                    attributes: ['value', 'description'], 
                    through: { attributes: [] } 
                }
            ]
        });
        return user
    }

    async getUserByName(name: string){
        const user = await this.UserModel.findOne({where: {name}, include: [{ all: true}]})
        return user
    }

    

    async getProfile(profileId: number, currentUserId?: number) {
        const user = await this.UserModel.findOne({
            where: { id: profileId },
            attributes: { exclude: ['password', 'refreshToken'] },
            include: [
                {
                    model: Post,
                    as: 'posts',
                    include: [
                        { model: User, as: 'author', attributes: ['name'] },
                        { 
                            model: User, 
                            as: 'likedBy', 
                            where: { id: currentUserId }, // Фильтр по тебе
                            required: false 
                        }
                    ]
                },
                {
                    model: Post,
                    as: 'likedPosts',
                    include: [
                        { model: User, as: 'author', attributes: ['name'] },
                        { 
                            model: User, 
                            as: 'likedBy', 
                            where: { id: currentUserId }, // Фильтр по тебе
                            required: false 
                        }
                    ]
                },
                { all: true }
            ]
        });
        return user;
    }

    

    async addRole(dto: addRoleDto){
        const user = await this.UserModel.findOne({where: {name: dto.name}})
        const role = await this.roleService.getRoleByvalue(dto.role)
        if (!user || !role){
            throw new HttpException("Пользователь или роль не найдены", HttpStatus.NOT_FOUND)
        }
        await user.$add('role', role)
        return await user.reload({ include: { all: true } });
    }

    async removeRole(dto: addRoleDto){
        const user = await this.UserModel.findOne({where: {name: dto.name}})
        const role = await this.roleService.getRoleByvalue(dto.role)
        if (!user || !role){
            throw new HttpException("Пользователь или роль не найдены", HttpStatus.NOT_FOUND)
        }
        await user.$remove('role', role)
        return await user.reload({ include: { all: true } }); 
    }

    async ban(dto: banDto){
        const user = await this.UserModel.findOne({where: {name: dto.name}})
        if(!user){
            throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND)
        }
        if(user.banned){
            throw new HttpException("Пользователь уже забанен", HttpStatus.BAD_REQUEST)
        }
        user.banned = true
        user.banReason = dto.banReason
        await user.save()
        
        return user; 
    }
    
    async unban(dto: banDto){
        const user = await this.UserModel.findOne({where: {name: dto.name}})
        if(!user){
            throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND)
        }
        if(!user.banned){
            throw new HttpException("Пользователь не был забаненым", HttpStatus.BAD_REQUEST)
        } 
        user.banned = false
        user.banReason = null
        await user.save()
        return user; 
    }

    async removeToken(name: string) {
    await this.UserModel.update(
        { refreshToken: null },
        { where: { name } } 
    );
    const user = await this.getUserByName(name)
    return user
    }

    async updateRefreshToken(userId: number, refreshToken: string | null) {
            await this.UserModel.update(
                { refreshToken: refreshToken }, 
                { where: { id: userId } }
            );
        }
    
    async updateName(name: string, userId: number){
        const candidate = await this.UserModel.findOne({ where: { name } });

        if (candidate && candidate.id !== userId) {
            throw new HttpException(
                "Это имя уже занято другим пользователем", 
                HttpStatus.BAD_REQUEST
            );
        }
        
        const [count, updatedUsers] = await this.UserModel.update(
            { name }, 
            { where: { id: userId }, returning: true }
        );

        if (count === 0) {
            throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
        }
        return updatedUsers[0];
    }
}
