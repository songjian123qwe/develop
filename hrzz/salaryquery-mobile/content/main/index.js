import {Component} from 'react'
import ReactDOM from 'react-dom';
import {Toast, Modal} from 'antd-mobile';
import {DHeader} from '../../../public/mobile/components/index'
import ajax from '../../../public/mobile/utils/ajax'
import {compatibleNavImg} from '../../../public/mobile/utils/index.js'
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js'
import QueryIndex from '../components/query-index/index'
import InputCode from '../components/input-code/index'
import SetPassWord from '../components/set-password/index'
import SalaryList from '../components/salary-list/index'
import SalaryDetail from '../components/salary-detail/index'
import './index.less'
import thirdLog from '../../../login/third-log-method';
import {getMultiLang} from "../../../public/mobile/utils/getMultiLang"
class SalaryIndex extends Component{
    constructor (props) {
        super(props)
        this.state = {
            json: {},
            showNav: false,
            photoBase64: '',
            showModal: false,
            showPage: 0, // 1显示输入密码页 2显示输入验证码页 3显示设置密码页 4显示列表页 5显示详情页
            dialogContent: '',
            cuserid: '',
            checkPwd: '',
            pageArr: [],
            listData: [],
            startDate: '',
            endDate: '',
            totalInfo: {},
            detailInfo: [{}],
            listItem: {},
            colorIndex: 1, // 日历颜色下标
            pwd: ''
        }
    }
    componentDidMount () {
        this.getLanguage()
    }
    getLanguage = () => {
        getMultiLang({
            domainName: 'hrzz',
            moduleId: 'hrzzmb',
            callback: (json, status, init) => {
                this.setState({
                    json: json
                }, () => {
                    this.initPage()
                })
            }
        })
    }
    initPage = () => {
        this.editNav()
        // sessionStorage.setItem('showNav', true)
        let showNav = JSON.parse(sessionStorage.getItem('showNav'))
        this.setState({
            showNav
        })
        this.querypersonsettings()
    }
    editNav(){
        const {json} = this.state
        let parameters={}
		let cbs={
			salaryLeftClick: this.leftClick
		}
		parameters={
			leftItems: [
				{
					callback: 'salaryLeftClick',                 
					icon: compatibleNavImg(location.origin+'/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
				}
			],
			centerItems: [
				{
					title: json['hrzzmb-000301'], // 我的工资
				}
			]
		}
		let data = { 
			'function': 'configNavBar', 
			'parameters': parameters
		}
		NativeObj.configNavBar(data, cbs)
    }
    // web页面头左边点击函数
    leftClick = () => {
        let pageArr = this.state.pageArr
        if (pageArr.length < 2) {
            NativeObj.closePage()
        } else {
            pageArr.splice(pageArr.length - 1)
            this.setShowPage(pageArr[pageArr.length - 1])
        }
    }
    //获取userid
    querypersonsettings = () => {
        const {json} = this.state
        Toast.loading(json['hrzzmb-000001'], 0) // 加载中...
        ajax({
            url: '/nccloud/platform/appregister/querypersonsettings.do',
            data: {rqCode: 'querypersonsettings'},
            success: (result) => {
                if (result.success) {
                    let cuserid = result.data.userId
                    this.queryCheckAction(cuserid)
                    this.setState({
                        cuserid
                    })
                }
            }
        })
    }
    // 校验用户是否设置二级密码
    queryCheckAction = (cuserid) => {
        ajax({
            url: '/nccloud/hrzz/payslip/QueryCheckAction.do',
            data: {
                cuserid,
                forgetFlg: 1
            },
            info: {
                appcode: '60652510'
            },
            success: (result) => {
                Toast.hide()
                if (result.success) {
                    let nowDate = new Date()
                    let nowYear = nowDate.getFullYear()
                    let nowMonth = nowDate.getMonth() + 1
                    let nowMonthStr = nowMonth < 10 ? '0' + nowMonth : nowMonth
                    let startDate = nowYear + '01'
                    let endDate = nowYear+ '' + nowMonthStr
                    let data = result.data
                    let photoBase64 = data.photoBase64
                    let checkPwd = data.checkPwd
                    let stateObj = {
                        photoBase64,
                        checkPwd,
                        startDate,
                        endDate
                    }
                    switch (checkPwd) {
                        case '-1':
                            stateObj.showModal = true
                            stateObj.dialogContent = data.errMessage
                            break;
                        case '0':
                            stateObj.showPage = 2
                            this.pushPageIndex(2)
                            break;
                        case '1':
                            stateObj.showPage = 1
                            this.pushPageIndex(1)
                            break;
                        case '2':
                            this.showList(startDate, endDate, cuserid)
                            break;
                        default:break;
                    }
                    this.setState(stateObj)
                }
            },
            error: (err) => {
                Toast.hide()
                this.setState({
                    showModal: true,
                    dialogContent: err.data.error.message
                })
            }
        })
    }
    // 关闭弹窗
    errorModalClose = () => {
        this.setState({
            showModal: false
        })
        NativeObj.closePage()
    }
    setShowPage = (showPage) => {
        this.setState({
            showPage
        })
    }
    // 将要跳转的页面标志放入数组
    pushPageIndex = (num) => {
        this.state.pageArr.push(num)
    }
    // 当checkPwd为'2'的时候直接显示列表
    showList = (startDate, endDate, cuserid, pwd) => {
        const {json} = this.state
        Toast.loading(json['hrzzmb-000001'], 0) // 加载中...
        let param = {
            startDate,
            endDate,
            cuserid
        }
        if (pwd) {
            param.pwd = pwd
        }   
        ajax({
            url: '/nccloud/hrzz/payslip/QueryListAction.do',
            data: param,
            info: {
                appcode: '60652510'
            },
            success: (result) => {
                Toast.hide()
                let data = result.data
                let listData = data.data ? data.data : []
                let status = data.status
                if (pwd && status === "0") {
                    Toast.info(json['hrzzmb-000302']) // 输入查询密码不正确，请重新输入！
                    return false
                }
                this.setShowPage(4)
                this.pushPageIndex(4)
                this.setState({
                    listData,
                    pwd
                })
                if (listData.length > 0) {
                    this.getTotalData(startDate, endDate, cuserid)
                }
            },
            error: (err) => {
                Toast.hide()
                Toast.info(err.data.error.message)
            }
        })
    }
    // 获取汇总数据
    getTotalData = (startDate, endDate, cuserid) => {
        const {json} = this.state
        Toast.loading(json['hrzzmb-000001'], 0) // 加载中...'
        ajax({
            url: '/nccloud/hrzz/payslip/TotalQueryAction.do',
            data: {
                startDate,
                endDate,
                cuserid
            },
            info: {
                appcode: '60652510'
            },
            success: (result) => {
                Toast.hide()
                if (result.success) {
                    this.setState({
                        totalInfo: result.data
                    })
                }
            },
            error: (err) => {
                Toast.hide()
                Toast.info(err.data.error.message)
            }
        })
    }
    // 获取当前点击列表中莫一项值， 并请求详情接口
    getDetailInfoByListItem = (listItem, colorIndex) => {
        const {json} = this.state
        Toast.loading(json['hrzzmb-000001'], 0) // 加载中...
        this.setState({
            listItem,
            colorIndex
        })
        const {
            pk_wa_class,
            cyear,
            cperiod,
            type
        } = listItem
        ajax({
            url: '/nccloud/hrzz/payslip/QueryDataAction.do',
            data: {
                pk_wa_class,
                cyear,
                cperiod,
                type
            },
            info: {
                appcode: '60652510'
            },
            success: (result) => {
                if (result.success) {
                    Toast.hide()
                    let data = result.data
                    let detailInfo = data ? JSON.parse(data) : []
                    this.setState({
                        detailInfo
                    })
                }
            },
            error: (err) => {
                Toast.hide()
                Toast.info(err.data.error.message)
            }
        })
    }
    // 调用发送验证码借口
    sendCode = () => {
        this.refs.inputCode.queryCheckAction()
    }
    render () {
        const {
            json,
            showNav,
            showModal, 
            dialogContent, 
            photoBase64, 
            showPage, 
            cuserid,
            listData,
            startDate,
            endDate,
            totalInfo,
            detailInfo,
            colorIndex,
            listItem,
            pwd
        } = this.state
        return (
            <div className="salary-content">
                {/* 我的工资 */}
                <DHeader title={"我的工资"} leftClick={this.leftClick}/>
                <div className="scCon" style={{height: showNav ? 'calc(100% - 0.88rem)' : '100%'}}>
                    <div className="contentCon" style={{display: showPage === 1 ? '' : 'none'}}>
                        <QueryIndex
                            json={json}
                            startDate={startDate}
                            endDate={endDate}
                            cuserid={cuserid}
                            photoBase64={photoBase64} 
                            setShowPage={this.setShowPage}
                            pushPageIndex={this.pushPageIndex}
                            showList={this.showList}
                            sendCode={this.sendCode}/>
                    </div>
                    <div className="contentCon" style={{display: showPage === 2 ? '' : 'none'}}>
                        <InputCode 
                            json={json}
                            cuserid={cuserid}
                            setShowPage={this.setShowPage}
                            pushPageIndex={this.pushPageIndex}
                            ref="inputCode"/>
                    </div>
                    <div className="contentCon" style={{display: showPage === 3 ? '' : 'none'}}>
                        <SetPassWord 
                            json={json}
                            setShowPage={this.setShowPage}
                            pushPageIndex={this.pushPageIndex}/>
                    </div>
                    <div className="contentCon" style={{display: showPage === 4 ? '' : 'none'}}>
                        <SalaryList 
                            json={json}
                            pwd={pwd}
                            cuserid={cuserid}
                            pushPageIndex={this.pushPageIndex}
                            listData={listData}
                            showList={this.showList}
                            totalInfo={totalInfo}
                            setShowPage={this.setShowPage}
                            getDetailInfoByListItem={this.getDetailInfoByListItem}/>
                    </div>
                    <div className="contentCon" style={{display: showPage === 5 ? '' : 'none'}}>
                        <SalaryDetail
                            json={json}
                            detailInfo={detailInfo}
                            listItem={listItem}
                            colorIndex={colorIndex}/>
                    </div>
                    {/* 提示 关闭 */}
                    <Modal
                    visible={showModal}
                    title="提示"
                    transparent
                    maskClosable={false}
                    footer={[{ text: '关闭', onPress: () => { this.errorModalClose()}}]}
                    >
                        {dialogContent}
                    </Modal>
                </div>
            </div>
        )
    }
}
thirdLog(() => {
	ReactDOM.render(<SalaryIndex/>, document.getElementById('app'));
})