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

  for (let i = 1; i <= 100; i++) {
    console.log(i);
  }

  console.log("\n=========================================");
  console.log("➡️  Aperte ENTER para mostrar apenas os números pares.");
  console.log("=========================================\n");

  rl.question("➜ ", function (enter) {
    console.clear();

    console.log("=========================================");
    console.log("         NÚMEROS PARES (1 a 100)");
    console.log("=========================================\n");

    for (let i = 1; i <= 100; i++) {
      if (i % 2 === 0) console.log(i);
    }

    console.log("\n=========================================");
    console.log("➡️  Aperte ENTER para mostrar apenas os números ímpares.");
    console.log("=========================================\n");

    rl.question("➜ ", function (enter) {
      console.clear();

      console.log("=========================================");
      console.log("        NÚMEROS ÍMPARES (1 a 100)");
      console.log("=========================================\n");

      for (let i = 1; i <= 100; i++) {
        if (i % 2 !== 0) console.log(i);
      }

      console.log("\n=========================================");
      console.log("           ✔️ FIM DO PROGRAMA");
      console.log("=========================================");

      rl.close();
    });
  });
});