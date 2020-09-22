import { getAppPageConfig } from 'src/hrpub/common/utils/utils';
import CommonAction from './commonAction';
import { toast, pageTo } from 'nc-lightapp-front';

export default class MainAction extends CommonAction {
    constructor(comp) {
        super();
        this.comp = comp;

    }

    appConfig = getAppPageConfig()
    didMount = async () => {
        const { props, action } = this.comp;
        const { my, form, dispatch } = props;

        if (window.location.href.match('localhost:3006')) {
            window.location.hash = '#/ifr?page=20191012111'
        }
        // 多语
        this.getCurrentLanguage();
        window.opento = () => { pageTo.openTo('/nccloud/resources/hrzz/myinfo-pc/myinfo/main/index.html', { appcode: '60651040' }) }
        // 适配暗夜黑主题
        // this.background();
        this.cardbackground();

        // 获取id
        let cuserid = ''
        if (window.top.GETBUSINESSINFO !== undefined) {
            let useData = window.top.GETBUSINESSINFO();
            cuserid = useData.userId
        } else {
            cuserid = '1001AB10000000001TMZ';
        }
        await this.update({
            cuserid: cuserid
        })
        this.queryCheckAction()

    }

    getCurrentLanguage = () => {
        const { props } = this.comp;
        const { my, dispatch } = props;

        this.getLanguage('hrzzpc', 'hrzz').then(
            (json, state, init) => {
                this.update({
                    language: json
                })
                dispatch({
                    type: 'my/update',
                    payload: {
                        codeTimeName: json['hrzzpc-000162']
                    }
                })
            }
        )
    }
    toEmailTime = () => {
        const { props } = this.comp;
        const { my, dispatch } = props;
        let time = my.codeTime;
        let timeCount = setInterval(() => {
            time--
            dispatch({
                type: 'my/update',
                payload: {
                    codeTime: time
                }
            })
            if (time <= 0) {
                clearInterval(timeCount)
                dispatch({
                    type: 'my/update',
                    payload: {
                        isEmailTo: false,
                        codeTime: 60
                    }
                })
            }
        }, 1000)
    }
    // toastDteal = () => {
    //     return (
    //         <div>
    //             jjj
    //         </div>
    //     )
    // }
    // 是否设置过二级密码
    queryCheckAction = async () => {
        const { props } = this.comp;
        const { my, dispatch } = props
        let postData = {
            cuserid: my.cuserid,
            forgetFlg: my.forgetPassFlag ? 0 : 1
        }
        try {
            let res = await dispatch({
                type: 'my/queryCheckAction',
                payload: {
                    postData: postData,
                }
            })
            if (res) {
                dispatch({
                    type: 'my/update',
                    payload: {
                        pageFlag: false
                    }
                });
                if (res.data.email) {
                    let email = res.data.email
                    let index = email.lastIndexOf('@')
                    if (index > 3) {
                        email = email.replace(email.slice(2, index), '***')
                    } else {
                        email = email.replace(email.slice(1, index), '***')
                    }
                    dispatch({
                        type: 'my/update',
                        payload: {
                            email: email
                        }
                    });
                }
                if (res.data.checkPwd === '-1') {
                    //    邮箱发送错误
                    toast({
                        color: 'danger',     // 提示类别，默认是 "success",非必输
                        content: my.language['hrzzpc-000161'] || "验证码发送失败，请先确认<a onclick={window.opento()}>邮箱地址</a>是否设置正确！",   // 提示内容，批量操作要输入,非必输.

                    })
                } else if (res.data.checkPwd === '0') {
                    //    邮件发送成功，弹出验证码窗口

                    toast({
                        color: 'success',     // 提示类别，默认是 "success",非必输
                        content: my.language['hrzzpc-000143'] || '验证码发送成功',   // 提示内容，批量操作要输入,非必输.

                    })
                    dispatch({
                        type: 'my/update',
                        payload: {
                            emailModal: true,
                            isEmailTo: true,
                            passWordModal: false
                        }
                    });
                    this.toEmailTime()
                } else if (res.data.checkPwd === '1') {
                    //    设置过二级密码，弹出密码输入框
                    dispatch({
                        type: 'my/update',
                        payload: {
                            passWordModal: true
                        }
                    });
                } else if (res.data.checkPwd === '2') {
                    //    系统未启用二级密码，可以正常查询数据
                    this.changeTime()();

                }
            }
        }
        catch (e) { }
    }
    changeTime = (pwdPass) => {
        const { props } = this.comp;
        const { my, dispatch } = props
        return (value) => {
            let data = [];
            if (value) {
                data = value;
            } else {
                data = this.getDefaultValue();
            }
            this.update({
                queryRange: data
            })
            let startDate = data[0];
            let endDate = data[1];
            startDate = startDate.replace(/-/g, '');
            endDate = endDate.replace(/-/g, '');
            let pwd = pwdPass?pwdPass:my.password

            let postData = {
                startDate: startDate,
                endDate: endDate,
                cuserid: my.cuserid,
                pwd,
            }
            dispatch({
                type: 'my/queryList',
                payload: {
                    postData: postData,
                }
            }).then((res) => {
                if (res) {
                    if (Number(res.data.status) === 0) {
                        dispatch({
                            type: 'my/update',
                            payload: {
                                isPasswordCorrect: false
                            }
                        });
                    } else {
                        this.getTotal(postData)
                        this.update({
                            dataList: res.data.data || []
                        })
                        dispatch({
                            type: 'my/update',
                            payload: {
                                isPasswordCorrect: true,
                                emailModal: false,
                                pageFlag: true,
                                passWordModal: false
                            }
                        });
                    }
                }
            })

        }
    }

    // 获取统计
    getTotal = async (postData) => {
        const { props } = this.comp;
        const { my, dispatch } = props

        try {
            let res = await dispatch({
                type: 'my/totalQuery',
                payload: {
                    postData: postData
                }
            })
            if (res) {
                // let totalMoney = this.deepCopy(my.totalMoney);
                let totalMoney = [];
                // console.log(Object.keys(res.data))
                // Object.keys(res.data).map((key) => {
                //     totalMoney.push(res.data[key])
                // })
                totalMoney.push(res.data.f_1);
                totalMoney.push(res.data.f_3);
                totalMoney.push(res.data.f_5);
                totalMoney.push(res.data.f_2);
                this.update({
                    totalMoney: totalMoney,
                    isShowDetail: false,
                    dataDetail: { cyear: '', cperiod: '', name: '', moneyReal: '0' },
                    moneyDetail: []
                })
            }
        }
        catch (e) { }
    }

    // 获取当前的月份
    getDefaultValue = () => {
        const { props } = this.comp;
        const { my } = props;
        let defaultRange = [];
        let date = new Date;
        let year = date.getFullYear();
        // let month = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
        // var strDate = date.getDate();
        // let nowTime = year + '-' + month;
        let lastTime = year + '-' + '01';
        let nowTime = year + '-' + '12';
        defaultRange.push(lastTime);
        defaultRange.push(nowTime);
        this.update({
            defaultRange: defaultRange
        })
        return defaultRange
    }

    showDetail = async (type, pk_wa_class, cyear, cperiod, itemName, moneyReal, event) => {
        const { props } = this.comp;
        const { my } = props;

        let e = event || window.event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        // if (my.dataDetail.cperiod !== cperiod || my.dataDetail.cyear !== cyear) {
        let obj = {};
        obj.cyear = cyear;
        obj.cperiod = cperiod;
        obj.name = itemName;
        obj.moneyReal = moneyReal;

        await this.update({
            dataDetail: obj,
            moneyDetail: []
        })
        await this.getDetail(type, pk_wa_class, cyear, cperiod);
        // }

        this.update({ isShowDetail: true })
    }

    closeDetail = () => {
        const { props } = this.comp;
        const { my } = props;
        setTimeout(() => {
            this.update({ isShowDetail: false })
        }, 10)
        this.update({
            dataDetail: { cyear: '', cperiod: '', name: '', moneyReal: '0' },
            moneyDetail: []
        })
    }

    // 获取详情
    getDetail = async (type, pk_wa_class, cyear, cperiod) => {
        const { props } = this.comp;
        const { my, dispatch } = props;

        let postData = {
            pk_wa_class: pk_wa_class,
            cyear: cyear,
            cperiod: cperiod,
            type: type,
            cuserid: this.cuserid
        }
        try {
            let res = await dispatch({
                type: 'my/queryData',
                payload: {
                    postData: postData
                }
            })
            if (res) {
                let dataAllDetail = JSON.parse(res.data);
                let dataDetail = dataAllDetail[0].paySlipVOs;
                let dataNote = {};
                dataNote.title = dataAllDetail[0].title;
                dataNote.tail = dataAllDetail[0].tail;
                this.update({
                    moneyDetail: dataDetail,
                    dataNote: dataNote
                })
            }
        }
        catch (e) { }

    }

    // 暗夜主题
    background = () => {
        document.querySelector('body').classList.add('workbench-black', 'nc-lightapp-front-black')
        var a1 = document.createElement('link')
        a1.href = '/nccloud/resources/platform/nc-lightapp-front/nc-lightapp-front-black.css'
        a1.rel = "stylesheet"
        document.querySelector('head').appendChild(a1);
        document.querySelector('body').classList.remove('nc-no-theme')
    }
    cardbackground = () => {
        const { props } = this.comp;
        const { my } = props;
        if (document.getElementsByTagName('body')[0].getAttribute('class').indexOf('nc-lightapp-front-black') > -1) {
            this.update({
                dark: true
            })
        }
    }
}