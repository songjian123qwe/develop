
import React from 'react';
import './index.less';
import {render} from '../../../../hrpub/common/ader';
import MainAction from '../actions/main';
import Layout from '../../../../hrpub/common/components/Layout';
import {base, high} from 'nc-lightapp-front';
import Detail from "../components/TransItem/index.js"
import NCBackBtn from 'src/hrpub/common/components/hr-back';
const {NCSelect} = base;
const {NCOption} = NCSelect;
const {Header, Content} = Layout;


export default render({
    actions: {
        ma: MainAction
    }
})(({props, state, action}) => {
    const {editTable, reception, store} = props;

    return (
        <Layout 
            className="reception-page"
        >
            <Header
                button={props.button}
                showOrgRefer={false}
                buttonOptions={{
                    area: 'head',
                    onButtonClick: action.ma.headerBtnClick
                }}
            >
                <If condition={reception.status === 'detail'}>
                    <NCBackBtn onClick={action.ma.goToBackMainPage}/>
                    {/* <div style={{clear: 'both'}}></div> */}
                </If>
            </Header>
            <Content className="bc-content">
                <If condition = {reception.status ==='main'}>
                    <div id="mainTable">
                        {editTable.createEditTable('list', {
                            showIndex: true,
                            onRowDoubleClick:action.ma.doubleClick,
                        })}
                    </div>
                </If>
                <If condition = {reception.status ==='detail'}>
                    <div id = "cardlist">
                        <Detail 
                            main={props.reception}
                            onItemChange = {action.ma.onItemChange}
                        />
                        {/* {form.createForm('card', {
                            onBeforeEvent: action.ma.formBeforeEdit,
                            onAfterEvent: action.ma.formAfterEdit
                        })}    */}
                    </div> 
                </If>
            </Content>
        </Layout>
    );

});