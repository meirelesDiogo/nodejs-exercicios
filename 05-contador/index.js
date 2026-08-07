const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.clear();

console.log("=========================================");
console.log("         🔢 CONTADOR DO DIOGO 🔢");
console.log("=========================================\n");

console.log("➡️  Aperte ENTER para mostrar os números de 1 a 100.\n");

rl.question("➜ ", function (ent) {
  console.clear();

  console.log("=========================================");
  console.log("          NÚMEROS DE 1 A 100");
  console.log("=========================================\n");

  let i = 1;

  while (i <= 100) {
    console.log(i);
    i++;
  }
  console.log("\n=========================================");
  console.log("➡️  Aperte ENTER para mostrar apenas os números pares.");
  console.log("=========================================\n");

  rl.question("➜ ", function (enter) {
    console.clear();

    console.log("=========================================");
    console.log("         NÚMEROS PARES (1 a 100)");
    console.log("=========================================\n");

    let i = 1;

    while (i <= 100) {
      if (i % 2 == 0) {
        console.log(i);
      }
      i++;
    }

    console.log("\n=========================================");
    console.log("           ✔️ FIM DO PROGRAMA");
    console.log("=========================================");

    rl.close();
  });
});
