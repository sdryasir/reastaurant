import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())


  const config = new DocumentBuilder()
              .setTitle("Restaurant API")
              .setDescription('This is a restaurant API')
              .setVersion('1.0')
              .build();


  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document)

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
