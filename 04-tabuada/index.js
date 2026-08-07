const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.clear();

console.log("========================================");
console.log("      Tabuada do Diogo");
console.log("========================================");
console.log();
console.log("Informe O numero ");
console.log("Para Descobrir sua Tabuada");
console.log();
rl.question(":", function (number) {
  let i = 1;
  while (i <= 10) {
    console.log(i, " X ", Number(number), " = ", Number(number) * i);
    i++;
    rl.close()
  }
});
