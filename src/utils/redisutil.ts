
import * as redis from 'redis';

let RedisUtil = {
  flushall: function(host, port, password, db): Promise<any> {
    return new Promise((resolve, reject) => {
      let client    = redis.createClient({
        port      : port,        // replace with your port
        host      : host,        // replace with your hostanme or IP address
        password  : password,    // replace with your password
        db : db
      });
      client.flushdb( function (err, succeeded) {
          if (err) {
            return reject(err);
          }
          return resolve(succeeded);
      }); 
    })  
    
    },
    set_value: function(host, port, password, db, key, value, timeout=-1) {
      let client    = redis.createClient({
        port      : port,        // replace with your port
        host      : host,        // replace with your hostanme or IP address
        password  : password,    // replace with your password
        db : db
      });
      client.setex( key, timeout, value);
    },
    del_key:  function(host, port, password, db, key) {
      let client    = redis.createClient({
        port      : port,        // replace with your port
        host      : host,        // replace with your hostanme or IP address
        password  : password,    // replace with your password
        db : db
      });
      client.del( key);
    },
    monitor: function(host, port, password): Promise<any> {
      console.log(port);
      return new Promise((resolve, reject) => {
        let client    = redis.createClient({
          port      : port,        // replace with your port
          host      : host,        // replace with your hostanme or IP address
          // password  : password,    // replace with your password
        });
        client.info(function(err, res) {
          console.log(res);
          return resolve(res);
        });
      })
      
    },
    ping: function(host, port, password): Promise<any> {
      console.log(port);
      return new Promise((resolve, reject) => {
        let client    = redis.createClient({
          port      : port,        // replace with your port
          host      : host,        // replace with your hostanme or IP address
          // password  : password,    // replace with your password
        });
        client.ping(function(err, res) {
          if (err) {
            return resolve({success:0})
          }
          return resolve({success:1})
        });
      })
      
    }
  
  }
  
  export default RedisUtil;