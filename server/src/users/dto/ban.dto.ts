import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export class banDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'USER', description: "Имя пользователя"})
    readonly name: string;
    @IsString()
    @ApiProperty({example: 'Просто так', description: "Причина бана"})
    readonly banReason: string;
}