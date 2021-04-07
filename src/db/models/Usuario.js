module.exports = (sequelize, DataTypes) => {
  const table = sequelize.define(
    'Usuario',
    {
      nome: { type: DataTypes.STRING, primaryKey: true },
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
      permissao: DataTypes.INTEGER,
      UserPCPId: DataTypes.INTEGER,
      hash: DataTypes.STRING,
    },
    {
      freezeTableName: true
    }
  );
  return table;
};