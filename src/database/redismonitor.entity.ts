import { Column, Model, Table, Unique, HasOne, HasMany, Index, DefaultScope, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import RedisInfo from './redisinfo.entity';

@Table
export default class RedisMonitor extends Model<RedisMonitor> {
  @ForeignKey(() => RedisInfo)
  @Column
  redisId: number;
  
  @BelongsTo(() => RedisInfo)
  redis_key: RedisInfo;

  @Column
  data: string;

  @Column
  add_time: Date;
}