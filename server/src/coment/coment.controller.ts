import { Body, Controller, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ComentService } from './coment.service';
import { writeComentDto } from './dto/writeComent.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('coment')
export class ComentController {

    constructor(private comentService: ComentService){}

    @UsePipes(new ValidationPipe())
    @Post('/:postId')
    writeComent(@Body() dto: writeComentDto,
            @Param('postId') postId: number,
            @Req() req
    ){
        const userId = req.user.id

        return this.comentService.write(dto, postId, userId)
    }

    @Post('/remove/:comentId')
    removeComent(
            @Param('comentId') comentId: number,
            @Req() req
    ){
        const userId = req.user.id
        return this.comentService.remove(comentId, userId)
    }
}
