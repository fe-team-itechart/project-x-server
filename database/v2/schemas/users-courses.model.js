module.exports = (sequalize, type) => {
  const MODEL = sequalize.define(
    'UsersCourses',
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      tableName: 'users_courses',
    }
  );

  return MODEL;
};
