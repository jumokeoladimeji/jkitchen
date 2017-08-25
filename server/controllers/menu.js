const Menu = require('../models').Menu;

module.exports = {
  // Only admin can create and update menu
  create: (req, res) => {
    return Menu
      .create({
        title: req.params.title,
        price: req.body.price,
        available_quantity: req.body.available_quantity,
        image: req.params.image,
        description: req.body.description,
      })
      .then((menu) => res.status(201).send(menu))
      .catch((error) => res.status(500).send(error));
  },

  list: (req, res) => {
    return Menu
      .findAll()
      .then((menus) => res.status(200).send(menus))
      .catch((error) => res.status(500).send(error));
  },

  getOne: (req, res) => {
    return Menu
      .findById(req.params.MenuId)
      .then((Menu) => {
        if (!menu) {
          return res.status(404).send({
            message: 'Menu Not Found',
          });
        }
        return res.status(200).send(menu);
      })
      .catch((error) => res.status(500).send(error));
  },

  update: (req, res) => {
    return Menu
      .findById(req.params.MenuId)
      .then(menu => {
        if (!menu) {
          return res.status(404).send({
            message: 'Menu Not Found',
          });
        }
        return Menu
          .update({
            title: req.body.title || Menu.title,
            price: req.body.price || Menu.price,
            available_quantity: req.body.available_quantity || Menu.available_quantity,
            image: req.params.image || Menu.image,
            description: req.body.description || Menu.description,
          })
          .then((updatedMenu) => res.status(200).send(updatedMenu))
      })
      .catch((error) => res.status(500).send(error));
  },

  destroy: (req, res) => {
    return Menu
      .findById(req.params.MenuId)
      .then(Menu => {
        if (!Menu) {
          return res.status(500).send({
            message: 'Menu Not Found',
          });
        }
        return Menu
          .destroy()
          .then(() => res.status(200).send({message: 'Menu deleted.'}))
      })
      .catch((error) => res.status(500).send(error));
  },
};
