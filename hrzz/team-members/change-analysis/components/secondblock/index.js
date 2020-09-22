import {render,connect} from '../../../../../hrpub/common/frame';
import HeadPortrait from '../../../../public/static/images/head-portrait.png'
import './index.less'
const SecondBlock = render({
    actions :{
        
    }
})(({props, action, state}) => {
    const {psnInfo, changeAnalysis} = props
    const {json} = changeAnalysis
    let dateType = psnInfo.dateType
    return(
        <div className = "secondBlock">
            <div className="top">
                <p className="state">{psnInfo.psnclname}</p>
                <img className="img" src={psnInfo.previewphoto ? psnInfo.previewphoto : HeadPortrait} alt=""/>
                <p className="name">{psnInfo.psnname}</p>
                {/* <p className="profession"></p>
                <p className="profession"></p> */}
            </div>
            <hr/>
            <div className="content">
                <div className="content_item">
                    {/* 部门 */}
                    <div className="dept">{json['hrzzpc-000024']}</div>
                    <p className="descript">{psnInfo.deptname}</p>
                </div>
                <div className="content_item">
                    {/* 电话号码 */}
                    <div className="dept">{json['hrzzpc-000025']}</div>
                    <p className="descript">{psnInfo.mobile}</p>
                </div>
                <div className="content_item">
                    <div className="dept">{psnInfo.dateTitle}</div>
                    <p className="descript">{psnInfo[dateType]}</p>
                </div>
            </div>
        </div>
    )
})   

export default connect(SecondBlock)