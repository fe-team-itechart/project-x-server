module.exports = (sequalize, type) => {
  const MODEL = sequalize.define(
    'Users',
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: type.STRING(64),
        allowNull: false,
      },
      password: {
        type: type.STRING(100),
      },
      userName: {
        type: type.STRING(20),
        allowNull: true,
      },
      role: {
        type: type.ENUM('Admin', 'Mentor', 'User'),
        allowNull: false,
        defaultValue: 'User'
      },
      resetPasswordToken: {
        type: type.STRING(255),
        allowNull: true
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
      foreignKey: 'userId',
    });
  };

  return MODEL;
};
