module.exports = (sequalize, type) => {
  const MODEL = sequalize.define(
    'coursesCategories',
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'courses_categories',
    }
  );

  return MODEL;
};
