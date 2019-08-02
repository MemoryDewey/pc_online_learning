const TotalOption = {

    feeOptions: {
        0: '课程',
        1: '实践项目',
    },
    typeOptions: {
        0: '区块链',
        1: '计算机科学',
        2: '数据库',
        3: '前端开发',
        4: '后端开发',
        5: '编程语言',
        6: '技术经验',
        7: '其他'
    },
    rewardBonus: 5,
    supOptions: {
        0: '项目管理人',
        1: '程序员',
    },
    rewardMode: {
        0: '奖励',
        1: '惩罚',
    },


    labelProjectField: {
        0: '区块链应用',
        1: '移动端应用',
        2: '桌面应用',
        3: '算法设计',
        4: '数学建模',
    },
    optionProjectField: [{
        value: '0',
        label: '区块链应用'
    }, {
        value: '1',
        label: '移动端应用'
    }, {
        value: '2',
        label: '桌面应用'
    }, {
        value: '3',
        label: '算法设计'
    }, {
        value: '4',
        label: '数学建模'
    }],

    labelProjecttType: {
        0: '教学项目',
        1: '实践项目',
    },
    optionProjecttType: [{
        value: '0',
        label: '教学项目'
    }, {
        value: '1',
        label: '实践项目'
    }],

    labelProjectStatus: {
        0: '开放中',
        1: '已结束',
    },
    optionProjecttStatus: [{
        value: '0',
        label: '开放中'
    }, {
        value: '1',
        label: '已结束'
    }],

    labelProjectApplyStatue: {
        'WAITING': '等待审核',
        'PENDING': '等待支付',
        'ACCEPTED': '成功',
        'CANCEL': '中断',
        'REJECTED': '拒绝',
    },
    optionProjectApplyStatue: [{
        value: 'PENDING',
        label: '等待支付'
    }, {
        value: 'ACCEPTED',
        label: '成功'
    }, {
        value: 'CANCEL',
        label: '中断'
    }, {
        value: 'REJECTED',
        label: '拒绝'
    }, {
        value: 'WAITING',
        label: '等待审核'
    }],


    labelApplyApplyStatue: {
        'PENDING': '等待支付',
        'ACCEPTED': '成功',
        'CANCEL': '中断',
        'REJECTED': '拒绝',
        'WAITING': '等待审核',
    },
    optionApplyApplyStatue: [{
        value: 'PENDING',
        label: '等待支付'
    }, {
        value: 'ACCEPTED',
        label: '成功'
    }, {
        value: 'CANCEL',
        label: '中断'
    }, {
        value: 'REJECTED',
        label: '拒绝'
    }, {
        value: 'WAITING',
        label: '等待审核'
    }],

    labelPaymentType: {
        'C': '创建',
        'A': '参加',
        'O': '其他',
    },
    optionPaymentType: [{
        value: 'C',
        label: '创建'
    }, {
        value: 'A',
        label: '参加'
    }, {
        value: 'O',
        label: '其他'
    }],

    labelPaymentStatue: {
        '0': '待支付',
        '1': '支付完成',
        '2': '支付取消',
    },
    optionPaymentStatue: [{
        value: '0',
        label: '待支付'
    }, {
        value: '1',
        label: '支付完成'
    }, {
        value: '2',
        label: '支付取消'
    }],

    labelMemberType: {
        '0': "参与者",
        '1': "创建者",
    },
    optionMemberType: [{
        value: '0',
        label: '参与者'
    }, {
        value: '1',
        label: '创建者'
    }],

    labelRewardType: {
        '0': '奖励',
        '1': '处罚',
    },
    optionRewardType: [
        {
            value: '0',
            label: '奖励'
        },
        {
            value: '1',
            label: '处罚'
        },
    ],

    labelUserRight: {
        '-1': '未登录',
        '0': '学生',
        '1': '教师',
        '3': '管理员',
    },
    optionUserRight: [{
        value: '-1',
        label: '未登录'
    }, {
        value: '0',
        label: '学生'
    }, {
        value: '1',
        label: '教师'
    }, {
        value: '3',
        label: '管理员'
    }],

    labelRemarkPhase: {
        'PENDING': '未开放',
        'OPEN': '开启',
        'COMPLETED': '结束',
    },
};


export {TotalOption};
