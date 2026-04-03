import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../roles-auth.decorator";



@Injectable()
export class RoleGuard implements CanActivate{

    constructor(private jwtService: JwtService,
                private reflector: Reflector
    ){}



    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try{
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [//reflector умеет читать данные прикрепленные к декоратору
                //getAllAndOverride ищет метаданные по ключу а в массиве указываем что именно нужно вытаскивать
                context.getHandler(), //показываем что достаем данные о роли из метода класса
                context.getClass(),//достаем данные о роли из самого класса. Это на тот случай если нету декоратора у метода
            ])
            if(!requiredRoles){
                return true;
            }//разрешаем доступ если нету рекоратора занчит нечего проверять
            const req = context.switchToHttp().getRequest() //получаем запрос из контекста
            const authHeader = req.headers.authorization;//получаем authHeader из запроса
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]//разделяем на Bearer и сам токен

            if(bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({message: "Пользовател не авторизован"})
            }

            const user = this.jwtService.verify(token, {
                secret: process.env.SECRET_KEY_ACCESS
            });//деокдируем тоукен
            req.user = user;//перезаписываем реквест
            return user.roles.some(role => requiredRoles.includes(role.value));//проверка есть ли у пользователя необходимая роль
        } catch(e){
            throw new HttpException("у вас нету доступа", HttpStatus.FORBIDDEN)
        }
    }
}