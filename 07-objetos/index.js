const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const usuario = {};
menu()
function menu() {
  console.log("\n╔═════════════════════════════════════════╗");
  console.log("║          👤 CADASTRO DE USUÁRIO         ║");
  console.log("╚═════════════════════════════════════════╝\n");

  console.log("📝 Digite Aqui o Seu Nome:");
  console.log("─────────────────────────────────────────");

  rl.question("➜ ", function (nome) {
    usuario.Name = nome;

    console.log("\n🎂 Digite Sua Idade:");
    console.log("─────────────────────────────────────────");

    rl.question("➜ ", function (idade) {
      usuario.Idade = idade;

      console.log("\n📧 Digite Seu Email:");
      console.log("─────────────────────────────────────────");

      rl.question("➜ ", function (email) {
        usuario.Email = email;

        console.log("\n💼 Digite Sua Profissão:");
        console.log("─────────────────────────────────────────");

        rl.question("➜ ", function (prof) {
          usuario.Profissao = prof;

          console.log("\n╔═════════════════════════════════════════╗");
          console.log("║       ✅ DADOS CADASTRADOS COM SUCESSO  ║");
          console.log("╚═════════════════════════════════════════╝");

          console.log("\n📋 INFORMAÇÕES DO USUÁRIO");
          console.log("─────────────────────────────────────────");
          console.log("👤 Nome:      ", usuario.Name);
          console.log("🎂 Idade:     ", usuario.Idade);
          console.log("📧 Email:     ", usuario.Email);
          console.log("💼 Profissão: ", usuario.Profissao);
          console.log("─────────────────────────────────────────");
          console.log()
          
          rl.question("Aperte ENTER para Voltar Ao Inicio", function (enter) {
            menu();
          });
        });
      });
    });
  });
}
