var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat-css');
var cleanCSS     = require('gulp-clean-css');

var resourceInput  = ['resources/scss/**/*.scss', 'resources/scss/**/*_.scss'];
var resourceOutput = 'resources/stylesheets';

var minifiedOutput = 'assets/stylesheets';

var sassOptions = {
    errLogToConsole: true,
    outputStyle:     'expanded'
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function () {
    return gulp
        .src(resourceInput)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(resourceOutput));
});

gulp.task('concat', ['sass'], function() {
    return gulp
        .src(resourceOutput + '/*.css')
        .pipe(concat('bundle.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(minifiedOutput));
});


gulp.task('watch', function() {
    return gulp
        .watch(resourceInput, ['concat'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('default', ['watch']);