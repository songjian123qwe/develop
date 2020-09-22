/**
 * 岗位关系树
 */
import React, {Component} from 'react';

import './index.less';

import {
    base
} from 'nc-lightapp-front';
import HRTree from '../../../../public/components/hrTree/index'
import ViewPostTreeAction from "./functions/ViewPostTreeAction";

const {
    NCModal,
    NCButton,
    NCCheckbox
} = base;

const {
    Header: NCModalHeader,
    Body: NCModalBody,
    Footer: NCModalFooter
} = NCModal;

class ViewPostModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: props.json,
            inlt: props.json,
            deptTreeData: [], //组织树数据
            enablestate: false //   是否包含撤销
        };
        this.closeInfoModal = this.closeInfoModal.bind(this);
    }

    componentWillReceiveProps(nextprops) {
        let nextjson = JSON.stringify(nextprops.json);
        let thisjson = JSON.stringify(this.props.json);
        let nextinlt = JSON.stringify(nextprops.inlt);
        let thisinlt = JSON.stringify(this.props.inlt);
        if (nextjson !== thisjson || nextinlt !== thisinlt) {
            this.setState({
                json: nextprops.json,
                inlt: nextprops.inlt,
            })
        }
    }

    /**
     * 是否包含撤销
     * @param val
     */
    onCheckShowDisable(val) {

        /* 国际化处理： 是否包含撤销 = */
        this.setState({
            enablestate: val
        }, () => {
            this.viewPostTreeAction()
        })
    }

    closeInfoModal() {
        this.props.updateState({
            viewPostVisible: false
        });
    }

    /**
     * 岗位组织书查询
     */
    viewPostTreeAction(){

        ViewPostTreeAction(this.props.queryActionPkorg,this.state.enablestate).then(res=>{
            if(!res.data) return;
            this.setState({
                deptTreeData:res.data
            })
        })
    }
    render() {
        const {
            viewPostVisible,
        } = this.props;
        return (
            <NCModal
                backdrop ="static"
                show={viewPostVisible}
                size="lg"
                className="view-post-container"
                onHide={this.closeInfoModal}
                // onEntered={this.showHandle}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {this.state.json['jf6005-000145']}{/* 国际化处理： 岗位关系树*/}
                </NCModalHeader>
                <NCModalBody>
                    <div className={'tree-box'}>
                        <HRTree treeData={this.state.deptTreeData} config={
                            {
                                root: {
                                    title: this.state.json['jf6005-000373'],  /* 岗位*/
                                    key: 'null'
                                },
                                showLine: true,
                                // checkStrictly: !this.state.checkStrictly, // 是否包含下级
                                defaultExpandAll: true,
                                checkable: false
                            }
                        }/>
                    </div>
                    <div className={'show-off'}>
                        <NCCheckbox checked={this.state.enablestate} onChange={
                            this.onCheckShowDisable.bind(this)
                        }>{this.state.json['jf6005-000023']}</NCCheckbox>{/* 国际化处理： 显示撤销*/}
                    </div>
                </NCModalBody>
                <NCModalFooter>
                    <NCButton
                        colors="secondary"
                        onClick={this.closeInfoModal}
                    >
                        {this.state.json['jf6005-000031']}{/* 国际化处理： 关闭*/}
                    </NCButton>
                </NCModalFooter>
            </NCModal>
        );
    }
}

export default ViewPostModal
