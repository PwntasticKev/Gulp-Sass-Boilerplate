var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

sass.compiler = require('node-sass');

var sassTask = function() {
  return gulp.src('source/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('distribute/css'))
    .pipe(connect.reload());
};
var copyTask = function() {
  return gulp.src('source/**/*.html')
    .pipe(gulp.dest('distribute'))
    .pipe(connect.reload());
};
var connectTask = function() {
  connect.server({
    root: 'distribute',
    port: '3000',
    host: 'localhost',
    livereload: true,
  });
};
var watchTask = function(done) {
  gulp.watch('source/styles/**/*.scss', gulp.series('sass'));
  gulp.watch('source/**/*.html', gulp.series('copy'));
  done();
};
gulp.task('sass', sassTask);
gulp.task('copy', copyTask);
gulp.task('connect', connectTask);
gulp.task('watch', watchTask);
gulp.task('default', gulp.series('sass', 'copy', 'watch', 'connect'));
