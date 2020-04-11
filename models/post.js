module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      values: [
        "Fitness",
        "Mental Health",
        "Groceries",
        "Recipes",
        "Resources",
        "Other",
      ],
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1, 500],
    },
    saved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  //post belongs to user
  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Post;
};
