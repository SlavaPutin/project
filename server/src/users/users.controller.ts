import { Body, Controller, Get, HttpException, HttpStatus, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/UserCreate.dto';
import { addRoleDto } from './dto/addRole.dto';
import { RoleGuard } from 'src/auth/Guards/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './user.model';
import { UserRole } from 'src/role/user-role.model';
import { banDto } from './dto/ban.dto';
import { BanGuard } from 'src/auth/Guards/ban.guard';
import { AuthGuard } from '@nestjs/passport';

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
    @UseGuards(AuthGuard("jwt"), BanGuard)
    getAll(){
        return this.usersService.getAllUsers()
    }

    @Get("/one")
    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(AuthGuard("jwt"), BanGuard)
    getOneUser(@Req() req){
        const userId = req.user.id
        return this.usersService.getOneUser(userId)
    }

    @Post('/role')
    @Roles("ADMIN")
    @UseGuards(RoleGuard, BanGuard)
    @UsePipes(new ValidationPipe())
    @ApiOperation({summary: 'Добавление роли пользователю'})
    @ApiResponse({status: 200, type: UserRole})
    addRole(@Body() dto: addRoleDto){
        return this.usersService.addRole(dto)
    }

    @Post('/role/remove')
    @Roles("ADMIN")
    @UseGuards(RoleGuard, BanGuard)
    @UsePipes(new ValidationPipe())
    @ApiOperation({summary: 'Удаление роли у пользователя'})
    @ApiResponse({status: 200, type: UserRole})
    removeRole(@Body() dto: addRoleDto){
        return this.usersService.removeRole(dto)
    }

    @Post('/ban')
    @Roles("ADMIN")
    @UsePipes(new ValidationPipe())
    @UseGuards(RoleGuard, BanGuard)
    @ApiOperation({summary: 'Блокировка пользователя'})
    @ApiResponse({status: 200, type: banDto})
    banUser(@Body() dto: banDto){
        return this.usersService.ban(dto)
    }

    @Post('/unban')
    @Roles("ADMIN")
    @UsePipes(new ValidationPipe())
    @UseGuards(RoleGuard, BanGuard)
    @ApiOperation({summary: 'Разблокировка пользователя'})
    @ApiResponse({status: 200, type: banDto})
    unbanUser(@Body() dto: banDto){
        return this.usersService.unban(dto)
    }

    @Put('/name')
    @UseGuards(AuthGuard('jwt'), BanGuard)
    updateName(@Body("name") name: string,
               @Req() req
){
        const userId = req.user.id
        console.log(name)
        return this.usersService.updateName(name, userId)
    }
}
