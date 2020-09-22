import React, {Component} from 'react'
import './index.less'
import DefeatHead from '../../../../../public/mobile/static/images/avatar.png'
class EmployeesType extends Component{
    constructor (props) {
        super(props)
        this.state = {
            
        }
    }
    // 显示详情
    showDetail (dataObj, cnt) {
        if (cnt > 0) {
            let title = this.props.title
            dataObj.title = title
            this.props.showDetail(dataObj)
        }
    }
    render () {
        const {data = {}, title, json} = this.props
        let cnt = data.cnt ? data.cnt : '0'
        let dataArr = []
        if (data.data) {
            dataArr = data.data
            if (data.data.length > 2) {
                dataArr = data.data.slice(0, 2)
            }
        }
        let personInfoDom = dataArr.map((item, index) => {
            let hashValue = item.hashValue
            let previewphoto = hashValue.previewphoto ? hashValue.previewphoto : DefeatHead
            let psnname = hashValue.psnname ? hashValue.psnname : ''
            let deptname = hashValue.deptname ? hashValue.deptname : ''
            let trnstypename = hashValue.trnstypename ? hashValue.trnstypename : ''
            return (
                <div className="personInfoDom" style={{marginRight: (index + 1) % 3 ? '4px' : '0px'}}>
                    <img className="previewphoto" src={previewphoto} alt=""/>
                    <div className="psnname">{psnname}</div>
                    <div className="deptname">{deptname}</div>
                    <div className="psnclname">
                        <div className="psnclnameText" style={{display: trnstypename !== ''? '' : 'none'}}>
                            {trnstypename}
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className="employeesType">
                <div className="etTitle">
                    {title}
                </div>
                <div className="personInfoCon">
                    {
                        personInfoDom
                    }
                    <div className="allPerson" onClick={this.showDetail.bind(this, data, cnt)}>
                        <div className="allPersonNum">{`${json['hrzzmb-000044']}${cnt}${json['hrzzmb-000045']}`}</div>{/*共 人*/}
                        <i className="hrfont hr-right"></i>
                    </div>
                </div>
            </div>
        )
    }
}
export default EmployeesType