/**
 * Created by szka on 04.05.2016.
 */
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var cleancss = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var imageop = require('gulp-image-optimization');

var paths = {
    module: 'source/app/app.js',
    config: 'source/app/app.config.js',
    index: 'source/index.html',
    views: 'source/app/**/*.html',
    styles: 'source/styles/*.less',
    scripts: 'source/app/**/*.js',
    watchScript: 'source/app/**/*.js',
    angular: [
        'node_modules/angular/angular.js', 
        'node_modules/angular-ui-router/release/angular-ui-router.js', 
        'node_modules/angular-resource/angular-resource.js',
        'node_modules/angular-animate/angular-animate.js'
    ],
    fonts: ['node_modules/bootstrap-less/fonts/*', 'node_modules/font-awesome/fonts/*'],
    images: ['source/images/*.png', 'source/images/*.jpg', 'source/images/*.gif']
};

var dist = {
    main: 'dist/',
    scripts: 'dist/js/',
    styles: 'dist/styles/',
    views: 'dist/views/',
    fonts: 'dist/fonts',
    images: 'dist/images'
};

gulp.task('lint', function() {
    gulp
        .src([paths.module, paths.scripts])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('vendorScripts', function() {
    gulp
        .src(paths.angular)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(dist.scripts));
});

gulp.task('scripts', function() {
    gulp
        .src([paths.module, paths.config, paths.scripts])
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist.scripts));
});

gulp.task('less', function() {
    gulp
        .src(paths.styles)
        .pipe(less({
            paths: [
                '.',
                './node_modules/bootstrap-less',
                './node_modules/font-awesome'
            ]
        }))
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(gulp.dest(dist.styles));
});

gulp.task('htmlmin', function() {
    gulp
        .src(paths.index)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dist.main));
});

gulp.task('views', function() {
    gulp
        .src(paths.views)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dist.views));
});

gulp.task('fonts', function() {
    gulp
        .src(paths.fonts)
        .pipe(gulp.dest(dist.fonts));
});

gulp.task('images', function() {
    gulp
        .src(paths.images)
        .pipe(imageop({
            optimizationLevel: 5,
            progressive: true
        }))
        .pipe(gulp.dest(dist.images));
});

gulp.task('watch', function() {
    gulp.watch(paths.index, ['htmlmin']);
    gulp.watch(paths.styles, ['less']);
    gulp.watch(paths.watchScript, ['lint', 'scripts']);
    gulp.watch(paths.views, ['views']);
});

gulp.task('default', ['vendorScripts', 'images', 'fonts', 'lint', 'scripts', 'less', 'views', 'htmlmin', 'watch']);