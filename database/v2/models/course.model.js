module.exports = (sequelize, type) => {
  const MODEL = sequelize.define(
    'courses',
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
        type: type.TEXT,
        allowNull: true,
      },
      rating: {
        type: type.DOUBLE,
        allowNull: true,
      },
      price: {
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
    MODEL.hasMany(models.courseReviews);
    MODEL.hasMany(models.profits);
    MODEL.belongsToMany(models.categories, {
      through: {
        model: models.coursesCategories,
        unique: true,
      },
      foreignKey: 'courseId',
    });
  };
  return MODEL;
};
