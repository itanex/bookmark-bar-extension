const gulp = require('gulp');
const sass = require('gulp-sass');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('typescript', () =>{
    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(gulp.dest('./dist/scripts'))
});

gulp.task('sass', () => {
    return gulp.src("./src/styles/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/styles"))
});

gulp.task('copy-html', function () {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-manifest', function () {
    return gulp.src('./src/manifest.json')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('start', gulp.series('sass', function () {
    gulp.watch("./src/styles/*.scss", gulp.series('sass'));
    gulp.watch("./src/scripts/*.ts", gulp.series('typescript'));
    gulp.watch("./src/*.html", gulp.series('copy-html'));
    gulp.watch("./src/manifest.json", gulp.series('copy-manifest'));
}));

gulp.task('default', gulp.series('start'));
