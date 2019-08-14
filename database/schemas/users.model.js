module.exports = (sequalize, type) => {
  const MODEL = sequalize.define(
    'Users',
    {
      email: {
        type: type.STRING(64),
      },
      password: {
        type: type.STRING(100),
      },
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      tableName: 'users',
    }
  );

  MODEL.associate = models => {
    MODEL.hasOne(models.Profiles, {
      foreignKey: 'userId',
      as: 'userLoginData',
    });
  };

  return MODEL;
};
