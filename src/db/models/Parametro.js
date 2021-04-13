module.exports = (sequelize, DataTypes) => {
  const table = sequelize.define(
    'Parametro',
    {
      chave: { type: DataTypes.STRING, primaryKey: true },
      valor: { type: DataTypes.STRING, primaryKey: true },
    },
    {
      freezeTableName: true
    }
  );
  return table;
};