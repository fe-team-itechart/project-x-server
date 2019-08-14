module.exports = (sequalize, type) => {
    const MODEL = sequalize.define( 'Profiles', {
        createdAt: {
            type: type.DATE
        },
        updatedAt: {
            type: type.DATE
        }
    }, {
        timestamps : true,
        freezeTableName : true, 
        tableName : 'profiles'
    });

    return MODEL;
};