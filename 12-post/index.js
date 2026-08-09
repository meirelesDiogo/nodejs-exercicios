const http = require("http");
const port = 3000;
const fs = require("fs");
const dados = [
  {
    nome: "Diogo",
    email: "didialexandre1017@gmail.com",
    cidade: "Belo Horizonte",
  },
  {
    nome: "Diego",
    email: "diego@gmail.com",
    cidade: "Sao Paulo",
  },
  { nome: "Joao Silva", email: "Joao@gmail.com" },
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
      // o data significa: "Quando chegar um pedaço de informação"  e o "pedaco" é essa informacao q chegou
      corpo += pedaco;
    });
    req.on("end", () => {
      const obj = JSON.parse(corpo); //json parse transforma de json pra objeto
      dados.push(obj);
      console.log(dados);

      res.writeHead(201, {
        "Content-Type": "application/json; charset=utf-8",
      });

      res.end(JSON.stringify(obj));
    });
  }
});

server.listen(port, "localhost", () => {
  console.log("SERVER RUNNING IN PORT", port);
});
