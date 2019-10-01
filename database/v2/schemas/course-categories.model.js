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
        defaultValue: Date.now()
      },
      updatedAt: {
        type: type.DATE,
        defaultValue: Date.now()
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
