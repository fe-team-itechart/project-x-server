module.exports = (sequalize, type) => {
  const MODEL = sequalize.define(
    'ForgotPassword',
    {
      id: {
        primaryKey: true,
        type: type.INTEGER,
        autoIncrement: true,
      },
      linkId: {
        type: type.STRING(255),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: 'forgot_password',
    }
  );

  MODEL.associate = function(models) {
    MODEL.belongsTo(models.Users);
  };

  return MODEL;
};
