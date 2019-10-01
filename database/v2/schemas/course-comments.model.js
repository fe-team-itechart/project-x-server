module.exports = (sequelize, type) => {
  const MODEL = sequelize.define(
    'CourseComments',
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      text: {
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
      tableName: 'course_comments',
    }
  );
  MODEL.associate = models => {
    MODEL.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
  };
  return MODEL;
};
