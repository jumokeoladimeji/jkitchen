// // const request = require('superagent'),
// //     faker = require('faker');

// var expect = require("expect.js");
// var Sequelize = require("sequelize");
// var sequelize = new Sequelize('postgres://localhost:5432/jkitchen');

//  var User = require('../../server/models').User;
// signup
// describe(, function () {
//     var mockResponse = function (callback) { return { send: callback }; };
//     var newUser = { username: , password:};
 
 
//     it("should find created users", function (done) {
//         //arrange
//         User.create(newUser).success(function () {
//             //act
//             userService.get({}, mockResponse(function (data) {
//                 //assert
//                 expect(data[0].username).to.eql(newUser.username);
//                 done();
//             }))
//         })
//     });
//     it("should create user", function (done) {
//         //arrange
//         var req = { body: newUser };
//         //act
//         userService.create(req, mockResponse(function (statusCode) {
//             //assert
//             expect(statusCode).to.eql(200);
//             done();
//         }))
//     });
// });
// module.exports = function (sequelize) {
//     var model = require("./model")(sequelize);
//     var User = model.User;
//     return {
//         create: function (req, res) {
//             var newUser = {
//                 username: req.body.username,
//                 password: req.body.password
//             }
//             User.create(newUser).success(function () {
//                 res.send(200);
//             });
//         },
//         get: function (req, res) {
//             User.findAll().success(function (users) {
//                 res.send(users);
//             });
//         }
//     };
// };
