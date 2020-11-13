//gulpfile.babel.js
import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";
import del from "del";

sass.compiler = require("node-sass");

const paths = {
    styles: {
        src: "src/styles/styles.scss",
        dest: "src",
        watch: "src/styles/*.scss",
    },
};

const clean = () => del(["static"]);

const styles = () =>
    gulp
        .src(paths.styles.src)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.styles.dest));

const watchFiles = () => {
    gulp.watch(paths.styles.watch, styles);
};

const dev = gulp.series(clean, styles, watchFiles);

export const build = gulp.series(clean, styles);

export default dev;
