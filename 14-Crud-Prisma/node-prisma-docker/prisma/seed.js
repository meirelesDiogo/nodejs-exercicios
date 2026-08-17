require("dotenv").config();
const prisma = require("../src/prisma"); // Importa a sua configuração pronta do Prisma
const { faker } = require("@faker-js/faker");

async function main() {
  console.log("Apagando pessoas antigas (opcional)...");
  // Limpa o banco antes de popular para não acumular registros duplicados
  await prisma.pessoa.deleteMany();

  console.log("Gerando 10 novas pessoas falsas com o Faker...");

  // Cria um array com 10 pessoas falsas
  const pessoasFalsas = Array.from({ length: 10 }).map(() => ({
    nome: faker.person.fullName(),
    cidade: faker.location.city(),
    email: faker.internet.email(),
  }));

  // Insere todas de uma vez só no banco de dados do Docker
  await prisma.pessoa.createMany({
    data: pessoasFalsas,
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