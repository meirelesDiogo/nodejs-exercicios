const http = require("http");
const fs = require("fs");
const port = 3000;

const server = http.createServer((req, res) => {
  const { url, method } = req;

});



server.listen(port, "localhost", () => {
  console.log("Server Rodando Localhost:", port);
});
