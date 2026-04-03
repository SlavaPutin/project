import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.enableCors({
     origin: process.env.FRONT_URL,
     credentials: true,
  });

  const config = new DocumentBuilder()
        .setTitle('Project')
        .setDescription('Документация')
        .setVersion('1.0.0')
        .addTag('Memo')
        .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)
  await app.listen(PORT, () => {console.log(`Сервер запущен на ${PORT}`)});
}
start();
