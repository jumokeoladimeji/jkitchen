var gulp = require('gulp')
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul');


gulp.task('serve', () => {
 require('./index.js');
});


gulp.task('server-test', () => {
    gulp.src('tests/server/*.js')
       .pipe(istanbul())
        .on('end', function () {
            gulp.src('tests/server/*.js')
                .pipe(mocha({
                  reporter: 'spec'
                }))
                .on('error', handleError)
                .pipe(istanbul.writeReports('reports')); 
    });
});

