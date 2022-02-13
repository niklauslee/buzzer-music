# Overview

A simple library to play a music for passive buzzer. You can find a good example to use passive buzzer at [@kaluma/ex-buzzer](https://kaluma.io/@kaluma/ex-buzzer)

# Wiring

| Raspberry Pi Pico | Passive buzzer |
| ----------------- | -------------- |
| GND               | -              |
| GP12              | +              |

![1627529187373.jpeg](/api/projects/niklauslee/buzzer-music/photos/1627529187373.jpeg)

# Usage

An example for playing a simple music (A part of Beethoven's "For Elise").

```js
const {BuzzerMusic} = require('@niklauslee/buzzer-music');
const pin = 12;
const rhythm = 8;  // 8th note
const tempo = 120; // 120BPM
const music = new BuzzerMusic(pin, rhythm, tempo);
const score = '5eDeDe4b5dc4a---eab---eb5c---5eDeDe4b5dc4a---eab--e5c4ba---';
music.play(score);
```

> You have to ensure that sufficient current and voltage are provided to the buzzer or speaker (Check the buzzer's datasheet).
> If it's no enough, note pitch may not be accurate.

# How to make a score

You can make a score with a string consists of following characters:

- `1` : Octave 1
- `2` : Octave 2
- `3` : Octave 3
- `4` : Octave 4 (default)
- `5` : Octave 5
- `6` : Octave 6
- `7` : Octave 7
- `c` : Note C
- `C` : Note C#
- `d` : Note D
- `D` : Note D#
- `e` : Note E
- `f` : Note F
- `F` : Note F#
- `g` : Note G
- `G` : Note G#
- `a` : Note A
- `A` : Note A#
- `b` : Note B
- `-` : Sustain
- `.` : Rest

Here is the frequencies of musical note supported in this library.

| Note \ Octave |  1 |  2  |  3  |  4  |  5  |  6   |  7   |
| ------------- | -- | --- | --- | --- | --- | ---- | ---- |
| C             | 33 | 65  | 131 | 262 | 523 | 1047 | 2093 |
| C#            | 35 | 69  | 139 | 277 | 554 | 1109 | 2217 |
| D             | 37 | 73  | 147 | 294 | 587 | 1175 | 2349 |
| D#            | 39 | 78  | 156 | 311 | 622 | 1245 | 2489 |
| E             | 41 | 82  | 165 | 330 | 659 | 1319 | 2637 |
| F             | 44 | 87  | 175 | 349 | 698 | 1397 | 2794 |
| F#            | 46 | 93  | 185 | 370 | 740 | 1480 | 2960 |
| G             | 49 | 98  | 196 | 392 | 784 | 1568 | 3136 |
| G#            | 52 | 104 | 208 | 415 | 831 | 1661 | 3322 |
| A             | 55 | 110 | 220 | 440 | 880 | 1760 | 3520 |
| A#            | 58 | 117 | 233 | 466 | 932 | 1865 | 3729 |
| B             | 62 | 123 | 247 | 494 | 988 | 1976 | 3951 |

# API

## Class: BuzzerMusic

### new BuzzerMusic(pin[, rhythm[, tempo[, toneInversion]]])

Create an instance of `BuzzerMusic`.

- __`pin`__ `<number>` Pin number.
- __`rhythm`__ `<number>` How fast a single note. Default is `4` and it means quater note.
- __`tempo`__ `<number>` Tempo. Default is `120` BPM.
- __`toneInversion`__ `<number>` If you want to use inversion pin for `tone()` function, specify pin number to generate inverted signal. For more about, see the [tone()](https://docs.kaluma.io/api-reference/analog_io#tone).

### buzzerMusic.play(score[, loop])

Play the score string.

- __`score`__ `<string>`
- __`loop`__ `<boolean>` Repeat the given score until `stop()` is called. Default is `false`.

### buzzerMusic.stop()

Stop the music.
