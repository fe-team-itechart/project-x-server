module.exports = (sequalize, type) => {
  const MODEL = sequalize.define(
    'users',
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
      locale: {
        type: type.STRING(4),
        allowNull: true
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
    MODEL.hasOne(models.publicProfiles, {
      foreignKey: 'id',
    });
    MODEL.hasMany(models.courses, {
      foreignKey: 'creatorId',
    });
    MODEL.belongsToMany(models.courses, {
      through: {
        model: models.usersCourses,
        unique: true,
      },
      foreignKey: 'userId',
    });
  };

  return MODEL;
};
