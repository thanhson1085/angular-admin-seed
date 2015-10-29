'use strict';
module.exports = function(sequelize, DataTypes){
    var TermRelationship = sequelize.define('TermRelationship', {
        order: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {});

    return TermRelationship;
};
