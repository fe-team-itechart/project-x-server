module.exports = (sequelize, type) => {
  const MODEL = sequelize.define(
    'Categories',
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
