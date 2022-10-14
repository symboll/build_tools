
# webpack5

#### 常用钩子
```js
environment  |  环境准备好              SyncHook
compile      |  编程开始                SyncHook
compilation  |  编程结束                SyncHook
emit         |  打包资源到 output 之前   AsyncSeriesHook
afterEmit    |  打包资源到 output 之后   AsyncSeriesHook
done         |  打包完成                SyncHook
```

## loader & plugin
### miniCssExtractPlugin [css]
`将css打包到独立文件中`
```js
- remove style-loader
- use:

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contentHash:8].css'
    }),
  ],
  module: {
    rules: [
      { 
        test: /\.css$/i,
        // 'style-loader', 'css-loader', 'postcss-loader',
        MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader',
      }
    ]
  }
```

### css module
`modify webpack modules rules css-loader options`
```js
{
  test: /\.css$/i,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[path][name]__[local]--[hash:base64:5]'
        }
      }
    },
    'postcss-loader',
  ]
}
```

### postcss-loader autoprefixer
`配置css样式前缀`
```js
// 新建 `postcss.config.js`
module.exports = {
  plugins: [
    require('autoprefixer'),
  ],
}
```
```js
// 新建 .browserslistrc
> 1%
last 2 versions
not dead
```

### stylelint  stylelint-config-standard stylelint-webpack-plugin

`配置css代码校验`
```js
new StylelintWebpackPlugin({
  files: ['src/**/*{css,less,scss,sass,vue}']
}),
```
```js
// 新建 .stylelintrc
{
  "extends": "stylelint-config-standard",
  "rules": {}
}
```
### optimize-css-assets-webpack-plugin
`压缩css` **推荐使用css-minimizer-webpack-plugin**
```js
plugins: [
  new OptimizeCssAssetsPlugin()
]
```

### babel-loader @babel/core @babel/preset-env
**preset 转译的规则集**
- @babel/preset-env 只能转译基本语法，Promise不能转译
- @babel/polyfill 转译所有js新语法
- core-js 按需转译 js新语法
```js
{
  useBuiltIns: 'usage', // 按需转译
  corejs: 3,            // 指定版本
}
```

### eslint eslint-config-airbnb-base eslint-plugin-import eslint-webpack-plugin

**eslint:** `eslint --init .eslintrc.{js, yml, json}`
**eslint-webpack-plugin:** `webpack的eslint插件`
<!-- 
**eslint-config-airbnb-base:**
**eslint-plugin-import:** `用于在package.json中获取eslintConfig配置项` 
-->

### tslint
```Shell
tsc --init  => generator file tsconfig.json
```

### file-loader url-loader html-loader
```js
- file-loader: 将用到的图片复制到输出目录，过滤掉不用的图片
- url-loader: 如果图片小于配置大小，会转成base64
- html-loader: 解决html中资源的加载问题，exports HTML as string
```


## Code Splitting

### HOW
- 多入口打包： 配置entry 加载多个入口文件
- 提取共用模块： optimization.splitChunks.chunks: all
- 动态导入： 按需加载 | 预加载

### 懒加载
- 默认不加载，事件触发加载
- webpackChunkName: '加载名字'

### 预加载
- 先等其他资源加载，浏览器空闲时，再加载
- webpackPrefetch: true
- 缺点：在移动端有兼容性问题
**Question:** `在点击按钮后 又加载一次`



## devtool
- webpack4 11种
- webpack4 26种


## Tree Shaking
`作用：删除未引用的代码`
- return 后面的代码
- 只声明，未使用的函数
- 只引入，未使用的代码

#### 前提： 
使用`ES Module`规范的代码，才能执行`Tree Shaking`。因为：`Tree Shaking`依赖`ES Module`的静态语法分析。

#### 实现方式：
- 生产模式： 自动开启
- 开发模式：

##### 1. usedExports
```js
  optimization: {
    /**
     * 标记未被使用的代码
     * unused harmony export xxxx
     */
    usedExports: true,  

    /**
     * 删除 被标记[unused harmony export xxxx]的代码
     */
    minimize: true,
    /**
     * TerserPlugin 删除无用代码
     * [webpack4 需要单独安装]，[webpack5 不需要单独安装]
     */
    minimizer: [new TerserPlugin()],
  }
```

##### 2. SideEffects [副作用]
- 无副作用：如果一个模块单纯的导入导出变量，那它就是无副作用
- 有副作用：如果一个模块还修改其他模块或者全局变量的一些东西，就是有副作用
`修改全局变量`, `在原型上扩展方法`, `css的引入`

- 作用： 把未使用但无副作用的模块一并删除

### Tree Shaking 与 Source Map 存在兼容性问题
`devtool: source-map| inline-source-map | hidden-source-map| nosources-source-map`




