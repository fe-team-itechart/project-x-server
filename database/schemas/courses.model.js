module.exports = (sequalize, type) => {
    const MODEL = sequalize.define( 'Courses', {
        id: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },
        title: {
            type: type.STRING(100),
            allowNull: false
        },
        info: {
            type: type.JSON
        },
        author: {
            type: type.STRING(100),
            allowNull: true
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
        tableName : 'courses'
    });

    return MODEL;
};