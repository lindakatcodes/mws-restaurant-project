const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const imageMin = require('gulp-imagemin');
const resize = require('gulp-image-resize');
const rename = require('gulp-rename');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const prefix = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');

// Reduce images functions
gulp.task('clean', function() {
    return del('./img/optimized');
});

gulp.task('reduce-images', ['clean'], function() {
    gulp.src('./img/*.{jpg, png}') 
        .pipe(resize({ 
            width: 800, 
            quality: 0.5
        }))
        .pipe(imageMin()) 
        .pipe(rename(function (path) { path.basename += "-optimized"; })) 
        .pipe(gulp.dest('./img/optimized'))
});

// Watching functions
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "index.html"
        },
        logLevel: "warn",
        injectChanges: false
    });
});

gulp.task('html', function() {
    gulp.src('./*.html')
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('css', function() {
    gulp.src('./css/*.css')
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function() {
    gulp.src('./js/*.js')
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function() {
    gulp.watch('./*.html', ['html']);
    gulp.watch('./css/*.css', ['css']);
    gulp.watch('./js/*.js', ['js']);
});

gulp.task('start', ['browser-sync', 'watch']);
