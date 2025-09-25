const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize-connect');

const User = sequelize.define(
  'User',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      require: true,
      set(value) {
        this.setDataValue('username', value ? value.toLowerCase() : '');
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }


  },
  {
    // Other model options go here
  },
);

module.exports = User;