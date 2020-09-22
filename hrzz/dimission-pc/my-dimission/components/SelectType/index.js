import React, {Component} from 'react';
import './index.less';
import {toast} from 'nc-lightapp-front';
import TrnsRefer from "src/hrhi/refer/hiref/TrnsTypeGridRef";

class SelectType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transType: {}
        }
    }

    confirmSelect = () => {
        const {main} = this.props;
        const {language} = main;
        const {transType} = this.state;
        if (!transType.refpk) {
            toast({color: 'warning', content: language['hrzzpc-000106']});
            return;
        }
        this.props.onConfirm(this.state);
        this.closeModal();
    };

    closeModal = () => {
        this.props.modal.close('selectType');
        this.setState({
            transType: {}
        })
    };

    render() {
        const {modal, main} = this.props;
        const {language} = main;
        const {createModal} = modal;
        const {transType} = this.state;
        const selectTypeCont = (that) => {
            return <div className={'lightapp-component-form'}>
                <span>
                    <div className="leftspace form-item" style={{width: '0%'}}/>
                    <div
                        className="bill_code js-type-input form-item" style={{width: '100%'}}>
                        <div className="form-item-label">
                            <span className="u-mast">*</span>
                            {language['hrzzpc-000107']}
                            <span className="form-item-colon"/>
                        </div>
                        <div className="form-item-control ">
                            <div className="form-component-item-wrapper refer-wrapper edit">
                                <TrnsRefer
                                    onChange={(v) => this.setState({transType: v})}
                                    value={transType}
                                    placeholder={language['hrzzpc-000107']} //离职业务类型
                                    refName={language['hrzzpc-000107']}
                                    queryCondition={() => {
                                        return {
                                            "GridRefActionExt": "nccloud.web.hrzz.mydimissionapply.sqlbuilder.MyDimissionTypeRefSqlBuilder",
                                            trnsEvent: 4
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