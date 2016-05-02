var gulp        = require('gulp'),
	uglify      = require('gulp-uglify'),
	browserSync = require('browser-sync').create(),
	reload      = browserSync.reload,
	sass        = require('gulp-sass');


var src = {
	script: 'js/*.js',
	style : 'sass/*.scss'
};
 
gulp.task('compress', function() {
	return gulp.src(src.script)
		.pipe(uglify())
    	.pipe(reload({stream: true}))
    	.pipe(gulp.dest('dist/'));
});

gulp.task('css',function(){
	return gulp.src('sass/style.scss')
		.pipe(sass().on('error',sass.logError))
		.pipe(gulp.dest('dist/'));
});



gulp.task('serve', ['compress','css'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch(src.script, ['compress']).on('change',reload);
    gulp.watch(src.style, ['css']).on('change',reload);
    gulp.watch("index.html").on('change', reload);
});


gulp.task('default',['serve']);