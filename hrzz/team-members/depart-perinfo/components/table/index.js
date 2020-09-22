import {render,connect} from '../../../../../hrpub/common/frame';
import  Pagination from '../../../../../hrpub/common/components/Pagination/index'
import TableAction from '../../actions/table'
import './index.less'
const Table = render({
    actions :{
        tableAction: TableAction
    }
})(({props, action, state}) => {
    const {cardTable, departPerInfo} = props
    const {createCardTable} = cardTable
    const H = action.tableAction.getHeight()
    let showModel = departPerInfo.showModel
    let shwoCardTable = departPerInfo.shwoCardTable
    return(
        <div className="departPerInfoTable nc-bill-table-area" style={{display: showModel === 'tableList' ? '' : 'none'}}>
            {
                shwoCardTable ? createCardTable('psnlist',{
                                    height: H,
                                    onRowDoubleClick: action.tableAction.onRowDoubleClick
                                }) : ''
            }
            <div className="pagination">
                {departPerInfo.pageInfo.total ? <Pagination
                    total = {departPerInfo.pageInfo.total}
                    pageSize = {departPerInfo.pageInfo.pageSize}
                    showQuickJumper ={true}
                    showSizeChanger = {true}
                    // current = {state.pageInfo.pageIndex}
                    onChange = {action.tableAction.paginationEve}
                    onShowSizeChange = {action.tableAction.pageSizeSelect}
                /> :null}
            </div>
        </div>
    )
})   

export default connect(Table)