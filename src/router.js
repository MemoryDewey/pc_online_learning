import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import {checkLogin} from '@/api/passport'
import {checkApply} from "@/api/course";


Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        //课程
        {
            path: '/course', name: 'Course', redirect: {name: 'CourseList'},
            component: () => import( '@/views/student'),
            children: [
                {
                    path: 'list', name: 'CourseList',
                    component: () => import( '@/views/student/List'),
                    meta: {title: '在线学习'}
                },
                {
                    path: 'list/:search',
                    name: 'CourseListSearch',
                    component: () => import( '@/views/student/List'),
                    meta: {title: '在线学习'}
                },
                {
                    path: ':id',
                    name: 'CourseVideo',
                    component: () => import( '@/views/student/Video'),
                    meta: {title: '课程视频', requireAuth: true},
                    beforeEnter(to, from, next) {
                        checkApply({id: to.params.id}).then(res => {
                            if (res.code === 1000) next();
                            else next('/404');
                        }).catch(() => {
                            next(false);
                        });
                    }
                },
                {
                    path: ':id/exam',
                    name: 'CourseExam',
                    component: () => import( '@/views/student/CourseExam'),
                    meta: {title: '期末测验', requireAuth: true}
                },
                {
                    path: ':id/information',
                    name: 'CourseInformation',
                    component: () => import( '@/views/student/Information'),
                    meta: {title: '课程信息'}
                }
            ],
            beforeEnter(to, from, next) {
                if (store.state.isTeacher) next('/teacher/course/student');
                else {
                    checkLogin().then((res) => {
                        if (res.level === 1) next('/teacher/course/student');
                        else next();
                    }).catch(() => {
                        next();
                    });
                }
            }
        },

        //课程管理
        {
            path: '/teacher/course', name: 'TeacherCourse', redirect: {name: 'CSM'},
            component: () => import( '@/views/teacher'),
            children: [
                {
                    path: 'student',
                    name: 'CSM',
                    component: () => import( '@/views/teacher/StudentManage'),
                    meta: {title: '学生管理'}
                },
                {
                    path: 'list',
                    name: 'CM',
                    component: () => import( '@/views/teacher/CourseManage'),
                    meta: {title: '课程管理'}
                },
                {
                    path: 'chapter',
                    name: 'CCM',
                    component: () => import( '@/views/teacher/ChapterManage'),
                    meta: {title: '章节管理'}
                },
                {
                    path: 'video',
                    name: 'CVM',
                    component: () => import( '@/views/teacher/VideoManage'),
                    meta: {title: '视频管理'}
                },
                {
                    path: 'live',
                    name: 'CLM',
                    component: () => import( '@/views/teacher/LiveManage'),
                    meta: {title: '直播管理'}
                },
                {path: 'pdf', name: 'CPM', component: () => import( '@/views/teacher/PDFMange'), meta: {title: '课件管理'}},
                {
                    path: 'file',
                    name: 'CFM',
                    component: () => import( '@/views/teacher/FileManage'),
                    meta: {title: '资料管理'}
                },
                {
                    path: 'exam',
                    name: 'CEM',
                    component: () => import( '@/views/teacher/ExamManage'),
                    meta: {title: '试卷管理'}
                }
            ],
            beforeEnter(to, from, next) {
                if (store.state.isTeacher) next();
                else {
                    checkLogin().then((res) => {
                        if (res.level === 1) next();
                        else next('/404');
                    }).catch(() => {
                        next('/404');
                    });
                }
            }
        },

        //重置密码
        {
            path: '/reset-password',
            name: 'ResetPassword',
            component: () => import( '@/views/ResetPassword'),
            meta: {title: '重置密码'}
        },

        //主页
        {
            path: '/', name: 'Index', component: () => import('@/views/Home'),
            meta: {title: "区块链在线学习平台"},
            beforeEnter(to, from, next) {
                if (store.state.isTeacher) next('/teacher/course/student');
                else {
                    checkLogin().then((res) => {
                        if (res.level === 1) next('/teacher/course/student');
                        else next();
                    }).catch(() => {
                        next();
                    });
                }
            }
        },

        //关于我们
        {
            path: '/about', name: 'About', component: () => import('@/views/About'),
            meta: {title: '关于我们'}
        },

        //个人中心
        {
            path: '/profile', name: 'Profile', redirect: {name: 'personal'},
            component: () => import( '@/views/profile'),
            children: [
                {
                    path: 'personal',
                    name: 'personal',
                    component: () => import( '@/views/profile/Personal'),
                    meta: {title: '个人信息', requireAuth: true}
                },
                {
                    path: 'paid',
                    name: 'paid',
                    component: () => import( '@/views/profile/PaidNote'),
                    meta: {title: '已购课程', requireAuth: true}
                },
                {
                    path: 'course',
                    name: 'course',
                    component: () => import( '@/views/profile/Course'),
                    meta: {title: '我的课程', requireAuth: true}
                },
                {
                    path: 'exam',
                    name: 'exam',
                    component: () => import( '@/views/profile/Exam'),
                    meta: {title: '我的考试', requireAuth: true}
                },
                {
                    path: 'invite',
                    name: 'invite',
                    component: () => import('@/views/profile/Invite'),
                    meta: {title: '邀请好友', requireAuth: true}
                },
                {
                    path: 'certificate',
                    name: 'certificate',
                    component: () => import( '@/views/profile/Certificate'),
                    meta: {title: '我的证书', requireAuth: true}
                },
                {
                    path: 'latest-browse', name: 'browse',
                    component: () => import('@/views/profile/LatestBrowse'),
                    meta: {title: '最近浏览', requireAuth: true}
                },
                {
                    path: 'collection', name: 'collection',
                    component: () => import('@/views/profile/Collection'),
                    meta: {title: '收藏课程', requireAuth: true}
                }
            ]
        },

        //钱包
        {
            path: '/wallet', name: 'Wallet',
            component: () => import('@/views/Wallet'),
            meta: {title: '我的钱包', requireAuth: true},
        },

        //积分商城
        /*{path: '/points-mall', name: 'PointsMall', component: () => import('@/views/student/PointsMall'), meta: {title: '积分商城'}, requireAuth: true},*/

        //404
        {
            path: '/404', name: 'Error',
            component: () => import('@/views/404'), meta: {title: '错误'}
        }
    ]
})
