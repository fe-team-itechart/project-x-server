module.exports = (sequelize, type) => {
  const MODEL = sequelize.define(
    'Categories',
    {
      id: {
        type: type.NUMBER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: type.STRING(128),
        allowNull: false,
      },
      description: {
        type: type.STRING(1000),
        allowNull: true,
      },
      createdAt: {
        type: type.DATE,
      },
      updatedAt: {
        type: type.DATE,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: 'categories',
    }
  );
  
  return MODEL;
};
