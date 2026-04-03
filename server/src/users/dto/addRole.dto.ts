import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class addRoleDto{
    @IsNotEmpty()
    @ApiProperty({example: 'USER', description: "Имя пользователя"})
    readonly name: string;
    @IsNotEmpty()
    @ApiProperty({example: 'ADMIN', description: "Название роли"})
    readonly role: string;
}