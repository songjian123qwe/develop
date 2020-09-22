import React from 'react';
import './index.less';
import {base} from 'nc-lightapp-front';

const {NCMenu} = base;
const {NCSubMenu, Item} = NCMenu;

export default class RowOperator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {language, onClick, record, btnConf} = this.props;
        const isFree = record && record.workflow_state && record.workflow_state.value === '-1';
        const isSubmit = record && record.workflow_state && record.workflow_state.value === '3';
        const showDeptTrans = record && record.workflow_state && (record.workflow_state.value === '1' || record.workflow_state.value === '4');
        const showDisList = record && record.workflow_state && record.workflow_state.value === '5';
        return (
            <div className="main-table-operator-btn">
                <NCMenu
                    mode="vertical"
                    className="main-table-operator-menu"
                    onClick={event => onClick(event.key, record)}
                    selectedKeys={[]}
                >
                    <NCSubMenu
                        title={language['hrzzpc-000084']/* "操作" */}
                        className="sub-menu-dom"
                    >
                        <If condition={isFree && btnConf.findIndex(btn => btn.key === 'submit') > -1}>
                            <Item
                                key="submit"
                            >
                                <a href="javascript:void(0)">
                                    {language['hrzzpc-000092']}
                                </a>
                            </Item>
                        </If>
                        <If condition={isSubmit && btnConf.findIndex(btn => btn.key === 'callback') > -1}>
                            <Item
                                key="takeBack"
                            >
                                <a href="javascript:void(0)">
                                    {language['hrzzpc-000093']}
                                </a>
                            </Item>
                        </If>
                        <If condition={isFree && btnConf.findIndex(btn => btn.key === 'edit') > -1}>
                            <Item
                                key="edit"
                            >
                                <a href="javascript:void(0)">
                                    {language['hrzzpc-000087']}
                                </a>
                            </Item>
                        </If>
                        <If condition={isFree && btnConf.findIndex(btn => btn.key === 'delete') > -1}>
                            <Item
                                key="delete"
                            >
                                <a href="javascript:void(0)">
                                    {language['hrzzpc-000085']}
                                </a>
                            </Item>
                        </If>
                        <If condition={btnConf.findIndex(btn => btn.key === 'check_flow') > -1}>
                            <Item
                                key="checkWorkflow"
                            >
                                <a href="javascript:void(0)">
                                    {language['hrzzpc-000141']}
                                </a>
                            </Item>
                        </If>
                        {/*<If condition={showDeptTrans && btnConf.findIndex(btn => btn.key === 'dept_trans') > -1}>
                            <Item
                                key="deptTrans"
                            >
                                <a href="javascript:void(0)">
                                    {language['hrzzpc-000110']}
                                </a>
                            </Item>
                        </If>*/}
                        <If condition={showDisList && btnConf.findIndex(btn => btn.key === 'dimission_list') > -1}>
                            <Item
                                key="disList"
                            >
                                <a href="javascript:void(0)">
                                    {language['hrzzpc-000111']}
                                </a>
                            </Item>
                        </If>
                    </NCSubMenu>
                </NCMenu>
            </div>
        );
    }
}