import {render,connect} from '../../../../../hrpub/common/frame';
import CompositionAction from '../../actions/composition'
import './index.less'
import PersonRefer from '../../../../public/components/PersonRefer';
const Composition = render({
    actions :{
        compositionAction: CompositionAction
    }
})(({props, action, state}) => {
    const {compositionAnalysis} = props
    let json = compositionAnalysis.json
    let compositionAction = action.compositionAction
    let compositionInfo = compositionAnalysis.compositionInfo
    let cuserid = compositionAnalysis.cuserid
    let referObj = compositionAnalysis.referObj
    return(
        <div className="composition">
            <div className="header_wraper">
                {/* 部门人员构成分析 */}
                <div className="header_title">{json['hrzzpc-000059']}</div>
                <div className="referCon">
                    {/* 选择部门 选择部门 */}
                    <PersonRefer 
                        refcode="hrjf/refer/jfref/HRDeptTreeRef/index"
                        value={referObj}
                        queryCondition={() => {
                            return {
                                isShowAll: true, 
                                TreeRefActionExt: 'nccloud.web.hrzz.deptreport.sqlbuilder.DeptRefSqlBuilder', 
                                cuserid
                            }
                        }}
                        onChange={compositionAction.referChange}
                    />
                </div>
            </div>
            <div className="member_count">
                <div className="item_detail">
                    <p className="item_count">{compositionInfo.totle ? compositionInfo.totle : '0'}</p>
                    {/* 在职员工 */}
                    <p className="item_title">{json['hrzzpc-000060']}</p>
                </div>
                <i className="verticalline"></i>
                <div className="item_detail">
                    <p className="item_count">{compositionInfo.entry ? compositionInfo.entry : '0'}</p>
                    {/* 入职 */}
                    <p className="item_title">{json['hrzzpc-000061']}</p>
                </div>
                <div className="item_detail">
                    <p className="item_count">{compositionInfo.dimission ? compositionInfo.dimission : '0'}</p>
                    {/* 离职 */}
                    <p className="item_title">{json['hrzzpc-000062']}</p>
                </div>
                <div className="item_detail">
                    <p className="item_count">{compositionInfo.reg ? compositionInfo.reg : '0'}</p>
                    {/* 转正 */}
                    <p className="item_title">{json['hrzzpc-000063']}</p>
                </div>
                <div className="item_detail">
                    <p className="item_count">{compositionInfo.change ? compositionInfo.change : '0'}</p>
                    {/* 调动 */}
                    <p className="item_title">{json['hrzzpc-000064']}</p>
                </div>
                <i className="verticalline"></i>
                <div className="item_detail">
                    <p className="item_count">{compositionInfo.probation ? compositionInfo.probation : '0'}</p>
                    {/* 试用 */}
                    <p className="item_title">{json['hrzzpc-000065']}</p>
                </div>
                <div className="item_detail">
                    <p className="item_count">{compositionInfo.regular ? compositionInfo.regular : '0'}</p>
                    {/* 正式 */}
                    <p className="item_title">{json['hrzzpc-000066']}</p>
                </div>
            </div>
        </div>
    )
})   

export default connect(Composition)