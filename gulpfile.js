/**
 * Created by vladimir on 4/13/16.
 */
(function () {
  "use strict";
  var gulp = require('gulp');
  var browserSync = require('browser-sync').create();
  var autoprefixer = require('gulp-autoprefixer');
  var svgmin = require('gulp-svgmin');
  var svgstore = require("gulp-svgstore");
  var path = require("path");
  var inject = require('gulp-inject');
  var htmlhint = require("gulp-htmlhint");


  gulp.task("lint", function () {
    gulp.src("index.html")
        .pipe(htmlhint())
        .pipe(htmlhint.failReporter());
  });


  gulp.task('default', ["watch"], function () {
    console.log("Build Ok");
  });

  gulp.task('watch', function (gulpCallback) {
    browserSync.init({
      // serve out of ./
      server: './', port: 9876, // launch default browser as soon as server is up
      //open: true
    }, function callback() {
      gulp.watch(['index.html', 'catalog.html'], browserSync.reload);
      // watch css and stream to BrowserSync when it changes
      gulp.watch('css/**/*.css', function () {
        // grab css files and send them into browserSync.stream
        // this injects the css into the page
        gulp.src('css/**/*.css').pipe(browserSync.stream());
      });

      // notify gulp that this task is done
      gulpCallback();
    });
  });

  // prefix css with autoprefixer
  gulp.task('prefix', function () {
    return gulp.src('css/style.css')
               .pipe(autoprefixer({
                 browsers: BROWSER_OPTIONS, cascade: false
               }))
               .pipe(gulp.dest('css'));
  });

  gulp.task('svgmin', function () {
    return gulp.src('./img/icons/*.svg')
               .pipe(svgmin(function getOptions(file) {
                 var prefix = path.basename(file.relative, path.extname(file.relative));

                 SVGMIN_PLAGINS.push({
                   cleanupIDs: {
                     prefix: prefix + '-', minify: true
                   }
                 });
                 return {
                   plugins: SVGMIN_PLAGINS
                 }
               }))
               .pipe(svgmin({
                 js2svg: {
                   pretty: true
                 }
               }))
               .pipe(svgstore())
               .pipe(gulp.dest('./img/sprite/'));
  });


  const BROWSER_OPTIONS = ['> 2% in ru', "ie 9-11", "last 2 versions"];
  const SVGMIN_PLAGINS = [{
    removeDoctype: true
  }, {
    removeComments: true
  }, {
    cleanupNumericValues: {
      floatPrecision: 2
    }
  }, {
    convertColors: {
      names2hex: false, rgb2hex: false
    }
  }, {
    collections: true
  }, {
    moveElemsAttrsToGroup: true
  }];


})();
