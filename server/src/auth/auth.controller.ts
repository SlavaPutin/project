import { Body, Controller, Get, HttpException, HttpStatus, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/UserCreate.dto';
import { AuthGuard } from '@nestjs/passport';
import * as express from 'express'
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/authResponse.dto';
import { User } from 'src/users/user.model';

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
    async refresh(@Body('refreshToken') refreshToken: string) {
        return this.authService.refresh(refreshToken);
    }

    @Get('/profile')
    @ApiOperation({summary: 'Профиль'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(AuthGuard('jwt'))
    profile(@Body('name') name: string){
        return this.authService.profile(name)
    }

    @Post('/logout')
    @ApiOperation({summary: 'Выход'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(AuthGuard('jwt'))
    logout(@Body('name') name: string,
        @Res({ passthrough: true }) response: express.Response
){

    response.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false, // должно быть так же, как при login
        path: '/',     // обязательно тот же путь
    });
    return this.authService.logout(name)
    }
}
