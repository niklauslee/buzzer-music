const {BuzzerMusic} = require('./index');
const pin = 12;
const rhythm = 8;
const tempo = 120;
const music = new BuzzerMusic(pin, rhythm, tempo);
const score = '5eDeDe4b5dc4a---eab---eb5c---5eDeDe4b5dc4a---eab--e5c4ba---';
music.play(score);
