import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // ubah get hello menjadi getwelcome sesuai dengan app.service
  getWellcome(): string {
    return this.appService.getWellcome();
  }
}
