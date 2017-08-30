const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const notify = require("gulp-notify");
const tingpng = require('gulp-tinypng');
const spritesmith = require('gulp.spritesmith');


gulp.task('browser-sync', () =>
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
);

gulp.task('sass', () =>
	gulp.src('app/sass/**/*.sass')
		.pipe(sass())
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
);

gulp.task('vendors', () =>
	gulp.src([
		'app/vendors/jquery/dist/jquery.min.js',
		'app/vendors/simpleParallax/simpleParallax.js',
		'app/vendors/jquery.fancybox/jquery.fancybox.min.js',
		// 'app/vendors/owl.carousel/owl.carousel.min.js',
		'app/vendors/slick/slick.min.js',
		])
		.pipe(concat('vendors.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
);

gulp.task('png-sprite', () => {
	let spriteData = gulp.src('app/img/icons/*.png')
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: '_sprite.sass',
			cssFormat: 'sass',
			padding: 10
	}))

	spriteData.img.pipe(gulp.dest('app/img/'));
	spriteData.css.pipe(gulp.dest('app/sass/'));
});

gulp.task('watch', ['sass', 'vendors', 'browser-sync'], () => {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);
