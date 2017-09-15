process.env.NODE_ENV = 'test';
const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const bcrypt = require('bcryptjs');
const index = require('../../index');

const Meal = require('../../server/models').Meal;
chai.use(require('chai-http'));
let mealData = { title: 'Suya meat', price: 50, available_quantity: 10, image:'http://www.foodsng.com/wp-content/uploads/2015/10/ofada-rice-by-chikadbia.jpg', description:'assorted meat'}


describe('Meal Controller',  () => {
  before(() => {
    return Meal.sequelize.sync();
  });

  describe('Create Function',  () => {
    before((done) => { 
      Meal
        .destroy({ 
          where: {
            title: mealData.title
          }
        })
        .then(function() {
          done()
        });
    }); 
    it('should post a Meal', (done) => {
      chai.request(index)
        .post('/api/meals')
        .send(mealData)
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object')
          done()
      })
    });

  });

  describe('list Function',  () => {
    it('should return all Meals', (done) => {
      chai.request(index)
        .get('/api/meals')
        .then(function(res) {
          console.log(res.body, 'res!!!!!')
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array')
          done()
      })
    });
  });

  describe('getOne Function',  () => {
    it('should return one Meal', (done) => {
      Meal
        .find({ 
          where: {
            title: mealData.title
          }
        })
      .then(function(meal){
        const mealId = meal.dataValues.id
        chai.request(index)
          .get(`/api/meals/${mealId}`)
          .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object')
            // expect(res.body.description).to.have.string('This is white rice and stew with assorted meat')
            done();
          });
      })
    });
  });
  describe('getFiveMostPopularMeals Function',  () => {
    
    before(() => {
      mealOne = { title: 'Suya meat', price: 50, available_quantity: 10, image:'http://www.foodsng.com/wp-content/uploads/2015/10/ofada-rice-by-chikadbia.jpg', description:'roasted assorted meat'}
      mealTwo = { title: 'ofada rice', price: 50, available_quantity: 10, image:'http://www.foodsng.com/wp-content/uploads/2015/10/ofada-rice-by-chikadbia.jpg', description:'rice and stew with assorted meat'}
      mealThree = { title: 'Jollof rice', price: 50, available_quantity: 10, image:'http://www.foodsng.com/wp-content/uploads/2015/10/ofada-rice-by-chikadbia.jpg', description:'nigerian jollof'}
      mealFour = { title: 'Amala and okra', price: 50, available_quantity: 10, image:'http://www.foodsng.com/wp-content/uploads/2015/10/ofada-rice-by-chikadbia.jpg', description:'amala'}
      mealFive = { title: 'Eba and vegetable', price: 50, available_quantity: 10, image:'http://www.foodsng.com/wp-content/uploads/2015/10/ofada-rice-by-chikadbia.jpg', description:'white garri and efo riro'}
      mealSix = { title: 'Moin Moin', price: 50, available_quantity: 10, image:'http://www.foodsng.com/wp-content/uploads/2015/10/ofada-rice-by-chikadbia.jpg', description:'bean cake'}
      
      client.zadd('popularMeals', 8, JSON.stringify(mealOne))
      client.zadd('popularMeals', 5, JSON.stringify(mealTwo))
      client.zadd('popularMeals', 5, JSON.stringify(mealThree))
      client.zadd('popularMeals', 4, JSON.stringify(mealFour))
      client.zadd('popularMeals', 6, JSON.stringify(mealFive))
      client.zadd('popularMeals', 3, JSON.stringify(mealSix))

    });

    it('should return 5 most popularMeals', (done) => {
      chai.request(index)
        .get('/api/popularMeals')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(JSON.parse(res.body[2])).to.be.an('object')
          done();
        });
    });

  })
  describe('update Function', () => {
    it('should update one Meal', (done) => {
      Meal
        .find({ 
          where: {
            title: mealData.title
          }
        })
      .then(function(meal){
        const mealId = meal.dataValues.id
        chai.request(index)
          .put(`/api/meals/${mealId}`)
          .send({image: 'http://sisijemimah.com/wp-content/uploads/2015/12/Ofada-Stew-12-1024x683.jpg'})
          .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object')
            done()
          })
      })
    });
  });
  describe('delete Function',  () => {
    it('should delete one Meal', (done) => {
      Meal
        .find({ 
          where: {
            title: mealData.title
          }
        })
        .then(function(meal){
          const mealId = meal.dataValues.id
          chai.request(index)
            .delete(`/api/meals/${mealId}`)
            .then(function(res) {
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(res.body).to.be.an('object')
              done()
          })
      });
    });
  });
});

