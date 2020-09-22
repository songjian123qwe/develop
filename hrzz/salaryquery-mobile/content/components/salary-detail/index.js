import {Component} from 'react'
import './index.less'
export default class SalaryDetail extends Component{
    constructor (props) {
        super (props)
        this.state = {

        }
    }
    // 循环生成展示
    returnDetailListDom = () => {
        const {detailInfo} = this.props
        let infoArr = detailInfo[0].paySlipVOs
        if (infoArr) {
            return infoArr.map((item, index) => {
                return (
                    <div className="detailListDom">
                        <div className="dldText">{item.name}</div>
                        <div className="dldVal">{item.value}</div>
                    </div>
                )
            })
        }
    }
    render () {
        const {listItem, colorIndex, detailInfo, json} = this.props
        let infoObj = detailInfo[0]
        return (
            <div className="salary-detail">
                <div className="sdFir">
                    <div className="sdFirContent">
                        <div className="sdfcFir">
                            {/* 年 月 */}
                            <div className={`hrfont hr-calendar sdfcfDate color${colorIndex}`}>{`${listItem.cyear}${json['hrzzmb-000157']}${listItem.cperiod}${json['hrzzmb-000156']}`}</div>
                        </div>
                        <div className="sdfcSec">
                            {listItem.name}
                        </div>
                        <div className="sdfcTh">
                            <div className="sdfctDom">
                                <div className="sdfctdVal">{listItem['f_3']}</div>
                                {/* 实发合计(元) */}
                                <div className="sdfctdText">{json['hrzzmb-000310']}</div>
                            </div>
                            <div className="sdfctDom">
                                <div className="sdfctdVal">{listItem['f_1']}</div>
                                {/* 应发合计(元) */}
                                <div className="sdfctdText">{json['hrzzmb-000311']}</div>
                            </div>
                            <div className="sdfctDom">
                                <div className="sdfctdVal">{listItem['f_2']}</div>
                                {/* 扣税合计(元) */}
                                <div className="sdfctdText">{json['hrzzmb-000312']}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={infoObj.title !== '' ? "sdSec" : ""}>{infoObj.title}</div>
                <div className="sdTh">
                    {this.returnDetailListDom()}
                </div>
                <div className={infoObj.tail !== '' ? "sdFour" : ''}>{infoObj.tail}</div>
            </div>
        )
    }
}