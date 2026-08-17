const http = require("http");
const fs = require("fs");
const port = 3000;

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if(url ==="/pessoas" && method==="GET"){  //Lista todos os usuarios
   res.setHeader('Content-Type', 'text/html');
const users = await prisma.Pessoa.findMany()


  }



});



server.listen(port, "localhost", () => {
  console.log("Server Rodando Localhost:", port);
});
