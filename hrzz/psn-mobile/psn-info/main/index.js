import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Container, CreateMeta} from 'src/hrzz/public/hr-mobile-card';
import './index.less';
import 'src/hrzz/public/mobile/static/style/index.less';
import {getUrlParam, proFetch, getUserInfo, handleLocalData} from '../function';
import {DHeader, Avoid, Alert} from 'src/hrzz/public/mobile/components';
import {Button, WhiteSpace, Progress} from 'antd-mobile';
import EditTable from '../components/edittable';
import NativeObj from 'src/hrzz/public/mobile/utils/jsbridge';
import deepCopy from 'src/hrpub/common/utils/deep-copy'
import ImagePicker from "../components/imgpicker";
import {hrRouter} from 'src/hrzz/public/mobile/utils/storage';
import {compatibleNavImg} from "../../../public/mobile/utils";
import PropTypes from "prop-types";
import {getMultiLang} from "../../../public/mobile/utils/getMultiLang";
import thirdLog from "../../../login/third-log-method";

let allData = {};
const appcode = '60652010',
    hasHeader = sessionStorage.getItem('showNav') === 'true',
    isMobileWebPage = sessionStorage.getItem('mobile-web-page') === 'true';

class PsnInfo extends Component {
    static childContextTypes = {
        referAfterAct: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            page: 'main',
            type: '',
            percent: 0,
            json: {}
        };
        this.oldConf = {};
        this.userId = '';
        this.urlParam = {};
        this.noticeChain = [];
        this.isNoticing = false;
        this.handleAreaCode = '';
    }

    getChildContext() {
        return {
            referAfterAct: this.resetHeader
        };
    }

    resetHeader = () => {
        const {page} = this.state;
        const areas = allData.allArea;
        this.oldConf = {};
        this.editNav({
            title: areas[page].name
        });
    };

    componentWillMount() {
        window.location.hash = 'c=' + appcode;
        this.urlParam = getUrlParam();
        getUserInfo(userInfo => {
            this.userId = userInfo.userId || 'testUser'
        })
    }

    componentDidMount() {
        this.getLanguage();
    }

    getLanguage = () => {
        getMultiLang({
            domainName: 'hrzz',
            moduleId: 'hrzzmb',
            callback: (json, status, init) => {
                this.setState({
                    json: json
                }, () => {
                    this.getPsnTemplate();
                })
            }
        })
    };

    editNav = (config = {}) => {
        try {
            /**
             * 添加校验配置是否改变，如果没有改，不刷新头信息
             * 用来解决部分手机机型和版本会出现闪动的问题
             */
            if (this.oldConf.isMain === config.isMain &&
                this.oldConf.title === config.title &&
                this.oldConf.needApp === config.needApp) {
                return;
            }
            const {json} = this.state;
            let cbs = {
                goBack: () => this.backToMain(),
                close: () => this.closePage()
            };
            let parameters = {
                leftItems: !config.isMain ? [
                    {
                        icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png'),
                        callback: 'goBack'
                    }
                ] : [
                    {
                        icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png'),
                        callback: 'close'
                    }
                ],
                rightItems: []
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
                        title: config.title + `[${json['hrzzmb-000087']}]`,
                        titleColor: '#108ee9'
                    }
                ]
            }
            let data = {
                'function': 'configNavBar',
                'parameters': parameters
            };
            NativeObj.configNavBar(data, cbs);
            const that = this;
            if (!config.isMain) {
                NativeObj.blockbackbutton('', () => {
                    that.backToMain()
                });
            } else {
                NativeObj.blockbackbutton('', () => {
                    that.closePage()
                });
            }
            this.oldConf = config;
        } catch (e) {
            console.log(e)
        }
    };

    closePage = () => {
        const toUrl = this.urlParam.from/* && urlMap[this.urlParam.from]*/;
        if (!toUrl) {
            NativeObj.closePage();
            return;
        }
        if (toUrl === 'teamchange') {
            let url = '/hrzz/myteam-mobile/myteam-member/main/index.html';
            hrRouter.push(url);
        } else {
            let url = '/hrzz/entry-mobile/myentry/main/index.html';
            hrRouter.push(url)
        }
    };

    /* 获取部门信息-管理部门查询接口 */
    getPsnTemplate = () => {
        const {json} = this.state;
        this.setState({page: 'main'});
        proFetch({
            url: '/nccloud/hrzz/psninfo/PsninfoTempletQueryAction.do',
            data: {
                pk_psndoc: this.urlParam.pk_psndoc,
                psntype: this.urlParam.psntype
            },
            info: {appcode},
            loading: false,
            noNeedShowError: true
        })
            .then(result => {
                if (result.success) {
                    allData.allArea = result.data.allArea;
                    allData.areaCodeList = result.data.areaCodeList;
                    allData.showMap = result.data.showMap;
                    try {
                        allData.allArea.bd_psndoc.items.find(item => item.attrcode === 'photo').render = (config) => {
                            return <div
                                className={"am-list-item am-input-item am-list-item-middle image-input-item am-image-picker-list"
                                + (!allData.image && !config.editable ? ' no-image' : '')
                                + (config.disabled && config.editable ? ' am-input-disabled' : '')}>
                                <div className={"am-list-line"}>
                                    <div className="am-input-label">
                                        {config.label}
                                    </div>
                                    <div className="am-input-control">
                                        <ImagePicker editable={config.editable && !config.disabled}
                                                     imageData={this.tempImg}
                                                     onChange={this.changePhoto}/>
                                    </div>
                                    {config.editable && !config.disabled ?
                                        <div className="am-list-arrow am-list-arrow-horizontal"/> : null}
                                </div>
                            </div>
                        };
                    } catch (e) {

                    }
                    this.setState({});
                    this.getPsnDoc();
                    this.getAllAreaInfo(allData.areaCodeList);
                    this.getProcess();
                    this.getPhoto();
                }
            })
            .catch((err) => {
                if (err.data && err.data.error && err.data.error.message) {
                    Alert({
                        status: 'error',
                        msg: err.data.error.message,
                        confirmText: json['hrzzmb-000092'],
                        confirmAct: () => {
                            this.closePage()
                        }
                    });
                }
            })
    };

    getPsnDoc = () => {
        const areaCode = 'bd_psndoc';
        proFetch({
            url: '/nccloud/hrzz/psninfo/PsninfoQueryAction.do',
            data: {
                areaCode,
                pk_psndoc: this.urlParam.pk_psndoc,
                psntype: this.urlParam.psntype
            },
            info: {appcode},
            loading: true,
            noNeedShowError: false
        })
            .then((result) => {
                if (result.success) {
                    if (result.data[areaCode]) {
                        allData[areaCode] = {[areaCode]: result.data[areaCode][areaCode]};
                    } else {
                        allData[areaCode] = {[areaCode]: null};
                    }
                    allData[areaCode].isedit = result.data.isedit;
                    allData[areaCode].isneedapp = result.data.isneedapp;
                    if (!this.urlParam.from && result.data && result.data.isapproved) {
                        this.handleIsApproved(areaCode, result.data.isapproved, result.data.pk_psninfoapprove);
                    } else {
                        const key = 'psnTemp_' + areaCode + '_' + this.userId;
                        handleLocalData.get(key, (tempData) => {
                            allData[areaCode].isEditing = !!tempData;
                            this.setState({});
                        });
                    }
                    this.setState({});
                    this.getProcess();
                }
            });
    };

    getPhoto = () => {
        proFetch({
            url: '/nccloud/hrzz/psninfo/PsninfoPhotoQueryAction.do',
            data: {
                areaCode: 'bd_psndoc',
                pk_psndoc: this.urlParam.pk_psndoc,
                psntype: this.urlParam.psntype
            },
            info: {appcode},
            loading: true,
            noNeedShowError: true,
        })
            .then((result) => {
                if (result.success) {
                    allData.image = result.data.image;
                    this.tempImg = result.data.image;
                    this.isphotochange = 'N';
                    this.setState({});
                }
            })
    };

    getAllAreaInfo = (areaList = []) => {
        areaList.forEach(areaCode => this.onExpandHandle([areaCode], true))
    };

    getProcess = () => {
        const allArea = allData.areaCodeList;
        if (!allArea || !allArea.length) return;
        let hasVal = 0;
        allArea.forEach(item => {
            if (allData[item] && allData[item][item]) {
                hasVal++;
            }
        });
        this.setState({
            percent: Math.round(hasVal * 10000 / allArea.length) / 100
        })
    };

    getPage = () => {
        if (!allData.allArea) return;
        const {page, areaCode, percent, json} = this.state;
        const areas = allData.allArea;
        if (page === 'main') {
            this.editNav({
                title: json['hrzzmb-000088'],
                isMain: true
            });
            let storeData = deepCopy(areas);
            if (allData.showMap) {
                allData.areaCodeList.map(areaKey => {
                    const showList = allData.showMap[areaKey];
                    if (showList && showList.length) {
                        storeData[areaKey].items.forEach(item => item.visible = showList.includes(item.attrcode))
                    } else {
                        storeData[areaKey].items.forEach(item => item.visible = false)
                    }
                })
            }
            let store = CreateMeta(storeData, {
                panelClick: this.onEditHandle,
                iconClick: this.onExpandHandle,
                contentClick: this.viewContent
            });
            let name = '';
            try {
                name = allData.bd_psndoc.bd_psndoc.rows[0].values.name.value;
            } catch (e) {

            }
            return <div className={hasHeader ? 'has-local-header' : 'native-header'}>
                <DHeader title={json['hrzzmb-000088']} leftClick={this.closePage}/>
                <div className="info-container">
                    <div className='psn-image'>
                        <Avoid src={allData.image} name={name}/>
                        <div className='psn-name-progress'>
                            <div className='psn-name'>{name}</div>
                            <div className='psn-progress'>{json['hrzzmb-000089']}：<span>{percent}</span>%</div>
                            <Progress percent={percent} position="normal"/>
                        </div>
                    </div>
                    <WhiteSpace/>
                    {allData.areaCodeList.map(areaKey => {
                        const editIndex = allData.allArea[areaKey].items.findIndex(item => item.visible && !item.disabled);
                        const editFlag = editIndex > -1;
                        const showFlag = allData.showMap[areaKey] && allData.showMap[areaKey].length;
                        return <Container
                            hideIfNoData={true}
                            showArrow={editFlag}
                            store={store}
                            cardName={areaKey}
                            data={allData[areaKey] ? allData[areaKey][areaKey] : null}
                            collapsed={areaKey !== allData.areaCodeList[0]}
                            showHasDataIndicator={true}
                            addReferBackAct={true}
                            showTableLine={areaKey !== allData.areaCodeList[0]}
                            ref={node => this[areaKey + 'node'] = node}
                            headerExtra={allData[areaKey] && allData[areaKey].isneedapp === 'Y' ?
                                <div className="need-approve">
                                    {json['hrzzmb-000090']}
                                </div> : allData[areaKey] && allData[areaKey].isEditing ?
                                    <div className="is-editing">
                                        {json['hrzzmb-000329']}
                                    </div> : null}
                            className={(allData[areaKey] && allData[areaKey].isneedapp === 'Y' ?
                                'approve-card' : '') + (showFlag ? '' : ' show-nothing')}
                        />
                    })}
                </div>
            </div>
        } else if (page === 'listView') {
            let store = deepCopy(areas[areaCode]);
            let handleData = allData[areaCode] ? allData[areaCode][areaCode] : null;
            if (allData[areaCode + '_temp']) {
                handleData = allData[areaCode + '_temp'][areaCode]
            }
            return <EditTable store={store}
                              json={json}
                              areaCode={areaCode}
                              data={handleData}
                              showList={allData.showMap[areaCode]}
                              saveInfo={this.checkTableData}
                              back={this.backToMain}
                              rollback={this.rollback}
                              resetData={this.resetData}
                              userId={this.userId}
                              ref={node => this[areaCode + 'node'] = node}
                              pk_psninfoapprove={allData[areaCode] && allData[areaCode].pk_psninfoapprove}
                              canEdit={allData[areaCode] && allData[areaCode].isedit}
                              needApp={allData[areaCode] && allData[areaCode].isneedapp}
            />
        } else if (page === 'cardView') {
            const needApp = allData[areaCode].isneedapp === 'Y';
            this.editNav({
                title: areas[areaCode].name,
                needApp
            });
            let store = CreateMeta(deepCopy(areas), {});
            return <div className={hasHeader ? 'has-local-header' : 'native-header'}>
                <DHeader title={areas[areaCode].name}
                         groupTitle={needApp ? {
                             text: areas[areaCode].name,
                             subtext: {
                                 val: json['hrzzmb-000090']
                             }
                         } : null}
                         leftClick={this.backToMain}/>
                <div className="info-container">
                    <Container
                        hideHeader={true}
                        addReferBackAct={true}
                        store={store}
                        cardName={areaCode}
                        data={{rows: [{status: '0', values: this.viewData}]}}
                    />
                </div>
            </div>
        } else {
            const canEdit = allData[page].isedit === 'Y' && allData[page].isneedapp === 'N';
            const needApp = allData[page].isneedapp === 'Y';
            this.editNav({
                title: areas[page].name
            });
            let store = CreateMeta(deepCopy(areas), {});
            let handleData = allData[page] ? allData[page][page] : null;
            if (allData[page + '_temp']) {
                handleData = allData[page + '_temp'][page]
            }
            return <div className={hasHeader ? 'has-local-header' : 'native-header'}>
                <DHeader title={areas[page].name}
                         groupTitle={needApp ? {
                             text: areas[page].name,
                             subtext: {
                                 val: json['hrzzmb-000090']
                             }
                         } : null}
                         leftClick={this.backToMain}/>
                <div className="info-container">
                    <Container
                        isEdit={canEdit}
                        hideHeader={true}
                        addReferBackAct={true}
                        showIsChangedIndicator={true}
                        store={store}
                        cardName={page}
                        data={handleData}
                        ref={node => this[page + 'node'] = node}
                        className={'has-bottom-btn'}
                    />
                    {canEdit ?
                        <div className='bottom-btn-group bottom-btn'>
                            {!isMobileWebPage ? <Button
                                onClick={() => this.resetData(page)}>{json['hrzzmb-000330']}</Button> : null}
                            {!isMobileWebPage ? <Button
                                onClick={() => this.saveTempData(page, false, true)}>{json['hrzzmb-000117']}</Button> : null}
                            <Button
                                onClick={() => this.checkData(page)}>{json['hrzzmb-000023']}</Button>
                        </div> :
                        allData[page].pk_psninfoapprove ?
                            <Button className='bottom-btn'
                                    onClick={() => this.rollback(page, allData[page].pk_psninfoapprove)}>{json['hrzzmb-000170']}</Button>
                            : null}
                </div>
            </div>
        }
    };

    backToMain = () => {
        this.tempImg = allData.image;
        this.oldConf = {};
        this.checkIsEditing();
        this.setState({page: 'main'}, () => this.scrollToTop());
    };

    checkIsEditing = (areaCode) => {
        if (!areaCode && !this.handleAreaCode) return;
        if (areaCode) {
            const key = 'psnTemp_' + areaCode + '_' + this.userId;
            handleLocalData.get(key, (tempData) => {
                allData[areaCode].isEditing = !!tempData;
                this.setState({});
            });
        } else {
            const key = 'psnTemp_' + this.handleAreaCode + '_' + this.userId;
            handleLocalData.get(key, (tempData) => {
                allData[this.handleAreaCode].isEditing = !!tempData;
                this.setState({});
                this.handleAreaCode = '';
            });
        }
    };

    onEditHandle = (res) => {
        this.getAreaInfo(res && res[0])
    };

    onExpandHandle = (res = [], hideLoading) => {
        const areaCode = res[0];
        if (!areaCode || areaCode === 'bd_psndoc' || allData[areaCode]) return;
        proFetch({
            url: '/nccloud/hrzz/psninfo/PsninfoSubQueryAction.do',
            data: {
                areaCode,
                pk_psndoc: this.urlParam.pk_psndoc,
                psntype: this.urlParam.psntype
            },
            info: {appcode},
            loading: hideLoading,
            noNeedShowError: !!hideLoading
        })
            .then((result) => {
                if (result.success) {
                    if (result.data.dataForm) {
                        allData[areaCode] = {[areaCode]: result.data.dataForm[areaCode]};
                    } else if (result.data.dataGrid) {
                        allData[areaCode] = {[areaCode]: result.data.dataGrid[areaCode]};
                    } else {
                        allData[areaCode] = {[areaCode]: null};
                    }
                    allData[areaCode].isedit = result.data.isedit;
                    allData[areaCode].isneedapp = result.data.isneedapp;
                    if (!this.urlParam.from && result.data && result.data.isapproved) {
                        this.handleIsApproved(areaCode, result.data.isapproved, result.data.pk_psninfoapprove);
                    } else {
                        const key = 'psnTemp_' + areaCode + '_' + this.userId;
                        handleLocalData.get(key, (tempData) => {
                            allData[areaCode].isEditing = !!tempData;
                            this.setState({});
                        });
                    }
                    this.setState({});
                    this.getProcess();
                }
            })
    };

    getAreaInfo = (areaCode, isResetData) => {
        if (!areaCode) return;
        this.handleAreaCode = areaCode;
        if (areaCode === 'bd_psndoc') {
            proFetch({
                url: '/nccloud/hrzz/psninfo/PsninfoQueryAction.do',
                data: {
                    areaCode,
                    pk_psndoc: this.urlParam.pk_psndoc,
                    psntype: this.urlParam.psntype
                },
                info: {appcode},
                loading: !isResetData,
                noNeedShowError: false
            })
                .then((result) => {
                    if (result.success) {
                        if (result.data[areaCode]) {
                            allData[areaCode] = {[areaCode]: result.data[areaCode][areaCode]};
                        } else {
                            allData[areaCode] = {[areaCode]: null};
                        }
                        allData[areaCode].isedit = result.data.isedit;
                        allData[areaCode].isneedapp = result.data.isneedapp;
                        allData[areaCode].pk_psninfoapprove = result.data.pk_psninfoapprove;
                        const type = allData.allArea[areaCode].moduletype;
                        const key = 'psnTemp_' + areaCode + '_' + this.userId;
                        //if (result.data.isedit === 'Y' && result.data.isneedapp !== 'Y') {
                        handleLocalData.get(key, (tempData) => {
                            if (tempData) {
                                if (result.data.isedit === 'Y' && result.data.isneedapp !== 'Y' && tempData.isSubmit === 'Y') {
                                    this.removeTempData(areaCode);
                                    allData[areaCode + '_temp'] = null;
                                    allData[areaCode].isEditing = false;
                                } else {
                                    allData[areaCode + '_temp'] = {[areaCode]: tempData};
                                    allData[areaCode].isEditing = true;
                                }
                            } else {
                                allData[areaCode + '_temp'] = null;
                                allData[areaCode].isEditing = false;
                            }
                            if (!isResetData) {
                                this.setState({
                                    page: type === 'table' ? 'listView' : areaCode,
                                    areaCode,
                                    type
                                }, () => {
                                    this.scrollToTop();
                                })
                            } else {
                                this.setState({});
                            }
                        })
                        /*} else {
                            this.setState({
                                page: type === 'table' ? 'listView' : areaCode,
                                areaCode,
                                type
                            }, () => {
                                this.scrollToTop();
                            })
                        }*/
                    }
                })
        } else {
            proFetch({
                url: '/nccloud/hrzz/psninfo/PsninfoSubQueryAction.do',
                data: {
                    areaCode,
                    pk_psndoc: this.urlParam.pk_psndoc,
                    psntype: this.urlParam.psntype
                },
                info: {appcode},
                loading: !isResetData,
                noNeedShowError: false
            })
                .then((result) => {
                    if (result.success) {
                        if (result.data.dataForm) {
                            allData[areaCode] = {[areaCode]: result.data.dataForm[areaCode]};
                        } else if (result.data.dataGrid) {
                            allData[areaCode] = {[areaCode]: result.data.dataGrid[areaCode]};
                        } else {
                            allData[areaCode] = {[areaCode]: null};
                        }
                        allData[areaCode].isedit = result.data.isedit;
                        allData[areaCode].isneedapp = result.data.isneedapp;
                        allData[areaCode].pk_psninfoapprove = result.data.pk_psninfoapprove;
                        const type = allData.allArea[areaCode].moduletype;
                        const key = 'psnTemp_' + areaCode + '_' + this.userId;
                        //if (result.data.isedit === 'Y' && result.data.isneedapp !== 'Y') {
                        handleLocalData.get(key, (tempData) => {
                            if (tempData) {
                                if (result.data.isedit === 'Y' && result.data.isneedapp !== 'Y' && tempData.isSubmit === 'Y') {
                                    this.removeTempData(areaCode);
                                    allData[areaCode + '_temp'] = null;
                                    allData[areaCode].isEditing = false;
                                } else {
                                    allData[areaCode + '_temp'] = {[areaCode]: tempData};
                                    allData[areaCode].isEditing = true;
                                }
                            } else {
                                allData[areaCode + '_temp'] = null;
                                allData[areaCode].isEditing = false;
                            }
                            if (!isResetData) {
                                this.setState({
                                    page: type === 'table' ? 'listView' : areaCode,
                                    areaCode,
                                    type
                                }, () => {
                                    this.scrollToTop();
                                })
                            } else {
                                this[areaCode + 'node'].setData(allData[areaCode] ? allData[areaCode][areaCode] : null)
                            }
                        })
                        /*} else {
                            this.setState({
                                page: type === 'table' ? 'listView' : areaCode,
                                areaCode,
                                type
                            }, () => {
                                this.scrollToTop();
                            })
                        }*/
                    }
                })
        }
    };

    resetAreaInfo = (areaCode) => {
        this.oldConf = {};
        this.setState({page: 'main'});
        if (!areaCode) return;
        proFetch({
            url: '/nccloud/hrzz/psninfo/PsninfoSubQueryAction.do',
            data: {
                areaCode,
                pk_psndoc: this.urlParam.pk_psndoc,
                psntype: this.urlParam.psntype
            },
            info: {appcode},
            loading: true,
            noNeedShowError: false
        })
            .then((result) => {
                if (result.success) {
                    if (result.data.dataForm) {
                        allData[areaCode] = {[areaCode]: result.data.dataForm[areaCode]};
                    } else if (result.data.dataGrid) {
                        allData[areaCode] = {[areaCode]: result.data.dataGrid[areaCode]};
                    } else {
                        allData[areaCode] = {[areaCode]: null};
                    }
                    allData[areaCode].isedit = result.data.isedit;
                    allData[areaCode].isneedapp = result.data.isneedapp;
                    const key = 'psnTemp_' + areaCode + '_' + this.userId;
                    handleLocalData.get(key, (tempData) => {
                        allData[areaCode].isEditing = !!tempData;
                        this.setState({});
                    });
                    this.setState({});
                    this.getProcess();
                }
            });
    };

    handleIsApproved = (areaCode, isApproved, pk_psninfoapprove) => {
        if (!isApproved) return;
        this.noticeChain.push(
            {
                areaCode,
                isApproved,
                pk_psninfoapprove
            }
        );
        if (!this.isNoticing) {
            this.noticeApproveInfo();
        }
    };

    noticeApproveInfo = () => {
        const {json} = this.state;
        let that = this;
        if (!that.isNoticing && that.noticeChain.length) {
            that.isNoticing = true;
            const curAppInfo = that.noticeChain.splice(0, 1)[0];
            const areaName = allData.allArea[curAppInfo.areaCode].name;
            if (curAppInfo.isApproved === 'Y') {
                Alert({
                    status: 'success',
                    msg: json['hrzzmb-000320'] + "[" + areaName + "]" + json['hrzzmb-000165'],
                    confirmText: json['hrzzmb-000092'],
                    confirmAct: () => {
                        that.isNoticing = false;
                        that.removeTempData(curAppInfo.areaCode,
                            () => that.checkIsEditing(curAppInfo.areaCode));
                        that.appInfoRead(curAppInfo.pk_psninfoapprove);
                        that.noticeApproveInfo();
                    }
                });
            } else {
                Alert({
                    status: 'confirm',
                    msg: json['hrzzmb-000320'] + "[" + areaName + "]" + json['hrzzmb-000321'],
                    confirmText: json['hrzzmb-000322'],
                    confirmAct: () => {
                        that.isNoticing = false;
                        that.appInfoRead(curAppInfo.pk_psninfoapprove);
                        that.noticeApproveInfo();
                        that.rollbackTempData(curAppInfo.areaCode,
                            () => that.checkIsEditing(curAppInfo.areaCode));
                    },
                    cancelText: json['hrzzmb-000323'],
                    cancelAct: () => {
                        that.isNoticing = false;
                        that.removeTempData(curAppInfo.areaCode,
                            () => that.checkIsEditing(curAppInfo.areaCode));
                        that.appInfoRead(curAppInfo.pk_psninfoapprove);
                        that.noticeApproveInfo();
                    }
                });
            }
        }
    };

    appInfoRead = (pk_psninfoapprove) => {
        try {
            proFetch({
                url: '/nccloud/hrzz/psninfo/PsninfoApproveReadAction.do',
                data: {
                    pks: [pk_psninfoapprove],
                    readstatus: 1
                },
                info: {appcode},
                loading: true,
                noNeedShowError: true
            }).then((result) => {
                if (result.success) {
                    console.log(result);
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    checkData = (areaCode) => {
        const flag = this[areaCode + 'node'].props.store.checkAllFields(areaCode);
        if (!flag) return;
        const {type, json} = this.state;
        const areaData = this[areaCode + 'node'].props.store.getFormData(areaCode, type === 'table');
        if (areaCode === 'bd_psndoc' && this.isphotochange === 'Y') {
            areaData.rows[0].status = '1';
        }
        /*if (areaData.rows[0].status === '0') {
            Alert({
                status: 'warning',
                msg: json['hrzzmb-000091']
            });
            return;
        }*/
        /*let address;
        try {
            address = areaData.rows[0].values.addr.value;
        } catch (e) {

        }*/
        let param = {
            areaCode,
            pk_psndoc: this.urlParam.pk_psndoc,
            psntype: this.urlParam.psntype,
            [areaCode]: areaData,
            needCheck: 'Y'
        };
        if (areaCode === 'bd_psndoc' && this.isphotochange === 'Y') {
            param.isphotochange = this.isphotochange;
            param.image = this.tempImg;
        }
        proFetch({
            url: '/nccloud/hrzz/psninfo/PsninfoSaveAction.do',
            data: param,
            info: {appcode},
            loading: false,
            noNeedShowError: false
        }).then((result) => {
            if (result.success) {
                if (result.data) {
                    Alert({
                        status: 'confirm',
                        msg: result.data,
                        confirmText: json['hrzzmb-000092'],
                        confirmAct: () => {
                            this.saveInfo(areaCode, true)
                        },
                        cancelText: json['hrzzmb-000093']
                    });
                } else {
                    this.saveInfo(areaCode)
                }
            }
        })
    };

    resetData = (areaCode) => {
        const {type, json} = this.state;
        Alert({
            status: 'confirm',
            msg: json['hrzzmb-000331'],
            confirmText: json['hrzzmb-000092'],
            confirmAct: () => {
                this.removeTempData(areaCode);
                this.getAreaInfo(areaCode, true);
            },
            cancelText: json['hrzzmb-000093']
        });
    };

    saveTempData = (areaCode, isSubmit, showMsg) => {
        const {type, json} = this.state;
        const key = 'psnTemp_' + areaCode + '_' + this.userId;
        const areaData = this[areaCode + 'node'].props.store.getFormData(areaCode, type === 'table');
        if (isSubmit) {
            areaData.isSubmit = 'Y';
        }
        handleLocalData.save(key, areaData, () => {
            showMsg && Alert({
                status: 'success',
                msg: json['hrzzmb-000134'],
                confirmAct: () => {

                }
            });
        })
    };

    saveTableTempData = (areaCode, data) => {
        const key = 'psnTemp_' + areaCode + '_' + this.userId;
        data.isSubmit = 'Y';
        handleLocalData.save(key, data, () => {
            console.log('暂存需要审批的表格数据' + key)
        })
    };

    removeTempData = (areaCode, callback) => {
        const key = 'psnTemp_' + areaCode + '_' + this.userId;
        handleLocalData.remove(key, () => {
            console.log('删除暂存的数据' + key);
            callback && callback();
        })
    };

    rollbackTempData = (areaCode, callback) => {
        const key = 'psnTemp_' + areaCode + '_' + this.userId;
        handleLocalData.get(key, (tempData) => {
            if (tempData) {
                tempData.isSubmit = 'N';
                handleLocalData.save(key, tempData);
                callback && callback();
            }
        })
    };

    rollback = (areaCode, pk_psninfoapprove) => {
        const {type, json} = this.state;
        Alert({
            status: 'confirm',
            msg: json['hrzzmb-000324'],
            confirmText: json['hrzzmb-000092'],
            confirmAct: () => {
                proFetch({
                    url: '/nccloud/hrzz/psninfo/PsninfoApproveRecallAction.do',
                    data: {
                        pks: [pk_psninfoapprove]
                    },
                    info: {appcode},
                    loading: false,
                    noNeedShowError: false
                })
                    .then((result) => {
                        if (result.success) {
                            Alert({
                                status: 'success',
                                msg: json['hrzzmb-000325'],
                                confirmAct: () => {
                                    if (areaCode === 'bd_psndoc') {
                                        this.setState({page: 'main'});
                                        this.scrollToTop();
                                        this.getPsnDoc();
                                        this.getPhoto();
                                    } else {
                                        this.resetAreaInfo(areaCode);
                                    }
                                    this.rollbackTempData(areaCode);
                                }
                            });
                        }
                    })
            },
            cancelText: json['hrzzmb-000093']
        });
    };

    saveInfo = (areaCode, isNeedApp) => {
        const {type, json} = this.state;
        const areaData = this[areaCode + 'node'].props.store.getFormData(areaCode, type === 'table');
        let param = {
            areaCode,
            pk_psndoc: this.urlParam.pk_psndoc,
            psntype: this.urlParam.psntype,
            [areaCode]: areaData,
            needCheck: 'N'
        };
        if (areaCode === 'bd_psndoc' && this.isphotochange === 'Y') {
            param.isphotochange = this.isphotochange;
            param.image = this.tempImg;
        }
        proFetch({
            url: '/nccloud/hrzz/psninfo/PsninfoSaveAction.do',
            data: param,
            info: {appcode},
            loading: false,
            noNeedShowError: false
        })
            .then((result) => {
                if (result.success) {
                    Alert({
                        status: 'success',
                        msg: json['hrzzmb-000094'],
                        confirmAct: () => {
                            this.scrollToTop();
                            if (areaCode === 'bd_psndoc') {
                                this.setState({page: 'main'});
                                this.getPsnDoc();
                                this.getPhoto();
                            } else {
                                this.resetAreaInfo(areaCode);
                            }
                            if (isNeedApp) {
                                this.saveTempData(areaCode, true);
                            } else {
                                this.removeTempData(areaCode);
                            }
                        }
                    });
                }
            })
    };

    checkTableData = (info) => {
        const {json} = this.state;
        /*const editFlag = info.data && info.data.rows
            && info.data.rows.findIndex(item => item.status !== '0') > -1;
        if (!editFlag) {
            Alert({
                status: 'warning',
                msg: json['hrzzmb-000091']
            });
            return;
        }*/
        proFetch({
            url: '/nccloud/hrzz/psninfo/PsninfoSaveAction.do',
            data: {
                areaCode: info.areaCode,
                [info.areaCode]: info.data,
                pk_psndoc: this.urlParam.pk_psndoc,
                psntype: this.urlParam.psntype,
                needCheck: 'Y'
            },
            info: {appcode},
            loading: false,
            noNeedShowError: false
        })
            .then((result) => {
                if (result.success) {
                    if (result.data) {
                        Alert({
                            status: 'confirm',
                            msg: result.data,
                            confirmText: json['hrzzmb-000092'],
                            confirmAct: () => {
                                this.saveTableInfo(info, true)
                            },
                            cancelText: json['hrzzmb-000093']
                        });
                    } else {
                        this.saveTableInfo(info);
                    }
                }
            })
    };

    saveTableInfo = (info, isNeedApp) => {
        const {json} = this.state;
        proFetch({
            url: '/nccloud/hrzz/psninfo/PsninfoSaveAction.do',
            data: {
                areaCode: info.areaCode,
                [info.areaCode]: info.data,
                pk_psndoc: this.urlParam.pk_psndoc,
                psntype: this.urlParam.psntype,
                needCheck: 'N'
            },
            info: {appcode},
            loading: false,
            noNeedShowError: false
        })
            .then((result) => {
                if (result.success) {
                    Alert({
                        status: 'success',
                        msg: json['hrzzmb-000094'],
                        confirmAct: () => {
                            this.resetAreaInfo(info.areaCode);
                            //this.getProcess();
                        }
                    });
                    if (isNeedApp) {
                        this.saveTableTempData(info.areaCode, info.data);
                    } else {
                        this.removeTempData(info.areaCode);
                    }
                }
            })
    };

    viewContent = (data) => {
        this.viewData = data.field;
        this.setState({
            page: 'cardView',
            areaCode: data.code
        }, () => this.scrollToTop())
    };

    changePhoto = (data) => {
        this.isphotochange = 'Y';
        this.tempImg = data;
    };

    scrollToTop = () => {
        const container = document.querySelector('.info-container');
        if (container) container.scrollTop = 0;
    };

    render() {
        return (
            <div>
                {this.getPage()}
            </div>
        )
    }
}

thirdLog(() => {
    ReactDOM.render(<PsnInfo/>, document.getElementById('app'));
});