import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './role.model';
import { CreateRoleDto } from './dto/createRole.dto';

@Injectable()
export class RoleService {

    constructor(@InjectModel(Role) private roleModel: typeof Role){}

    async create(dto: CreateRoleDto){
        try{
            const role = await this.roleModel.create(dto)
            if(!role){
                throw new HttpException("Не удалось создать роль", HttpStatus.BAD_REQUEST)
            }
            return role
        } catch(e){
            console.log(e)
        }
    }

    async getAllRole(){
        try{
            const roles = await this.roleModel.findAll()
            return roles
        } catch(e){
            console.log(e)
        }
    }

    async getRoleByvalue(value: string){
        try{
            const role = await this.roleModel.findOne({where: {value}})
            if(!role){
                throw new HttpException('Не удалось найти роль', HttpStatus.NOT_FOUND)
            }
            return role
        } catch(e){
            throw new HttpException('Не удалось найти роль', HttpStatus.NOT_FOUND)
        }
    }
}
