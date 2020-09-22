import React from 'react'

import {connect} from '../../../../../hrpub/common/store';

import Pagination from '../../../../../hrpub/common/components/Pagination';

import render from '../../../../../hrpub/common/frame/render';

import tableAct from '../../actions/table'

import './index.less'

import { base } from 'nc-lightapp-front';

let { NCSelect, NCRow, NCCol, NCCheckbox, NCButton, NCSwitch, NCMenu,NCItem, NCIcon } = base;


const TableView = render({
    actions: {
        tableAct: tableAct,
        // main: main,
    }
})(({props, action, state}) => {
    const { editTable ,exam } = props;
    let { createEditTable } = editTable;
    return (
        <div>
       
            {exam.templateFlag?(createEditTable(
                'list',    //表格id
                {
                    showIndex: true,
                    // showCheck: true,
                    onRowDoubleClick:props.table.doubleClick,
                    height: exam.height
                }
            )):null}
             <div
                style={{
                    marginTop: '10px',
                    marginRight:'20px',
                    display:exam.allpks.length>0?'':'none'
                }}
            >
                <Pagination
                    current={exam.pageInfo.pageIndex}
                    pageSize={exam.pageInfo.pageSize}
                    showSizeChanger={true}
                    showQuickJumper={true}
                    total={exam.pageInfo.total}
                    onChange={props.main.turnPage}
                    onShowSizeChange={props.main.changePageSize}
                />
            </div>
        </div>
        
    );

});
export default connect(TableView);