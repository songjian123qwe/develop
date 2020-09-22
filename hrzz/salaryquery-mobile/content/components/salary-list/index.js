import {Component} from 'react'
import './index.less'
import { DatePicker, Toast} from 'antd-mobile';
import Empty from '../../../../public/components/empty/index'
// 格式化时间函数
const formatDate = (dateStr) => {
    if (dateStr.indexOf('-') !== -1) {
        return dateStr.substring(0, 4) + '年' + dateStr.substring(5, 7) + '月'
    } else {
        return dateStr
    }
}
const CustomChildren1 = ({extra, onClick}) => (
    <span onClick={onClick} className="hrfont hr-down customChildren">{formatDate(extra)}</span>
)
const CustomChildren2 = ({extra, onClick}) => (
    <span onClick={onClick} className="hrfont hr-down customChildren">{formatDate(extra)}</span>
)
export default class SalaryList extends Component{
    constructor (props) {
        super (props)
        this.state = {
            startDate: '',
            endDate: '',
            extra1: '',
            extra2: '',
            initStart: '',
            initEnd: ''
        }
    }
    componentWillReceiveProps (nextProps) {
        if (JSON.stringify(nextProps.json) !== '{}') {
            let json = nextProps.json
            let nowDate = new Date()
            let nowYear = nowDate.getFullYear()
            let nowMonth = nowDate.getMonth() + 1
            let nowMonthStr = nowMonth < 10 ? '0' + nowMonth : nowMonth
            // 年 月
            let extra1 = nowYear + `${json['hrzzmb-000157']}01${json['hrzzmb-000156']}`// '年01月'
            let extra2 = nowYear + json['hrzzmb-000157'] + nowMonthStr + json['hrzzmb-000156']
            let initStart = nowYear + '-01'
            let initEnd = nowYear + '-' + nowMonthStr
            this.setState({
                extra1,
                extra2,
                initStart,
                initEnd
            })
        }
    }
    // 选择开始结束日期之后请求数据
    returnListData = (datStyle, v) => {
        const {json} = this.props
        this.setState({
            [datStyle]: v 
        }, () => {
            const {startDate, endDate, initEnd, initStart} = this.state
            let startDateObj = new Date(startDate)
            let endDateObj = new Date(endDate)
            if (!startDate) {
                startDateObj = new Date(initStart)
            }
            if (!endDate) {
                endDateObj = new Date(initEnd)
            }
            let startYear = startDateObj.getFullYear()
            let startMonth = startDateObj.getMonth() + 1
            let startMonthStr = startMonth < 10 ? '0' + startMonth : startMonth
            let endYear = endDateObj.getFullYear()
            let endMonth = endDateObj.getMonth() + 1
            let endDateStr = endMonth < 10 ? '0' + endMonth : endMonth
            // 开始日期年月不得大于结束日期
            if (startYear > endYear || (startYear === endYear && startMonth > endMonth)) {
                Toast.info(json['hrzzmb-000313'])
                return false
            } else {
                const {showList, cuserid, pwd} = this.props
                let startDate = startYear + '' + startMonthStr
                let endDate = endYear + '' + endDateStr
                showList(startDate, endDate, cuserid, pwd)
            }
        })
    }
    // 返回列表内容
    returnListDom = (listData) => {
        const {json} = this.props
        let colorIndex = 0
        return listData.map((item, index) => {
            if (colorIndex < 5) {
                colorIndex++
            } else {
                colorIndex = 1
            }
            return (
                <div key={index} id="listDom" className="listDom" onClick={this.toDetail.bind(this, item, colorIndex)}>
                    <div className="ldFir">
                        {/* 年 月 */}
                        <div className={`hrfont hr-calendar ldfDate color${colorIndex}`}>{`${item.cyear}${json['hrzzmb-000157']}${item.cperiod}${json['hrzzmb-000156']}`}</div>
                        <div className="ldfName">{item.name}</div>
                    </div>
                    <div className="ldSec">
                        <div className="ldsDom">
                            <div className="ldsdVal">{item['f_3']}</div>
                            {/* 实发合计(元) */}
                            <div className="ldsdText">{json['hrzzmb-000310']}</div>
                        </div>
                        <div className="ldsDom">
                            <div className="ldsdVal">{item['f_1']}</div>
                            {/* 应发合计(元) */}
                            <div className="ldsdText">{json['hrzzmb-000311']}</div>
                        </div>
                        <div className="ldsDom">
                            <div className="ldsdVal">{item['f_2']}</div>
                            {/* 扣税合计(元) */}
                            <div className="ldsdText">{json['hrzzmb-000312']}</div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    // 点击跳转详情
    toDetail = (listItem, colorIndex) => {
        const {setShowPage, pushPageIndex, getDetailInfoByListItem} = this.props
        getDetailInfoByListItem(listItem, colorIndex)
        setShowPage(5)
        pushPageIndex(5)
    }
    render () {
        const {extra1, extra2} = this.state
        const {listData, totalInfo, json} = this.props
        return (
            <div className="salary-list">
                <div className="slFir">
                    <div className="datepicker1">
                        {/* 选择日期 */}
                        <DatePicker
                            mode="date"
                            extra={extra1}
                            format="YYYY-MM-DD"
                            title={json['hrzzmb-000314']}
                            value={this.state.startDate}
                            onChange={v => this.returnListData('startDate', v)}
                            >
                            <CustomChildren1></CustomChildren1>
                        </DatePicker>
                    </div>
                    {/* 至 */}
                    <div className="dateMid">{json['hrzzmb-000243']}</div>
                    {/* 选择日期 */}
                    <div className="datepicker2">
                        <DatePicker
                            mode="date"
                            extra={extra2}
                            format="YYYY-MM-DD"
                            title={json['hrzzmb-000314']}
                            value={this.state.endDate}
                            onChange={v => this.returnListData('endDate', v)}
                            >
                            <CustomChildren2></CustomChildren2>
                        </DatePicker>
                    </div>
                </div>
                <div className="slSec">
                    {
                        listData.length > 0 ? <div className="slListCon">
                            <div className="totalContent">
                                <div className="totalSection">
                                    <div className="sectionTitle titleColor1">{totalInfo['f_3']}</div>
                                    {/* 实发汇总(元) */}
                                    <div className="sectionVal">{json['hrzzmb-000315']}</div>
                                </div>
                                <div className="totalSection">
                                    <div className="sectionTitle titleColor2">{totalInfo['f_1']}</div>
                                    {/* 应发汇总(元) */}
                                    <div className="sectionVal">{json['hrzzmb-000316']}</div>
                                </div>
                                <div className="totalSection">
                                    <div className="sectionTitle titleColor3">{totalInfo['f_2']}</div>
                                    {/* 扣税汇总(元) */}
                                    <div className="sectionVal">{json['hrzzmb-000317']}</div>
                                </div>
                            </div>
                            <div className="listContent">
                                {this.returnListDom(listData)}
                            </div>
                        </div> : <div className="emptyCon">
                            {/* 暂无数据！ */}
                            <Empty title={`${json['hrzzmb-000086']}!`}/>
                        </div>
                    }
                </div>
            </div>
        )
    }
 }