/**
 * Created by vladimir on 4/13/16.
 */
(function () {
  "use strict";
  var gulp = require('gulp');
  var browserSync = require('browser-sync').create();
  var svgmin = require('gulp-svgmin');
  var svgstore = require("gulp-svgstore");
  var path = require("path");
  var htmlhint = require("gulp-htmlhint");
  var postcss = require('gulp-postcss');
  var sourcemaps = require('gulp-sourcemaps');



  var autoprefixer = require('autoprefixer');
  var color_rgba_fallback = require('postcss-color-rgba-fallback');
  var opacity = require('postcss-opacity');
  var pseudoelements = require('postcss-pseudoelements');
  var vmin = require('postcss-vmin');
  var pixrem = require('pixrem');
  var will_change = require('postcss-will-change');
  var flexbox_fixer =  require('postcss-flexboxfixer');
  var flexbox_bugfixes = require("postcss-flexbugs-fixes");
  var nano = require('gulp-cssnano');

  const BROWSER_OPTIONS = ["ie >= 10", "Last 3 versions", "> 0.1%"];

  var processors = [
    will_change,
    autoprefixer({ browsers: BROWSER_OPTIONS, cascade: false }),
    color_rgba_fallback,
    opacity,
    pseudoelements,
    vmin,
    pixrem,
    flexbox_bugfixes,
    flexbox_fixer,
  ];


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
      gulp.watch(['css/**/*.css'], function () {
        // grab css files and send them into browserSync.stream
        // this injects the css into the page
        gulp.src('css/**/*.css')
            .pipe(sourcemaps.init())
            .pipe(postcss(processors))
            .pipe(nano())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('build/'))
            .pipe(browserSync.stream());
      });

      // notify gulp that this task is done
      gulpCallback();
    });
  });

  gulp.task('css', function () {

    return gulp.src('css/**/*.css')
               .pipe(sourcemaps.init())
               .pipe(postcss(processors))
               .pipe(nano())
               .pipe(sourcemaps.write('.'))
               .pipe(gulp.dest('build/'));
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
