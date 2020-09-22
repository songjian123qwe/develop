import React from 'react'
import './index.less'
import {InputToSpan} from "../hrInputItem";
import {isT, Maybe} from "../../../utils";
import {langCheck} from "../../../../mobile/utils/utils";
import AddrPanel from "../addrPanel";
import ajax from "../../../../mobile/utils/ajax";
import {Alert} from "../../../../mobile/components";

export default class AddrRefer extends React.Component {
    showReferPanel = async () => {
        let result = await this.props.onBeforeHandle();
        if (!result) {
            return
        }
        this.getAddrDetail((addr => {
            this.addrPanelNode.show(addr);
        }));
    };

    getDisplay = (value) => {
        //地址参照特殊处理，批量导入会导致出现空的地址信息，页面会显示地址的value信息
        //判断如果display和value相同，则不显示地址信息
        if (isT(value, 'Object')) {
            if (Maybe.of(value).getValue(['display']) === Maybe.of(value).getValue(['value'])) {
                return '';
            } else {
                return Maybe.of(value).getValue(['display']);
            }
        }
        return value;
    };

    getAddrDetail = (callback) => {
        if (!this.props.refVal.value) {
            callback();
        }
        ajax({
            url: '/nccloud/uapbd/ref/AddressRef.do',
            data: {pk_address: this.props.refVal.value},
            loading: true,
            noNeedShowError: false,
            success: result => {
                if (result.success) {
                    return callback(this.formatAddrData(result.data))
                }
            }
        });
    };

    formatAddrData = (data) => {
        try {
            return {
                pk_address: data.addressRefVO.vo.pk_address,
                country: {
                    value: data.addressRefVO.vo.country,
                    display: data.addressRefVO.country,
                },
                province: {
                    value: data.addressRefVO.vo.province,
                    display: data.addressRefVO.state,
                },
                city: {
                    value: data.addressRefVO.vo.city,
                    display: data.addressRefVO.city,
                },
                vsection: {
                    value: data.addressRefVO.vo.vsection,
                    display: data.addressRefVO.section,
                },
                detailinfo: {
                    value: data.addressRefVO.vo.detailinfo,
                    display: data.addressRefVO.road,
                },
                postcode: {
                    value: data.addressRefVO.vo.postcode,
                    display: data.addressRefVO.postcode,
                }
            }
        } catch (e) {
            return null;
        }
    };

    saveAddr = (data) => {
        if (!data.country.value && !data.province.value && !data.city.value &&
            !data.vsection.value && !data.postcode.value && !data.detailinfo.value) {
            this.addrPanelNode.close();
            return;
        }
        ajax({
            url: '/nccloud/uapbd/ref/AddressRefSave.do',
            data: {
                "country": data.country.value,
                "province": data.province.value,
                "city": data.city.value,
                "vsection": data.vsection.value,
                "postcode": data.postcode.value,
                "detailinfo": data.detailinfo.value,
                //"pk_address": data.pk_address 不传pk_adress，每次都是新的地址，审核用的
            },
            loading: true,
            noNeedShowError: false,
            success: result => {
                if (result.success) {
                    Alert({
                        status: 'success',
                        msg: langCheck("0000PUB-000302"),
                        confirmAct: () => {
                            this.addrPanelNode.close();
                            this.props.onChange({
                                value: result.data.pk_address,
                                display: data.addressFullName.value
                            })
                        }
                    });
                }
            }
        });
    };

    render() {
        let props = this.props;
        let {editable, classname, refVal, disabled, isFieldChange, showIsChangedIndicator} = props;
        const display = this.getDisplay(refVal);
        let content = editable && (!disabled) ? (
            <div className={"am-list-item am-list-item-middle hr-input-item "
            + (showIsChangedIndicator && isFieldChange ? ' am-filed-changed ' : '') + classname}
                 onClick={this.showReferPanel}>
                <div className="am-list-line">
                    <div className="am-list-content">
                        {this.props.label}
                        <i style={{color: '#e14c46', display: props.required ? '' : 'none'}}>*</i>
                    </div>
                    {display ? <div className="am-input-control">
                        {
                            display
                        }
                    </div> : <div className="am-list-extra">
                        {langCheck("0000PUB-000018")}
                    </div>}
                    <div className="am-list-arrow am-list-arrow-horizontal"/>
                </div>
            </div>
        ) : (
            <InputToSpan {...props}>
                {this.props.label}
            </InputToSpan>
        );
        return (
            <React.Fragment>
                {
                    content
                }
                <AddrPanel {...props}
                           saveAddr={this.saveAddr}
                           ref={node => this.addrPanelNode = node}/>
            </React.Fragment>
        )
    }
}
