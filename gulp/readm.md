## gulp Api

### gulp.task()
```js
// 创建一个基于流的任务
gulp.task('task-name', handler)
```

### gulp.src()
```js
// 找到源文件
gulp.src(url)

// eg:
gulp.src('./about/index.html')
gulp.src('./about/*.html')
gulp.src('./about/**')
gulp.src('./about/**/*')
gulp.src('./about/**/*.html')
```

### gulp.dest()
```js
// 把一个内容放到到指定目录下
gulp.dest(url)
```

### gulp.watch()
```js
// 监控指定目录下的文件，一旦发生变化，就执行后面的任务
gulp.watch(url, handler)
```

### gulp.series()
```js
// 逐个执行多个任务  【串行】
gulp.series(task1, task2, task3, ...)
```

### gulp.parallel()
```js
// 并行开始多个任务  【并行】
gulp.parallel(task1, task2, task3, ...)
```

### pipe()
```js
// eg:
gulp.src().pipe().pipe()...
```