module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false,},
    role: { type: DataTypes.STRING, defaultValue: 'user' },
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    image: DataTypes.STRING,
    social_media_links: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
  });
  User.associate = (models) => {
    User.hasMany(models.Order, {
      foreignKey: 'userId',
      as: 'orders',
    });
    User.hasMany(models.Blog, {
      foreignKey: 'userId',
      as: 'blogs',
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'comments',
    });
    User.hasMany(models.Rate, {
      foreignKey: 'userId',
      as: 'rates',
    });
  }
  return User;
};



