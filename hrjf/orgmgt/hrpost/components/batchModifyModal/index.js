/**
 * 批改
 */
import React, {Component} from 'react';

import './index.less';

import {
    base,
    toast
} from 'nc-lightapp-front';
import PostBatchEditAction from "./functions/PostBatchEditAction";
import PostBatchEditExecAction from "./functions/PostBatchEditExecAction";
import PostBatchEditFieldChgAction from "./functions/PostBatchEditFieldChgAction";
import {isArray} from "../../../../public/components/transferTable/transfer/public";
import {saveValidate} from "../../../../public/functions/orgtools";

const {
    NCModal,
    NCButton
} = base;
const {
    Header: NCModalHeader,
    Body: NCModalBody,
    Footer: NCModalFooter
} = NCModal;

const formid = 'batchedit';

class BatchModifyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: props.json,
            inlt: props.json,
        };
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.saveVersionInfo = this.saveVersionInfo.bind(this);
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
     * 关闭模块
     */
    closeInfoModal() {
        this.props.updateState({
            batchModifyVisible: false
        });
        this.initParam();
    }

    /**
     * 保存
     */
    saveVersionInfo() {
        // 表单验证
        if(!this.props.form.isCheckNow(formid)){
            return
        }

        this.postBatchEditExecAction();
    }

    /**
     * form表单修改后事件
     */
    onAfterFormEvent = (props, moduleId, key, value, oldValue) => {
        if(key === 'field'){
            let field_code = value.value;
            console.log(field_code);
            this.postBatchEditFieldChgAction(field_code);
        }
    };

    /**
     * 查询
     */
    postBatchEditAction = () => {
        let selPostPks = this.getSelPostPks();
        PostBatchEditAction(selPostPks).then(res => {
            if(!res.data) return;
            this.props.form.setFormStatus(formid,'edit');
            // this.props.form.setAllFormValue({[formid]:res.data})
            let meta = this.props.meta.getMeta();
            meta[formid] = res.data;
            this.props.meta.setMeta(meta);
        })
    };

    /**
     * 批改信息项变化 岗位批改
     */
    postBatchEditFieldChgAction = (field_code) => {
        let selPostPks;
        selPostPks = this.getSelPostPks();
        PostBatchEditFieldChgAction(field_code, selPostPks).then(res => {
            if(!res.data) return;
            let meta = this.props.meta.getMeta();
            meta[formid].items.map((item, index, arr)=>{
                if(item.attrcode === 'value'){
                    if(isArray(res.data.items)){
                        arr[index] = res.data.items.filter(item=>{
                            return item.attrcode === 'value'
                        })[0]
                    }

                }
            });
            // debugger
            // meta[formid] = res.data;
            this.props.meta.setMeta(meta);
        })
    };

    /**
     * 执行 岗位批改
     */
    postBatchEditExecAction = () => {
        let templateid = this.props.pageidObj[formid];
        saveValidate(this.props, formid, formid, null, 'form', null, templateid).then(()=>{
            let model, selPostPks;
            model = this.props.form.getAllFormValue(formid);
            selPostPks = this.getSelPostPks();
            PostBatchEditExecAction(model, selPostPks).then(res => {
                this.props.refresh();
                toast({
                    color: "success",
                    content: this.state.json['jf6005-000380']/* 国际化处理： 批量修改成功!*/
                });
                this.closeInfoModal();
            })
        })
    };

    getSelPostPks() {
        let selpostpks = [];
        let rows = this.props.editTable.getCheckedRows('postlist');
        rows.map(item => {
            selpostpks.push(item.data.values.pk_post.value);
        });
        return selpostpks.join(',')
    }

    /**
     * 初始化参数
     */
    initParam() {
        this.props.form.EmptyAllFormValue(formid);
    }


    updateState(data, cb = () => {
    }) {
        this.setState(data, cb);
    }

    render() {
        const {
            form,
            batchModifyVisible
        } = this.props;
        return (
            <NCModal
                backdrop="static"
                show={batchModifyVisible}
                size="lg"
                className="batch-modify-modal"
                onHide={this.closeInfoModal}
                onEntered={this.showHandle}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {this.state.json['jf6005-000379']}{/* 国际化处理： 批量修改*/}
                </NCModalHeader>
                <NCModalBody>
                    <div className={'form-box'}>
                        {form.createForm(formid, {
                            onAfterEvent: this.onAfterFormEvent
                        })}
                    </div>
                </NCModalBody>
                <NCModalFooter>
                    <NCButton
                        colors="primary"
                        onClick={this.saveVersionInfo}
                    >
                        {this.state.json['jf6005-000007']}{/* 国际化处理： 确认*/}
                    </NCButton>
                    <NCButton
                        colors="secondary"
                        onClick={this.closeInfoModal}
                    >
                        {this.state.json['jf6005-000008']}{/* 国际化处理： 取消*/}
                    </NCButton>
                </NCModalFooter>
            </NCModal>
        );
    }
}

export default BatchModifyModal
