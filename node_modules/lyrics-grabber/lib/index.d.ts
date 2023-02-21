interface LyricsData {
  title?: string;
  author?: string;
  lyrics: string[];
}
interface informationalData {
  title?: string;
  author: string;
  featuring?: string;
  producedBy: string;
  releaseDate?: string;
}

/**
 * @default
 * @since October, 14th 2022
 * @function *`getLyrics`* Get lyrics of a track without having any sort of API key!
    @returns {Object} an object with the following properties: title, author, lyrics
* @param query ★ Specify a query to look on .
 * @throws {Error} Throws an error if the given query is invalid.
@example
```
// CommonJS
const { getLyrics } = require("lyrics-grabber");

//ECMAScript/ESM
import { getLyrics } from "lyrics-grabber";

async function lyrics(query) {
  const data = await getLyrics(query); // Make sure to use await or else it'll return undefined
  console.log(data); // logging the data.
}
lyrics("FireFlies");
// Output
// {
//   lyrics: [
//     "[Verse 1]You would not believe your eyes if ten million firefliesLit up the world as I fell asleep'Cause they'd fill the open air and leave teardrops everywhereYou'd think me rude but I would just stand and stare[Chorus]I'd like to make myself believeThat planet Earth turns slowlyIt's hard to say that I'd rather stay awake when I'm asleep'Cause everything is never as it seems[Verse 2]'Cause I'd get a thousand hugs from ten thousand lightning bugsAs they tried to teach me how to danceA foxtrot above my head, a sock hop beneath my bedA disco ball is just hanging by a thread[Chorus]I'd like to make myself believeThat planet Earth turns slowlyIt's hard to say that I'd rather stay awake when I'm asleep'Cause everything is never as it seems (When I fall asleep)[Bridge]Leave my door open just a crack(Please take me away from here)'Cause I feel like such an insomniac(Please take me away from here)Why do I tire of counting sheep(Please take me away from here)When I'm far too tired to fall asleep?[Verse 3]To ten million fireflies, I'm weird 'cause I hate goodbyesI got misty eyes as they said farewell (They said farewell)But I'll know where several are if my dreams get real bizarre'Cause I saved a few and I keep them in a jar (Jar, jar, jar)[Chorus]I'd like to make myself believeThat planet Earth turns slowlyIt's hard to say that I'd rather stay awake when I'm asleep'Cause everything is never as it seems (When I fall asleep)I'd like to make myself believeThat planet Earth turns slowlyIt's hard to say that I'd rather stay awake when I'm asleep'Cause everything is never as it seems (When I fall asleep)[Outro]I'd like to make myself believeThat planet Earth turns slowlyIt's hard to say that I'd rather stay awake when I'm asleepBecause my dreams are bursting at the seams..."
//   ],
//   title: 'Fireflies',
//   author: 'Owl City'
// }
```
@return
 */
// ★

declare function getLyrics(query?: string): Promise<LyricsData>;
declare function getTrackInformation(song?: string): Promise<informationalData>;
export default { getLyrics, getTrackInformation };
