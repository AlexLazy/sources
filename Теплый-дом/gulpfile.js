const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const cache = require('gulp-cache');
const autoprefixer = require('gulp-autoprefixer');
const notify = require("gulp-notify");
const spritesmith = require('gulp.spritesmith');
const tingpng = require('gulp-tinypng');
const svgSprite = require('gulp-svg-sprites');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const filter = require('gulp-filter');
const svg2png = require('gulp-svg2png');




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
		'app/vendors/jquery/dist/jquery.mobile.custom.min.js',
		// 'app/vendors/jquery/dist/jquery.mobile.min.js',
		'app/vendors/jquery.modal/jquery.modal.min.js',
		'app/vendors/jquery.fancybox/jquery.fancybox.min.js',
		'app/vendors/inputmask/jquery.inputmask.bundle.min.js',
		'app/vendors/lightslider/lightslider.js',
		// 'app/libs/bootstrap.min.js',
		// 'app/libs/owl.carousel/owl.carousel.min.js',
		// 'app/libs/jquery.sliderPro/jquery.sliderPro.min.js',
		// 'app/libs/jquery.flexslider/jquery.flexslider.min.js',
		// 'app/libs/jquery.magnific-popup/jquery.magnific-popup.min.js',
		// 'app/libs/jquery.youtubebackground/jquery.youtubebackground.min.js'
		// 'app/libs/jquery.backgroundvideo/jquery.backgroundvideo.min.js'
		])
		.pipe(concat('vendors.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
);

gulp.task('watch', ['sass', 'vendors', 'browser-sync'], () => {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/*.js', browserSync.reload);
});

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


gulp.task('png', () =>
	gulp.src('app/assets/png/**/**/*.jpg')
		.pipe(imageResize({
			width: 916,
			height : 618,
			crop : true,
			upscale : true
		}))
		.pipe(rename(function (path) { path.basename += "-slide"; }))
		.pipe(tingpng('RdIqBCJDPdJBr3R7FVM1e2QxfNDTUSaI'))
		.pipe(gulp.dest('app/dist/png/'))
);

gulp.task('svg', () =>
	gulp.src('app/assets/svg/*.svg')
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		.pipe(cheerio({
			run: function ($) {
				$('[style]').removeAttr('style');
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(replace('&gt;', '>'))
		.pipe(svgSprite({
			preview: false,
			cssFile: 'sprite.css',
			svg: {
				sprite: 'sprite.svg'
			}
		}))
		.pipe(gulp.dest('app/dist/svg/'))
		.pipe(filter('**/*.svg'))
		.pipe(svg2png())
		.pipe(tingpng('RdIqBCJDPdJBr3R7FVM1e2QxfNDTUSaI'))
		.pipe(gulp.dest('app/dist/svg/'))
);

gulp.task('default', ['watch']);
