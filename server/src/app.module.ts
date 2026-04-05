import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.model';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.model';
import { UserRole } from './role/user-role.model';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { Post } from './post/post.model';
import * as path from 'path'
import { ServeStaticModule } from '@nestjs/serve-static';
import { ComentModule } from './coment/coment.module';
import { Coment } from './coment/coment.model';
import { PostLike } from './post/like.model';
import { ComentLike } from './coment/like.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres', // или 'mysql', 'sqlite' и др.
      host: process.env.HOST_DB,
      port: Number(process.env.PORT_DB),
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      models: [User, Role, UserRole, Post, Coment, PostLike, ComentLike],
      autoLoadModels: true, // автоматически загружает модели из папок
      synchronize: true,    // синхронизирует схему БД с моделями (не для production!)
      sync: { alter: true }
    }),
    UsersModule,
    RoleModule,
    AuthModule,
    PostModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ComentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
