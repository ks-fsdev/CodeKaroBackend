const http = require("http");
const fs = require("fs");
const url = require("url");
const { error } = require("console");
const { json } = require("stream/consumers");

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return;
  let log = `${Date.now()} request received from ${req.url} \n`;
  const myUrl = url.parse(req.url, true);
  const stringQuery = `${Date.now()} - Query: ${JSON.stringify(
    myUrl.query
  )}  \n \n`;

  fs.appendFile("log.txt", stringQuery, (err) => {
    if (err) {
      console.log(`error while logging URL parameters: ${err}`);
    }
  });

  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.log(`error while logging URL: ${err}`);
    } else {
      switch (req.url) {
        case "/":
          res.end("<h1>Home Page</h1>");
          break;
        case "/profile":
          res.end("<h1>Profile Page</h1>");
          break;
        case "/search":
          res.end("<h1>Search Page</h1>");
          break;
        default:
          res.end("<h1> 404 : page not found</h1>");
          break;
      }
    }
  });
});

server.listen(5500, () => {
  console.log("page listening to server");
});
