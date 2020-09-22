import React from 'react';
import './index.less';
import {createPage, base} from 'nc-lightapp-front';
import {render} from 'src/hrpub/common/frame';
import MainAction from '../actions/main';
import BtnAction from '../actions/btn';
import Layout from 'src/hrpub/common/components/Layout';
import TableAction from '../actions/table';
import HeaderMiddleContent from "../components/Header";

const {Header, Content} = Layout;
const HomePage = render({
    actions: {
        mainAct: MainAction,
        tableAct: TableAction,
        btnAct: BtnAction
    }
})(({props, action, state}) => {
    const {cardTable, button, main} = props;
    const {language, allPeriod} = main;
    return (
        <div>
            <Layout className={'my-bmfile-pc nc-bill-card'}>
                <Header
                    showOrgRefer={false}
                    buttonOptions={{
                        area: 'list',
                        onButtonClick: action.btnAct.headerClick
                    }}
                    button={button}
                >
                    <HeaderMiddleContent {...props}/>
                </Header>
                <Content>
                    <div className='all-period'>
                        {
                            allPeriod.map(period => cardTable.createCardTable(period, {
                                showIndex: true,
                                showCheck: false,
                                cancelCustomRightMenu: true,
                                hideSwitch: () => {
                                    return false
                                }
                            }))
                        }
                    </div>
                </Content>
            </Layout>
        </div>
    );
});

export default createPage({})(HomePage);