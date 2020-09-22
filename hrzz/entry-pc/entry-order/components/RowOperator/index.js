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
        const isFree = record && record.approve_state && record.approve_state.value === '-1';
        const isSubmit = record && record.approve_state && record.approve_state.value === '3';
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
                        <If condition={isFree && btnConf.findIndex(btn => btn.key === 'commit') > -1}>
                            <Item
                                key="commit"
                            >
                                <a href="javascript:void(0)">
                                    {language['hrzzpc-000092']}
                                </a>
                            </Item>
                        </If>
                        <If condition={isSubmit && btnConf.findIndex(btn => btn.key === 'recover') > -1}>
                            <Item
                                key="recover"
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
                        <If condition={isFree && btnConf.findIndex(btn => btn.key === 'del') > -1}>
                            <Item
                                key="del"
                            >
                                <a href="javascript:void(0)">
                                    {language['hrzzpc-000085']}
                                </a>
                            </Item>
                        </If>
                        <If condition={btnConf.findIndex(btn => btn.key === 'check_flow') > -1}>
                            <Item
                                key="check_flow"
                            >
                                <a href="javascript:void(0)">
                                    {language['hrzzpc-000141']}
                                </a>
                            </Item>
                        </If>
                    </NCSubMenu>
                </NCMenu>
            </div>
        );
    }
}