module.exports = (sequelize, type) => {
  const MODEL = sequelize.define(
    'Courses',
    {
      id: {
        type: type.UUID,
        primaryKey: true,
      },
      title: {
        type: type.STRING(128),
        allowNull: false,
      },
      description: {
        type: type.TEXT,
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
      tableName: 'courses',
    }
  );
  MODEL.associate = models => {
    MODEL.belongsToMany(models.Users, {
      through: {
        model: models.UsersCourses,
        unique: true,
      },
    });
  };
  return MODEL;
};
