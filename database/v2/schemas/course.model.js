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
      title: {
        type: type.STRING(128),
        allowNull: false,
      },
      description: {
        type: type.STRING(1000),
        allowNull: true,
      },
      numberOfLessons: {
        type: type.INTEGER,
        allowNull: false,
      },
      rating: {
        type: type.DOUBLE,
        allowNull: true,
      },
      materials: {
        type: type.STRING(512),
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
      tableName: 'courses',
    }
  );
  MODEL.associate = models => {
    MODEL.hasMany(models.CourseComments);
    MODEL.belongsToMany(models.Categories, {
      through: {
        model: models.CourseCategories,
        unique: true,
      },
      foreignKey: 'courseId',
    });
  };
  return MODEL;
};
