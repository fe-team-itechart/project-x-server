module.exports = (sequalize, type) => {
  const MODEL = sequalize.define(
    'SettingsProfiles',
    {
      id: {
        primaryKey: true,
        type: type.INTEGER,
        autoIncrement: true,
      },
      localization: {
        type: type.STRING(30),
      },
      secureSetts: {
        type: type.JSON,
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
      tableName: 'settings_profiles',
    }
  );

  MODEL.associate = function(models) {
    MODEL.belongsTo(models.Profiles);
  };

  return MODEL;
};
