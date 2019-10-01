module.exports = (sequelize, type) => {
  const MODEL = sequelize.define(
    'CourseCategories',
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: type.STRING(32),
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
      tableName: 'course_categories',
    }
  );

  return MODEL;
};
