var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [5, 15],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        len: [1, 150],
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500],
      },
    },
  });

  User.beforeCreate(async function(user) {
    var salt = await bcrypt.genSalt(10);
    var hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
    console.log(hashPassword);
  });

  User.associate = function(models) {
    User.hasMany(models.Post, {
      onDelete: "cascade",
    });
  };
  return User;
};
