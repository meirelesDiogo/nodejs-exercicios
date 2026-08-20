const http = require("http");
const fs = require("fs");
const port = 3000;
const prisma = require("./prisma");
const server = http.createServer(async (req, res) => {
  // pro prisma tem q ter o async

  const { url, method } = req;

  if (url === "/pessoas" && method === "GET") {
    //Lista todos os usuarios
    try {
      const users = await prisma.pessoa.findMany(); // Pega tudo da tabela Pessoa

      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(users));
    } catch (erro) {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ erro: "Usuarios Não Encontrados" }));
    }
  } else if (url.startsWith("/pessoas/") && method === "GET") {
    //Pega e mostra a pessoa pelo id
    try {
      const partes = url.split("/");
      const id = parseInt(partes[2]);

      const user = await prisma.pessoa.findUnique({
        where: {
          id: Number(id),
        },
      });

      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(user));
      res.end();
    } catch (erro) {
      res.setHeader("Content-Type", "text/html;charset=utf-8");

      res.write(
        "<script>alert('Não foi encontrado Usuario com esse ID');window.location.href='/pessoas';</script>",
      );

      res.end();
    }
  } else if (url === "/cadastro" && method === "GET") {
    fs.readFile("src/criacao.html", "utf-8", (erro, conteudo) => {
      try {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(conteudo);
      } catch (erro) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Erro interno: Não foi possível carregar a página.");
      }
    });
  } else if (url === "/pessoas" && method === "POST") {
    let corpo = "";

    req.on("data", (pedaco) => {
      corpo += pedaco;
    });
    req.on("end", async () => {
      try {
        const usuario = JSON.parse(corpo); // transforma em objeto

        const NovaPessoa = await prisma.pessoa.create({
          // Add um novo usuario ao bd
          data: {
            nome: usuario.nome,
            cidade: usuario.cidade,
            email: usuario.email,
          },
        });

        // 2. RESPONDE O NAVEGADOR falando q deu certo
        res.writeHead(201, {
          "Content-Type": "application/json; charset=utf-8",
        });
        res.end();
      } catch (erro) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ mensagem: "Erro ao Cadastrar Usuario" }));
      }
    });
  } else if (url.startsWith("/atualizar/") && method === "GET") {
    const partes = url.split("/");
    const id = parseInt(partes[2]);

    fs.readFile("src/atualiza.html", "utf-8", async (erro, arquivo) => {
      try {
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
      } catch (erro) {
        res.writeHead(400, {
          "Content-Type": "application/json;charset=utf-8",
        });
        res.end(
          JSON.stringify({ erro: "Nao foi possivel Carregar o Arquivo" }),
        );
      }
    });
  } else if (url.startsWith("/pessoas") && method === "PUT") {
    try {
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

        res.writeHead(201, {
          "Content-Type": "application/json;charset=utf-8",
        });
        res.end();
      });
    } catch (erro) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ erro: "Erro " }));
    }
  } else if (url.startsWith("/deletar/") && method === "GET") {
    const partes = url.split("/");
    const id = parseInt(partes[2]);
    fs.readFile("src/delete.html", "utf-8", async (erro, arquivo) => {
      try {
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });

        const HtmlModificado = arquivo.replace("{{id}}", id);
        res.end(HtmlModificado);
      } catch (erro) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ erro: "Erro" }));
      }
    });
  } else if (url === "/pessoas" && method === "DELETE") {
    let corpo = "";
    req.on("data", (pedaco) => {
      corpo += pedaco;
    });
    req.on("end", async () => {
      try {
        const obj = JSON.parse(corpo); //transforma em objeto

        const apaga = await prisma.pessoa.delete({
          //apaga o usuario no prisma
          where: {
            id: Number(obj.id),
          },
        });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ mensagem: "Deu tudo Certo" }));
      } catch (erro) {
        // Trata erros
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ erro: "Erro ao deletar ou ID não encontrado" }),
        );
      }
    });
  } else {
    // 3.  Resposta padrão para qualquer outra rota
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Nao Encontrado Essa Rota");
  }
});

server.listen(port, "localhost", () => {
  console.log("Server Rodando Localhost:", port);
});
