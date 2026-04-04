import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class createPostDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Mem', description: "название поста"})
    readonly title: string;
}