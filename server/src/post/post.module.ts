import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { Post } from './post.model';
import { UsersModule } from 'src/users/users.module';
import { FileModule } from 'src/file/file.module';
import { AuthModule } from 'src/auth/auth.module';
import { Coment } from 'src/coment/coment.model';
import { PostLike } from './like.model';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    SequelizeModule.forFeature([Post, PostLike]),
    UsersModule,
    FileModule,
    AuthModule
],
  exports: [PostService]
})
export class PostModule {}
