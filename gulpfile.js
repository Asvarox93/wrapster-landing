const gulp = require('gulp');
const prefix = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const clean_css = require('gulp-clean-css');
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const del = require('del');

// Image compression
const imagemin = require('gulp-imagemin');
const imgPngQuant = require('imagemin-pngquant');
const imgJpgRecompress = require('imagemin-jpeg-recompress');

const handleError = (err) => {
    console.log(err);
}

const SCRIPT_PATH = 'js/*.js';
const SCSS_PATH = 'scss/*.scss';
const DEST_PATH = 'dist/';
const HTML_PATH = 'dist/*.html';
const IMAGES_PATH = 'images/**/*.{png,jpeg,jpg,svg,gif}';

gulp.task('images', () => {
    console.log('starting images task');
    return gulp.src(IMAGES_PATH)
        .pipe(imagemin([
            imagemin.gifsicle(),
            imagemin.jpegtran(),
            imagemin.optipng(),
            imagemin.svgo(),
            imgPngQuant(),
            imgJpgRecompress()
        ]))
        .pipe(gulp.dest(DEST_PATH + '/images'))
});

gulp.task('scripts', () => {
    return gulp.src(SCRIPT_PATH)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DEST_PATH))
        .pipe(livereload());
});




gulp.task('style', () => {
    return gulp.src(SCSS_PATH)
        .pipe(plumber()).on('error', handleError)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(prefix())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DEST_PATH))
        .pipe(livereload());
});

gulp.task('dom', () => {
    return gulp.src('./')
        .pipe(livereload());
});
gulp.task('watch', () => {
    require('./server.js');
    livereload.listen();
    gulp.watch(SCRIPT_PATH, ['scripts']);
    gulp.watch(SCSS_PATH, ['style'])
    gulp.watch(HTML_PATH, ['dom']);
});

gulp.task('clean', () => {
    del.sync([DEST_PATH + '/*.{css,js}'])
});

gulp.task('default', ['clean', 'images', 'dom', 'scripts', 'style']);