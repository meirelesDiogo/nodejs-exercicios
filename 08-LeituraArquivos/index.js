// Este programa permite que o usuário digite um conteúdo pelo terminal,
// salve esse conteúdo em um arquivo de texto chamado "arquivo.txt"
// e depois leia o arquivo para mostrar seu conteúdo novamente no terminal.

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fs = require("fs").promises;
const fss = require("fs");

console.log("\n╔═════════════════════════════════════════╗");
console.log("║          📄 ESCRITA EM ARQUIVO         ║");
console.log("╚═════════════════════════════════════════╝\n");

console.log("📝 Digite Algo para Escrever em um Arquivo:");
console.log("─────────────────────────────────────────");

rl.question("➜ ", function (text) {
  fs.writeFile("arquivo.txt", text, "utf8");

  console.log("\n✅ Conteúdo Anexado com Sucesso!");

  rl.question("\n📖 Aperte ENTER para Ler o Arquivo", function (ler) {
    console.log("\n─────────────────────────────────────────");

    fss.readFile("arquivo.txt", "utf8", (error, data) => {
      if (error) {
        console.log("❌ Erro: ", error);
        return;
      }

      console.log("📄 Conteúdo encontrado:");
      console.log();
      console.log(data);
      console.log("─────────────────────────────────────────");
    });
  });
});