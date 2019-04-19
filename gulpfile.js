// REQUIRE DOTENV
// to use, create a .env file
require('dotenv').config()


// DEFINING VARIABLES
let gulp = require('gulp')
let sass = require('gulp-sass')
let plumber = require('gulp-plumber')
let autoprefixer = require('gulp-autoprefixer')
let browserSync = require('browser-sync').create()

// TASK FOR BROWSERSYNC
gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: './',
            // directory: true
        }
    })
})

// TASK FOR SASS
gulp.task('sass', () => { // create a gulp task called sass
    return gulp.src('app/scss/**/*.scss')  // tells gulp what files are needed
        .pipe(plumber())
        .pipe(sass()) // sends the files through gulp sass
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css')) // destination of files
        .pipe(browserSync.reload({
            stream: true
        }))
})

// Gulp watch syntax
// gulp.watch('files-to-watch', ['tasks', 'to', 'run']); 

// TASK TO START EVERYTHING
gulp.task('watch', ['browserSync'], () => {
    gulp.watch('app/scss/**/*.scss', ['sass'])
    gulp.watch('app/*.html', browserSync.reload); 
    gulp.watch('app/js/**/*.js', browserSync.reload); 
})