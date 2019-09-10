module.exports = (sequelize, type) => {
  const MODEL = sequelize.define(
    'SettsProfiles',
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      localization: {
        type: type.ENUM('ru', 'en'),
        allowNull: false,
        defaultValue: 'ru'
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
      tableName: 'setts_profiles',
    }
  );

  return MODEL;
};
