const { round, floor } = Math;

const Spotify = require('node-spotify-api');
const express = require('express');


const app = express();
const PORT = process.env.PORT || 8888;
const environment = process.env.NODE_ENV;

if (environment === 'development') {
  require('dotenv').config();
}

const front_address = environment === 'production' ? 'https://spotunes.netlify.app' : `http://localhost:3000`

const spotify = new Spotify({
  id: process.env.SPOTIFY_CLIENT_ID,
  secret: process.env.SPOTIFY_CLIENT_SECRET
});

const convertMicrosecondToMinuteSecondString = (length) => {
  const totalSeconds = round(length / 1000);

  return `${floor(totalSeconds / 60)}:${totalSeconds % 60}`
}

app.get('/api/spotify/search', (req, res) => {
  if (!req.query.name) {
    res.header('Access-Control-Allow-Origin', front_address);
    res.status(422);
    res.send('Missing required parameter <name>');

    return;
  }

  if (!req.query.type) {
    res.header('Access-Control-Allow-Origin', front_address);
    res.status(422);
    res.send('Missing required parameter <type>');

    return;
  }

  spotify
    .search({
      type: req.query.type,
      query: req.query.name,
      limit: 10
    })
    .then(function (response) {
      if (req.query.type === 'track') {
        const searchResult = response.tracks.items;
        const data = searchResult.map((element) => {
          return {
            spotifyID: element.id,
            title: element.name,
            length_string: convertMicrosecondToMinuteSecondString(element.duration_ms),
            length_ms: element.duration_ms,
            artist: element.artists[0].name,
            album: element.album.name,
            albumCover: element.album.images[0].url,
            albumID: element.album.id,
            artistID: element.artists[0].id
          }
        });
        res.header('Access-Control-Allow-Origin', front_address);
        res.send(data);
      }
      else if (req.query.type === 'artist') {
        const searchResult = response.artists.items;
        const data = searchResult.map((element) => {
          return {
            artistGenres: element.genres,
            artistID: element.id,
            artistImageURL: element.images.length > 0 ? element.images[0].url : null
          }
        });
        res.header('Access-Control-Allow-Origin', front_address);
        res.send(data);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
