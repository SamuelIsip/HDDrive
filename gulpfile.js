"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

gulp.task("sass", () =>
  gulp.src("./scss/*.scss").pipe(sass()).pipe(gulp.dest("./css"))
);
