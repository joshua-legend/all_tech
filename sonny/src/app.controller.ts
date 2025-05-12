import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('sonny')
  getSonny(): object {
    return { data: ['sonny', 'kane'], message: '쏘니' };
  }
  @Get('kim')
  getKim(): object {
    return { data: ['민재', '재성'], message: '킴킴킴' };
  }
}
