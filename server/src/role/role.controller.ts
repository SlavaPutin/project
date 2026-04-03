import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/createRole.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Role } from './role.model';

@Controller('role')
export class RoleController {

    constructor(private roleService: RoleService){}

    @Post()
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
    @ApiResponse({status: 200, type: Role})
    getAll(){
        return this.roleService.getAllRole()
    }

    @Get('/:value')
    @ApiOperation({summary: 'Получение одной роли по названию'})
    @ApiResponse({status: 200, type: Role})
    getByValue(@Param('value') value: string){
        try{
            return this.roleService.getRoleByvalue(value)
        } catch(e){
            console.log(e)
        }
    }
}
