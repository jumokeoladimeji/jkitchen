module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false},
    username: { type: DataTypes.STRING},
    role: { type: DataTypes.STRING, defaultValue: 'user' },
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    image: DataTypes.STRING,
    socialMediaLinks: DataTypes.JSON,
    hashedPassword: DataTypes.STRING
  });
  User.associate = (models) => {
    User.hasMany(models.Order, {
      foreignKey: 'userId',
      as: 'orders',
    });
    User.hasMany(models.Article, {
      foreignKey: 'userId',
      as: 'articles',
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'comments',
    });
    User.hasMany(models.Rate, {
      foreignKey: 'userId',
      as: 'rates',
    });
    User.hasMany(models.ArticleUpdatedBy, {
      foreignKey: 'updatedBy',
      as: 'articleUpdatedBys',
    });
  }
  return User;
};



