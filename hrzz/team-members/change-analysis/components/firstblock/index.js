import {render,connect} from '../../../../../hrpub/common/frame';
import './index.less'
const FirstBlock = render({
    actions :{
        
    }
})(({props, action, state}) => {
    const {infoObj, changeAnalysis} = props
    const {json} = changeAnalysis
    return(
        <div className = "firstBlock">
            <div className="time_frame">
                <div className="days_later">{infoObj.title}</div>
                <div className="person">{infoObj.totleCount}</div>
                {/* 预计在职员工 */}
                <div className="descrip">{json['hrzzpc-000015']}</div>
            </div>
            <hr/>
            <div className="forcast">
                <div className="forcast_entry">
                    <p className="num">{infoObj.entryCount}</p>
                    {/* 预计进入 */}
                    <p className="entry_leave">{json['hrzzpc-000016']}</p>
                </div>
                <div className="forcast_entry">
                    <p className="num">{infoObj.dimissionCount}</p>
                    {/* 预计离开 */}
                    <p className="entry_leave">{json['hrzzpc-000017']}</p>
                </div>
            </div>
        </div>
    )
})   

export default connect(FirstBlock)