import {render,connect} from '../../../../../hrpub/common/frame';
import PieAction from '../../actions/pie'
const Pie = render({
    actions :{
        pieAction: PieAction
    }
})(({props, action, state}) => {
    const {pieId} = props
    return(
        <div id={pieId} style={{height: '100%'}}>
            
        </div>
    )
})   

export default connect(Pie)