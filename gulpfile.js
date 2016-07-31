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
  var postcss = require("gulp-postcss");
  var rename = require("gulp-rename");
  var sourcemaps = require('gulp-sourcemaps');
  var concat = require("gulp-concat");
  var del = require("del");
  var plumber = require("gulp-plumber");
  var imagemin = require("gulp-imagemin");
  var runSequence = require("run-sequence");


  var autoprefixer = require('autoprefixer');
  var color_rgba_fallback = require('postcss-color-rgba-fallback');
  var opacity = require('postcss-opacity');
  var pseudoelements = require('postcss-pseudoelements');
  var vmin = require('postcss-vmin');
  var pixrem = require('pixrem');
  var will_change = require('postcss-will-change');
  var flexbox_fixer = require('postcss-flexboxfixer');
  var flexbox_bugfixes = require("postcss-flexbugs-fixes");
  var nano = require('gulp-cssnano');

  const BROWSER_OPTIONS = ["ie >= 10", "Last 3 versions", "> 1%"];

  var PROCESSORS = [
    will_change,
    autoprefixer({
      browsers: BROWSER_OPTIONS, cascade: false
    }),
    color_rgba_fallback,
    opacity,
    pseudoelements,
    vmin,
    flexbox_bugfixes,
    flexbox_fixer
  ];


  gulp.task('default', ["serve"], function () {
    console.log("Build Ok");
  });

  gulp.task("serve", function () {
    browserSync.init({
      server: "build",
      notify: false,
      open: true,
      ui: false
    });

    gulp.watch("css/**/*.css", ["css"]);

    gulp.watch("*.html").on("change", function (file) {

      // copy html file to build folder
      gulp.src(file.path)
          .pipe(gulp.dest("build"))
          .pipe(browserSync.reload({stream: true}));
    });

    gulp.watch("js/**/*.js").on("change", function (file) {
      // copy js file to build folder
      gulp.src(file.path)
          .pipe(gulp.dest("build/js"))
          .pipe(browserSync.reload({stream: true}));
    });
  });

  gulp.task('css', function () {
    return gulp.src(["css/normalize.css", "css/style.css", "css/**"])
               .pipe(plumber())
               .pipe(concat("style.css"))
               .pipe(postcss(PROCESSORS))
               .pipe(sourcemaps.write('.'))
               .pipe(gulp.dest('build/css'))
               .pipe(nano())
               .pipe(rename("style.min.css"))
               .pipe(gulp.dest("build/css"))
               .pipe(browserSync.stream());
  });


  gulp.task("copy", function () {
    return gulp.src([
                 "fonts/**/*.{woff,woff2,ttf}",
                 "img/**",
                 "js/**",
                 "*.html"
               ], {
                 base: "."
               })
               .pipe(gulp.dest("build"));
  });


  gulp.task("clean", function () {
    return del(["build/**"], {dryRun: false})
  });

  // optimize images
  gulp.task("images", function () {
    return gulp.src("build/img/**/*.{jpg,png,gif}").pipe(imagemin([
                 imagemin.optipng({optimizationlevel: 3}),
                 imagemin.jpegtran({progressive: true})
               ]))
               .pipe(gulp.dest("build/img"));
  });


  gulp.task("build", function (fn) {
    runSequence(
      "clean",
      "copy",
      "css",
      //"images",  // uncomment this line if images are big
      fn
    );
  });


  // optimize images
  gulp.task("images", function () {
    return gulp.src("build/img/**/*.{jpg,png,gif,svg}")
               .pipe(imagemin(
                 [
                   imagemin.optipng({optimizationlevel: 3}),
                   imagemin.jpegtran({progressive: true})
                 ]
               ))
               .pipe(gulp.dest("build/img"));
  });


  // prefix css with autoprefixer
  gulp.task('prefix', function () {
    return gulp.src('css/style.css')
               .pipe(autoprefixer({
                 browsers: BROWSER_OPTIONS, cascade: false
               }))
               .pipe(gulp.dest('css'));
  });


})();
