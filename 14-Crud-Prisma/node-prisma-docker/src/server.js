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
  } else if (url.startsWith("/pessoas/") && method === "GET") {
    //Pega e mostra a pessoa pelo id

    const partes = url.split("/");
    const id = parseInt(partes[2]);

    const user = await prisma.pessoa.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (user) {
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(user));
      res.end();
    } else {
      res.setHeader("Content-Type", "text/html;charset=utf-8");

      res.write(
        "<script>alert('Não foi encontrado Usuario com esse ID');window.location.href='/pessoas';</script>",
      );

      res.end();
    }
  } else if (url === "/cadastro" && method === "GET") {
    fs.readFile("src/criacao.html", "utf-8", (erro, conteudo) => {
      if (erro) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Erro interno: Não foi possível carregar a página.");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(conteudo);
    });
  } else if (url === "/pessoas" && method === "POST") {
    let corpo = "";

    req.on("data", (pedaco) => {
      corpo += pedaco;
    });
    req.on("end", async () => {
      const usuario = JSON.parse(corpo); // transforma em objeto

      const NovaPessoa = await prisma.pessoa.create({ // Add um novo usuario ao bd
        data: {
          nome: usuario.nome,
          cidade: usuario.cidade,
          email: usuario.email,
        },
      });
      if (NovaPessoa) {
        console.log("Novo Usuario Adicionado");
      } else {
        console.log("Usuario Nao foi Adicionado AO BD");
      }

      // 2. RESPONDE O NAVEGADOR falando q deu certo
      res.writeHead(201, { "Content-Type": "application/json; charset=utf-8" });
      res.end();
    });
  }
});

server.listen(port, "localhost", () => {
  console.log("Server Rodando Localhost:", port);
});
