import {render,connect} from '../../../../../hrpub/common/frame';
import SecondBlock from '../secondblock/index'
import Empty from '../../../../public/components/empty'
import SecondAction from '../../actions/second'
import './index.less'
import PersonRefer from '../../../../public/components/PersonRefer';
const SecondContent = render({
    actions :{
        secondAction: SecondAction
    }
})(({props, action, state}) => {
    const {changeAnalysis} = props
    let json = changeAnalysis.json
    let secondAction = action.secondAction
    let entryList = changeAnalysis.entryList
    let changeList = changeAnalysis.changeList
    let dimissionList = changeAnalysis.dimissionList
    let regGroupList = changeAnalysis.regGroupList
    let deptValue = changeAnalysis.deptValue
    let entryListDom = entryList.map(item => {
        let psnInfo = item.hashValue
        item.hashValue.dateType = 'begindate'
        item.hashValue.dateTitle = json['hrzzpc-000026'] // 计划入职日期
        return (
            <SecondBlock psnInfo={psnInfo}/>
        )
    })
    let changeListDom = changeList.map(item => {
        let psnInfo = item.hashValue
        item.hashValue.dateType = 'effectdate'
        item.hashValue.dateTitle = json['hrzzpc-000027'] // 计划变动日期
        return (
            <SecondBlock psnInfo={psnInfo}/>
        )
    })
    let dimissionListDom = dimissionList.map(item => {
        let psnInfo = item.hashValue
        item.hashValue.dateType = 'effectdate'
        item.hashValue.dateTitle = json['hrzzpc-000028'] // 计划离职日期
        return (
            <SecondBlock psnInfo={psnInfo}/>
        )
    })
    let regGroupListDom = regGroupList.map(item => {
        let psnInfo = item.hashValue
        item.hashValue.dateType = 'regulardate'
        item.hashValue.dateTitle = json['hrzzpc-000029'] // 计划转正日期
        return (
            <SecondBlock psnInfo={psnInfo}/>
        )
    })
    let cuserid = changeAnalysis.cuserid
    return(
        <div className = "secondContent">
            <div className="referCon">
                {/* 选择部门 选择部门 */}
                <PersonRefer 
                        refcode="hrjf/refer/jfref/HRDeptTreeRef/index"
                        value={deptValue}
                        queryCondition={() => {
                            return {
                                isShowAll: true, 
                                TreeRefActionExt: 'nccloud.web.hrzz.deptreport.sqlbuilder.DeptRefSqlBuilder', 
                                cuserid
                            }
                        }}
                        onChange={secondAction.referChange}
                    />
            </div>
            {/* 待进入 */}
            <div className="pre_title">{json['hrzzpc-000021']}</div>
            <div className="itemList">
                {
                    entryList.length === 0 ? <Empty title={json['hrzzpc-000078']}/> : entryListDom
                }
            </div>
            {/* 待离开 */}
            <div className="pre_title">{json['hrzzpc-000022']}</div>
            <div className="itemList">
                {
                    dimissionList.length === 0 ? <Empty title={json['hrzzpc-000078']}/> : dimissionListDom
                }
            </div>
            {/* 待转正 */}
            <div className="pre_title">{json['hrzzpc-000023']}</div>
            <div className="itemList">
                {
                    regGroupList.length === 0 ? <Empty title={json['hrzzpc-000078']}/> : regGroupListDom
                }
            </div>
            {/* 待变动 */}
            <div className="pre_title">{json['hrzzpc-000031']}</div>
            <div className="itemList">
                {
                    changeList.length === 0 ? <Empty title={json['hrzzpc-000078']}/> : changeListDom
                }
            </div>
        </div>
    )
})   

export default connect(SecondContent)