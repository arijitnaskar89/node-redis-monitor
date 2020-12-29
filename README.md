# redis-monitor

> A web visualization redis monitoring program. Performance optimized and very easy to install and deploy, base on Flask and sqlite. the monitor data come from redis.info().

## What

The monitor data include: 

 - the redis server infomation [**redis.info()**], include redis version, online time, online time, os version and information, and so on.
 - realtime cmd exec infomation, such as **ops, connected count**, and so on.
 - realtime gragh of the **connect time**.
 - realtime gragh of **ops**.
 - realtime gragh of **cpu** and **mem** usage.
 - some simple operate, such as **flushdb** and add key-velue.
 - redis **role**, include master and slaves.
 



## How to Use ?
1. Clone repository and enter into the directory
2. Install dependcies

	> **yarn install**

2. Build JS
	
	> **npm run js**

3. start webserver

	> **npm run start:dev**

Then visit [127.0.0.1:3000](http://127.0.0.1:3000/)（Port: `LZSB`，Can you get ?）, OK!


## screenshot

 - basic information

![shot_1](/doc/shot_1.png)

 - connection time gragh

![shot_2](/doc/shot_2.png)

 - ops time gragh

![shot_3](/doc/shot_3.png)

 - cpu and mem gragh

![shot_4](/doc/shot_4.png)

## Issues
- Some information returned by node redis.info() does not match the info returned by python redis.info(). So some data can be incomplete.
