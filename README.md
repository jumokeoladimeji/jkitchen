# JKitchen
* This is an app for viewing menus and making meal orders.


[![Build Status](https://travis-ci.org/andela-joladimeji/jkitchen.svg?branch=master)](https://travis-ci.org/andela-joladimeji/jkitchen)

[![Coverage Status](https://coveralls.io/repos/github/andela-joladimeji/jkitchen/badge.svg?branch=master)](https://coveralls.io/github/andela-joladimeji/jkitchen?branch=master)


## Tools Used
| **Dependency** | **Use** |
|----------|-------|
|Nodejs|It is fast. It is JavaScript run-time environment for executing JavaScript code|
|Postgresql| An object-relational database management system (ORDBMS)|
|Sequelize|A promise-based ORM for Node.js. It helps with data conversion|
|Express| A flexible Node.js web application framework|
|Travis| Syncs easily on push to github and runs the Test. It also creates builds|
|redis| For Caching meals|
|Angular| JavaScript frontend framework | 
|Gulp|It helps to automate tasks|
|ESlint|Javscript linting utility|
|Bcrypt|A password hashing library|


##Test Tools
| **Dependency** | **Use** |
|----------|-------|
|Mocha| JavaScript testing library |
|Chai|A BDD/TDD assertion library for node and the browser that can be paired with any javascript testing framework|

## Postgresql(SQL DB) vs MongoDB (NoSQL DB)
### Pros of SQL over NoSQL
* Better for data with a lot of relationships and that can be converted into tables(Although embedded documents can be used).
* Better for applications that require complex queries
* Better for vertical scaling
* Many NoSQL stores compromise consistency in favor of availability and partition tolerance.

### Pros of NoSQL over SQL
* Better for horizontal scaling
* They are fast and reduce latency when there is frequent data read and write


###React Vs Angular


### Set Up locally
* Git clone
* Cd to Jkitchen

### Installing dependencies
Run
```
1. npm install
2. bower install
```

### DB set up
* create a user role named user

run
```
psql user
```
in the Postgres Shell run:
```
CREATE DATABASE jkitchen;
```
```
\connect jkitchen;
```

### Populate the DB with meal and user data
In your terminal cd to jkitchen and run:
```
sequelize db:migrate
```
```
sequelize db:seed:all
```


### To start the app
* Start redis server
```
redis-server 
```
```
gulp serve
```
or
```
nodemon index.js
```
or 
```
npm start
```


### Running tests

Front End Test

```
npm test
```
Back End Test
```
gulp server-test 
```