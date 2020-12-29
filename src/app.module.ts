import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';
import { RedisModule } from './redis/redis.module';

import * as path from 'path'
import RedisInfo from './database/redisinfo.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'client'),
      exclude: ['/api*'],
    }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: path.join(__dirname, '..', path.sep, 'mydb.sqlite'),
      database: 'test',
      models: [RedisInfo],
      autoLoadModels: true,
    }),
    RedisModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
