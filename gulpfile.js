var gulp = require('gulp');
var minify = require('gulp-minify');
var jsonminify = require('gulp-jsonminify');
var run =require('gulp-run-command').default;
var clean =require('gulp-clean');
var  connect = require('gulp-connect');
var runSequence = require('gulp-run-sequence');  

gulp.task('js', function() {
    gulp.src('src/*.js')
        .pipe(minify({
            noSource: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('json', function () {
    return gulp.src(['src/lipstick.json'])
        .pipe(jsonminify())
        .pipe(gulp.dest('dist'));
});

gulp.task('lib', function () {
    return gulp.src(['src/lib/*'])
        .pipe(gulp.dest('dist/lib'));
});

gulp.task('default', ['js', 'json','lib']);

gulp.task('clean',function(){
    return gulp.src('dist/',{read: false})
    .pipe(clean());
});

gulp.task('webserver', function() {
    connect.server({
        livereload: true,
        port: 2333
    });
});
gulp.task('run', function(cb) {  
    runSequence('clean', 'default','webserver', cb);
});
