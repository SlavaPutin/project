import { Body, Controller, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';
import { createPostDto } from './dto/createPost.dto';
import { BanGuard } from 'src/auth/Guards/ban.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RoleGuard } from 'src/auth/Guards/roles.guard';
import { PostLike } from './like.model';

// @UseGuards(AuthGuard('jwt'), BanGuard)
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
    removePost(@Param('id') postId: number,
               @Req() req
    ){
        const userId = req.user.id
        return this.postService.removePost(postId, userId)
    } 

    @Post('/:id')
    @Roles("ADMIN")
    @UseGuards(RoleGuard)
    @ApiOperation({summary: 'удаление поста админом'})
    @ApiResponse({status: 200, type: Post})
    removePostAdmin(@Param('id') postId: number
    ){
        return this.postService.removePostAdmin(postId)
    } 

    @Get('/:id')
    @ApiOperation({summary: 'Получение поста'})
    @ApiResponse({status: 200, type: Post})
    getPost(@Param('id') postId: number){
        return this.postService.findPostById(postId)
    }

    @Get('')
    @ApiOperation({summary: 'Получение поста'})
    @ApiResponse({status: 200, type: Post})
    getAllPost(){
        return this.postService.getAllPost()
    }

    @ApiOperation({summary: 'Поставить убрать лайк'})
    @ApiResponse({status: 200, type: PostLike})
    @Post('/:id/like')
    async toggleLike(
        @Param('id') postId: number, 
        @Req() req: any
    ) {
        const userId = req.user.id;
        return this.postService.toggleLike(postId, userId);
    }

    
}
