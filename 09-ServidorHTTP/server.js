const http = require("http");
const port = 3000;

const server = http.createServer((req, res) => {
  //Cria o Servidor
  //req-requisição  res-resposta

  res.writeHead(200, { "content-type": "html" }); //Define o status e cabecalho das respostas
  res.end("Hello World!"); //envia e dps encerra a conexao
});

server.listen(port, "localhost", () => {
  console.log("Server Rodando em localhost:", port);
});
