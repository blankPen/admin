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
- 1.每个路由都可配置onEnter参数，当进入此路由会触发，通常用来做权限拦截等
- 2.asyncLoader 异步加载组件，每个模块异步加载，减少首屏加载体积（具体使用看代码）

#### src/styles
公用样式目录，
theme.less 中映入常用mixins和公用变量。
> 注意在antd-theme.js中会对所有less文件变量进行覆盖，
app.less 全局样式文件



#### src/common/Img
图片应用，所有图片引用的地方都使用Img组件
```
<Img src='xxx' preview={false} />
// preview: 是否开启预览功能 默认false
```

引用本地src/images文件夹内资源时以images问根目录开始引用
> 如：src/images/home/logo.jpg => <Img src='./home/logo.jpg' />

引用网路图片
src是http开头的 路径不会呗改变
src是/开头的会加上 文件服务器地址**IMG_SERVER**(在Img/index.jsx中配置)

如果需要添加自定义规则 请在Img/index.jsx中修改 **getRealPath** 方法

#### src/components/Page
页面组件，为了方便统一样式，请所有路由页面都使用Page封装
使用方法参考**/product/sale**

#### src/components/SearchBar
搜索栏组件，主要用于规范样式风格，建议每个列表页面上的搜索选项都用SearchBar包裹，
具体使用请看**/product/sale**

#### 关于菜单Menu配置
目前菜单数据是客户端写死的，用setTimeout模拟的异步获取菜单数据，具体请看actions/commonAction.jsx
如果需要改成后台配置，请在getMenuData方法中ajax请求数据并且dispatch到状态树中，
注意数据格式不可变，如果格式不一致请转换后再dispatch




## VForm详解
VForm是基于antd的Form组件进行的扩展，在原基础上进行了一些扩展，方便开发使用。
在src/common/VForm/VForm-register.jsx 中 可自行注册验证方案，及验证方案组合

开发实例请看工程/src/components/demo/form
[http://localhost:8001/#/demo/form](http://localhost:8001/#/demo/form)

#### VForm.Item 参数详解
每个Item下最多只能有一个表单组件，且必须给表单组件传入name属性
```
// 正确
<FormItem>
    <Input name='name1' />
</FormItem>

// 错误
<FormItem>
    <Input name='name1' />
    <Input name='name2' />
</FormItem>

// Input将不可控，获取不到Input的值
<FormItem>
    <Input />
</FormItem>
```
Item完全继承原antd组件属性，[可在此查看](https://ant.design/components/form/#Form.Item)
```
{
    // 定义验证规则对象
    rules: React.PropTypes.object,
    // 定义的规则组名称，传入的规则组必须在VForm-resgiter.jsx中注册
    ruleType: React.PropTypes.string,
    // 被控表单组件的值的属性，如 Checkbox 的是 'checked',默认是value，一般不用传
    valuePropName: React.PropTypes.string,
    // 被控表单组件初始值
    initialValue: React.PropTypes.any,
    // 验证被控组件的时机，默认 onChange
    validateTrigger: React.PropTypes.string,
    // 组件value类型，默认string，针对特殊组件如 TreeSelect等多选组件，可传入 array ,返回类型则是数组类型
    valueType: React.PropTypes.string,

    ...antd其他属性
}
```
#### 已有的验证规则
> 见文件 src/common/VForm/VForm.jsx
变量 const METHODS = { ... }

#### 如何注册验证规则及规则组
打开文件 src/common/VForm/VForm-register.jsx
添加代码

```
// 用户名验证
Form.registRuleType('username',{
    required: '账号不能为空',
    validator: function(rule,value,call){
        if(){

    }
    }
})


// 密码验证
Form.registRuleType('password',{
    required: '密码不能为空',
    minLength: { value: 6,errorMsg: '密码长度不低于6位' },
    // password: "密码格式不正确",/*(6~14位字母与数字的组合)*/
})



```




## Table详解
Table组件由表格和分页器两部分组成

具体使用看 /src/components/demo/table
[http://localhost:8001/#/demo/table](http://localhost:8001/#/demo/table)
```
    <Table
        rowKey = "goodsId"
        className = 'product-table'
        rowSelection = {{
            selectedRowKeys,
            onChange: this.onSelectChange,
        }}
        options={this.props.options}
        columns = {this.columns }
        dataSource = {this.props.dataSource || [] }
        pagination = {this.getPagination() }
        loading = {loading }
    />
```
#### 参数
具体参数查看 [API](https://ant.design/components/table/#API)

关键参数 | 作用 | 默认
---|---|---
rowKey | 必传，循环数据的唯一字段名，一般为id | -
columns | 表格列的配置描述，[查看详情](https://ant.design/components/table/#Column)| -
dataSource | 数据源 | -
options | 单行操作列表 如：[{ title:'查看',onClick:this.handleCheck }] | []
pagination | 分页器参数 | -


## TreeList详解
树形结构展示组件
具体使用看 /src/components/demo/tree
[http://localhost:8001/#/demo/tree](http://localhost:8001/#/demo/tree)


参数 | 作用 | 默认
---|---|---
rowKey | 必须，循环数据的唯一字段名，一般为id | -
columns | 表格列的配置描述，[查看详情](https://ant.design/components/table/#Column)| -
dataSource | 数组，数据源 | -
renderContent | 必须，自定义渲染主要内容 | function(data){}
onLoadData | 异步加载，点击展开式触发， | function(row,getNewTreeData){}

## Tabs详解
树形结构展示组件
具体使用看 /src/components/demo/tabs
[http://localhost:8001/#/demo/tabs](http://localhost:8001/#/demo/tabs)

```
<div>
    // 不可控tabs
    <Tabs defaultActiveKey='2'>
        <TabPane key='1' tab='TAB 1'>
            tab1...
        </TabPane>
        <TabPane key='2' tab='TAB 2'>
            tab2...
        </TabPane>
        <TabPane key='3' tab='TAB 3'>
            tab3...
        </TabPane>
    </Tabs>
    // 可控tabs
    <Tabs activeKey={this.state.active}
        onChange={(key)=>{
            this.setState({ activeKey:key })
        }>
        <TabPane key='1' tab='TAB 1'>
            tab1...
        </TabPane>
        <TabPane key='2' tab='TAB 2'>
            tab2...
        </TabPane>
        <TabPane key='3' tab='TAB 3'>
            tab3...
        </TabPane>
    </Tabs>
</div>
```
