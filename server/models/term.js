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
        order: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        indexes: [{ fields: ['slug'] }],
        classMethods: {
            associate: function(models) {
                Term.hasMany(models.TermTaxonomy);
            }
        }
    });

    return Term;
};
