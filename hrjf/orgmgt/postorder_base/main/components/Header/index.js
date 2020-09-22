import React, {Component} from 'react';
import './index.less';
import {base, toast, high, promptBox} from 'nc-lightapp-front';
import templatePrint from "../../container/functions/templatePrint";
import printOutput from "../../container/functions/printOutput";
import addNewPost from "../../container/functions/addNewPost";
import deletePost from "../../container/functions/deletePost";
import checkPostInfo from "../../container/functions/checkPostInfo";

const {NCCheckbox} = base;
const {PrintOutput} = high;

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {printData: {}};
        this.onBtnOperation = this.onBtnOperation.bind(this);
    }

    onChangeHandle(type) {
        return (value) => {
            this.props.updateState({
                [type]: value
            });
        }
    }

    onBtnOperation(props, btncode, areacode, opt) {
        switch (btncode) {
            case 'add':
                checkPostInfo.call(this, this.props.pk_postseries, () => {
                    addNewPost.call(this);
                });
                break;
            case 'edit':
                checkPostInfo.call(this, this.props.pk_postseries, () => {
                    this.props.disabledAllArea(true);
                });
                break;
            case 'delete':
                checkPostInfo.call(this, this.props.pk_postseries, () => {
                    promptBox(
                        {
                            color: "warning",
                            title: this.props.json['jf6005-000153'], /* 国际化处理： 确认删除*/
                            content: this.props.json['jf6005-000253'], /* 国际化处理： 您确定要删除所选数据吗*/
                            beSureBtnClick: () => {
                                deletePost.call(this);
                            }
                        });
                });
                break;
            case 'save':
                this.props.savePostInfo();
                break;
            case 'cancel':
                promptBox(
                    {
                        color: "warning",
                        title: this.props.json['jf6005-000149'], /* 国际化处理： 确认取消*/
                        content: `${this.props.json['jf6005-000218']}?`, /* 国际化处理： 是否确认要取消*/
                        beSureBtnClick: () => {
                            this.props.disabledAllArea(false);
                        }
                    });
                break;
            case 'copy':
                checkPostInfo.call(this, this.props.pk_postseries, () => {
                    this.props.updateState({
                        copyModalVisible: true
                    });
                });
                break;
            case 'refresh':
                this.props.refreshAll();
                break;
            case 'print_group':
            case 'print':
                checkPostInfo.call(this, this.props.pk_postseries, () => {
                    templatePrint.call(this);
                });
                break;
            case 'output':
                checkPostInfo.call(this, this.props.pk_postseries, () => {
                    printOutput.call(this);
                });
                break;
            default:
                break;
        }
    }

    render() {
        const {button, showDisable, isEditing} = this.props;

        return (
            <div className="header">
                <div className="header-checkbox-group">
                    <NCCheckbox
                        disabled={isEditing}
                        checked={showDisable}
                        className="header-checkbox"
                        color="primary"
                        onChange={this.onChangeHandle('showDisable')}
                    >
                        {this.props.json['jf6005-000130']}{/* 国际化处理： 显示停用*/}
                    </NCCheckbox>
                </div>

                <div className="btn-group">
                    <div className="definition-icons">
                        {button.createButtonApp({
                            area: 'list',
                            onButtonClick: (props, btncode) => {
                                this.onBtnOperation(props, btncode, 'list', this);
                            }
                        })}
                    </div>
                </div>

                <PrintOutput
                    ref='printOutput'
                    url={'/nccloud/hrjf/postseries/printAction.do'}
                    data={this.state.printData}
                />
            </div>
        );
    }
}

export default Header;
