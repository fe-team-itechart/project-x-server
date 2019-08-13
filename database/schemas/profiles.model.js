module.exports = (sequalize, type) => {
    return sequalize.define( 'Profiles', {
        info: {
            type: type.JSON
        },
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
};