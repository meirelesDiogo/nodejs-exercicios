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
      // Pega o ID do último item cadastrado e soma + 1. Se a lista estiver vazia, começa com 1.
      const novoId = dados.length > 0 ? dados[dados.length - 1].id + 1 : 1;
      object.id = novoId;
      dados.push(object);
      console.log("Usuario add com sucesso:", object);
    });
  } else if (url.startsWith("/usuarios/") && method === "GET") {
    // o startsWith serve pra ver se tem o /usuarios/ na url
    const partes = url.split("/"); //separa oq vem dps da /
    const id = parseInt(partes[2]); // pega o 3 elemento do array q é o id(se tiver)
    const usuarioEncontrado = dados.find((usuario) => usuario.id === id);

    if (usuarioEncontrado) {
      res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
      res.end(JSON.stringify(usuarioEncontrado)); // transforma em json
    } else {
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.end("<h2>Nao foi Encontrado Usuario Cadastrado com Esse ID</h2>");
    }
  } else if (url === "/alterar" && method === "GET") {
    fs.readFile("put.html", (erro, arquivo) => {
      if (erro) {
        console.log("erro ao mostrar html da Req PUT", erro);
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.end(arquivo);
    });
  } else if (url.startsWith("/alterar/") && method === "GET") {
    const partes = url.split("/");
    const id = parseInt(partes[2]);
    const usuarioEncontrado = dados.find((usuario) => usuario.id === id);

    fs.readFile("reqput.html", "utf8", (erro, arquivo) => {
      if (erro) {
        console.log("Erro ao acessar Arquivo ReqPut ", error);
        return;
      }
      //modifica mudando as coisas pras info do id selecionado
      let htmlModificado = arquivo
        .replace("{{id}}", usuarioEncontrado.id)
        .replace("{{nome}}", usuarioEncontrado.nome || "")
        .replace("{{email}}", usuarioEncontrado.email || "")
        .replace("{{cidade}}", usuarioEncontrado.cidade || "");
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.end(htmlModificado);
    });
  } else if (url.startsWith("/alterar/") && method === "PUT") {
    const partes = url.split("/");
    const id = parseInt(partes[2]);

    const usuarioEncontrado = dados.find((usuario) => usuario.id === id);

    if (usuarioEncontrado) {
      let corpo = "";
      req.on("data", (pedaco) => {
        corpo += pedaco;
      });
      req.on("end", () => {
        const dadosAtualizados = JSON.parse(corpo);
        // Altera diretamente as propriedades do objeto dentro do array
        usuarioEncontrado.nome =
          dadosAtualizados.nome ?? usuarioEncontrado.nome;
        usuarioEncontrado.email =
          dadosAtualizados.email ?? usuarioEncontrado.email;
        usuarioEncontrado.cidade =
          dadosAtualizados.cidade ?? usuarioEncontrado.cidade;

        console.log("Usuário alterado com sucesso:", usuarioEncontrado);

        // Responde para o navegador que deu tudo certo
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ mensagem: "Usuário atualizado com sucesso!" }),
        );
      });
    }
  } else if (url === "/remover" && method === "GET") {
    fs.readFile("remover.html", "utf8", (erro, arquivo) => {
      if (erro) {
        console.log("Erro ao acessar HTML remover:", erro);
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.end(arquivo);
    });
  } else if (startsWith("/remover/") && method === "GET") {
    const partes = url.split("/");
    const id = parseInt(partes[2]);
    fs.readFile("reqDelete.html", "utf8", (erro, arquivo) => {
      if (erro) {
        console.log("Erro ao Acessar ReqDelete HTML ", erro);
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.end(arquivo);
    });
  } else if (startsWith("/remover/") && method === "DELETE") {
  }
});

server.listen(port, "localhost", () => {
  console.log("Server Is Running in port", port);
});
