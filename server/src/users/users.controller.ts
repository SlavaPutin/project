import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/UserCreate.dto';
import { addRoleDto } from './dto/addRole.dto';
import { RoleGuard } from 'src/auth/Guards/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './user.model';
import { UserRole } from 'src/role/user-role.model';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post()
    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    create(@Body() dto: CreateUserDto){
        try{
            return this.usersService.create(dto)
        } catch(e){
            console.log(e)
        }
    }

    @Get()
    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: User})
    getAll(){
        return this.usersService.getAllUsers()
    }

    @Post('/role')
    @Roles("ADMIN")
    @UseGuards(RoleGuard)
    @ApiOperation({summary: 'Добавление роли'})
    @ApiResponse({status: 200, type: UserRole})
    addRole(@Body() dto: addRoleDto){
        return this.usersService.addRole(dto)
    }
}
