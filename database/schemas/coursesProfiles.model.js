module.exports = (sequalize, type) => {
    const MODEL = sequalize.define( 'CoursesProfiles', {
        id: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },
        courseProgress: {
            type: type.INTEGER
        },
        isOwn: {
            type: type.BOOLEAN,
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
        tableName : 'courses_profiles'
    });

    MODEL.associate = function(models) {
        MODEL.belongsTo(models.Profiles);
        MODEL.belongsTo(models.Courses);
    };

    return MODEL;
};