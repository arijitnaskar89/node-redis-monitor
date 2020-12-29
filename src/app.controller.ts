import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/main')
export class AppController {
  constructor(private readonly appService: AppService) {}
}
