module.exports = (sequelize, type) => {
  const MODEL = sequelize.define(
    'CourseComments',
    {
      id: {
        type: type.UUID,
        primaryKey: true,
      },
      title: {
        type: type.STRING(128),
        allowNull: false,
      },
      comment: {
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
    MODEL.belongsTo(models.Courses, {
      foreignKey: 'course_id',
    });
    MODEL.belongsTo(models.Users, {
      foreignKey: 'user_id',
    })
  };
  return MODEL;
};
