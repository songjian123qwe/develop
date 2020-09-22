import {render,connect} from '../../../../../hrpub/common/frame';
import { base } from 'nc-lightapp-front'
import './index.less'
import '../../../../../hrpub/common/static/fonts/iconfont.css'
import NCBackBtn from '../../../../../hrpub/common/components/hr-back';
import HeaderAction from '../../actions/header'
const {NCSelect, NCButton} = base;
const NCOption = NCSelect.NCOption;
const Header = render({
    actions :{
        headerAction: HeaderAction
    }
})(({props, action, state}) => {
    const {departPerInfo, cardPagination} = props
    let {createCardPagination} = cardPagination
    let showModel = departPerInfo.showModel
    let paginationShow = departPerInfo.paginationShow
    const {exportBtnDis, json, selectArr} = departPerInfo
    let selectDom  = selectArr.map(item => {
        return (
            <NCOption value={item.hashValue.pk_dept}>{item.hashValue.name}</NCOption>
        )
    })
    return(
        <div className = "header nc-bill-header-area">
            <div className="header-panel">
                <div style={{display: showModel === 'detail' ? '' : 'none'}}>
                    <NCBackBtn onClick={action.headerAction.backBtnClick}/>
                </div>
                <div style={{display: showModel !== 'detail' ? '' : 'none'}}>
                    {/* 全部部门 */}
                    <NCSelect
                        style={{ width: '200px'}}
                        placeholder={json['hrzzpc-000075']}
                        onChange={action.headerAction.selectChange}
                    >
                        {
                            selectDom
                        }
                    </NCSelect>
                </div>
            </div>
            <div className="searchCon" style={{display: showModel !== 'detail' ? '' : 'none'}}>
                {/* 请输入关键字搜索 */}
                <input value={departPerInfo.qryStr} onChange={action.headerAction.searchIptChange} className="searconIpt" type="text" placeholder={json['hrzzpc-000076']}/>
                {/* 搜索 */}
                <div className="searchText hrfont hr-sousuo" onClick={action.headerAction.searchBtnFun}>{json['hrzzpc-000077']}</div>
            </div>
            <div className="btn-group">
                {/* 导出花名册 */}
                <NCButton disabled={exportBtnDis} style={{display: showModel !== 'detail' ? '' : 'none'}} colors="primary" onClick={action.headerAction.btnClick}>{json['hrzzpc-000069']}</NCButton>
                <div style={{display: showModel === 'detail' ? '' : 'none'}}>
                    {
                        paginationShow ? createCardPagination({
                            handlePageInfoChange: action.headerAction.handlePageInfoChange,
                            urlPkname: 'cardPagination'
                        }) : ''
                    }
                </div>
            </div>
        </div>
    )
})   

export default connect(Header)