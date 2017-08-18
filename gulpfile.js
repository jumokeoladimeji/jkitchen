const gulp = require('gulp')
    gulpMocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    minify = require('gulp-minify');


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


gulp.task('compress', () =>  {
  gulp.src('public/**/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js', './bower_components']
    }))
    .pipe(gulp.dest('dist/scripts'))
});

