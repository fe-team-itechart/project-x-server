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
      tableName: 'users_courses',
    }
  );

  return MODEL;
};
