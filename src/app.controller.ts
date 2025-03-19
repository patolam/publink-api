import { Controller, Get, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('history')
  getHistory(@Query() params: any) {
    return this.appService.getHistory(params);
  }
}
