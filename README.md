# 在线学习平台Web客户端

### 技术栈
```
vue2 + vuex + vue-router
ElementUI + webpack + ES6/7 + axios
fontawesome + less
```

### 项目运行
#### 注意：由于涉及大量的 ES6/7 等新属性，node 需要 6.0 以上版本
```
git clone https://github.com/MemoryDewey/online-study-web
cd online-study-web
npm install
npm run server
```
### 项目布局
```
.
│  .browserslistrc                  // 目标浏览器配置
│  .env                             // 环境变量配置
│  babel.config.js                  // babel配置
│  package.json                     // 配置文件
│  postcss.config.js                // css转换配置
│  vue.config.js                    // Vue-cli3 配置文件
│  
├─public                            // 公共文件
│      favicon.ico                  // 图标
│      index.html                   // 入口html文件
│      
└─src                               // 源码目录
    │  App.vue                      // 页面入口文件
    │  main.js                      // 程序入口文件，加载各种公共组件
    │  router.js                    // 路由配置
    │  store.js                     // vuex状态管理
    │  
    ├─api                           // API接口
    │      course-manage.js         // 课程管理API
    │      course.js                // 课程相关API
    │      passport.js              // 登录注册API
    │      point-mall.js            // 积分商城API
    │      profile.js               // 个人信息API
    │      shipping-address.js      // 地址管理API
    │      wallet.js                // 钱包API
    │      
    ├─assets                        // 资源目录
    │  ├─css                        // 样式目录
    │  └─image                      // 图片目录
    │          
    ├─components                    // 组件
    │      CountDown.vue            // 倒计时组件
    │      CourseBread.vue          // 面包屑导航组件
    │      CourseWare.vue           // PDF组件
    │      Footer.vue               // 页脚组件
    │      Header.vue               // 页头组件
    │      LoginForm.vue            // 登录表单组件
    │      RegisterForm.vue         // 注册表单组件
    │      
    ├─icons                         // 图标目录
    │      font-awesome.js          // FontAwesome图标库组件
    │      
    ├─utils                         // 工具目录
    │      request.js               // 封装请求文件
    │      
    └─views                         // 页面目录
        │  404.vue                  // 404页面
        │  About.vue                // 关于我们
        │  Home.vue                 // 首页
        │  PointsMall.vue           // 积分商城
        │  ResetPassword.vue        // 重置密码
        │  Wallet.vue               // 我的钱包
        │  
        ├─profile                   // 个人中心页面
        │      Certificate.vue      // 证书
        │      Collection.vue       // 收藏
        │      Course.vue           // 课程
        │      Exam.vue             // 考试
        │      index.vue            // 个人中心框架
        │      Invite.vue           // 邀请
        │      LatestBrowse.vue     // 浏览
        │      PaidNote.vue         // 支付信息
        │      Personal.vue         // 个人信息
        │      
        ├─student                   // 学生课程页面
        │      CourseExam.vue       // 课程考试
        │      CourseExercise.vue   // 课后测验
        │      index.vue            // 学生课程页面框架
        │      InfoComment.vue      // 评论信息
        │      InfoFile.vue         // 文件信息
        │      Information.vue      // 课程信息
        │      InfoVideo.vue        // 视频信息
        │      List.vue             // 课程列表
        │      ListHeader.vue       // 列表头
        │      Video.vue            // 视频页
        │      
        └─teacher                   // 老师课程管理页面
                ChapterManage.vue   // 章节管理
                CourseManage.vue    // 课程管理
                ExamManage.vue      // 试题管理
                FileManage.vue      // 文件管理
                index.vue           // 管理页面框架
                LiveManage.vue      // 直播管理
                PDFMange.vue        // PDF管理
                StudentManage.vue   // 学生管理
                VideoManage.vue     // 视频管理
```
### 其他版本

1、 移动Web端[项目地址](https://github.com/MemoryDewey/online-study-mobile-web)

2、 Flutter端[项目地址](https://github.com/MemoryDewey/flutter_online_learning)

### 说明
> 如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

> 开发环境为 Windows10 1909 Chrome79 Nodejs 13.7.0 
### 效果演示
[地址在这里](http://47.102.97.205).
