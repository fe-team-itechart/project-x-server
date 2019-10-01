module.exports = (sequelize, type) => {
  const MODEL = sequelize.define(
    'SettsProfiles',
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      localization: {
        type: type.ENUM('ru', 'en'),
        allowNull: false,
        defaultValue: 'ru'
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
      tableName: 'setts_profiles',
    }
  );

  return MODEL;
};
