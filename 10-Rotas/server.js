const http = require("http"); //pra criar o servidor
const port = 3000; //porta pro localhost

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  const { url, method } = req; //pega url(localhost:3000/) e o method(get,post, sla) e recebe a req

  if (url === "/") {
    res.write("<h1>Pagina Inicial</h1>");
    res.write(
      "<p>Bem vindo aos meus exercicios de estudos para <strong>Aprender Node.JS</strong></p>",
    );
    res.end();
  } else if (url === "/sobre") {
    res.write("<h1>Pagina Sobre</h1>");
    res.end();
  } else if (url === "/produtos") {
    res.write("<h1>Pagina Produtos</h1>");
    res.end();
  } else if (url === "/usuarios") {
    res.write("<h1>Pagina de Usuarios</h1>");
    res.end();
  } else if (url === "/contato") {
    res.write("<H1>Pagina Contatos </H1>");
    res.write("<p>Fale Conosco em didialexandre1017@gmail.com</p>");
    res.end();
  }
});

server.listen(port, "localhost", () => {
  console.log("Server running at http://localhost:3000/");
});
