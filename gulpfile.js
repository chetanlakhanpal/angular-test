const gulp          = require('gulp');
const notify        = require('gulp-notify');
const source        = require('vinyl-source-stream');
const babelify      = require('babelify');
const ngAnnotate    = require('browserify-ngannotate');
const browserSync   = require('browser-sync').create();
const rename        = require('gulp-rename');
const templateCache = require('gulp-angular-templatecache');
const uglify        = require('gulp-uglify');
const merge         = require('merge-stream');
const browserify    = require('browserify');

// Where our files are located
const jsFiles   = "js/**/*.js";
const viewFiles = "views/**/*.html";


const interceptErrors = function(error) {
  const args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};



gulp.task('browserify', ['views'], function() {
  return browserify('./js/app.js')
      .transform(babelify, {presets: ["es2015"]})
      .transform(ngAnnotate)
      .bundle()
      .on('error', interceptErrors)
      //Pass desired output filename to vinyl-source-stream
      .pipe(source('main.js'))
      // Start piping stream to tasks!
      .pipe(gulp.dest('./build/'));
      // .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function() {
  return gulp.src("index.html")
      .on('error', interceptErrors)
      .pipe(gulp.dest('./build/'));
});

gulp.task('views', function() {
  return gulp.src(viewFiles)
      .pipe(templateCache({
        standalone: true
      }))
      .on('error', interceptErrors)
      .pipe(rename("app.templates.js"))
      .pipe(gulp.dest('./src/js/config/'));
});

// This task is used for building production ready
// minified JS/CSS files into the dist/ folder
gulp.task('build', ['html', 'browserify'], function() {
  var html = gulp.src("build/index.html")
                 .pipe(gulp.dest('./dist/'));

  var js = gulp.src("build/main.js")
               .pipe(uglify())
               .pipe(gulp.dest('./dist/'));

  return merge(html,js);
});

gulp.task('test', function(){
  return ;
});

gulp.task('default', function() {

  browserSync.init(['./build/**/**.**'], {
    server: "./build",
    port: 4000,
    notify: true,
    ui: {
      port: 4001
    }
  });

  // gulp.watch("index.html", ['html']);
  // gulp.watch(viewFiles, ['views']);
  gulp.watch(jsFiles, ['test']);
  // gulp.watch(jsFiles, ['browserify']);
});
