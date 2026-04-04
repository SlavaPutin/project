import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../roles-auth.decorator";



@Injectable()
export class BanGuard implements CanActivate{

    constructor(private jwtService: JwtService
    ){}


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try{    
            const req = context.switchToHttp().getRequest() //получаем запрос из контекста
            const authHeader = req.headers.authorization;//получаем authHeader из запроса
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]//разделяем на Bearer и сам токен

            if(bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({message: "Пользовател не авторизован"})
            }

            const user = this.jwtService.verify(token, {
                secret: process.env.SECRET_KEY_ACCESS
            });
            console.log(user)
            if(user && user.ban){
            throw new HttpException(
            {
                message: 'Доступ запрещен. Вы забанены.',
                reason: user.banReason || 'Причина не указана'
            }, 
            HttpStatus.FORBIDDEN
        )}
        return true
       }catch(e){
            throw e }
    } 
}