import React, {Component} from 'react';
import {Container, CreateMeta} from 'src/hrzz/public/hr-mobile-card';
import './index.less'
import {Alert, DHeader} from "src/hrzz/public/mobile/components";
import {Button, Toast} from 'antd-mobile';
import NativeObj from 'src/hrzz/public/mobile/utils/jsbridge';
import AddButton from 'src/hrzz/public/mobile/components/Other/AddButton';
import PropTypes from "prop-types";
import {compatibleNavImg} from "../../../../public/mobile/utils";
import {handleLocalData, proFetch} from "../../function";

const hasHeader = sessionStorage.getItem('showNav') === 'true',
    isMobileWebPage = sessionStorage.getItem('mobile-web-page') === 'true';

class EditTable extends Component {
    static childContextTypes = {
        referAfterAct: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            page: 'list',
            areaCode: props.areaCode,
            store: props.store,
            data: JSON.parse(JSON.stringify(props.data || {})),
            showList: props.showList || [],
            isDelete: false,
            canEdit: props.canEdit === 'Y',
            needApp: props.needApp === 'Y'
        };
        this.oldConf = {};
    }

    getChildContext() {
        return {
            referAfterAct: this.resetHeader
        };
    }

    resetHeader = () => {
        const {store, page, isDelete, canEdit, needApp} = this.state;
        const {json} = this.props;
        this.oldConf = {};
        if (page === 'list') {
            this.editNav({
                title: store.name,
                rightTitle: isDelete ? json['hrzzmb-000025'] : json['hrzzmb-000095'],
                showRight: canEdit && !needApp,
                needApp
            });
        } else if (page === 'add') {
            this.editNav({
                isList: true,
                title: store.name
            });
        } else {
            this.editNav({
                title: store.name,
                isList: true,
                needApp
            });
        }
    };

    editNav = (config = {}) => {
        try {
            if (this.oldConf.isList === config.isList &&
                this.oldConf.title === config.title &&
                this.oldConf.rightTitle === config.rightTitle &&
                this.oldConf.needApp === config.needApp) {
                return;
            }
            let cbs = {
                goToBack: () => this.backToMain(),
                goList: () => this.backToList(),
                toggleDel: () => this.toggleDel()
            };
            let parameters = {
                leftItems: [
                    {
                        icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png'),
                        callback: config.isList ? 'goList' : 'goToBack'
                    }
                ],
            };
            if (!config.needApp) {
                parameters.centerItems = [
                    {
                        title: config.title,
                    }
                ]
            } else {
                parameters.centerItems = [
                    {
                        title: config.title + `[${this.props.json['hrzzmb-000087']}]`,
                        titleColor: '#108ee9'
                    }
                ]
            }
            if (config.showRight) {
                parameters.rightItems = [{
                    title: config.rightTitle,
                    titleColor: '#108ee9',
                    callback: 'toggleDel'
                }]
            } else {
                parameters.rightItems = []
            }
            let data = {
                'function': 'configNavBar',
                'parameters': parameters
            };
            NativeObj.configNavBar(data, cbs);
            const that = this;
            if (config.isList) {
                NativeObj.blockbackbutton('', () => {
                    that.backToList();
                });
            } else {
                NativeObj.blockbackbutton('', () => {
                    that.backToMain();
                });
            }
            this.oldConf = config;
        } catch (e) {
        }
    };

    setData = (newData) => {
        this.setState({
            data: JSON.parse(JSON.stringify(newData || {}))
        })
    };

    getPage = () => {
        const {data, store, page, areaCode, isDelete, canEdit, needApp} = this.state;
        const {json, pk_psninfoapprove} = this.props;
        if (page === 'list') {
            this.editNav({
                title: store.name,
                rightTitle: isDelete ? json['hrzzmb-000025'] : json['hrzzmb-000095'],
                showRight: canEdit && !needApp,
                needApp
            });
            return <div className={hasHeader ? 'has-local-header' : 'native-header'}>
                <DHeader title={store.name} leftClick={this.backToMain}
                         groupTitle={needApp ? {
                             text: store.name,
                             subtext: {
                                 val: json['hrzzmb-000090']
                             }
                         } : null}
                         rightstyle={{color: '#108ee9', fontSize: '0.32rem'}}
                         rText={canEdit && !needApp ? isDelete ? json['hrzzmb-000025'] : json['hrzzmb-000095'] : ''}
                         rightClick={this.toggleDel}/>
                <div className={'info-container' + (!isDelete && canEdit && !needApp ? ' has-bottom-btn' : '')}>
                    {data.rows && data.rows.map((item, index) => {
                        return <div
                            className={'table-card' + this.getItemStatus(item.status)}>
                            <div className='table-card-item' onClick={() => {
                                this.edit(data, index)
                            }}>
                                {this.getItem(item)}
                            </div>
                            {isDelete ? item.status === '3' ?
                                <i className={"icon hrfont hr-recovery table-card-delete"}
                                   onClick={() => this.cancelDel(index)}/> :
                                <i className={"icon hrfont hr-Dustbin_bold table-card-delete"}
                                   onClick={() => this.delRow(index)}/> : null}
                        </div>
                    })}
                </div>
                {!isDelete ?
                    !needApp && canEdit ?
                        <div className='bottom-btn-group bottom-btn'>
                            {!isMobileWebPage ? <Button
                                onClick={() => this.resetData(areaCode)}>{json['hrzzmb-000330']}</Button> : null}
                            <Button onClick={() => this.saveInfo()}>{json['hrzzmb-000023']}</Button>
                        </div> :
                        pk_psninfoapprove ?
                            <Button className='bottom-btn'
                                    onClick={() => this.rollback(areaCode, pk_psninfoapprove)}>{json['hrzzmb-000170']}</Button>
                            : null
                    : null}
            </div>;
        } else if (page === 'add') {
            this.editNav({
                isList: true,
                title: store.name
            });
            let addStore = CreateMeta(JSON.parse(JSON.stringify({[areaCode]: store})), {});
            let defaultData = this.getDefaultData();
            return <div className={hasHeader ? 'has-local-header' : 'native-header'}>
                <DHeader title={store.name} leftClick={this.backToList}/>
                <div className={'info-container'}>
                    <Container
                        isEdit={true}
                        hideHeader={true}
                        addReferBackAct={true}
                        showIsChangedIndicator={true}
                        store={addStore}
                        cardName={areaCode}
                        data={defaultData}
                        ref={node => this.addNode = node}
                        className='has-bottom-btn'
                    />
                    <Button className='bottom-btn' onClick={() => this.addRow()}>{json['hrzzmb-000117']}</Button>
                </div>
            </div>
        } else {
            this.editNav({
                title: store.name,
                isList: true,
                needApp
            });
            let addStore = CreateMeta(JSON.parse(JSON.stringify({[areaCode]: store})), {});
            return <div className={hasHeader ? 'has-local-header' : 'native-header'}>
                <DHeader title={store.name}
                         groupTitle={needApp ? {
                             text: store.name,
                             subtext: {
                                 val: json['hrzzmb-000090']
                             }
                         } : null}
                         leftClick={this.backToList}/>
                <div className={'info-container'}>
                    <Container
                        isEdit={!needApp}
                        hideHeader={true}
                        addReferBackAct={true}
                        showIsChangedIndicator={true}
                        store={addStore}
                        cardName={areaCode}
                        data={{rows: [this.editData.rows[this.editIndex]]}}
                        ref={node => this.editNode = node}
                        className={!needApp ? ' has-bottom-btn' : ''}
                    />
                    {!needApp ?
                        <Button className='bottom-btn' onClick={() => this.editRow()}>{json['hrzzmb-000117']}</Button>
                        : null}
                </div>
            </div>
        }
    };

    getDefaultData = () => {
        const {data, areaCode} = this.state;
        let defaultData = null;
        if (areaCode === 'hi_psndoc_cert') {
            const flag = data && data.rows && data.rows.findIndex(row => row.values.isstart.value) > -1;
            defaultData = {
                rows: [{
                    status: '2',
                    values: {isstart: {value: !flag}, iseffect: {value: true}}
                }]
            }
        }
        return defaultData;
    };

    getItemStatus = (status) => {
        switch (status) {
            case '1':
                return ' edited';
            case '2':
                return ' added';
            case '3':
                return ' removed';
            default:
                return '';
        }
    };

    getItem = (data) => {
        const {store, showList} = this.state;
        return store.items.map(item => {
            if (!showList.includes(item.attrcode)) return;
            return <div className='card-item'>
                <div>{item.label}</div>
                <div>{this.getDisplay(item, data)}</div>
            </div>
        })
    };

    getDisplay = (item, value) => {
        if (!value.values[item.attrcode]) return '';
        let displayStr = value.values[item.attrcode].display,
            displayValue = value.values[item.attrcode].value;
        if (!displayStr && item.options) {
            if (item.itemtype === "checkbox_switch") {
                displayValue = displayValue ? 'Y' : 'N';
            }
            const option = item.options.find(option => option.value === displayValue);
            if (option) {
                displayStr = option.display;
            }
        }
        return displayStr || displayValue || '';
    };

    backToMain = () => {
        this.oldConf = {};
        this.props.back();
    };

    backToList = () => {
        this.setState({page: 'list'}, () => this.scrollToTop())
    };

    add = () => {
        this.setState({page: 'add'}, () => this.scrollToTop())
    };

    addRow = () => {
        const {areaCode, data} = this.state;
        const {json} = this.props;
        const flag = this.addNode.props.store.checkAllFields(areaCode);
        if (!flag) return;
        const rowData = this.addNode.props.store.getFormData(areaCode, false).rows[0];
        if (rowData.status === '0') {
            /*Alert({
                status: 'warning',
                msg: json['hrzzmb-000091']
            });*/
            this.setState({page: 'list'}, () => this.scrollToTop());
            return;
        }
        rowData.status = '2';
        rowData.lastStatus = '2';
        if (data.rows) {
            data.rows.push(rowData);
        } else {
            data.rows = [rowData]
        }
        this.setState({page: 'list'}, () => {
            this.saveTempData();
            this.scrollToTop()
        })
    };

    delRow = (index) => {
        const {data} = this.state;
        data.rows[index].lastStatus = data.rows[index].status;
        data.rows[index].status = '3';
        this.setState({});
    };

    cancelDel = (index) => {
        const {data} = this.state;
        data.rows[index].status = data.rows[index].lastStatus;
        this.setState({});
    };

    edit = (data, index) => {
        const {isDelete} = this.state;
        if (isDelete) return;
        this.editData = data;
        this.editIndex = index;
        this.setState({page: 'edit'}, () => this.scrollToTop())
    };

    editRow = () => {
        const {areaCode, data} = this.state;
        const {json} = this.props;
        const flag = this.editNode.props.store.checkAllFields(areaCode);
        if (!flag) return;
        const rowData = this.editNode.props.store.getFormData(areaCode, false).rows[0];
        if (rowData.status === '0') {
            /*Alert({
                status: 'warning',
                msg: json['hrzzmb-000091']
            });*/
            this.setState({page: 'list'}, () => this.scrollToTop());
            return;
        }
        if (data.rows[this.editIndex].status !== '2' && data.rows[this.editIndex].status !== '3') {
            //rowData.status = '1';
        } else {
            rowData.status = data.rows[this.editIndex].status;
        }
        data.rows[this.editIndex] = rowData;
        this.setState({page: 'list'}, () => {
            this.saveTempData();
            this.scrollToTop()
        })
    };

    scrollToTop = () => {
        const container = document.querySelector('.info-container');
        if (container) container.scrollTop = 0;
    };

    saveInfo = () => {
        this.props.saveInfo(this.state)
    };

    rollback = (areaCode, pk_psninfoapprove) => {
        this.props.rollback(areaCode, pk_psninfoapprove);
    };

    resetData = (areaCode) => {
        this.props.resetData(areaCode);
    };


    toggleDel = () => {
        const {isDelete, data, canEdit, needApp} = this.state;
        if (!canEdit || needApp) return;
        if (!isDelete) {
            this.setState({
                isDelete: true
            })
        } else {
            data.rows = data.rows && data.rows.filter(row => !(row.lastStatus === '2' && row.status === '3'));
            this.setState({
                isDelete: false
            }, () => {
                this.saveTempData()
            })
        }
    };

    saveTempData = () => {
        const {data, areaCode} = this.state;
        const key = 'psnTemp_' + areaCode + '_' + this.props.userId;
        handleLocalData.save(key, data, () => {
            console.log('保存表格数据' + key)
        })
    };

    render() {
        const {page, isDelete, canEdit, needApp} = this.state;
        return (
            <div className='edit-table-page'>
                {this.getPage()}
                {page === 'list' && !isDelete && canEdit && !needApp ?
                    <div className='table-add-btn'>
                        <AddButton onClick={this.add}/>
                    </div> : null}
            </div>
        )
    }
}

export default EditTable;