import { Body, Controller, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';
import { createPostDto } from './dto/createPost.dto';
import { BanGuard } from 'src/auth/Guards/ban.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'), BanGuard)
@Controller('post')
export class PostController {

    constructor(private postService: PostService){}

    @Post()
    @UsePipes(new ValidationPipe())
    @ApiOperation({summary: 'Создание поста'})
    @ApiResponse({status: 200, type: Post})
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: createPostDto,
               @UploadedFile() image,
               @Req() req
    ){
        const userId = req.user.id
        return this.postService.createPost(dto, image, userId)
    }

    @Post('/:id')
    @ApiOperation({summary: 'удаление поста'})
    @ApiResponse({status: 200, type: Post})
    @UseInterceptors(FileInterceptor('image'))
    removePost(@Param('id') postId: number,
               @Req() req
    ){
        const userId = req.user.id
        return this.postService.removePost(postId, userId)
    } 

    @Get('/:id')
    @ApiOperation({summary: 'Получение поста'})
    @ApiResponse({status: 200, type: Post})
    getPost(@Param('id') postId: number){
        return this.postService.findPostById(postId)
    }
}
