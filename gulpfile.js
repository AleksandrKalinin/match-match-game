const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const merge = require('merge-stream');
const streamqueue = require('streamqueue');
 
sass.compiler = require('node-sass');

const cssFiles = [
	'./src/css/media.css'
]

const jsFiles = [
	'./src/js/main.js'
]

const sassFiles = [
	'./src/sass/main.sass'
]

function compile(){
   // var sassStream,cssStream;

    return streamqueue({ objectMode: true },
            gulp.src(sassFiles).pipe(sass()),
            gulp.src(cssFiles)
        )
        .pipe(concat('style.css')) 
		.pipe(autoprefixer({
			cascade: false
		}))

		.pipe(cleanCSS({
			level: 2
		})) 
	    .pipe(gulp.dest('./build/css'))
	    .pipe(browserSync.stream())
}

function styles(){
	return gulp.src(cssFiles)
		.pipe(concat('style.css'))
		.pipe(autoprefixer({
			cascade: false
		}))

		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(gulp.dest('./build/css'))
		.pipe(browserSync.stream())
}

function scripts(){
	return gulp.src(jsFiles)
		.pipe(concat('script.js'))
		.pipe(uglify({
			toplevel: true
		}))
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream())
}

function clean(){
	return del(['build/*'])
}

function watch(){
	browserSync.init({
		server:{
			baseDir: "./"
		}
	})
	gulp.watch('./src/css/**/*.css', compile)
	gulp.watch('./src/sass/**/*.sass', compile)
	//gulp.watch('./src/js/**/*.js', scripts)
	gulp.watch("./*.html").on("change", browserSync.reload)
}

gulp.task('styles', styles);

gulp.task('scripts', scripts);

gulp.task('sass', compile)

gulp.task('del', clean);

gulp.task('watch', watch);

gulp.task('build', gulp.series(clean, gulp.parallel(compile)))

gulp.task('dev', gulp.series('build', 'watch'));