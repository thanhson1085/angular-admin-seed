'use strict';
module.exports = function(sequelize, DataTypes){
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            isEmail: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActivated: {
            type: DataTypes.BOOLEAN(),
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        indexes: [{ fields: ['isActivated'] }],
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Token);
                User.hasMany(models.Usermeta);
            }
        }
    });

    return User;
};
