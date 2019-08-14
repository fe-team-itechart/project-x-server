module.exports = (sequalize, type) => {
  const MODEL = sequalize.define(
    'Profiles',
    {},
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'profiles',
    }
  );

  return MODEL;
};
