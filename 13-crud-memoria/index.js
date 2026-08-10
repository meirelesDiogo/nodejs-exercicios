const http = require("http");

const port = 3000;
const fs = require("fs");
const dados = [
  {
    id: 1,
    nome: "Diogo",
    email: "diogo@gmail.com",
    cidade: "Belo Horizonte",
  },
  {
    id: 2,
    nome: "Diego",
    email: "diego@gmail.com",
    cidade: "Sao Paulo",
  },
  {
    id: 3,
    nome: "Joao Silva",
    email: "joao@gmail.com",
  },
];

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === "/" && method === "GET") {
    fs.readFile("index.html", (erro, arquivo) => {
      //vai le o html e mostrar na pagina inicial
      if (erro) {
        console.log("Erro ao Ler Index:", erro);
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.end(arquivo);
    });
  } else if (url === "/usuarios" && method === "POST") {
    let corpo = "";
    req.on("data", (pedaco) => {
      corpo += pedaco;
    });
    req.on("end", () => {
      const object = JSON.parse(corpo);
      dados.push(object);
      console.log(dados);
    });
  } 
  else if (url === "/usuarios/" && method === "GET") {
    const partes = url.split("/"); //separa oq vem dps da /
    const id = parseInt(partes[2]); // pega o 3 elemento do array q é o id(se tiver)
    console.log(id);
    res.end();
  }
});

server.listen(port, "localhost", () => {
  console.log("Server Is Running in port", port);
});
