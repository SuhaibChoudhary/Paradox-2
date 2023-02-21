<h1 align="center">Lyrics Grabber 🎵</h1>
<p align="center">
    <a href="">
    <img src = "https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
    </a>
</p>
<p align="center">
    <a href="">
    <img src = "https://forthebadge.com/images/badges/built-with-love.svg">
    </a>
</p>

[![npm](https://img.shields.io/npm/l/lyrics-grabber)](https://npmjs.com/package/lyrics-grabber)
[![Version](https://img.shields.io/npm/v/lyrics-grabber)](https://www.npmjs.com/package/lyrics-grabber)
[![Downloads](https://img.shields.io/npm/dt/lyrics-grabber.svg)](https://www.npmjs.com/package/lyrics-grabber)
[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com)
[![Npm package version](https://badgen.net/npm/v/express)](https://npmjs.com/package/lyrics-grabber)
[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)

### The package now supports the commonJS!

# Installation 📝

```bash
$ npm install lyrics-grabber
```

# Example 📣

```js
// CommonJS
const lyrics = require("lyrics-grabber");

//ECMAScript/ESM
import lyrics from "lyrics-grabber";

async function lyrics(query) {
  const data = await lyrics.getLyrics(query); // Make sure to use await or else it'll return undefined
  console.log(data); // logging the data.
}

async function traceInformation(query) {
  const informationalData = await lyrics.getTrackInformation(`${query}`);
  console.log(informationalData);
}
lyrics("FireFlies");
// Output lyrics
// {
//   lyrics: [
//     "[Verse 1]You would not believe your eyes if ten million firefliesLit up the world as I fell asleep'Cause they'd fill the open air and leave teardrops everywhereYou'd think me rude but I would just stand and stare[Chorus]I'd like to make myself believeThat planet Earth turns slowlyIt's hard to say that I'd rather stay awake when I'm asleep'Cause everything is never as it seems[Verse 2]'Cause I'd get a thousand hugs from ten thousand lightning bugsAs they tried to teach me how to danceA foxtrot above my head, a sock hop beneath my bedA disco ball is just hanging by a thread[Chorus]I'd like to make myself believeThat planet Earth turns slowlyIt's hard to say that I'd rather stay awake when I'm asleep'Cause everything is never as it seems (When I fall asleep)[Bridge]Leave my door open just a crack(Please take me away from here)'Cause I feel like such an insomniac(Please take me away from here)Why do I tire of counting sheep(Please take me away from here)When I'm far too tired to fall asleep?[Verse 3]To ten million fireflies, I'm weird 'cause I hate goodbyesI got misty eyes as they said farewell (They said farewell)But I'll know where several are if my dreams get real bizarre'Cause I saved a few and I keep them in a jar (Jar, jar, jar)[Chorus]I'd like to make myself believeThat planet Earth turns slowlyIt's hard to say that I'd rather stay awake when I'm asleep'Cause everything is never as it seems (When I fall asleep)I'd like to make myself believeThat planet Earth turns slowlyIt's hard to say that I'd rather stay awake when I'm asleep'Cause everything is never as it seems (When I fall asleep)[Outro]I'd like to make myself believeThat planet Earth turns slowlyIt's hard to say that I'd rather stay awake when I'm asleepBecause my dreams are bursting at the seams..."
//   ],
//   title: 'Fireflies',
//   author: 'Owl City'
// }

traceInformation("We don't talk anymore Charlie Puth");
// Output traceInformation
// {
//   title: 'We Don’t Talk Anymore',
//   author: 'Charlie Puth',
//   featuring: 'Selena Gomez',
//   producedBy: 'Charlie Puth',
//   releaseDate: 'May 24, 2016'
// }
```
