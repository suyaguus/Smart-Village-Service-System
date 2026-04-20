import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // menambahkan prefix globa
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT!);
}
void bootstrap();
