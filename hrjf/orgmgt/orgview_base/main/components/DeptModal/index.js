import React, {Component} from 'react';
import commModal from '../CommModal';

class DeptModal extends Component {
    render() {
        const {treeTableManyCol} = this.props;
        let {treeTableCol} = treeTableManyCol;
        return (
            <div>
                {treeTableCol('subdeptgrid', {
                    async: false,    //数据同步加载为false,异步加载为true
                    showCheckBox: false,
                    showIndex: true
                })}
                {/*{
                    table.createSimpleTable('subdeptgrid', {
                        showIndex: true
                    })
                }*/}
            </div>
        );
    }
}

export default commModal(DeptModal, 'jf6005-000094');/* 国际化处理： 联查部门,联查部门*/
