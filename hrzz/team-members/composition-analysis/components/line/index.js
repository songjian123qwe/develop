import {render,connect} from '../../../../../hrpub/common/frame';
import LineAction from '../../actions/line'
const Line = render({
    actions :{
        lineAction: LineAction
    }
})(({props, action, state}) => {
    const {lineId} = props
    return(
        <div id={lineId} style={{height: '100%'}}>
            
        </div>
    )
})   

export default connect(Line)