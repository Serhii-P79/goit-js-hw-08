import player from '@vimeo/player';
import throttle from 'lodash.throttle';
import * as storage from './storage';

// console.log(storage);

const startPlaybackRecord = storage.load('videoplayer-current-time');

const storageTimeRecording = e => {
  //   console.log(e.seconds);
  //   console.log(`Запись в хранилище`);
  storage.save('videoplayer-current-time', e.seconds);
};

var idPlayer = new player('vimeo-player');

if (startPlaybackRecord) {
  idPlayer
    .setCurrentTime(startPlaybackRecord)
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}

idPlayer.on('timeupdate', throttle(storageTimeRecording, 1000));

// console.log(throttle);
// console.log(idPlayer);
