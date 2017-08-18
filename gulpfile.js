var gulp = require('gulp')
    gulpMocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul');


gulp.task('serve', () => {
 require('./index.js');
});


gulp.task('server-test', () => {
    return gulp.src('server/**/*.js')
       .pipe(istanbul())
        .on('end', () => {
            gulp.src('tests/server/*.js')
                .pipe(gulpMocha({
                  reporter: 'spec'
                }))
                .pipe(istanbul.writeReports('reports')); 
    });
});


