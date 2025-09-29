const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize-connect');

const resetpassword = sequelize.define('resetpassword',
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }


  },{});


module.exports = resetpassword;