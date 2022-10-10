const express = require("express");
const uploadVid = require('./route/route.js');
const evs = require("express-video-stream");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(uploadVid);
evs.addVideo("video", "./video/song.mp4");
app.use(evs.middleware);
const videoName = "song.mp4";
const filePath = path.join(__dirname, "video", videoName);

app.get("/", (req, res) => {
  var page = fs.readFileSync(path.join(__dirname, "./index.html")); // Load html into buffer
  res.send(page + " ");
});

app.get('/download',(req, res) => {
  res.download(filePath);
})

app.listen(5500, () => {
  console.log("Listening on port 5500");
});
