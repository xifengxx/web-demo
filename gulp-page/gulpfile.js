//导入你所需要用的工具包 require('node_modules里对应模块')
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    del  = require('del'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');



// sass 任务
gulp.task('sass', ['clean'], function(){
    return gulp.src('./src/sass/*.scss')      //获取该任务需要的文件
        .pipe(sass())                  //该任务调用的模块
        .pipe(gulp.dest('./dist/css')) 
})

// 压缩css
gulp.task('minify_css',['clean'],function(){
	return gulp.src('./dist/css/*.css')
		.pipe(concat('all.css'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(rename({suffix:'.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('./dist/'))
})

//压缩js
gulp.task('minify_js',['clean'],function(){
	return gulp.src('./src/scripts/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('./dist'))
})

// 默认任务
gulp.task('default',['sass','minify_css','minify_js','watch']);
// gulp.task('default',['sass', 'watch1'],function(){})

// 执行压缩前，先删除以前压缩的文件：
gulp.task('clean',function(){
  return del(['./dist/css/all.css','./dist/all.min.css','./dist/js/all.js','./dist/all.min.js']);
})

//监听文件
gulp.task('watch', ['clean'], function(){
    return gulp.watch('./src/sass/*.scss',['sass']);
    //监听 ./src/sass/*.scss 文件，修改时自动执行 sass 任务。
});