/**
 * Created by vladimir on 4/13/16.
 */
(function () {
  "use strict";
  var gulp = require('gulp');
  var browserSync = require('browser-sync').create();
  var autoprefixer = require('gulp-autoprefixer');

  gulp.task('default', function () {
    console.log("Build Ok");
  });


  gulp.task('watch', function (gulpCallback) {
    browserSync.init({
      // serve out of app/
      server: './',
      port: 9876,
      // launch default browser as soon as server is up
      open: true
    }, function callback() {
      gulp.watch('index.html', browserSync.reload);

      // watch css and stream to BrowserSync when it changes
      gulp.watch('css/**', function () {
        // grab css files and send them into browserSync.stream
        // this injects the css into the page
        gulp.src('css/**')
          .pipe(browserSync.stream());
      });

      // notify gulp that this task is done
      gulpCallback();
    });
  });

  gulp.task('prefix', function () {
    return gulp.src('css/style.css')
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest('css'));
  });


})();
