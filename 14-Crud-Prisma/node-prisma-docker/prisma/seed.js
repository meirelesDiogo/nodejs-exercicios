require("dotenv").config();
const prisma = require("../src/prisma"); // Importa a sua configuração pronta do Prisma

// Lista fixa de pessoas (dados reais, sem geração aleatória via Faker)
const pessoas = [
  { nome: "Ana Beatriz Souza", cidade: "Belo Horizonte", email: "ana.souza@example.com" },
  { nome: "Carlos Eduardo Lima", cidade: "São Paulo", email: "carlos.lima@example.com" },
  { nome: "Mariana Ferreira", cidade: "Rio de Janeiro", email: "mariana.ferreira@example.com" },
  { nome: "João Pedro Almeida", cidade: "Curitiba", email: "joao.almeida@example.com" },
  { nome: "Fernanda Costa", cidade: "Porto Alegre", email: "fernanda.costa@example.com" },
  { nome: "Rafael Oliveira", cidade: "Salvador", email: "rafael.oliveira@example.com" },
  { nome: "Juliana Santos", cidade: "Recife", email: "juliana.santos@example.com" },
  { nome: "Lucas Martins", cidade: "Fortaleza", email: "lucas.martins@example.com" },
  { nome: "Camila Rodrigues", cidade: "Brasília", email: "camila.rodrigues@example.com" },
  { nome: "Pedro Henrique Silva", cidade: "Manaus", email: "pedro.silva@example.com" },
];

async function main() {
  console.log("Apagando pessoas antigas (opcional)...");
  // Limpa o banco antes de popular para não acumular registros duplicados
  await prisma.pessoa.deleteMany();

  console.log("Inserindo pessoas...");

  // Insere todas de uma vez só no banco de dados do Docker
  await prisma.pessoa.createMany({
    data: pessoas,
  });

  console.log("✅ Banco de dados populado com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao rodar o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    // Fecha a conexão com o Prisma ao terminar
    await prisma.$disconnect();
  });