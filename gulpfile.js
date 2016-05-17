/*
* Dependencias
*/

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  jade = require('gulp-jade'),
  imagemin = require('gulp-imagemin'),
  minifyCSS = require('gulp-minify-css'),
  sass = require('gulp-sass');


//gulp.task('estaticos', ['imagenes', 'css', 'js']);

//concatenar y minificar archivos .js
gulp.task('demo', function () {
  gulp.src('js/source/*.js')
  .pipe(concat('todo.js'))
  .pipe(uglify())
  .pipe(gulp.dest('js/build/'))
});


//jade
gulp.task('jade', function() {
  gulp.src('jade/vistas/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(''))
});


//minificar imágenes PNG, JPEG, GIF y SVG
gulp.task('imagenes', function () {
    return gulp.src(['src/images/*.*'])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'));
});

//minificar archivos css con clean-css.
gulp.task('mincss', function() {
    gulp.src('./src/css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dist/css/'))
});

//sass

gulp.task('styles', function() {
    gulp.src('scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});

//watch

gulp.task('watch', function(){
  gulp.watch('scss/*.scss', ['styles']); 
  // Other watchers
})
