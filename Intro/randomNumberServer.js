const http = require("http");
const fs = require("fs");

let randomNumber = 0;
// trying the random number to be updated every two seconds.
setInterval(() => {
  randomNumber = Math.floor(Math.random() * 1000);
}, 2000);

const newServer = http.createServer((req, res) => {
  let log = `${Date.now()} request received from ${req.url} \n`;

  //logging the paths
  fs.appendFile("server.txt", log, (err) => {
    // error handling
    if (err) {
      console.log("error logging : " + err);
    } else {
      switch (req.url) {
        case "/":
          res.end(`<h1>Random Number:${randomNumber}</h1>`);
          break;
        case "/about":
          res.end(`<h1>This is about page</h1>`);
          break;
        case "/product":
          res.end(`<h1>This is product page</h1>`);
          break;
        default:
          res.end(`<h1>error 404: page not found</h1>`);
          break;
      }
    }
  });
});

newServer.listen(8000, () => {
  console.log("all good");
});
