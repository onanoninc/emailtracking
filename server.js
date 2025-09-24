const express = require("express");
const app = express();

// 1×1 transparent GIF (base64 decoded to bytes)
const pixel = Buffer.from(
  "R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=",
  "base64"
);

app.get("/open.gif", (req, res) => {
  const { uid, cid } = req.query; // your identifiers
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const ua = req.get("User-Agent") || "";

  console.log({
    ts: new Date().toISOString(),
    uid,
    cid,
    ip,
    ua
  });

  res.set("Content-Type", "image/gif");
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private, max-age=0");
  res.send(pixel);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Pixel server running on " + port));
