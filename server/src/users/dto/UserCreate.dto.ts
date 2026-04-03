import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    @ApiProperty({example: 'USER', description: "Имя пользователя"})
    readonly name: string;
    @IsNotEmpty()
    @ApiProperty({example: '12345', description: "Пароль"})
    readonly password: string;
}