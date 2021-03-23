module.exports = (sequelize, DataTypes) => {
  const table = sequelize.define(
    'Ordem',
    {
      OrdemId: { type: DataTypes.INTEGER, primaryKey: true },
      ProdutoId: { type: DataTypes.INTEGER, primaryKey: true },
      QuantidadeRefugada: DataTypes.INTEGER,
    },
    {
      freezeTableName: true
    }
  );
  return table;
};