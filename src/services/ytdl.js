const fs = require('fs')
const ytdl = require('ytdl-core')

ytdl('https://www.youtube.com/watch?v=UkSDBual0u8')
  .pipe(fs.createWriteStream('video.flv'));
