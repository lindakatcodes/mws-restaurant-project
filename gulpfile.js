var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var imageMin = require('gulp-imagemin');
var resize = require('gulp-image-resize');
var rename = require('gulp-rename');
var del = require('del');

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
