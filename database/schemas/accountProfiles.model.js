module.exports = (sequalize, type) => {
  const MODEL = sequalize.define(
    'AccountProfiles',
    {
      id: {
        primaryKey: true,
        type: type.INTEGER,
        autoIncrement: true,
      },
      info: {
        type: type.JSON,
        allowNull: false,
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
      tableName: 'account_profiles',
    }
  );

  MODEL.associate = function(models) {
    MODEL.hasOne(models.Profiles);
  };

  return MODEL;
};
