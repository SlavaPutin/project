import { Module, Post } from '@nestjs/common';
import { ComentController } from './coment.controller';
import { ComentService } from './coment.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Coment } from './coment.model';
import { User } from 'src/users/user.model';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { PostModule } from 'src/post/post.module';
import { ComentLike } from './like.model';

@Module({
  controllers: [ComentController],
  providers: [ComentService],
  imports: [
    SequelizeModule.forFeature([Coment, ComentLike]),
    AuthModule,
    UsersModule,
    PostModule
  ]
})
export class ComentModule {}
