import { Body, Controller, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ComentService } from './coment.service';
import { writeComentDto } from './dto/writeComent.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ComentLike } from './like.model';
import { Coment } from './coment.model';

@UseGuards(AuthGuard('jwt'))
@Controller('coment')
export class ComentController {

    constructor(private comentService: ComentService){}

    @UsePipes(new ValidationPipe())
    @Post('/:postId')
    @ApiOperation({summary: 'Написать коментарий'})
    @ApiResponse({status: 200, type: Coment})
    writeComent(@Body() dto: writeComentDto,
            @Param('postId') postId: number,
            @Req() req
    ){
        const userId = req.user.id

        return this.comentService.write(dto, postId, userId)
    }

    @Post('/remove/:comentId')
    @ApiOperation({summary: 'Удаление коментария'})
    @ApiResponse({status: 200, type: Coment})
    removeComent(
            @Param('comentId') comentId: number,
            @Req() req
    ){
        const userId = req.user.id
        return this.comentService.remove(comentId, userId)
    }

    @Post('/:id/like')
    @ApiOperation({summary: 'Поставить убрать лайк'})
    @ApiResponse({status: 200, type: ComentLike})
    async toggleLike(
        @Param('id') comentId: number, 
        @Req() req: any
    ) {
        const userId = req.user.id;
        return this.comentService.toggleLike(comentId, userId);
    }
}
