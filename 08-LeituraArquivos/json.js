// Este programa realiza o cadastro de uma pessoa através do terminal,
// armazenando seu nome, email e cidade em um objeto JavaScript.
// Depois, os dados são convertidos para o formato JSON e salvos
// no arquivo "data.json".

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fs = require("fs");
const fss = require("fs").promises;

const usuario = {};
menu();
function menu() {
  console.clear();
  console.log("\n╔═════════════════════════════════════════╗");
  console.log("║     👤 CADASTRO DE PESSOA COM JSON      ║");
  console.log("╚═════════════════════════════════════════╝\n");

  console.log("📝 Digite Seu Nome:");
  console.log("─────────────────────────────────────────");

  rl.question("➜ ", function (nome) {
    usuario.Nome = nome;

    console.log("\n📧 Digite Seu Email:");
    console.log("─────────────────────────────────────────");

    rl.question("➜ ", function (email) {
      usuario.email = email;

      console.log("\n🌎 Digite Sua Cidade:");
      console.log("─────────────────────────────────────────");

      rl.question("➜ ", function (cidade) {
        usuario.Cidade = cidade;

        console.log("\n╔═════════════════════════════════════════╗");
        console.log("║       ✅ ITENS CADASTRADOS COM SUCESSO  ║");
        console.log("╚═════════════════════════════════════════╝");

        Arquivo(usuario);
      });
    });
  });
}
function Arquivo(usuario) {
  fss
    .writeFile("data.json", JSON.stringify(usuario, null, 2), "utf8")
    .then(() => {
      console.log("Digite 1. Mostrar O Conteudo  2. Ir para o Menu");

      rl.question("=> ", function (number) {
        if (number === "1") {
          Conteudo();
        }

        if (number === "2") {
          menu();
        }
      });
    });
}

function Conteudo() {
  console.log("Conteudo Do Arquivo ");
  fs.readFile("data.json", "utf8", (error, data) => {
    const usuario = JSON.parse(data); // Transforma o JSON EM OBJEto DNV
    console.log("Nome: ", usuario.Nome);
    console.log("Email: ", usuario.email);
    console.log("Cidade: ", usuario.Cidade);
    console.log();
    console.log();
    console.log("Aperte ENTER PARA Sair");
    rl.question("=> ", function (enter) {
      menu();
    });
  });
}
