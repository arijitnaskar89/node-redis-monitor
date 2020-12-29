import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import RedisInfo from 'src/database/redisinfo.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([RedisInfo]),
  ],
  providers: [RedisService],
  controllers: [RedisController]
})
export class RedisModule {}
