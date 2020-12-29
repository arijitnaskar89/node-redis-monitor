import { Injectable } from '@nestjs/common';
import RedisInfo from './database/redisinfo.entity';
import Utils from './utils/utils';

@Injectable()
export class AppService {
  constructor(
    
  ) {

  }
  getHello(): string {
    return 'Hello World!';
  }
}
