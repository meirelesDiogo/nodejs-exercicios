//essa e uma api simples msm que retorne um array de usuários em JSON na rota /usuarios.

const dados = [
  {
    id: 1,
    nome: "Diogo",
    email: "didialexandre1017@gmail.com",
    cidade: "Belo Horizonte",
  },
  {
    id: 2,
    nome: "Diego",
    email: "diego@gmail.com",
    cidade: "Sao Paulo",
  },
  { id: 3, nome: "Joao Silva", email: "Joao@gmail.com" },
];

const http = require("http");
const port = 3000;
const server = http.createServer((req, res) => {

  const { url, method } = req;
if(url ==="/"){
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.write("<h1>Pagina inicial</h1>")
    res.end()
}
  if (url === "/usuarios" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });

    res.write(JSON.stringify(dados));
    res.end();
  }
});

server.listen(port, "localhost", () => {
  console.log("Server is running in port:", port);
});
