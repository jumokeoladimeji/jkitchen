const gulp = require('gulp')
const gulpMocha = require('gulp-mocha')
const istanbul = require('gulp-istanbul')
const  minify = require('gulp-minify');
const karma = require('gulp-karma');

gulp.task('serve', () => {
 require('./index.js');
});

var allFiles = [
    'public/bower_components/angular/angular.min.js',
    'public/bower_components/angular-mocks/angular-mocks.js',
    'public/app.js',
    'public/scripts/controllers/user-controller.js',
    'public/scripts/**/*.js',
    'tests/public/*.spec.js'
];

gulp.task('test', function(coverage) {
  gulp.src(allFiles)
  .pipe(karma({
  configFile: 'karma.conf.js',
  action: 'run'
}))
.on('error', function(err) {
 // Make sure failed tests cause gulp to exit non-zero
   throw err;
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

