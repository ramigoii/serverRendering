import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { Menu } from "../src/Menu.js";

const PORT = process.env.PORT || 4000;
const app = express();

// Serve static assets from the build directory
app.use(express.static("./build"));

app.get("/*", (req, res) => {
  const appHTML = ReactDOMServer.renderToString(<Menu />);
  const indexFile = path.resolve("./build/index.html");

  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Something went wrong loading index.html.");
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${appHTML}</div>`)
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
