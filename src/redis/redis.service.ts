import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import RedisInfo from 'src/database/redisinfo.entity';
import Utils from 'src/utils/utils';
import RedisUtil from 'src/utils/redisutil';
import * as md5 from "md5";
import * as redis from 'redis';

@Injectable()
export class RedisService {
  constructor(
    @InjectModel(RedisInfo) 
    private readonly redisModel: typeof RedisInfo
  ) {}
  getRedisList() : Promise<any> {
    return new Promise((resolve, reject) => {
      this.redisModel.findAll().then(redislist => {
        console.log(redislist);
        return resolve( Utils.resp(1, redislist));
      })
    })  
  }
  getRedisInfo(query) : Promise<any> {
    return new Promise((resolve, reject) => {
      const client = redis.createClient();

      // client.monitor(function(err, res) {
      //   console.log("Entering monitoring mode.");
      // });
      // client.on("monitor", function(time, args, rawReply) {
      //   console.log(time + ": " + rawReply); // 1458910076.446514:['set', 'foo', 'bar']
      // });
      this.redisModel.findOne({ where: { md5: query.md5 } }).then(redislist => {
        return resolve( Utils.resp(1, redislist));
      })
    })  
  }
  getRedisMonitor(query): Promise<any> {
    return new Promise((resolve, reject) => {
      this.redisModel.findOne({ where: { md5: query.md5 } }).then(redisinfo => {
        RedisUtil.monitor(redisinfo.host, redisinfo.port,redisinfo.password).then(info =>{
          let parsed_info = Utils.parseresp(info);
          console.log("info",parsed_info);
          return resolve( Utils.resp(1, parsed_info));
        });
        
      })
    })  
  }
  getPing(param): Promise<any> {
    return new Promise((resolve, reject) => {
      let port ="6379" ,host='127.0.0.1',password='';
      if(param.port) {
        port = param.port;
      }
      if(param.host) {
        host = param.host;
      }
      if(param.password) {
        password = param.password;
      }
      RedisUtil.ping(host, port,password).then(info =>{
        let parsed_info = Utils.parseresp(info);
        console.log("info",parsed_info);
        return resolve( Utils.resp(1, parsed_info));
      });
    })  
  }
  postRedis(postdata): Promise<any> {
    return new Promise((resolve, reject) => {
      
      
      RedisUtil.ping(postdata.host?postdata.host:'127.0.0.1', postdata.port, postdata.password).then(info =>{
        if(info.success) {
          this.redisModel.findOne({ where: { host: postdata.host?postdata.host:'127.0.0.1', port: postdata.port} }).then(infodata => {
            
            if(infodata) {
              console.log("find info",infodata);
              infodata.password = postdata.password;
              infodata.add_time = new Date();
              infodata.save().then(data => {
                return resolve( Utils.resp(1, data));
              })
            } else {
              const redis = new RedisInfo();
              redis.host = postdata.host;
              if (!postdata.host) {
                redis.host = '127.0.0.1';
              }  
              redis.port = postdata.port;
              redis.password = postdata.password;
              let current_time = new Date().getTime();
              redis.md5 = md5(current_time.toString());
              redis.add_time = new Date();
              redis.save().then(data => {
                return resolve( Utils.resp(1, data));
              })
            }
          })
          
        } else {
          return resolve( Utils.resp(0, "error"));
        }
      });
    })  
  }
  deleteRedis(postdata): Promise<any> {
    return new Promise((resolve, reject) => {
      this.redisModel.destroy({
        where: {md5:postdata.md5}
       }).then(redislist => {
        console.log(redislist);
        return resolve( Utils.resp(1, "Success!"));
      })
    })  
  }
  getRedisFlushAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.redisModel.findAll().then(redislist => {
        console.log(redislist);
        return resolve( Utils.resp(1, redislist));
      })
    })  
  }
  postRedisFlushAll(query): Promise<any> {
    return new Promise((resolve, reject) => {
      this.redisModel.findOne({ where: { md5: query.md5 } }).then(redisinfo => {
        RedisUtil.flushall(redisinfo.host, redisinfo.port, redisinfo.password, query.db).then(redislist => {
          console.log(redislist);
          return resolve( Utils.resp(1, redislist));
        })
      })
    })  
  }
}
