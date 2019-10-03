module.exports = (sequelize, type) => {
  const MODEL = sequelize.define(
    'Categories',
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
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
        defaultValue: Date.now()
      },
      updatedAt: {
        type: type.DATE,
        defaultValue: Date.now()
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
