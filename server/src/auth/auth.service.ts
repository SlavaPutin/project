import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/users/dto/UserCreate.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService
    ){}

    async registration(dto: CreateUserDto){
            const candidate = await this.userService.getUserByName(dto.name)
            if(candidate){
                throw new HttpException("Пользователь с таким именем уже зарегистрирован", HttpStatus.BAD_REQUEST)
            }
            const hashPassword = await bcrypt.hash(dto.password, 5)
            const user = await this.userService.create({...dto, password: hashPassword})
            if (!user) {
                throw new HttpException("Ошибка при создании пользователя", HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const token = await this.generateToken(user)
            return token
    }

    async login(dto: CreateUserDto){
        try{
            const user = await this.validateUser(dto)
            const token = await this.generateToken(user)
            return token
        } catch(e){
            throw new HttpException("Не удалось войти", HttpStatus.UNAUTHORIZED)
        }
    }

    private async validateUser(dto: CreateUserDto){
            const user = await this.userService.getUserByName(dto.name)
            const password = await bcrypt.compare(dto.password, user!.dataValues.password)
            if(!user || !password){
                throw new HttpException("Неверный логин или пароль", HttpStatus.BAD_REQUEST)
            }
            return user
    }

    private async generateToken(user: User){
        try{
            const payload = {
                id: user.dataValues.id,
                name: user.dataValues.name,
                roles: user.dataValues.role
            };
            const [accessToken, refreshToken] = await Promise.all([
                this.jwtService.signAsync(payload, { expiresIn: '15m', secret: process.env.SECRET_KEY_ACCESS }),
                this.jwtService.signAsync(payload, { expiresIn: '7d', secret: process.env.SECRET_KEY_REFRESH }),
            ]);
            await this.userService.updateRefreshToken(user.dataValues.id, refreshToken);
            return { accessToken, refreshToken };
        } catch(e){
            throw new UnauthorizedException
        }
    }

    async refresh(refreshToken: string){
        if(!refreshToken){
            throw new HttpException("Токен отсутствует", HttpStatus.UNAUTHORIZED)
        }
        try{
            // 1. Проверяем токен вручную через JwtService
            const userData = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.SECRET_KEY_REFRESH
            });

            // 2. Ищем пользователя в базе, чтобы убедиться, что он всё ещё существует
            const user = await this.userService.getUserByName(userData.name);
            if (!user || !user.refreshToken) {
                throw new UnauthorizedException();
            }

            const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
            if (!isMatch) {
                throw new UnauthorizedException("Токен отозван или не совпадает");
            }

            return this.generateToken(user);
        }catch(e){
            throw new HttpException("Токен невалиден или просрочен", HttpStatus.UNAUTHORIZED)
        }
    }

    async profile(name: string){
        try{
            const user = await this.userService.getProfile(name)
            return user
        } catch(e){
            throw new HttpException("Не удалось найти пользователя", HttpStatus.NOT_FOUND)
        }
    }

    async logout(name: string){
        try{
            const user = await this.userService.removeToken(name)
            return user
        } catch(e){
            throw new UnauthorizedException()
        }
    }
}
