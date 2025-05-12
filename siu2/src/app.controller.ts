import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('test')
  getTest(): object {
    return { data: '테스트당', message: '테스트' };
  }
  @Get('siuuu')
  getSiuuu(): object {
    return { data: 'Siuuuuuuu', message: 'Siuuuuuuuuu' };
  }
}
