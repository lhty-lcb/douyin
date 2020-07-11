// src()：找文件
// pipe()：做什么
// dest()：写入文件
// parallel()：用来执行多个任务（一起执行）
// series()：用来执行多个任务（逐个执行）

// 导入gulp
const gulp = require('gulp');
// 导入del
const del = require('del');
// 导入gulp-autoprefixer
const autoprefixer = require('gulp-autoprefixer');
// 导入css压缩工具
const cssmin = require('gulp-cssmin');
// 导入htmlmin
const htmlmin = require('gulp-htmlmin');
// 导入js的转语法工具
const babel = require('gulp-babel');
// 导入js的压缩工具
const uglify = require('gulp-uglify');
// 导入服务器开启工具
const webserver = require('gulp-webserver');
// 导入转义sass的工具
const scss = require('gulp-sass');

// 关于interface的移动规则
const intHandler = () => {
    return gulp.src('./src/interface/**')
        .pipe(gulp.dest('./dist/interface'));
}
// 关于lib的移动规则
const libHandler = () => {
    return gulp.src('./src/lib/**')
        .pipe(gulp.dest('./dist/lib'));
}
// 关于text的移动规则
const textHandler = () => {
    return gulp.src('./src/text/**')
        .pipe(gulp.dest('./dist/text'));
}
// 关于img的移动规则
const imagesHandler = () => {
    return gulp.src('./src/images/**')
        .pipe(gulp.dest('./dist/images'));
}
// 关于删除的规则
const delHandler = () => {
    return del(['./dist'])
}
// 关于css的压缩规则
const cssHandler = () => {
    return gulp.src('./src/css/*.css')
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'));
}
// 关于sass的压缩规则
const sassHandler = () => {
    return gulp.src('./src/sass/*.scss')
        .pipe(scss())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'));
}
const htmlHandler = () => {
    return gulp.src('./src/pages/*.html')
        .pipe(htmlmin({
            // 移除所有属性引号
            // 移除所有注释
            // 移除所有空格
            // 压缩页面里的css
            // 压缩页面里的js
            removeAttritubeQuotes: true, removeComments: true
            , collapseWhitespace: true
            , minifyCSS: true
            , minifyJS: true
            , collapseBooleanAttributes: true
        }))
        .pipe(gulp.dest('./dist/pages'));
}
const jsHandler = () => {
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
}

const webserverHandler = () => {
    return gulp.src('./dist')
        .pipe(webserver({
            port: 8090,//端口号
            open: './pages/index.html',//默认首页
            livereload: true,//自动刷新
            // proxies: [
            //     {
            //         source: '/abc',
            //         target: 'http://127.0.0.1/json.php'
            //     }
            // ]
        }))
}

const watchHandler = () => {
    gulp.watch('./src/css/*.css', cssHandler);
    gulp.watch('./src/js/*.js', jsHandler);
    gulp.watch('./src/pages/*.html', htmlHandler);
    gulp.watch('./src/images/**', imagesHandler);
    gulp.watch('./src/sass/*.scss', sassHandler);
}

module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(libHandler, imagesHandler, sassHandler, cssHandler, jsHandler, htmlHandler,intHandler,textHandler),
    webserverHandler,
    watchHandler
)