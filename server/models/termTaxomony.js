'use strict';
module.exports = function(sequelize, DataTypes){
    var TermTaxonomy = sequelize.define('TermTaxonomy', {
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
        }
    }, {
        classMethods: {
            associate: function(models) {
                TermTaxonomy.hasMany(models.TermRelationship);
            }
        }
    });

    return TermTaxonomy;
};
