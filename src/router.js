import Vue from 'vue'
//import VueRouter from 'vue-router'

const Index = () => import('./views/student/Index');

const Wallet = () => import('./views/student/Wallet');

const Error = () => import('./views/404');
const Passport = () => import('./views/Passport');
const Login = () => import('./components/passport/Login');
const Register = () => import( './components/passport/Register');
const Reset = () => import( './components/passport/Reset');

const Course = () => import( './views/student/Course');
const CourseList = () => import( './components/student/course/List');
const CourseInformation = () => import( './components/student/course/Information');
const CourseVideo = () => import( './components/student/course/Video');
const CourseExam = () => import( './components/student/course/CourseExam');
const CourseWare = () => import( './components/student/course/CourseWare');

const Project = () => import( './views/student/Project');
const ProjectList = () => import( './components/student/project/List');
const ProjectInformation = () => import( './components/student/project/Information');

const Profile = () => import( './views/Profile');
const ProfileCourse = () => import( './components/profile/Course');
const ProfileCertificate = () => import( './components/profile/Certificate');
const ProfileExam = () => import( './components/profile/Exam');
const ProfilePersonal = () => import( './components/profile/Personal');
const ProfileProject = () => import( './components/profile/Project');
const ProfilePaid = () => import( './components/profile/PaidNote');


const TeacherCourse = () => import( './views/teacher/Course');
const CSM = () => import( './components/teacher/course/StudentManage');
const CM = () => import( './components/teacher/course/CourseManage');
const CCM = () => import( './components/teacher/course/ChapterManage');
const CVM = () => import( './components/teacher/course/VideoManage');
const CPM = () => import( './components/teacher/course/PDFMange');
const CFM = () => import( './components/teacher/course/FileManage');
const CLM = () => import( './components/teacher/course/LiveManage');
const CEM = () => import( './components/teacher/course/ExamManage');

const TeacherProject = () => import( './views/teacher/Project');
const PAAM = () => import( './components/teacher/project/AttendApplyManagementTeacher');
const PCAM = () => import( './components/teacher/project/CreateApplyManagementTeacher');
const PP = () => import( './components/teacher/project/ProjectTeacher');
const PPM = () => import( './components/teacher/project/ProjectMemberTeacher');

import {checkLogin} from './api/passport'


Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        /* 课程 */
        {
            path: '/course', name: 'Course', component: Course, children: [
                {path: 'list', name: 'CourseList', component: CourseList, meta: {title: '在线学习'}},
                {path: 'list/:search', name: 'CourseListSearch', component: CourseList, meta: {title: '在线学习'}},
                {
                    path: ':courseID', name: 'CourseVideo', component: CourseVideo, meta: {title: '课程视频'},
                    beforeEnter(to, from, next) {
                        checkLogin().then((res) => {
                            if (res.status === 1) next();
                            else next('/passport/login');
                        }).catch(() => {
                            next('/passport/login');
                        });
                    },
                },
                {path: ':courseID/exam', name: 'CourseExam', component: CourseExam, meta: {title: '期末测验'}},
                {
                    path: ':courseID/information',
                    name: 'CourseInformation',
                    component: CourseInformation,
                    meta: {title: '课程信息'}
                }
            ],
            beforeEnter(to, from, next) {
                checkLogin().then((res) => {
                    if (res.level === 1) next('/teacher/course/student');
                    else next();
                }).catch(() => {
                    next();
                });
            }
        },

        /* 项目 */
        /*{
            path: '/project', name: 'Project', component: Project, children: [
                {path: 'list', name: 'ProjectList', component: ProjectList, meta: {title: '项目实践'}},
                {path: 'list/:search', name: 'ProjectListSearch', component: ProjectList, meta: {title: '项目实践'}},
                {
                    path: ':projectID/information',
                    name: 'ProjectInformation',
                    component: ProjectInformation,
                    meta: {title: '项目信息'}
                }
            ],
            beforeEnter(to, from, next) {
                checkLogin().then((res) => {
                    if (res.level === 1) next('/teacher/course/student');
                    else next();
                }).catch(() => {
                    next();
                });
            }
        },*/

        /* 课件 */
        {path: '/course-ware', name: 'CourseWare', component: CourseWare, meta: {title: '课件'}},

        /* 课程管理 */
        {
            path: '/teacher/course', name: 'TeacherCourse', component: TeacherCourse, children: [
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
                checkLogin().then((res) => {
                    if (res.level === 1) next();
                    else next('/404');
                }).catch(() => {
                    next('/404');
                });
            }
        },

        /* 项目管理 */
        /*{
            path: '/teacher/project', name: 'TeacherProject', component: TeacherProject, children: [
                {path: 'project', name: 'PP', component: PP, meta: {title: '项目管理'}},
                {path: 'attendapply', name: 'PAAM', component: PAAM, meta: {title: '项目报名申请管理'}},
                {path: 'createapply', name: 'PCAM', component: PCAM, meta: {title: '项目创建申请管理'}},
                {path: 'projectmember', name: 'PPM', component: PPM, meta: {title: '项目成员管理'}},
            ],
            beforeEnter(to, from, next) {
                checkLogin().then((res) => {
                    if (res.level === 1) next();
                    else next('/404');
                }).catch(() => {
                    next('/404');
                });
            }
        },*/

        /* 登录注册 */
        {
            path: '/passport', name: 'Passport', component: Passport, children: [
                {path: 'login', name: 'Login', component: Login, meta: {title: '登录'}},
                {path: 'register', name: 'Register', component: Register, meta: {title: '注册'}},
                {path: 'reset', name: 'Reset', component: Reset, meta: {title: '重置密码'}}
            ]
        },

        /* 主页 */
        {
            path: '/', name: 'Index', component: Index, meta: {title: "区块链在线学习平台"},
            beforeEnter(to, from, next) {
                checkLogin().then((res) => {
                    if (res.level === 1) next('/teacher/course/student');
                    else next();
                }).catch(() => {
                    next();
                });
            }
        },

        /* 个人中心 */
        {
            path: '/profile', name: 'Profile', component: Profile,
            beforeEnter(to, from, next) {
                checkLogin().then((res) => {
                    if (res.status === 1) next();
                    else next('/passport/login');
                }).catch(() => {
                    next('/passport/login');
                });
            },
            children: [
                {path: 'personal', name: 'personal', component: ProfilePersonal, meta: {title: '个人信息'}},
                {path: 'paid', name: 'paid', component: ProfilePaid, meta: {title: '已购课程'}},
                {path: 'course', name: 'course', component: ProfileCourse, meta: {title: '我的课程'}},
                {path: 'exam', name: 'exam', component: ProfileExam, meta: {title: '我的考试'}},
                /*{path: 'project', name: 'project', component: ProfileProject, meta: {title: '我的项目'}},*/
                {path: 'certificate', name: 'certificate', component: ProfileCertificate, meta: {title: '我的证书'}}
            ]
        },

        /**
         * 钱包
         */
        {path: '/wallet', name: 'Wallet', component: Wallet, meta: {title: '我的钱包'}},

        /* 404 */
        {
            path: '/404', name: 'Error', component: Error, meta: {title: '错误'}
        }
    ]
})
