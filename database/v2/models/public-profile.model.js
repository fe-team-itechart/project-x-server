module.exports = (sequelize, type) => {
  const MODEL = sequelize.define(
    'publicProfiles',
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      twitterLink: {
        type: type.TEXT,
        allowNull: true,
        defaultValue: ''
      },
      linkedInLink: {
        type: type.TEXT,
        allowNull: true,
        defaultValue: ''
      },
      facebookLink: {
        type: type.TEXT,
        allowNull: true,
        defaultValue: ''
      },
      description: {
        type: type.TEXT,
        allowNull: true,
        defaultValue: ''
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
      tableName: 'public_profiles',
    }
  );

  return MODEL;
};
