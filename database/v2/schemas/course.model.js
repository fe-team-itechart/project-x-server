module.exports = (sequelize, type) => {
  const MODEL = sequelize.define(
    'Courses',
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      courseName: {
        type: type.STRING(64),
        allowNull: false,
      },
      description: {
        type: type.STRING(1000),
        allowNull: true,
      },
      rating: {
        type: type.DOUBLE,
        allowNull: true,
      },
      numberOfEnrolledStudents: {
        type: type.INTEGER,
        allowNull: true,
      },
      authors: {
        type: type.STRING(128),
        allowNull: false,
      },
      language: {
        type: type.STRING(32),
        allowNull: false,
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
      tableName: 'courses',
    }
  );
  MODEL.associate = models => {
    MODEL.hasMany(models.CourseReviews);
    MODEL.hasMany(models.Profits);
  };
  return MODEL;
};
