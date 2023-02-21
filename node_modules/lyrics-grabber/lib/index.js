const got = require("got");
const config = require("../config/CONFIG.json");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
/**
 * @param {String} q
 */
const getLyrics = async (query = String) => {
  if (!query) throw new Error(`The query cannot be empty.`);
  const request = await fetch(
    `https://api.genius.com/search?q=${query}&access_token=${config.key}`
  );
  const response = await request.json();
  if (response.response.hits.length === 0) {
    const request = await fetch(`https://api.lyrics.ovh/suggest/${q}`);
    const response = await request?.json();
    const track = response?.data[0];
    var lyricalRequest = await fetch(
      `https://some-random-api.ml/lyrics/?title=${track.title}`
    );
    const lyrcialRequestjsonParser = await lyricalRequest?.json();
    return {
      title: lyrcialRequestjsonParser.title,
      author: lyrcialRequestjsonParser.author,
      lyrics: [lyrcialRequestjsonParser.lyrics],
    };
  } else {
    const track = response.response.hits[0];
    const req = await got(`https://genius.com${track.result?.path}`);
    const $ = cheerio.load(req.body);
    const lyrics = $(".YYrds").text();
    const title = $(".kwCpxe").text();
    const author = $(".fPVhsa")?.text();
    return {
      lyrics: [lyrics],
      title,
      author,
    };
  }
};

/**
 * @param {String} song
 */
const getTrackInformation = async (song = String) => {
  if (!song) throw new Error("No song title provided!");
  return await getData(song);
};

async function getData(query) {
  const request = await fetch(
    `https://api.genius.com/search?q=${query}&access_token=${config.key}`
  );
  const response = await request.json();
  const track = response.response.hits[0];
  const req = await got(`https://genius.com${track.result?.path}`);
  const $ = cheerio.load(req.body);
  const title = $(".kwCpxe").text();
  const author = $(".fPVhsa")?.text();
  const featuring1 = $(".ePueMf > .grjXi > .hDpTu").toArray();
  const releaseDate = $(".ePueMf > .grjXi > .dEQuaq").text();
  const filterTag = featuring1[0];
  const filterTag2 = featuring1[1];
  const producedBy = $(filterTag2).text();
  const featuring = $(filterTag).text();
  return {
    title,
    author,
    featuring,
    producedBy,
    releaseDate,
  };
}

module.exports.default = { getLyrics, getTrackInformation };
