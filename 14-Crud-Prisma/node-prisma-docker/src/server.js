const http = require("http");
const fs = require("fs");
const port = 3000;
const prisma = require("./prisma");
const server = http.createServer(async (req, res) => {
  // pro prisma tem q ter o async

  const { url, method } = req;

  if (url === "/pessoas" && method === "GET") {
    //Lista todos os usuarios

    const users = await prisma.pessoa.findMany(); // Pega tudo da tabela Pessoa
    if (users) {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(users));
    } else {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ erro: "Usuario Nao foi cadastrado" }));
    }
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

      const NovaPessoa = await prisma.pessoa.create({
        // Add um novo usuario ao bd
        data: {
          nome: usuario.nome,
          cidade: usuario.cidade,
          email: usuario.email,
        },
      });
      if (NovaPessoa) {
        // 2. RESPONDE O NAVEGADOR falando q deu certo
        res.writeHead(201, {
          "Content-Type": "application/json; charset=utf-8",
        });
        res.end();
      } else {
        console.log("Usuario Nao foi Adicionado AO BD");
      }
    });
  } else if (url.startsWith("/atualizar/") && method === "GET") {
    const partes = url.split("/");
    const id = parseInt(partes[2]);

    fs.readFile("src/atualiza.html", "utf-8", async (erro, arquivo) => {
      if (erro) {
        res.writeHead(400, {
          "Content-Type": "application/json;charset=utf-8",
        });
        res.end(
          JSON.stringify({ erro: "Nao foi possivel Carregar o Arquivo" }),
        );
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });

      const UsuarioEncontrado = await prisma.pessoa.findUnique({
        where: {
          id: Number(id),
        },
      });

      const HtmlModificado = arquivo
        .replace("{{id}}", UsuarioEncontrado.id)
        .replace("{{nome}}", UsuarioEncontrado.nome)
        .replace("{{cidade}}", UsuarioEncontrado.cidade)
        .replace("{{email}}", UsuarioEncontrado.email);

      res.end(HtmlModificado);
    });
  } else if (url.startsWith("/pessoas") && method === "PUT") {
    let corpo = "";
    req.on("data", (pedaco) => {
      corpo += pedaco;
    });
    req.on("end", async () => {
      const usuario = JSON.parse(corpo);
      const id = usuario.id;

      const resposta = await prisma.pessoa.update({
        // atualiza os cadastros no BD
        where: { id: Number(id) },
        data: {
          nome: usuario.nome,
          cidade: usuario.cidade,
          email: usuario.email,
        },
      });
      if (resposta) {
        res.writeHead(201, {
          "Content-Type": "application/json;charset=utf-8",
        });
        res.end();
      }
    });
  } else if (url.startsWith("/deletar/" && method === "GET")) {
    const partes = url.split("/");
    const id = parseInt(partes[2]);
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.write("Você será direcionado para a pagina de DELETE");
    
    res.end();
  } else {
    // 3.  Resposta padrão para qualquer outra rota
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Nao encontrado");
  }
});

server.listen(port, "localhost", () => {
  console.log("Server Rodando Localhost:", port);
});
