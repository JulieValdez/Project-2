module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 15],
        unique: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  });

  User.associate = function(models) {
    User.hasMany(models.Post, {
      onDelete: "cascade",
    });
  };
  return User;
};
