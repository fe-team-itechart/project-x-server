module.exports = (sequalize, type) => {
    const MODEL = sequalize.define( 'PublicProfiles', {
        id: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },
        firstName: {
            type: type.STRING(20),
            allowNull: false
        },
        lastName: {
            type: type.STRING(20),
            allowNull: false
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
        tableName : 'public_profiles'
    });

    MODEL.associate = function(models) {
        MODEL.belongsTo(models.Profiles);
    };

    return MODEL;
};