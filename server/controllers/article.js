const Article = require('../models').Article;
const Rating = require('../models').Rating;
const Comment = require('../models').Comment;

module.exports = {
  // Only admin can create and update Article
  create(req, res) {
    const newArticle = {
      title: req.body.title,
      content: req.body.content,
      excerpt: req.body.excerpt,
      imageURL: req.body.imageURL,
      userId: req.params.userId
    }
    if(req.body.type) {
      newArticle.type = req.body.type;      
    }
    return Article
      .create(newArticle)
      .then((article) => res.status(200).send(article))
      .catch((error) => {
        res.status(500).send(error)
      });
  },

  list(req, res) {
    return Article
      .findAll()
      .then((articles) => res.status(200).send(articles))
      .catch((error) => res.status(500).send(error));
  },

  getOne(req, res) {
    return Article
      .findById(req.params.articleId)
      .then((article) => {
        if (!article) {
          return res.status(404).send({
            message: 'Article Not Found',
          });
        }
        return res.status(200).send(Article);
      })
      .catch((error) =>{
       res.status(500).send(error)
      });
  },

  update(req, res) {
    return Article
      .findById(req.params.articleId)
      .then(article => {
        if (!article) {
          return res.status(404).send({
            message: 'Article Not Found',
          });
        }
        return article
          .update({
            title: req.body.title || article.title,
            content: req.body.content || article.content,
            excerpt: req.body.excerpt || article.excerpt,
            imageURL: req.body.imageURL || article.imageURL,
            type: req.body.type || article.type,
          })
          .then((updatedArticle) => res.status(200).send(updatedArticle))
      })
      .catch((error) => res.status(500).send(error));
  },

  destroy(req, res) {
    return Article
      .findById(req.params.articleId)
      .then(article => {
        if (!article) {
          return res.status(500).send({
            message: 'Article Not Found',
          });
        }
        return article
          .destroy()
          .then(() => res.status(200).send({message: 'Article deleted.'}))
      })
      .catch((error) => res.status(500).send(error));
  },

  hasAuthorization(req, res, next){
    if (req.blog.user.id !== req.user.id) {
        return res.status(403).send({message: 'User is not authorized'
        });
    }
    next();
  }
};

