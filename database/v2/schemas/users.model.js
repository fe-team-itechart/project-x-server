module.exports = (sequalize, type) => {
  const MODEL = sequalize.define(
    'Users',
    {
      email: {
        type: type.STRING(64),
        allowNull: false,
      },
      password: {
        type: type.STRING(100),
      },
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: type.STRING(20),
        allowNull: false,
      },
      lastName: {
        type: type.STRING(20),
        allowNull: false,
      },
      role: {
        type: type.ENUM('Admin', 'Mentor', 'User'),
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
      tableName: 'users',
    }
  );

  MODEL.associate = models => {
    MODEL.hasOne(models.PublicProfiles, {
      foreignKey: 'id',
    });
    MODEL.hasOne(models.SettsProfiles, {
      foreignKey: 'id',
    });
    MODEL.hasMany(models.Courses, {
      foreignKey: 'creatorId',
    });
    MODEL.belongsToMany(models.Courses, {
      through: {
        model: models.UsersCourses,
        unique: true,
      },
    });
  };

  return MODEL;
};
