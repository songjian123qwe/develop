import React, {Component} from 'react';
import './index.less';
import {base, toast} from 'nc-lightapp-front';
import TrnsRefer from "src/hrhi/refer/hiref/TrnsTypeGridRef";

const {NCSelect} = base;

class SelectType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transMode: undefined,
            transType: {}
        }
    }

    confirmSelect = () => {
        const {main} = this.props;
        const {language} = main;
        const {transMode, transType} = this.state;
        if (!transMode || !transType.refpk) {
            toast({color: 'warning', content: language['hrzzpc-000105']});
            return;
        }
        this.props.onConfirm(this.state);
        this.closeModal();
    };

    closeModal = () => {
        this.props.modal.close('selectType');
        this.setState({
            transMode: undefined,
            transType: {}
        })
    };

    render() {
        const {modal, main} = this.props;
        const {language} = main;
        const {createModal} = modal;
        const {transMode, transType} = this.state;
        const transModeList = [{
            value: '1',
            key: language['hrzzpc-000098'],
        }, {
            value: '2',
            key: language['hrzzpc-000099'], // 调出
        }/*, {
            value: '3',
            key: language['hrzzpc-000100'],//   调入
        }*/];
        const selectTypeCont = (that) => {
            return <div className={'lightapp-component-form'}>
                <span>
                    <div className="leftspace form-item" style={{width: '0%'}}/>
                    <div
                        className="bill_code js-type-input form-item" style={{width: '100%'}}>
                        <div className="form-item-label">
                            <span className="u-mast">*</span>
                            {language['hrzzpc-000101']}
                            <span className="form-item-colon"/>
                        </div>
                        <div className="form-item-control ">
                            <div className="form-component-item-wrapper select-wrapper edit">
                                <NCSelect
                                    placeholder={language['hrzzpc-000101']}
                                    onChange={(v) => this.setState({transMode: v})}
                                    data={transModeList}
                                    value={transMode}
                                    onClear={() => this.setState({transMode: undefined})}
                                />
                            </div>
                        </div>
                    </div>
                </span>
                <span>
                    <div className="leftspace form-item" style={{width: '0%'}}/>
                    <div
                        className="bill_code js-type-input form-item" style={{width: '100%'}}>
                        <div className="form-item-label">
                            <span className="u-mast">*</span>
                            {language['hrzzpc-000102']}<span className="form-item-colon"/>
                        </div>
                        <div className="form-item-control ">
                            <div className="form-component-item-wrapper refer-wrapper edit">
                                <TrnsRefer
                                    onChange={(v) => this.setState({transType: v})}
                                    value={transType}
                                    placeholder={language['hrzzpc-000102']} //调配业务类型
                                    refName={language['hrzzpc-000102']}
                                    queryCondition={() => {
                                        return {
                                            "GridRefActionExt": "nccloud.web.hrzz.mytransapply.sqlbuilder.MyTransTypeRefSqlBuilder",
                                            trnsEvent: 3
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </span>
            </div>
        };
        return (
            <div>
                {
                    createModal('selectType', {
                        title: language['hrzzpc-000103'],
                        content: selectTypeCont.call(this),
                        size: 'sm',
                        hasBackDrop: true,
                        beSureBtnClick: this.confirmSelect,
                        cancelBtnClick: this.closeModal, //取消按钮事件回调
                        closeModalEve: this.closeModal,
                        userControl: true
                    })
                }
            </div>
        );
    }
}

export default SelectType;