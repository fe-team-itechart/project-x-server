module.exports = (sequelize, type) => {
  const MODEL = sequelize.define(
    'PublicProfiles',
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
      },
      updatedAt: {
        type: type.DATE,
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
