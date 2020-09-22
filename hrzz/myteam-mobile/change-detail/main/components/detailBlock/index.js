import {Component} from 'react'
import './index.less'
import DefeatHead from '../../../../../public/mobile/static/images/avatar.png'
class DetailBlock extends Component{
    constructor (props) {
        super(props)
        this.state = {

        }
    }
    render () {
        const {detailInfo, detailIndex, title, json} = this.props
        let hashValue = detailInfo.hashValue ? detailInfo.hashValue : {}
        let psnname = hashValue.psnname ? hashValue.psnname : '' // 人员名称
        let mobile = hashValue.mobile ? hashValue.mobile : ''
        let previewphoto = hashValue.previewphoto ? hashValue.previewphoto : DefeatHead
        let psnclname = hashValue.psnclname ? hashValue.psnclname : '' // 员工类别
        let deptname = hashValue.deptname ? hashValue.deptname : ''
        let trnstypename = hashValue.trnstypename ? hashValue.trnstypename : '' 
        let styleTitle = '', styleDate = ''
        switch (title) {
            case json['hrzzmb-000046']: // 待进入
                styleTitle = json['hrzzmb-000047'] // 计划入职日期
                styleDate = 'begindate'
                break;
            case json['hrzzmb-000048']: // 待离开
                styleTitle = json['hrzzmb-000048'] // 计划离职日期
                styleDate = 'effectdate'
                break;
            case json['hrzzmb-000050']: // 待变动
                styleTitle = json['hrzzmb-000051'] // 计划变动日期
                styleDate = 'effectdate'
                break;
            case json['hrzzmb-000052']: // 待转正
                styleTitle = json['hrzzmb-000053'] // 计划转正日期
                styleDate = 'regulardate'
                break;
            default:break;
        }
        let dateStr = detailInfo[styleDate] ? detailInfo[styleDate] : ''
        return (
            <div className="detailBlock" style={{marginRight: (detailIndex + 1) % 2 ? '4px' : '0px'}}>
                <div className="detailBlockInfo">
                    <img className="previewphoto" src={previewphoto} alt=""/>
                    <div className="psnname">{psnname}</div>
                </div>
                <div className="styleCon" style={{display: deptname ? 'block' : 'none'}}>
                    {/* 部门 */}
                    <div className="styleTitle">{json['hrzzmb-000054']}</div>
                    <div className="styleContent">{deptname}</div>
                </div>
                <div className="styleCon" style={{display: mobile ? 'block' : 'none'}}>
                    {/* 电话号码 */}
                    <div className="styleTitle">{json['hrzzmb-000055']}</div>
                    <div className="styleContent">{mobile}</div>
                </div>
                <div className="styleCon" style={{display: psnclname ? 'block' : 'none'}}>
                    {/* 员工类别 */}
                    <div className="styleTitle">{json['hrzzmb-000056']}</div>
                    <div className="styleContent">{psnclname}</div>
                </div>
                <div className="styleCon" style={{display: dateStr ? 'block' : 'none'}}>
                    <div className="styleTitle">{styleTitle}</div>
                    <div className="styleContent">{dateStr}</div>
                </div>
                <div className="trnstypename" style={{display: trnstypename ? 'block' : 'none'}}>{trnstypename}</div>
            </div>
        )
    }
}
export default DetailBlock