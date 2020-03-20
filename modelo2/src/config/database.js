module.exports = {
  dialect: "postgres",
  host: "127.0.0.1",
  username: "docker",
  password: "docker",
  database: "gonodemodulo22",
  operatorAliases: false,
  define: {
    timestamps: true, // Adiciona duas colunas na BD - registro e alteração
    underscored: true, // troca camelCase por snake_case
    underscoredAll: true
  }
};

// npx sequelize db:migrate - Criar o BD
