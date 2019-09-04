module.exports = (sequelize, type) => {
  const MODEL = sequelize.define(
    'PublicProfiles',
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      twitterLink: {
        type: type.TEXT,
        allowNull: true,
      },
      linkedInLink: {
        type: type.TEXT,
        allowNull: true,
      },
      facebookLink: {
        type: type.TEXT,
        allowNull: true,
      },
      description: {
        type: type.TEXT,
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
      tableName: 'public_profiles',
    }
  );

  return MODEL;
};
