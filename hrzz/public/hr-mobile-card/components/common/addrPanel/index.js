import React, {Component} from 'react';
import {Button, Modal} from 'antd-mobile';
import 'src/hrpub/common/static/fonts/iconfont.css';
import './index.less'
import {Alert, DHeader} from "../../../../mobile/components";
import {Container, CreateMeta} from "../../../index";
import {compatibleNavImg} from "../../../../mobile/utils";
import NativeObj from "../../../../mobile/utils/jsbridge";
import {langCheck} from "../../../../mobile/utils/utils";
import PropTypes from "prop-types";
import getConf from './fieldConfig';

const hasHeader = sessionStorage.getItem('showNav') === 'true';
let fieldConf;
export default class AddrPanel extends Component {
    static childContextTypes = {
        referAfterAct: PropTypes.func
    };

    static contextTypes = {
        referAfterAct: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            containerH: 0
        };
        this.data = {
            country: {},
            province: {},
            city: {},
            vsection: {},
            detailinfo: {},
            postcode: {},
            addressFullName: {}
        };
        fieldConf = getConf();
        fieldConf.name = props.label;
        fieldConf.code = props.attrcode || props.code;
    }

    componentDidMount() {
        const headerH = document.querySelector('.nc-m-header') && document.querySelector('.nc-m-header').clientHeight;
        const containerH = document.documentElement.clientHeight - (hasHeader ? headerH : 0);
        this.setState({
            containerH
        })
    }

    getChildContext() {
        return {
            referAfterAct: this.resetHeader
        };
    }

    resetHeader = () => {
        this.editNav({
            title: fieldConf.name
        });
    };

    show = (addr) => {
        if (addr) {
            this.data = addr;
            this.getFullAddr();
        }
        this.setState({
            modal: true
        }, () => {
            this.initMeta();
        });
    };

    close = () => {
        this.setState({
            modal: false
        });
        this.context.referAfterAct && this.context.referAfterAct();
    };

    initMeta = () => {
        let meta = this.refNode.props.store.getMeta(fieldConf.code);
        meta[0].items.find(item => item.code === 'province').queryCondition = {
            pk_country: this.data.country.value,
            pk_father: '~'
        };
        meta[0].items.find(item => item.code === 'city').queryCondition = {
            pk_country: this.data.country.value,
            pk_father: this.data.province.value
        };
        meta[0].items.find(item => item.code === 'vsection').queryCondition = {
            pk_country: this.data.country.value,
            pk_father: this.data.city.value
        };
        this.refNode.props.store.setMeta(fieldConf.code, meta);
    };

    saveAddr = () => {
        const flag = this.refNode.props.store.checkAllFields(fieldConf.code);
        if (!flag) return;
        const rowData = this.refNode.props.store.getFormData(fieldConf.code, false).rows[0];
        if (rowData.status === '0') {
            Alert({
                status: 'warning',
                msg: langCheck("0000PUB-000303")
            });
            return;
        }
        this.props.saveAddr(this.data);
    };

    editNav = (config = {}) => {
        const {modal} = this.state;
        if (!modal) return;
        try {
            let cbs = {
                goToBack: () => this.close()
            };
            let parameters = {
                leftItems: [
                    {
                        icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png'),
                        callback: config.isList ? 'goList' : 'goToBack'
                    }
                ],
                centerItems: [
                    {
                        title: config.title,
                    }
                ],
                rightItems: []
            };
            let data = {
                'function': 'configNavBar',
                'parameters': parameters
            };
            NativeObj.configNavBar(data, cbs);
            if (this.props.addReferBackAct) {
                let that = this;
                NativeObj.blockbackbutton('', () => {
                    that.close()
                });
            }
        } catch (e) {
        }
    };

    afterAction = (props, value, code, store) => {
        let meta = store.getMeta(fieldConf.code);
        switch (code) {
            case 'country':
                this.data.country = value || {};
                this.data.province = {};
                this.data.city = {};
                this.data.vsection = {};
                break;
            case 'province':
                this.data.province = value || {};
                this.data.city = {};
                this.data.vsection = {};
                break;
            case 'city':
                this.data.city = value || {};
                this.data.vsection = {};
                break;
            case 'vsection':
                this.data.vsection = value || {};
                break;
            case 'detailinfo':
                this.data.detailinfo = {value, display: value};
                break;
            case 'postcode':
                this.data.postcode = {value, display: value};
                break;
            default:
                break;
        }
        this.getFullAddr();
        if (code !== 'detailinfo' && code !== 'postcode') {
            meta[0].items.find(item => item.code === 'province').queryCondition = {
                pk_country: this.data.country.value,
                pk_father: '~'
            };
            meta[0].items.find(item => item.code === 'city').queryCondition = {
                pk_country: this.data.country.value,
                pk_father: this.data.province.value
            };
            meta[0].items.find(item => item.code === 'vsection').queryCondition = {
                pk_country: this.data.country.value,
                pk_father: this.data.city.value
            };
            store.setMeta(fieldConf.code, meta);
        }
    };

    getFullAddr = () => {
        const fullAddr = ((this.data.postcode.display ? this.data.postcode.display + ' ' : '')
            + (this.data.country.display ? this.data.country.display + ' ' : '')
            + (this.data.province.display ? this.data.province.display + ' ' : '')
            + (this.data.city.display ? this.data.city.display + ' ' : '')
            + (this.data.vsection.display ? this.data.vsection.display + ' ' : '')
            + (this.data.detailinfo.display ? this.data.detailinfo.display : '')).trim();
        this.data.addressFullName = {
            value: fullAddr,
            display: fullAddr
        };
        if (!document.querySelector('.info-container textarea')) return;
        document.querySelector('.info-container textarea').value = fullAddr;
    };

    render() {
        const {containerH, modal} = this.state;
        this.editNav({
            title: fieldConf.name
        });
        let addStore = CreateMeta({addr: fieldConf}, {});
        return (
            <Modal
                popup
                visible={modal}
                animationType="slide-up"
            >
                <div className={hasHeader ? 'has-local-header' : ''}>
                    <DHeader title={fieldConf.name} leftClick={this.close}/>
                    <div className={'info-container addr-panel'} style={{height: containerH}}>
                        <Container
                            isEdit={true}
                            hideHeader={true}
                            store={addStore}
                            addReferBackAct={this.props.addReferBackAct}
                            cardName={fieldConf.code}
                            data={{
                                areacode: fieldConf.code,
                                rows: [{
                                    status: 0,
                                    values: this.data
                                }]
                            }}
                            onChange={this.afterAction}
                            className='has-bottom-btn'
                            ref={node => this.refNode = node}
                        />
                        <Button className='bottom-btn'
                                onClick={() => this.saveAddr()}>
                            {langCheck("0000PUB-000108")}
                        </Button>
                    </div>
                </div>
            </Modal>
        );
    }
}