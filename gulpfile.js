/*
* Dependencias
*/

var gulp = require('gulp'),
  //concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  jade = require('gulp-jade'),
  imagemin = require('gulp-imagemin'),
  minifyCSS = require('gulp-minify-css'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create();




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


//sass

gulp.task('sass', function() {
    gulp.src('scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.reload({
	      stream: true
	    }))
});



//browser-sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})


//minificar archivos css con clean-css.
gulp.task('mincss', function() {
    gulp.src('./css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('./css/min/'))
});

//concatenar y minificar archivos .js
gulp.task('minjs', function () {
  gulp.src('js/*.js')
  //.pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest('js/min/'))
});


//watch
gulp.task('watch', ['browserSync', 'jade', 'minjs', 'mincss'], function (){
	gulp.watch('scss/*.scss', ['sass']); 
	gulp.watch('jade/vistas/*.jade',['jade']);
	gulp.watch('js/*.js', ['minjs']); 
	gulp.watch('css/*.css',['mincss']);
  // Other watchers
})




//gulp.task('estaticos', ['imagenes', 'css', 'js']);










