var gulp = require('gulp');
// gulp.task("default", function() {
// 	console.log(" hi this is gulp test");
// 	gulp.src('js/*.js').pipe(gulp.dest("dist/js"));

// });
// var uglify = require("gulp-uglify");
// gulp.task("minjs", function() {
// 	gulp.src("js/*.js").pipe(uglify()).pipe(gulp.dest("dist/min/js"));
// });
// var mincss = require("gulp-minify-css");
// gulp.task("mincss", function() {
// 	gulp.src("css/*.css").pipe(mincss()).pipe(gulp.dest("dist/min/css"));
// });
// var minhtml = require("gulp-minify-html");
// gulp.task("minhtml", function() {
// 	gulp.src("*.html").pipe(minhtml()).pipe(gulp.dest("dist/min"));
// });

// var minimg = require("gulp-imagemin");
// var pngquant = require('imagemin-pngquant');
// gulp.task("minimg", function() {
// 	gulp.src("images/**").pipe(minimg({
// 		progressive: true,
// 		use: [pngquant()]
// 	})).pipe(gulp.dest("dist/min/images"));
// });
// /**
//  * 压缩文件发布
//  */
// gulp.task("minbuild", ["mincss", "minhtml", "minjs", "minimg"]);
/** 
 * 项目拷贝发布
 */
gulp.task("build", function() {
	gulp.src("images/**").pipe(gulp.dest("dist/images"));
	gulp.src("js/*.js").pipe(gulp.dest("dist/js"));
	gulp.src("*.html").pipe(gulp.dest("dist"));
	gulp.src("css/*.css").pipe(gulp.dest("dist/css"));
	gulp.src("readme.txt").pipe(gulp.dest("dist"));
});
// /**
//  * 项目清理
//  */
// var clean = require('gulp-clean');
// gulp.task("clean", function() {
// 	gulp.src("dist",{read:false}).pipe(clean());
// });
// /** 
//  * less 相关任务
//  * @type {[type]}
//  */
// var less = require("gulp-less");
// gulp.task('less', function() {
// 	gulp.src('less/*.less')
// 		.pipe(less())
// 		.pipe(gulp.dest('css'));
// });

// gulp.task('watch', function() {
// 	gulp.watch('less/*.less', ['less']);
// });