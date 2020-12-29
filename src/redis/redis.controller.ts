import { HttpCode } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Get, Param, Query, Post, Body } from '@nestjs/common/decorators';
import { RedisService } from './redis.service';

@Controller('')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('redis_list')
  getRedisList(@Param() param, @Query() query) {
    
    return this.redisService.getRedisList()
  }

  @Get('redis_info')
  getRedisInfo(@Query() query) {
    return this.redisService.getRedisInfo(query)
  }

  @Get('redis_monitor')
  getRedisMonitor(@Query() query) {
    return this.redisService.getRedisMonitor(query)
  }

  @Get('ping')
  getPing(@Param() param) {
    return this.redisService.getPing(param)
  }
  
  @HttpCode(200) 
  @Post('add')
  postRedis(@Body() postdata) {
    return this.redisService.postRedis(postdata)
  }

  @HttpCode(200) 
  @Post('del')
  deleteRedis(@Body() postdata) {
    return this.redisService.deleteRedis(postdata)
  }

  @Get('redis/flushall')
  getRedisFlushAll() {
    return this.redisService.getRedisFlushAll()
  }

  @Post('redis/flushall')
  postRedisFlushAll(@Body() postdata) {
    return this.redisService.postRedisFlushAll(postdata)
  }
}
