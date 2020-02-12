import Vue from 'vue'
import store from '@/store'
//import VueRouter from 'vue-router'

const Index = () => import('@/views/student/Index');
const Wallet = () => import('@/views/student/Wallet');
const Error = () => import('@/views/404');
const About = () => import('@/views/student/About');

const Passport = () => import('@/views/Passport');
const Login = () => import('@/views/passport/Login');
const Register = () => import( '@/views/passport/Register');
const Reset = () => import( '@/views/passport/Reset');

const Course = () => import( '@/views/student/Course');
const CourseList = () => import( '@/components/student/course/List');
const CourseInformation = () => import( '@/components/student/course/Information');
const CourseVideo = () => import( '@/components/student/course/Video');
const CourseExam = () => import( '@/components/student/course/CourseExam');
const CourseWare = () => import( '@/components/student/course/CourseWare');

const PointsMall = () => import('@/views/student/PointsMall');

const Profile = () => import( '@/views/Profile');
const ProfileCourse = () => import( '@/components/profile/Course');
const ProfileCertificate = () => import( '@/components/profile/Certificate');
const ProfileExam = () => import( '@/components/profile/Exam');
const ProfilePersonal = () => import( '@/components/profile/Personal');
const ProfileInvite = () => import('@/components/profile/Invite');
const ProfilePaid = () => import( '@/components/profile/PaidNote');
const ProfileLatestBrowse = () => import('@/components/profile/LatestBrowse');
const ProfileCollection = () => import('@/components/profile/Collection');


const TeacherCourse = () => import( '@/views/teacher/Course');
const CSM = () => import( '@/components/teacher/course/StudentManage');
const CM = () => import( '@/components/teacher/course/CourseManage');
const CCM = () => import( '@/components/teacher/course/ChapterManage');
const CVM = () => import( '@/components/teacher/course/VideoManage');
const CPM = () => import( '@/components/teacher/course/PDFMange');
const CFM = () => import( '@/components/teacher/course/FileManage');
const CLM = () => import( '@/components/teacher/course/LiveManage');
const CEM = () => import( '@/components/teacher/course/ExamManage');

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
            component: Course, children: [
                {path: 'list', name: 'CourseList', component: CourseList, meta: {title: '在线学习'}},
                {path: 'list/:search', name: 'CourseListSearch', component: CourseList, meta: {title: '在线学习'}},
                {
                    path: ':courseID',
                    name: 'CourseVideo',
                    component: CourseVideo,
                    meta: {title: '课程视频', requireAuth: true},
                    beforeEnter(to, from, next) {
                        checkApply({courseID: to.params.courseID}).then(res => {
                            if (res.code === 1000) next();
                            else next('/404');
                        }).catch(()=>{
                            next(false);
                        });
                    }
                },
                {
                    path: ':courseID/exam',
                    name: 'CourseExam',
                    component: CourseExam,
                    meta: {title: '期末测验', requireAuth: true}
                },
                {
                    path: ':courseID/information',
                    name: 'CourseInformation',
                    component: CourseInformation,
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

        //课件
        {
            path: '/course-ware', name: 'CourseWare',
            component: CourseWare, meta: {title: '课件'}
        },

        //课程管理
        {
            path: '/teacher/course', name: 'TeacherCourse', redirect: {name: 'CSM'},
            component: TeacherCourse,
            children: [
                {path: 'student', name: 'CSM', component: CSM, meta: {title: '学生管理'}},
                {path: 'list', name: 'CM', component: CM, meta: {title: '课程管理'}},
                {path: 'chapter', name: 'CCM', component: CCM, meta: {title: '章节管理'}},
                {path: 'video', name: 'CVM', component: CVM, meta: {title: '视频管理'}},
                {path: 'live', name: 'CLM', component: CLM, meta: {title: '直播管理'}},
                {path: 'pdf', name: 'CPM', component: CPM, meta: {title: '课件管理'}},
                {path: 'file', name: 'CFM', component: CFM, meta: {title: '资料管理'}},
                {path: 'exam', name: 'CEM', component: CEM, meta: {title: '试卷管理'}}
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

        //登录注册
        {
            path: '/passport', name: 'Passport', component: Passport, children: [
                {path: 'login', name: 'Login', component: Login, meta: {title: '登录'}},
                {path: 'register', name: 'Register', component: Register, meta: {title: '注册'}},
                {path: 'reset', name: 'Reset', component: Reset, meta: {title: '重置密码'}}
            ]
        },

        //主页
        {
            path: '/', name: 'Index', component: Index, meta: {title: "区块链在线学习平台"},
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
            path: '/about', name: 'About', component: About,
            meta: {title: '关于我们'}
        },

        //个人中心
        {
            path: '/profile', name: 'Profile', redirect: {name: 'personal'},
            component: Profile,
            children: [
                {
                    path: 'personal',
                    name: 'personal',
                    component: ProfilePersonal,
                    meta: {title: '个人信息', requireAuth: true}
                },
                {path: 'paid', name: 'paid', component: ProfilePaid, meta: {title: '已购课程', requireAuth: true}},
                {path: 'course', name: 'course', component: ProfileCourse, meta: {title: '我的课程', requireAuth: true}},
                {path: 'exam', name: 'exam', component: ProfileExam, meta: {title: '我的考试', requireAuth: true}},
                {path: 'invite', name: 'invite', component: ProfileInvite, meta: {title: '邀请好友', requireAuth: true}},
                {
                    path: 'certificate',
                    name: 'certificate',
                    component: ProfileCertificate,
                    meta: {title: '我的证书', requireAuth: true}
                },
                {
                    path: 'latest-browse', name: 'browse',
                    component: ProfileLatestBrowse, meta: {title: '最近浏览', requireAuth: true}
                },
                {
                    path: 'collection', name: 'collection',
                    component: ProfileCollection, meta: {title: '收藏课程', requireAuth: true}
                }
            ]
        },

        //钱包
        {
            path: '/wallet', name: 'Wallet',
            component: Wallet, meta: {title: '我的钱包', requireAuth: true},
        },

        //积分商城
        /*{path: '/points-mall', name: 'PointsMall', component: PointsMall, meta: {title: '积分商城'}, requireAuth: true},*/

        //404
        {
            path: '/404', name: 'Error',
            component: Error, meta: {title: '错误'}
        }
    ]
})
