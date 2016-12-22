var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var umd = require('gulp-umd');
var rename = require('gulp-rename');
var pump = require('pump');

var srcPath = 'src',
    distPath = 'dist';
 
function getFiles(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        var filename = file.split('.'),
            isDirectory = fs.statSync(path.join(dir, file)).isDirectory();
        return isDirectory ? false : (filename[1] === 'js');
      });
}

gulp.task('compress', function (cb) {
    var files = getFiles(srcPath);
    var tasks = [];
    files.forEach(function(file) {
        var filename = file.split('.');
        var _tasks = [
            gulp.src(path.join(srcPath, file)),
            umd(),
            gulp.dest(distPath),
            uglify(),
            rename(filename[0]+ '.min.js'),
            gulp.dest(distPath)
        ];
        tasks = tasks.concat(tasks, _tasks);
    });

    pump(tasks, cb);
});

gulp.task('umd', function() {
    return gulp.src(srcPath + '/*.js')
        .pipe(umd())
        .pipe(gulp.dest(distPath));
});

gulp.task('build', ['compress']);