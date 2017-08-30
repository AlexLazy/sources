var gulp         = require('gulp'),
	gutil          = require('gulp-util' ),
	sass           = require('gulp-sass'),
	browserSync    = require('browser-sync'),
	concat         = require('gulp-concat'),
	uglify         = require('gulp-uglify'),
	cleanCSS       = require('gulp-clean-css'),
	rename         = require('gulp-rename'),
	del            = require('del'),
	imagemin       = require('gulp-imagemin'),
	pngquant       = require('imagemin-pngquant'),
	htmlImport     = require('gulp-html-import'),
	cache          = require('gulp-cache'),
	autoprefixer   = require('gulp-autoprefixer'),
	ftp            = require('vinyl-ftp'),
	notify         = require("gulp-notify");

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('import', function () {
	gulp.src('./app/template/*.html')
		.pipe(htmlImport('./app/template/blocks/'))
		.pipe(gulp.dest('app'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass())
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('libs', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/bootstrap.min.js',
		'app/libs/owl.carousel/owl.carousel.min.js',
		// 'app/libs/jquery.sliderPro/jquery.sliderPro.min.js',
		'app/libs/jquery.flexslider/jquery.flexslider.min.js',
		// 'app/libs/jquery.magnific-popup/jquery.magnific-popup.min.js',
		'app/libs/jquery.fancybox/jquery.fancybox.min.js',
		'app/libs/inputmask/jquery.inputmask.bundle.min.js',
		// 'app/libs/jquery.youtubebackground/jquery.youtubebackground.min.js'
		'app/libs/jquery.backgroundvideo/jquery.backgroundvideo.min.js'
		])
		.pipe(concat('libs.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'libs', 'import', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/**/*.html', ['import']);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('removedist', function() { return del.sync('dist'); });

gulp.task('build', ['removedist', 'buildhtml', 'imagemin', 'sass', 'libs'], function() {

	var buildCss = gulp.src([
		'app/css/fonts.min.css',
		'app/css/main.min.css'
		]).pipe(gulp.dest('dist/css'));

	var buildFiles = gulp.src([
		'app/.htaccess'
	]).pipe(gulp.dest('dist'));

	var buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*').pipe(gulp.dest('dist/js'));

});

gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);