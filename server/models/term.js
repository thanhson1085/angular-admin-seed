'use strict';
module.exports = function(sequelize, DataTypes){
    var Term = sequelize.define('Term', {
        name: {
            type: DataTypes.STRING
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        taxonomy: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        parent: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        indexes: [{ fields: ['slug', 'taxonomy'] }],
        classMethods: {
            associate: function(models) {
                Term.hasMany(models.TermRelationship);
            }
        }
    });

    return Term;
};
