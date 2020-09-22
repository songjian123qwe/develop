import {render,connect} from '../../../../../hrpub/common/frame';
import { base } from 'nc-lightapp-front'
import DetailAction from '../../actions/detail'
import './index.less'
const {NCAnchor, NCScrollElement, NCScrollLink, NCToggleViewBtn} = base;
const DetailInfo = render({
    actions :{
        detailAction: DetailAction
    }
})(({props, action, state}) => {
    const {departPerInfo, form, cardTable} = props
    const {createForm} = form 
    const {createCardTable} = cardTable
    let showModel = departPerInfo.showModel
    let allAreaList = departPerInfo.allAreaList
    let NCScrollLinkList = allAreaList.map(item => {
        return (
            <NCScrollLink
                to={item.code}
                spy={true}
                smooth={true}
                duration={300}
                offset={-100}
                containerId='scrollContent' 
                clickFun={action.detailAction.clickDetailDomFun.bind(this, item.code)}
            >
                <p>{item.name}</p>
            </NCScrollLink>
        )
    })
    let NCScrollElementList = allAreaList.map(item => {
        return (
            <NCScrollElement name={item.code}>
                {
                    item.moduletype === 'form' ? 
                    <div className="add-new-page-form-wrapper">
                        <div className="add-new-page-title">
                            {item.name}
                        </div>
                        {item.code === 'bd_psndoc' &&
                        <div className="uploader-photo-wrapper">
                            {departPerInfo.baseInfoPhoto && <img
                                src={departPerInfo.baseInfoPhoto}
                                className="photo-show-box"
                            />}
                        </div>}
                        {createForm(item.code)}
                    </div> : createCardTable(item.code, {
                        onHeadAngleToggle: action.detailAction.onHeadAngleToggle
                    })
                }
            </NCScrollElement>
        )
    })
    return(
        <div className = "detailInfo" style={{display: showModel === 'detail' ? 'block' : 'none'}}>
            <div className="detailInfoCon">
                <NCAnchor>
                    {NCScrollLinkList}
                </NCAnchor>
                <div id="scrollContent">
                    {NCScrollElementList}
                </div>
            </div>
        </div>
    )
})   

export default connect(DetailInfo)