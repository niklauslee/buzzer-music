const NOTE_FREQ = [
  //  C    C#     D    D#     E     F    F#     G    G#     A    A#     B
  [  33,   35,   37,   39,   41,   44,   46,   49,   52,   55,   58,   62], // O1
  [  65,   69,   73,   78,   82,   87,   93,   98,  104,  110,  117,  123], // O2
  [ 131,  139,  147,  156,  165,  175,  185,  196,  208,  220,  233,  247], // O3
  [ 262,  277,  294,  311,  330,  349,  370,  392,  415,  440,  466,  494], // O4
  [ 523,  554,  587,  622,  659,  698,  740,  784,  831,  880,  932,  988], // O5
  [1042, 1109, 1175, 1245, 1319, 1397, 1480, 1568, 1661, 1760, 1865, 1976], // O6
  [2093, 2217, 2349, 2489, 2637, 2794, 2960, 3136, 3322, 3520, 3729, 3951], // O7
];

const OCTAVES = '1234567';
const NOTES = 'cCdDefFgGaAb';

class BuzzerMusic {
  constructor (pin, rhythm = 4, tempo = 120, toneInversion = -1) {
    this.pin = pin;
    this.octave = 4;
    this.tempo = tempo; // default 120bpm
    this.rhythm = rhythm; // default is quarter note
    this.timer = null;
    this.toneOption = toneInversion > -1 ? {inversion: toneInversion} : {};
    this.pos = 0;
    this.loop = false;
  }
  
  playNote (notes, pos) {
    if (pos >= notes.length) {
      if (!this.loop) {
        this.stop();
      } else {
        this.pos = 0;
      }
      return true;
    }
    const ch = notes[pos];
    const i = NOTES.indexOf(ch);
    if (i < 0) {
      const o = OCTAVES.indexOf(ch);
      if (o >= 0) {
        this.octave = o;
      } else {
        switch (ch) {
          case '-': // sustain
            return true;
          case '.': // rest
            noTone(this.pin);
            return true;
        }
      }
    } else {
      tone(this.pin, NOTE_FREQ[this.octave][i], this.toneOption);
      return true;
    }
    return false;
  }
  
  play (score, loop = false) {
    noTone(this.pin);
    this.pos = 0;
    this.loop = loop;
    this.playNote(score, this.pos);
    this.timer = setInterval(() => {
      this.pos++;
      while(!this.playNote(score, this.pos)) this.pos++;
    }, Math.round(60000 / (this.tempo * (this.rhythm / 4))));
  }
  
  stop () {
    noTone(this.pin);
    clearInterval(this.timer);
  }
}

exports.BuzzerMusic = BuzzerMusic;
