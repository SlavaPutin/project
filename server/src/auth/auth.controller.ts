import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/UserCreate.dto';
import { AuthGuard } from '@nestjs/passport';
import * as express from 'express'
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/authResponse.dto';
import { User } from 'src/users/user.model';
import { BanGuard } from './Guards/ban.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/registration')
    @ApiOperation({summary: 'Регистрация'})
    @ApiResponse({status: 200, type: AuthResponseDto})
    @UsePipes(new ValidationPipe())
    async registration(@Body() userDto: CreateUserDto,
                 @Res({passthrough: true}) response: express.Response
        ){
        const tokens = await this.authService.registration(userDto)
        if(!tokens){
            return tokens
        }
        response.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,    // Защита от XSS, JS не сможет прочитать куку
            secure: false,
            maxAge: 30 * 24 * 60 * 60 * 1000, // Срок жизни 30 дней
            path: '/',         // Доступна на всем сайте
        });
        // Access Token возвращаем обычным телом фронт сохранит в памяти
        return tokens;
    }

    @Post('/login')
    @ApiOperation({summary: 'Вход'})
    @ApiResponse({status: 200, type: AuthResponseDto})
    @UsePipes(new ValidationPipe())
    async login(@Body() userDto: CreateUserDto,
          @Res({passthrough: true}) response: express.Response
){
        const tokens = await this.authService.login(userDto)
        if(!tokens){
            throw new HttpException("Ошибка авторизации", HttpStatus.UNAUTHORIZED)
        }
        response.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,    // Защита от XSS, JS не сможет прочитать куку
            secure: false,
            maxAge: 30 * 24 * 60 * 60 * 1000, // Срок жизни 30 дней
            path: '/',         // Доступна на всем сайте
        });
        // Access Token возвращаем обычным телом фронт сохранит в памяти
        return tokens;
    }

    @Post('/refresh')
    @ApiOperation({summary: 'Обновление Access токена'})
    @ApiResponse({status: 200, type: AuthResponseDto})
    @UseGuards(AuthGuard('jwt-refresh'))
    async refresh(@Req() req: any, @Res({ passthrough: true }) res: any) {
        const { refreshToken } = req.user; 
        const tokens = await this.authService.refresh(refreshToken);

        res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, path: '/', maxAge: 30 * 24 * 60 * 60 * 1000});
        return tokens;
    }

    @Get('/:id')
    @ApiOperation({summary: 'Профиль'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(AuthGuard('jwt'), BanGuard)
    profile(@Param('id') id: number){
        return this.authService.profile(id)
    }

    @Post('/logout')
    @ApiOperation({summary: 'Выход'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(AuthGuard('jwt'), BanGuard)
    logout(@Req() req,
        @Res({ passthrough: true }) response: express.Response
){

    response.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false, // должно быть так же, как при login
        path: '/',     // обязательно тот же путь
    });
    const name = req.user.name
    return this.authService.logout(name)
    }
}
