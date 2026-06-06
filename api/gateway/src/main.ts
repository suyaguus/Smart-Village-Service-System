import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // mengaktifkan CORS agar CMS dan user app bisa mengakses gateway
  app.enableCors();

  // validationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // global exception filter untuk standarisasi error response
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  app.useGlobalFilters(new HttpExceptionFilter());

  // menambahkan prefix global
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3007);
}
void bootstrap();
