const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const htmlmin  = require('gulp-html-minifier');
var prettify = require('gulp-html-prettify');
var sass = require('gulp-sass');
sass.compiler = require('sass');
const paths = {
  styles: {
    src: 'dist/assets/css/*.css',
    dest: 'dist/assets/css/',
    sass_src:'./dist/assets/sass/scss/*.scss',
    sass_dest:'./dist/assets/sass/scss/',
  }
};
 
 
gulp.task('sass', function () {
  return gulp.src('./dist/assets/sass/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/sass/scss/'));
});
/*
 * For small tasks you can export arrow functions
 */
/*
 * You can also declare named functions and export them as tasks
 */
gulp.task("styles", function () {
  return gulp.src(paths.styles.src)
    .pipe(cleanCSS())
    // pass in options to the stream
    .pipe(gulp.dest(paths.styles.dest));
})
gulp.task('minify-html', function() {
  return gulp.src('./dist/*.html')
    .pipe(htmlmin({collapseWhitespace: true }))
    .pipe(gulp.dest('./dist/'))
});
gulp.task('html-pretify', function() {
  return gulp.src('./src/app/pages/**/*.html')
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest('./src/app/pages/'))
});
 /*
  * You could even use `export as` to rename exported tasks
  */

// gulp.task("watchFiles", function () {
//   gulp.watch(paths.scripts.src, scripts);
//   gulp.watch(paths.styles.src, styles);
// })