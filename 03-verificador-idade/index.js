const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.clear();

console.log("╔══════════════════════════════════════╗");
console.log("║      🎂 VERIFICADOR DE IDADE         ║");
console.log("╚══════════════════════════════════════╝");
console.log();
console.log("👉 Digite a sua idade abaixo:");
console.log();

rl.question(": ", function (idade) {
  if (Number(idade) <= 18) {
    return console.log("Você é Menor De Idade");
  }
  if (Number(idade) > 18 && Number(idade) < 60) {
    return console.log("Voce é Maior de Idade");
  }
  if (Number(idade) >= 60) {
    return console.log("Voce é Idoso");
    rl.close();
  }
});
