const gulp = require('gulp')
const cssmin = require('gulp-cssmin')
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')(require('sass'));

const uglify = require('gulp-uglify')
const babel = require('gulp-babel')

const htmlmin = require('gulp-htmlmin')
const fileInclude = require('gulp-file-include')

const del = require('del')

const webserver = require('gulp-webserver')
// const { deleteSync } = require('del')

// gulp@3
// gulp.task('cssHandler', function () {
//   return gulp
//     .src('./src/style/*.css')
//     .pipe(cssmin())
//     .pipe(gulp.dest('./dist/style'))
// })

// gulp@4
const cssHandler = () => {
  return gulp
    .src('./src/style/*.css')
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/style'))
}

const sassHandler = () => {
  return gulp
    .src('./src/style/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/style'))
}

const jsHandler = () => {
  return gulp
    .src('./src/script/*.js')
    .pipe(babel({
      presets: ['@babel/env'],
      plugins: [
        ["@babel/plugin-proposal-decorators", { "legacy": true }]
      ]
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/script'))
}


const htmlHandler = () => {
  return gulp
    .src('./src/pages/*.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: './src/components'
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,    // 移除空格
      removeEmptyAttributes: true, // 移除空的属性
      collapseBooleanAttributes: true,  // 移除boolean值的value eg: <input checked="checked"> => <input checked>
      removeAttributeQuotes: true,    // 移除单个value的双引号 eg: <input  type="checkbox" > => <input type=checkbox>
      minifyCSS: true,   // 压缩内嵌css  [只能压缩，不能自动添加前缀]
      minifyJS: true,    // 压缩内嵌js   [只能压缩，不能转码，不认识es6]
      removeStyleLinkTypeAttributes: true,  //移除style/link标签的 type属性
      removeScriptTypeAttributes: true,     //移除script标签的 type属性
    
    }))
    .pipe(gulp.dest('./dist/pages'))
}


const assetsHandler = () => {
  return gulp
    .src('./src/assets/**/*')
    .pipe(gulp.dest('./dist/assets'))
}

const delHandler = () => del(['./dist'])

const serverHandler = () => {
  return gulp
    .src('./dist')
    .pipe(webserver({
      host: 'localhost',
      port: '8080',
      livereload: true,
      open: './pages/index.html',
      proxies: [
        {
          source: '/dt',
          target: 'https://www.duitang.com'
        }
      ]
    }))
}


const watchHandler = () => {
  gulp.watch('./src/style/*.scss', sassHandler)
  gulp.watch('./src/style/*.css', cssHandler)
  gulp.watch('./src/script/**', jsHandler)
  gulp.watch('./src/pages/**', htmlHandler)
  gulp.watch('./src/assets/**', assetsHandler)
  gulp.watch('./src/components/**', htmlHandler)
}

const build = () => gulp.series(
  delHandler,
  gulp.parallel(
    cssHandler,
    sassHandler,
    jsHandler,
    htmlHandler,
    assetsHandler
  ),
  serverHandler,
  watchHandler
)

module.exports = {
  default: build()
}
