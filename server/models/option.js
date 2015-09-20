'use strict';

module.exports = function(sequelize, DataTypes) {
    var Option = sequelize.define('Option', {
        optionKey: DataTypes.STRING,
        optionValue: DataTypes.TEXT('long')
    }, {
        timestamps: false
    });

    return Option;
};
