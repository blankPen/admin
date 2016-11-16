# 后台管理系统开发指南

### 工程目录
- cfg 配置文件目录
- dist 打包生成文件目录
- src
    - actions
    - common 公用工具类等
    - components 组件目录
        - Home
            - index.jsx 组件jsx代码
            - index.less 组件样式文件(组件样式文件单独引入)
        - ...
    - images 图片等资源文件
    - reducers
    - stores
    - styles 公用样式文件
- package.json
- server.js node 服务文件
- webpack.config.js webpack配置文件

#### src/index.js
打包入口文件，指定文件渲染容器
#### src/Router.js
路由配置文件，指定不同地址要渲染的组件

注意的点：
    1.每个路由都可配置onEnter参数，当进入此路由会触发，通常用来做权限拦截等
    2.asyncLoader 异步加载组件，每个模块异步加载，减少首屏加载体积（具体使用看代码）

#### src/styles
公用样式目录，
theme.less 中映入常用mixins和公用变量，注意在antd-theme.js中会对所有less文件变量进行覆盖，
app.less 全局样式文件



#### src/common/Img
图片应用，所有图片引用的地方都使用Img组件
<Img src='xxx' preview={false} />
// preview: 是否开启预览功能 默认false

引用本地src/images文件夹内资源时以images问根目录开始引用
如：src/images/home/logo.jpg => <Img src='./home/logo.jpg' />

引用网路图片
src是http开头的 路径不会呗改变
src是/开头的会加上 文件服务器地址IMG_SERVER(在Img/index.jsx中配置)

如果需要添加自定义规则 请在Img/index.jsx中修改 **getRealPath** 方法

#### src/common/VForm
表单解决方案，基于antd重写的一套表单组件
具体使用方法看**/demo/form**
在src/common/VForm/VForm-register.jsx 中 可自行注册验证方案，及验证方案组合

#### src/components/Page
页面组件，为了方便统一样式，请所有路由页面都使用Page封装
使用方法参考**/product/sale**

#### src/components/Tabs
页签组件，使用方法参考**/demo/tabs**

#### src/components/SearchBar
搜索栏组件，主要用于规范样式风格，建议每个列表页面上的搜索选项都用SearchBar包裹，
具体使用请看**/product/sale**

#### 关于菜单Menu配置
目前菜单数据是客户端写死的，用setTimeout模拟的异步获取菜单数据，具体请看actions/commonAction.jsx
如果需要改成后台配置，请在getMenuData方法中ajax请求数据并且dispatch到状态树中，
注意数据格式不可变，如果格式不一致请转换后再dispatch
