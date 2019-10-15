module.exports = (sequelize, type) => {
  const MODEL = sequelize.define(
    'Profits',
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      description: {
        type: type.STRING(128),
        allowNull: true,
      },
      createdAt: {
        type: type.DATE,
        defaultValue: Date.now(),
      },
      updatedAt: {
        type: type.DATE,
        defaultValue: Date.now(),
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: 'profits',
    }
  );

  return MODEL;
};
