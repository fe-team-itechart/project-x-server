module.exports = (sequelize, type) => {
  const MODEL = sequelize.define(
    'categories',
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: type.STRING(32),
        allowNull: false,
      },
      parent_id: {
        type: type.INTEGER,
        allowNull: false,
        defaultValue: -1
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