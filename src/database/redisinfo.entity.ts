import { Column, Model, Table, Unique, HasOne, HasMany, Index, DefaultScope, DataType } from 'sequelize-typescript';

@Table
export default class RedisInfo extends Model<RedisInfo> {
  @Index({
    name: 'md5-index',
    type: 'UNIQUE',
    unique: true,
  })
  @Unique({
    name: 'MD5',
    msg: 'MD5 already exists'
  })
  @Column
  md5: string;

  @Column
  host: string;

  @Column
  port: number;

  @Column
  password: string;

  @Column
  add_time: Date;
}