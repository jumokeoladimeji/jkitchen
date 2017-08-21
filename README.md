# JKitchen
* This is an app for viewing menus and making meal orders.


[![Build Status](https://travis-ci.org/andela-joladimeji/jkitchen.svg?branch=master)](https://travis-ci.org/andela-joladimeji/jkitchen)


[![Coverage Status](https://coveralls.io/repos/github/andela-joladimeji/jkitchen/badge.svg?branch=master)](https://coveralls.io/github/andela-joladimeji/jkitchen?branch=master)

## Tools Used
* `Nodejs`-- It is fast
* `Postgresql`
* `Express`
* `Travis`
* `redis`
* `Angular`


## Postgresql(SQL DB) vs MongoDB (NoSQL DB)
### Pros of SQL over NoSQL
* Better for data with a lot of relationships and that can be converted into tables(Although embedded documents can be used).
* Better for applications that require complex queries
* Better for vertical scaling
* Many NoSQL stores compromise consistency in favor of availability and partition tolerance.

### Pros of NoSQL over SQL
* Better for horizontal scaling
* They are fast and reduce latency when there is frequent data read and write



### Installing dependencies
Run
```
1. npm install
2. bower install
```


### To start the app
```
gulp
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