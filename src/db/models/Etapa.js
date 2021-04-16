module.exports = (sequelize, DataTypes) => {
  const table = sequelize.define(
    'Etapa',
    {
      OrdemId: { type: DataTypes.INTEGER, primaryKey: true },
      ProcessoId: { type: DataTypes.INTEGER, primaryKey: true },
      QuantidadeProduzida: DataTypes.INTEGER,
      QuantidadeInspecionada: DataTypes.INTEGER,
      QuantidadeRefugada: DataTypes.INTEGER,
      ObservacaoRefugo: DataTypes.STRING,
    },
    {
      freezeTableName: true
    }
  );
  return table;
};