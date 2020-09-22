import {render,connect} from '../../../../../hrpub/common/frame';
import BarAction from '../../actions/bar'
const Bar = render({
    actions :{
        barAction: BarAction
    }
})(({props, action, state}) => {
    const {barId} = props
    return(
        <div id={barId} style={{height: '100%'}}>
            
        </div>
    )
})   

export default connect(Bar)