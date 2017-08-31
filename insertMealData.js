const pg = require('pg'),
  connectionString = 'postgres://localhost:5432/jkitchen',
  psql = new pg.Client(connectionString),
  _ = require('lodash'),
  mealData = {title: 'White Rice', price: 200, available_quantity: 5, image: 'http://www.simplyrecipes.com/wp-content/uploads/2017/05/2017-05-22-HT-Rice-19.jpg', description: 'This is just white rice.'};
const csv = require('csvtojson');
const csvFilePath='./mealData.csv';

psql.connect();
const task = 'INSERT INTO Meals(title,price,available_quantity,image,description) values($1, $2, $3, $4, $5)'
// dataToInsert = [mealData.title, mealData.price, mealData.available_quantity, mealData.image, mealData.description]

csv()
.fromFile(csvFilePath)
.on('csv',(csvRow) => {
  // console.log(csvRow,'csvRow')
  psql.query(task, csvRow, (err, res) => {
    if(err) {
      console.log(err);
    }
    console.log('res:', res)
    
  });
})
.on('done',(error)=>{
  if (error){
    console.log('error', error)
  }
  console.log('done')
  // psql.end()
    
});


