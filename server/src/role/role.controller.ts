import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/createRole.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Role } from './role.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RoleGuard } from 'src/auth/Guards/roles.guard';
import { BanGuard } from 'src/auth/Guards/ban.guard';

@Controller('role')
export class RoleController {

    constructor(private roleService: RoleService){}

    @Post()
    @Roles("ADMIN")
    @UseGuards(RoleGuard, BanGuard)
    @ApiOperation({summary: 'Создание роли'})
    @ApiResponse({status: 200, type: Role})
    create(@Body() dto: CreateRoleDto){
        try{
            return this.roleService.create(dto)
        } catch(e){
            console.log(e)
        }
    }

    @Get()
    @ApiOperation({summary: 'Получение всех ролей'})
    @UseGuards(BanGuard)
    @ApiResponse({status: 200, type: Role})
    getAll(){
        return this.roleService.getAllRole()
    }

    @Get('/:value')
    @ApiOperation({summary: 'Получение одной роли по названию'})
    @UseGuards(BanGuard)
    @ApiResponse({status: 200, type: Role})
    getByValue(@Param('value') value: string){
        try{
            return this.roleService.getRoleByvalue(value)
        } catch(e){
            console.log(e)
        }
    }
}
