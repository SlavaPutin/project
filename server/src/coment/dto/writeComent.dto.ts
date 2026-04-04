import { IsNotEmpty } from "class-validator";


export class writeComentDto{
    @IsNotEmpty()
    readonly content: string;
}