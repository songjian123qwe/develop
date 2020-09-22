import React from 'react';
import './index.less';
import {createPage, base} from 'nc-lightapp-front';
import {render} from 'src/hrpub/common/frame';
import MainAction from '../actions/main';
import ButtonAction from '../actions/btn';
import TreeAction from '../actions/tree';
import TableAction from '../actions/table';
import Layout from 'src/hrpub/common/components/Layout';
import LeftTree from "../components/LeftTree";
import {getAppPageConfig} from "../../../../hrpub/common/utils/utils";

const {NCProgressBar} = base;
const {Header, Content, Left} = Layout;
const HomePage = render({
    actions: {
        mainAct: MainAction,
        btnAct: ButtonAction,
        treeAct: TreeAction,
        tableAct: TableAction
    }
})(({props, action, state}) => {
    const {table, button, main} = props;
    const {process, language} = main;
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
                >
                    <div className="entry-process">
                        <div>{language['hrzzpc-000118']}</div>
                        <NCProgressBar style={{width: 1.4 * process}}/>
                        <div>{process}%</div>
                    </div>
                </Header>
                <Left
                    style={{
                        top: '54px'
                    }}
                >
                    <LeftTree
                        {...props}
                        onTreeSelect={action.treeAct.onTreeSelect}
                    />
                </Left>
                <Content
                    style={{
                        marginLeft: '250px'
                    }}>
                    {table.createSimpleTable('entryflowlist')}
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
            bodycode: 'entryflowlist'
        }]
})(HomePage);