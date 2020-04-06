module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
        // eslint-disable-next-line prettier/prettier
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
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

  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Post;
};
