# Vue-audioplayer

> An MP3 player,using vue.js(vue-cli)/node.js(express)/mongodb(mongoose)

## You can...
* Uploading your own audio files/lyric files/pics for covers 
```
#your lyric files should be in this kind of format:

[00:00.00] 作曲 : 杨淽
[00:01.00] 作词 : 林夕
[00:16.260]人若变记忆便迷人
[00:23.390]情令眼浅了便情深
[00:28.740]认识一场 如雷雨一闪
...

```
* Deleting your songs
* Control the slider bar to set the current time of the song
* Press the cover to enlarge it
* Control the volume
* Choose playing mode:order/repeat
* Switch previous/next songs
* Look at the lryic which can roll when playing music
* Responsive layout

## Snapshots
* **songs page:**
* <img src="https://github.com/variinlkt/MP3-vueplayer/blob/master/snapshots/songs.PNG?raw=true" width="400px">
* **cov page:**
* <img src="https://github.com/variinlkt/MP3-vueplayer/blob/master/snapshots/cov.PNG?raw=true" width="400px">
* enlarge cover:
* <img src="https://github.com/variinlkt/MP3-vueplayer/blob/master/snapshots/cov1.PNG?raw=true" width="400px">
* **lyric page:**
* <img src="https://github.com/variinlkt/MP3-vueplayer/blob/master/snapshots/lrc.PNG?raw=true" width="400px">
* **uploading files page:**
* <img src="https://github.com/variinlkt/MP3-vueplayer/blob/master/snapshots/add.PNG?raw=true" width="400px">
* <img src="https://github.com/variinlkt/MP3-vueplayer/blob/master/snapshots/addupload.PNG?raw=true" width="400px">

## Build Setup

### for frontend
``` 
# git bash in /frontend
# install dependencies
npm install

# serve with hot reload at localhost:8089
npm run dev
```
### for backend
``` 
# git bash in /frontend/server
# install dependencies
npm install

# start server
nodemon
```
### for sql
http://www.runoob.com/nodejs/nodejs-mongodb.html

