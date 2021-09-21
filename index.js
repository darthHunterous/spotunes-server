const Spotify = require('node-spotify-api');
const express = require('express');

require('dotenv').config();

const app = express();
const PORT = 8888

const spotify = new Spotify({
  id: process.env.SPOTIFY_CLIENT_ID,
  secret: process.env.SPOTIFY_CLIENT_SECRET
});

app.get('/api/spotify/search', (req, res) => {
  spotify
    .search({
      type: 'track',
      query: req.query.title,
      limit: 10
    })
    .then(function (response) {
      const tracksSearchResult = response.tracks.items;

      const data = tracksSearchResult.map((element) => {
        return {
          albumCover: element.album.images[0].url,
          artist: element.artists[0].name,
          trackTitle: element.name
        }
      });

      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.send(data);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});