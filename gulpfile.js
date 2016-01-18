const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
//const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
//const tslint = require('gulp-tslint');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const tsconfig = require('tsconfig-glob');

// clean the contents of the distribution directory
gulp.task('clean', function () {
    return del('dist/**/*');
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function () {
<<<<<<< HEAD
    return gulp.src(['src/app/**/*', 'src/index.html', 'src/styles.css', '!src/app/**/*.ts'], { base: './src' })
=======
    return gulp.src(['src/app/**/*', 'src/index.html', 'src/styles/*','src/images/*', '!src/app/**/*.ts'], { base: './src' })
>>>>>>> 2f3ef14ae590ebfc04493ce9399b6f831d5bd2f6
      .pipe(gulp.dest('dist'))
});

// copy dependencies
gulp.task('copy:libs', ['clean'], function () {
    return gulp.src([
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/router.dev.js',
        'node_modules/node-uuid/uuid.js',
        'node_modules/immutable/dist/immutable.js'
    ])
      .pipe(gulp.dest('dist/lib'))
});

//// linting
//gulp.task('tslint', function () {
//    return gulp.src('app/**/*.ts')
//      .pipe(tslint())
//      .pipe(tslint.report('verbose'));
//});


// TypeScript compile
gulp.task('compile1', ['clean'], function () {
    return gulp
      .src(tscConfig.files)
      .pipe(sourcemaps.init())
      .pipe(typescript(tscConfig.compilerOptions))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/app'));
});
<<<<<<< HEAD
gulp.task('compile', ['clean'], function () {
   var ts = typescript.createProject('tsconfig.json');
   var tsResult = ts.src() // instead of gulp.src(...) 
		.pipe(typescript(ts));
    return tsResult.js
      .pipe(typescript(ts))
      .pipe(sourcemaps.init())
      .pipe(typescript(tscConfig.compilerOptions))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/app'));
});
// TypeScript compile
gulp.task('compile', ['clean'], function () {
    var tsProject = typescript.createProject("tsconfig.json");
    var files = tsProject.src().pipe(typescript(tsProject));
    return files.js      
      .pipe(sourcemaps.init())
     // .pipe(typescript(tscConfig.compilerOptions))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/app'));
});

// update the tsconfig files based on the glob pattern
gulp.task('tsconfig-glob', function () {
    return tsconfig({
        configPath: '.',
        indent: 2
    });
});

// Run browsersync for development
gulp.task('serve', ['build'], function () {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch(['app/**/*', 'index.html', 'styles.css'], ['buildAndReload']);
});

gulp.task('build', [ 'compile', 'copy:libs', 'copy:assets']);
gulp.task('buildAndReload', ['build'], reload);
gulp.task('default', ['build']);