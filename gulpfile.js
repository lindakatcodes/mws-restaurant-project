var gulp = require('gulp');
var browserSync = require('browser-sync').create();

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
