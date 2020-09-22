import React from 'react';
import './index.less';
import {createPage, base} from 'nc-lightapp-front';
import {render} from 'src/hrpub/common/frame';
import MainAction from '../actions/main';
import ButtonAction from '../actions/btn';
import TableAction from '../actions/table';
import FormAction from '../actions/form';
import Layout from 'src/hrpub/common/components/Layout';
import TransItem from '../components/TransItem';
import HeaderMiddleContent from "../components/Header";
import {getAppPageConfig} from "src/hrpub/common/utils/utils";

const {NCProgressBar} = base;
const {Header, Content} = Layout;
const HomePage = render({
    actions: {
        mainAct: MainAction,
        btnAct: ButtonAction,
        tableAct: TableAction,
        formAct: FormAction
    }
})(({props, action, state}) => {
    const {table, button, main} = props;
    const {page, billid, language} = main;
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
                ><HeaderMiddleContent {...props}/></Header>
                <Content>
                    {page === 'main' ?
                        table.createSimpleTable('depthandoverlist', {
                            height: action.tableAct.getTableHeight(),
                            onRowDoubleClick: action.tableAct.browseDetail
                        }) :
                        <TransItem {...props}
                                   language={language}
                                   billid={billid}/>
                    }
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
            bodycode: 'depthandoverlist'
        }]
})(HomePage);