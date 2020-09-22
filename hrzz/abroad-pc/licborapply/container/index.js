import React from 'react';
import pageConfig from './config';

import './index.less';
import { getAppPageConfig } from 'src/hrpub/common/utils/utils.js';
const {
    components: {
        //弹窗
        AddPage,
        FileManager,
        HeaderMiddleContent,
        Layout,
        Pagination,
        EmptyPage,
    },
    actions,
    methods: {
        createPage,
        high,
        render
    }
} = pageConfig;

const { Header, Left, Content } = Layout;
const { ApproveDetail, ApprovalTrans } = high;

const HomePage = render({
    actions: actions
})(({ props, action, state }) => {

    const { emp, button, editTable, search } = props;
    const {dark} = emp;
    const darkBack = dark ? 'dark-back' : '';
    return (
        <div className={`${darkBack}`}>
            <Choose>
                <When condition={emp.page === 'main'}>
                    {/* 头部 */}
                        <Header
                            {...props}
                            // showButtons={!!emp.orgValue}
                            showOrgRefer={false}
                            orgReferOptions={{
                                //人力组织改变
                                getOrgData: action.btnAct.changeOrg,
                                orgVal: emp.orgValue,
                                // disabled: true
                            }}
                            buttonOptions={{
                                area: 'head',
                                //列表页面，点击后事件
                                onButtonClick: action.btnAct.headerClick
                            }}
                            // button={button}
                            // style={{
                            //     height: 'auto'
                            // }}
                        >  
                        <div>
                            {/* <If condition={!!emp.orgValue}> */}
                                {/* 头部中间内容 */}
                                <HeaderMiddleContent/>
                            {/* </If> */}
                        </div>
                    </Header >
                        {/* 内容 */}
                        <Content
                            className="pageContent"
                        >
                            <div className="employing-main-table-wrapper">
                                <If condition={emp.templateFlag}>
                                    <div id="mainTable">
                                        {emp.templateFlag?editTable.createEditTable('list', {
                                            showIndex: true,
                                            // showCheck: true,
                                            onSelectedAll: action.tableAct.selectAll,
                                            onRowDoubleClick: action.tableAct.doubleClick,
                                            height: emp.pageHeight - 128,
                                            // onSelected: action.tableAct.selectOneRow
                                        }):null}
                                    </div>
                                    <div
                                        style={{
                                            marginTop: '10px',
                                            paddingRight: '20px'
                                        }}
                                    >
                                        <If condition={emp.pageInfo.total > 0}>
                                            {/* 页码  */}
                                            <Pagination
                                                current={emp.pageInfo.pageIndex}
                                                pageSize={emp.pageInfo.pageSize}
                                                total={emp.pageInfo.total}
                                                showSizeChanger={true}
                                                showQuickJumper={true}
                                                onChange={action.pageAct.turnPage}
                                                onShowSizeChange={action.pageAct.changePageSize}
                                            />
                                        </If>

                                    </div>
                                    <Else />
                                    <EmptyPage
                                        text={emp.language['ga6013-000033']}//暂无数据，请先选择人力组织
                                    />
                                </If>
                            </div>
                        </Content>
                        <div style={{
                            display: 'none'
                        }}>
                            {search.NCCreateSearch('querybill', {
                                clickSearchBtn: action.btnAct.toSearch
                            })}
                        </div>
                </When>
                <When condition={emp.page === 'add' || emp.page === 'edit'}>
                    <AddPage
                        {...props}
                    />
                </When>
            </Choose>
            <If condition={emp.approveModalVisible}>
                 {/* 审批详情页面  */}
                <ApproveDetail
                    show={true}
                    close={action.mainAct.closeModal('approveModalVisible')}
                    billtype={emp.approveBillType}
                    billid={emp.approveBillId}
                />
            </If>
            <If condition={emp.compositedisplay}>
            <ApprovalTrans
                    title={emp.language['ga6013-000059']}  //国际化处理： 指派
                    data={emp.compositedata}
                    display={emp.compositedisplay}
                    getResult={action.rowAct.getResult}
                    cancel={action.rowAct.turnOff}
                />
            </If>
            <If condition={emp.fileManagerModalVisible}>
                {/* 附件管理窗口  */}
                <FileManager
                    language={emp.language}
                    billId={emp.fileManagerBillId}
                    onClose={action.mainAct.closeModal('fileManagerModalVisible')}
                    isDisableUpload={emp.isDisableUpload}
                />
            </If>
        </div>
    );
})

// export default (HomePage);
export default createPage({
    billinfo: [{
        billtype: 'grid',
        pagecode: getAppPageConfig().pagecode,
        bodycode: 'list',
    },
    {
        billtype: 'form',
        pagecode: getAppPageConfig().pagecode,
        headcode: 'card',
    }]
})(HomePage);