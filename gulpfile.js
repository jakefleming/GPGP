var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    browserSync     = require('browser-sync'),
    autoprefixer    = require('gulp-autoprefixer'),
    uglify          = require('gulp-uglify'),
    jshint          = require('gulp-jshint'),
    header          = require('gulp-header'),
    rename          = require('gulp-rename'),
    minifyCSS       = require('gulp-minify-css'),
    nunjucksRender  = require('gulp-nunjucks-render'),
    data            = require('gulp-data'),
    concat          = require('gulp-concat'),
    package         = require('./package.json');


var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');

var config = {
  jsPaths: [
    'src/js/vendor/modernizr/modernizr.js',
    'src/js/vendor/jquery/jquery.min.js',
    'src/js/vendor/underscore-min.js',
    'src/js/vendor/velocity.min.js',
    'src/js/modules/_config.js',
    'src/js/modules/*',
    'src/js/scripts.js'
  ],
  htmlPaths: [
    'src/templates/*.+(html|nunjucks)'
  ]
};

// De-caching for Data files
function requireUncached( $module ) {
  delete require.cache[require.resolve( $module )];
  return require( $module );
}

gulp.task( 'css', function() {
  return gulp.src('src/scss/style.scss')
  .pipe(sass({errLogToConsole: true}))
  .pipe(autoprefixer('last 4 version'))
  .pipe(gulp.dest('dist/assets/css'))
  .pipe(minifyCSS())
  .pipe(rename({ suffix: '.min' }))
  .pipe(header(banner, { package : package }))
  .pipe(gulp.dest('dist/assets/css'))
  .pipe(browserSync.reload({stream:true}));
});

gulp.task( 'js', function() {
  gulp.src( config.jsPaths )
    .pipe(jshint('.jshintrc'))
    .pipe(concat('scripts.js'))
    .pipe(jshint.reporter('default'))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task( 'browser-sync', function() {
  browserSync.init(null, {
    server: {
      baseDir: "dist"
    }
  });
});

gulp.task( 'html', function() {
  nunjucksRender.nunjucks.configure(['src/templates/']);

  return gulp.src( 'src/templates/layout.html' )
  .pipe( data( function( file ) {
    return requireUncached('./src/templates/objects/objects.json');
  }))
  .pipe(nunjucksRender())
  .pipe(rename({ basename: 'index' }))
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.reload({stream:true}));
});

gulp.task('default', ['css', 'js', 'html', 'browser-sync'], function () {
    gulp.watch("src/scss/*/*.scss", ['css']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("src/templates/**/*.+(html|json)", ['html']);
});
