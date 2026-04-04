import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";



export class banDto{
    @IsNotEmpty()
    @ApiProperty({example: 'USER', description: "Имя пользователя"})
    readonly name: string;
    @ApiProperty({example: 'Просто так', description: "Причина бана"})
    readonly banReason: string;
}