import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';
export default {
    name: 'my',
    data: {
        language: [],
        defaultRange: [], // 默认日期区间
        queryRange: [],
        cuserid: '', // 用户id
        totalMoney:[0, 0, 0, 0],
        isShowDetail: false,
        dataList: [],
        dataDetail: {cyear: '', cperiod: '', name: '', moneyReal: '0'},
        dataNote: {},
        mainPage: 'salary',
        moneyDetail: [],
        codeTimeName:'',
        codeTime:60,
        password:'',
        isEmailTo:true, //已发送验证码
        dark: false,  // 暗夜黑主题调试
        passWordModal:false,//输入密码弹框
        setPassWordModal:false,//设置密码弹框
        emailModal:false,//输入验证码弹框
        email:'',//发送的邮件地址
        pageFlag:false,//是否显示数据页面 false 不显示
        isPasswordCorrect:true, //查询密码是否正确
        forgetPassFlag:false,//是否为忘记密码
    },
    sync: {
        update(state, payload) {
            return {
                ...state,
                ...payload
            };
        }
    },
    async: {

        // 查询统计信息 // 总额
        totalQuery(dispatch, getState, payload) {
            return proFetch ({
                url: '/nccloud/hrzz/payslip/TotalQueryAction.do',
                body: payload.postData,
            })
        },

        // 查询列表信息
        queryList(dispatch, getState, payload){
            return proFetch ({
                url: '/nccloud/hrzz/payslip/QueryListAction.do',
                body: payload.postData,
            })
        },

        // 查询数据
        queryData(dispatch, getState, payload) {
            return proFetch ({
                url: '/nccloud/hrzz/payslip/QueryDataAction.do',
                body: payload.postData,
            })
        },
        // 校验是否有二级密码
        queryCheckAction(dispatch, getState, payload) {
            return proFetch ({
                url: '/nccloud/hrzz/payslip/QueryCheckAction.do',
                body: payload.postData,
            })
        },
        // 二级密码保存
        savePwdAction(dispatch, getState, payload) {
            return proFetch ({
                url: '/nccloud/hrzz/payslip/savePwdAction.do',
                body: payload.postData,
            })
        },
        // 验证码校验
        checkVeritycodeAction(dispatch, getState, payload) {
            return proFetch ({
                url: '/nccloud/hrzz/payslip/CheckVeritycodeAction.do',
                body: payload.postData,
            })
        },
    }
};