const http = require("http");
const fs = require("fs");
const port = 3000;
const prisma = require("./prisma");
const server = http.createServer(async (req, res) => {
  // pro prisma tem q ter o async

  const { url, method } = req;

  if (url === "/pessoas" && method === "GET") {
    //Lista todos os usuarios
    res.setHeader("Content-Type", "application/json");
    const users = await prisma.pessoa.findMany(); // Pega tudo da tabela Pessoa

    res.end(JSON.stringify(users));
  } 
  
  else if (url.startsWith("/pessoas/") && method === "GET") {
    //Pega e mostra a pessoa pelo id

    const partes = url.split("/");
    const id = parseInt(partes[2]);

    const user = await prisma.pessoa.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (user) {
      console.log("Deu bom pae");
      res.end;
    } else {
      console.log("Deu ruim pae");
      res.end();
    }
  }
});

server.listen(port, "localhost", () => {
  console.log("Server Rodando Localhost:", port);
});
