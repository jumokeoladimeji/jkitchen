const _ = require('lodash'),
  csv = require('csvtojson'),
  pg = require('pg'),
  connectionString = 'postgres://localhost:5432/jkitchen',
  psql = new pg.Client(connectionString),
  csvFilePath='./mealData.csv';

psql.connect();
const task = 'INSERT INTO Meals(title,price,available_quantity,image,description) values($1, $2, $3, $4, $5)'

csv()
.fromFile(csvFilePath)
.on('csv',(csvRow) => {
  psql.query(task, csvRow, (err, res) => {
    if(err) {
      console.log(err);
    }
  });
})
.on('done',(error)=>{
  if (error){
    console.log('error', error)
  }
  console.log('done') 
});


