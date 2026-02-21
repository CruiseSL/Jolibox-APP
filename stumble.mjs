import fs from 'fs';
import path from 'path';
import gplay from 'google-play-scraper';
import https from 'https';
gplay.app({appId: 'com.kitkagames.fallbuddies'}).then(app => {
  const url = app.icon.split('=')[0];
  https.get(url, res => {
    const file = fs.createWriteStream('public/games/stumble-guys.png');
    res.pipe(file);
    console.log("Saved stumble guys logo");
  });
});
