/*
* Dependencias
*/

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  jade = require('gulp-jade'),
  imagemin = require('gulp-imagemin'),
  minifyCSS = require('gulp-minify-css'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create();


gulp.task('jade', function() {
  gulp.src('jade/vistas/*.jade')
    .pipe(jade({
      pretty: true //compile expanded html 
    }))
  .pipe(browserSync.reload({
        stream: true //reload browser html
  }))
  .pipe(gulp.dest(''))
});


gulp.task('sass', function() {
  gulp.src('scss/main.scss')
      //output styles : nested, expanded, compact, compressed 
      .pipe(sass({ outputStyle: 'nested' }).on('error', sass.logError))
      .pipe(gulp.dest('./css/'))
      .pipe(browserSync.reload({
        stream: true //reload browser css
  }))
});


//Minify PNG, JPEG, GIF and SVG images
gulp.task('imagemin', function () {
    return gulp.src(['images/*.*'])
    .pipe(imagemin({ 
      progressive: true 
    }))
    .pipe(gulp.dest('images/min'));
});


//minify css (alternative)
gulp.task('mincss', function() {
    gulp.src('./css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('./css/min/'))
});


//concat js
gulp.task('concatjs', function() {
  return gulp.src('./componentes/*.js')
    .pipe(concat('recursos.js'))
    .pipe(gulp.dest('./js/'));
});

//minifyjs
gulp.task('minjs', function () {
  gulp.src('js/main.js')
  .pipe(gulp.dest('js/min/'))
});



//minifyjs recursos
gulp.task('minjs2', function () {
  gulp.src('js/recursos.js')
  .pipe(gulp.dest('js/min/'))
});


//browser-sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})


//watch
gulp.task('watch', ['browserSync', 'jade', 'minjs', 'mincss'], function (){
  //gulp src (origgen)
  gulp.watch('scss/*.scss', ['sass']); 
  gulp.watch('jade/vistas/*.jade',['jade']);

  gulp.watch('js/*.js', ['minjs']); 
	//gulp.watch('css/*.css',['mincss']);
})


//see later: gulp-sourcemaps , gulp-cache , imagemin-pngquant 





