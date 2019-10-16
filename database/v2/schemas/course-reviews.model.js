module.exports = (sequelize, type) => {
  const MODEL = sequelize.define(
    'courseReviews',
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      rating: {
        type: type.DOUBLE,
        allowNull: true,
      },
      text: {
        type: type.STRING(1000),
        allowNull: true,
      },
      createdAt: {
        type: type.DATE,
        defaultValue: Date.now(),
      },
      updatedAt: {
        type: type.DATE,
        defaultValue: Date.now(),
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: 'course_reviews',
    }
  );
  MODEL.associate = models => {
    MODEL.belongsTo(models.users, {
      foreignKey: 'userId',
    });
  };
  return MODEL;
};
