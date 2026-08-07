//Array usado na lista de tarefas
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let tarefas = [];
menu();
function menu() {
  console.log("\n=========================================");
  console.log("           📋 LISTA DE TAREFAS");
  console.log("=========================================");
  console.log("1 - Adicionar tarefa");
  console.log("2 - Ver tarefas");
  console.log("3 - Sair");

  rl.question("=>", function (res) {
    if (res == "1") {
      rl.question("Digite a Tarefa que quer adicionar: ", function (tar) {
        tarefas.push(tar);
        console.log("Tarefa Adicionada Com Sucesso");
        rl.question("Digite ENTER Para ir ao Menu", function (enter) {
          menu();
        });
      });
    }
    if (res === "2") {
      if (tarefas.lenght === 0) {
        console.log("Sem Tarefas Para Mostrar");
        rl.question("Digite ENTER Para ir ao Menu", function (enter) {
          menu();
        });
      }
      let i = 0;
      while (i < tarefas.lenght) {
        console.log(tarefas[i]);
        i++;
      }
    }
  });
}
