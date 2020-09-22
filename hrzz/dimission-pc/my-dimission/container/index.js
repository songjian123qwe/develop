import React from 'react';
import './index.less';
import {high, createPage} from 'nc-lightapp-front';
import {render} from 'src/hrpub/common/frame';
import MainAction from '../actions/main';
import ButtonAction from '../actions/btn';
import TableAction from '../actions/table';
import FormAction from '../actions/form';
import TransAction from '../components/TransItem/actions';
import DisAction from '../actions/tree';
import Layout from 'src/hrpub/common/components/Layout';
import HeaderMiddleContent from '../components/Header';
import Pagination from "src/hrpub/common/components/Pagination";
import Uploader from "../components/Uploader";
import SelectType from "../components/SelectType";
import TransItem from "../components/TransItem";
import DisList from "../components/DisList";
import TransModel from "../components/translate/index.js";
import AssignApprover from "../components/AssignApprover";
import {getAppPageConfig} from "src/hrpub/common/utils/utils";

const {ApproveDetail} = high;

const {Header, Content} = Layout;
const HomePage = render({
    actions: {
        mainAct: MainAction,
        btnAct: ButtonAction,
        tableAct: TableAction,
        formAct: FormAction,
        transAct: TransAction,
        disAct: DisAction
    }
})(({props, action, state}) => {
    const {button, table, form, main, cardPagination} = props;
    const {pageInfo, page, psndoc, showUploader, showFlow, billid, billtype, isEdit, isDisableUpload} = main;
    const {createCardPagination} = cardPagination;
    return (
        <div>
            <Layout className="entry-order nc-bill-card">
                <Header
                    showButtons={true}
                    showOrgRefer={false}
                    buttonOptions={{
                        area: 'head',
                        onButtonClick: action.btnAct.headerClick
                    }}
                    button={button}
                    customButton={page === 'detail' && !isEdit ? createCardPagination({handlePageInfoChange: action.formAct.pageQueryClick}) : null}
                ><HeaderMiddleContent {...props}/></Header>
                <Content>
                    <div style={{display: page === 'main' ? '' : 'none'}}>
                        {table.createSimpleTable('list', {
                            height: action.tableAct.getTableHeight(),
                            onRowDoubleClick: action.formAct.checkOneBill
                        })}
                        {pageInfo.total > 0 && <Pagination
                            current={parseInt(pageInfo.pageIndex)}
                            pageSize={parseInt(pageInfo.pageSize)}
                            pageSizeOptions={[5, 10, 20, 50, 100]}
                            showSizeChanger={true}
                            total={pageInfo.total}
                            onShowSizeChange={action.tableAct.pageSizeChange}
                            onChange={action.tableAct.changePage}
                        />}
                    </div>
                    <div style={{display: page === 'detail' ? '' : 'none'}}>
                        {form.createForm('card', {
                            onBeforeEvent: action.formAct.formBeforeEdit,
                            onAfterEvent: action.formAct.formAfterEdit
                        })}
                    </div>
                    <If condition={page === 'transItem'}>
                        <TransItem {...props}/>
                    </If>
                    <If condition={page === 'disList'}>
                        <DisList {...props} onTreeSelect={action.disAct.onTreeSelect}/>
                    </If>
                    <If condition={showUploader}>
                        <Uploader
                            isDisableUpload={isDisableUpload}
                            psndoc={psndoc}
                            onClose={action.formAct.closeFileManage}/>
                    </If>
                    <ApproveDetail
                        show={showFlow}
                        billtype={billtype}
                        billid={billid}
                        close={action.formAct.closeFlow}
                    />
                    <If condition = {main.transDisplay}>
                        <TransModel
                            title={"指派"}  /* 国际化处理： 指派*/
                            dataSource={main.transData}
                            targetKeys={main.targetData}
                            visible={main.transDisplay}
                            onChange={action.transAct.transferChange}
                            language={main.language}
                            onClick={action.transAct.tranSure}
                            onClose={action.transAct.turnOff}
                            MultiInit={props.MultiInit}
                            
                        />
                    </If>
                   
                    <SelectType {...props}
                                onConfirm={action.formAct.confirmAdd}/>
                    <AssignApprover {...props}/>
                </Content>
            </Layout>
        </div>
    );
});

export default createPage({
    billinfo: [
        {
            billtype: 'grid',
            pagecode: getAppPageConfig().appcode,
            bodycode: 'list'
        },
        {
            billtype: 'form',
            pagecode: getAppPageConfig().appcode,
            headcode: 'card'
        }, {
            billtype: 'grid',
            pagecode: getAppPageConfig().appcode,
            bodycode: 'handoverdetailgrid'
        }]
})(HomePage);