/*
* Dependencias
*/
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  jade = require('gulp-jade'),
  imagemin = require('gulp-imagemin'),
  minifyCSS = require('gulp-minify-css');

var path = {
    jade: ['jade/vistas/*.jade'],
    html: 'public/'
};

//concatenar y minificar archivos .js
//gulp.task('estaticos', ['imagenes', 'css', 'js']);
gulp.task('demo', function () {
  gulp.src('js/source/*.js')
  .pipe(concat('todo.js'))
  .pipe(uglify())
  .pipe(gulp.dest('js/build/'))
});


//jade
gulp.task('html', function() {
    return gulp.src(path.jade)
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest(path.html))
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


