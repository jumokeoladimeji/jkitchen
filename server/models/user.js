module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false,},
    role: { type: DataTypes.STRING, defaultValue: 'user' },
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    image: DataTypes.STRING,
    social_media_links: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
   }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Order, {
          foreignKey: 'orderId',
          as: 'orders',
        });
      },
    },
  });
  return User;
};

