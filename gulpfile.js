/*
* Dependencias
*/

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),  
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  sass = require('gulp-sass'),
  jade = require('gulp-jade'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
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

//minify png, jpeg, gif and svg images
gulp.task('imagemin', function () {
    return gulp.src(['images/*.*'])
    .pipe(imagemin({ 
      progressive: true 
    }))
    .pipe(gulp.dest('images/min'));
});

//concat & minify recursos.min.js
var jsFiles = ['componentes/jquery/dist/jquery.js', 
                'componentes/jquery-validation/dist/jquery.validate.js' 
              ] 
    jsDest = 'js';

gulp.task('jmin-recursos', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('recursos.js'))
        .pipe(gulp.dest('jsDest'))
        .pipe(rename('recursos.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/min'));
});

//minify main.min.js
gulp.task('jmin-main', function() {  
    return gulp.src('js/main.js')
        .pipe(gulp.dest('js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/min'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})


// autoprefixer & sourcemaps
gulp.task('autoprefixer', function () {
	return gulp.src('css/*.css')
		.pipe(sourcemaps.init())
		.pipe(autoprefixer({
            browsers: ['last 6 versions', 'IE 8', 'IE 9', 'IE 10'],
            cascade: true
        }))
		.pipe(concat('main.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('css/prefix'));
});

//compile sass + jade
gulp.task('watch', ['browserSync', 'sass' , 'jade'], function (){
  gulp.watch('scss/*.scss', ['sass']); 
  gulp.watch('jade/**/*.jade',['jade']);
})


