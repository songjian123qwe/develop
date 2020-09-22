import {render,connect} from '../../../../../hrpub/common/frame';
import {base} from 'nc-lightapp-front'
import PersonRefer from '../../../../public/components/PersonRefer';
const {NCModal, NCButton, NCRadio} = base
import ExportAction from '../../actions/export-roster'
import './index.less'
const ExportRoster = render({
    actions :{
        exportAction: ExportAction
    }
})(({props, action, state}) => {
    const {departPerInfo} = props
    let ncModelDis = departPerInfo.ncModelDis
    let exportAction = action.exportAction
    let radioSelectVal = departPerInfo.radioSelectVal
    let pk_org = departPerInfo.pk_org
    let json = departPerInfo.json
    return(
        <div className="exportRoster">
            <NCModal 
                  show={ncModelDis}
                  size={'sm'}
                  onHide={exportAction.exportModalClose}
              >
                <NCModal.Header>
                  {/* 导出花名册 */}
                  <NCModal.Title>{json['hrzzpc-000069']}</NCModal.Title>
                </NCModal.Header>
                <NCModal.Body>
                    {/* 选择花名册： */}
                    <div className="exportNotice">{json['hrzzpc-000070']}</div>
                    <div className="exportPersonRefer">
                        <PersonRefer 
                            refcode="hrhi/refer/hiref/ReportDefineGridRef/index"
                            isMultiSelectedEnabled={false}
                            onChange={exportAction.personReferChange}
                            value={departPerInfo.exportValue}
                            queryCondition={() => {
                                return {
                                    pk_org
                                }
                            }}
                        />
                    </div>
                    <NCRadio.NCRadioGroup
                        name="fruit"
                        style={{marginTop: '10px'}}
                        selectedValue={radioSelectVal}
                        onChange={exportAction.exportRadioChange}>
                        {/* 导出最新数据 */}
                        <NCRadio value="new" >{json['hrzzpc-000071']}</NCRadio>
                        {/* 导出全部数据 */}
                        <NCRadio value="all" >{json['hrzzpc-000072']}</NCRadio>
                    </NCRadio.NCRadioGroup>
                </NCModal.Body>
                <NCModal.Footer>
                  {/* 取消 */}
                  <NCButton onClick={exportAction.exportModalClose}>{json['hrzzpc-000073']}</NCButton>
                  {/* 确认 */}
                  <NCButton colors="primary" onClick={exportAction.exportRoster}>{json['hrzzpc-000074']}</NCButton>
                </NCModal.Footer>
              </NCModal>
        </div>
    )
})   

export default connect(ExportRoster)