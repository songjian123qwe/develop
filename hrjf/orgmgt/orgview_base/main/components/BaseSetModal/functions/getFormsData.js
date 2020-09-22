import React from "react";
import AOSOrgChartTreeRef from "../../../../../../refer/jfref/AOSOrgChartTreeRef";
import HRManagedOrgTreeRef from "../../../../../../refer/jfref/HRManagedOrgTreeRef";
import AOSGroupChartTreeRef from "../../../../../../refer/jfref/AOSGroupChartTreeRef";
import AOSOrgChartRef from "../../../../../../refer/jfref/AOSOrgChartRef";
import HROrgChartDefaultTreeRef from "../../../../../../refer/jfref/HROrgChartDefaultTreeRef";
import HROrgDefaultTreeRef from "../../../../../../refer/jfref/HROrgDefaultTreeRef";
import AOSPostTreeRef from "../../../../../../refer/jfref/AOSPostTreeRef";
import HRManagedAOSPostTreeRef from "../../../../../../refer/jfref/HRManagedAOSPostTreeRef";
import DeptChartGroupTreeRef from "../../../../../../refer/jfref/DeptChartGroupTreeRef";
import AOSDeptmTreeRef from "../../../../../../refer/jfref/AOSDeptmTreeRef";
import DeptChartOrgTreeRef from "../../../../../../refer/jfref/DeptChartOrgTreeRef";
import HRManagedAOSDeptTreeRef from "../../../../../../refer/jfref/HRManagedAOSDeptTreeRef";

export default function getFormsData() {
    const {nodeType, json} = this.props;
    const {
        orgSys, qryDate, orgType, displayCanceledDept, displayPost, displayVirtualDept,
        orgpk, includeSubOrg, displayDept, checked
    } = this.state;

    let forms = [{
        items: [
            {
                name: json['jf6005-000500'], /* 国际化处理： 组织体系,组织体系*/
                required: true,
                error: checked && !orgSys,
                type: 'select',
                key: 'orgSys',
                value: orgSys,
                onChange: (value) => {
                    if (value === "2") {
                        this.itemChange({
                            orgSys: value,
                            orgType: '1',
                            includeSubOrg: 'Y',
                            displayDept: 'N',
                            displayCanceledDept: 'N',
                            displayVirtualDept: 'N',
                            displayPost: 'N',
                            orgpk: ''
                        })
                    } else {
                        this.itemChange({
                            orgSys: value,
                            orgpk: '',
                            includeSubOrg: 'Y',
                            displayDept: 'Y',
                            displayCanceledDept: 'N',
                            displayVirtualDept: 'N',
                            displayPost: 'Y',
                        })
                    }
                },
                options: [{
                    value: '2',
                    display: json['jf6005-000501']/* 国际化处理： 人力资源组织,人力资源组织*/
                }, {
                    value: '1',
                    display: json['jf6005-000411']/* 国际化处理： 行政体系*/
                }],
                width: '50%'
            },
            {
                name: json['jf6005-000412'], /* 国际化处理： 日期*/
                key: 'qryDate',
                value: qryDate,
                onChange: (value) => {
                    if (orgType === '3') {
                        this.itemChange({
                            qryDate: value,
                            orgType: '1',
                            includeSubOrg: 'Y',
                            displayDept: 'Y',
                            displayCanceledDept: 'N',
                            displayVirtualDept: 'N',
                            displayPost: 'N',
                            orgpk: ''
                        })
                    } else {
                        this.itemChange({'qryDate': value, orgpk: '', displayPost: 'N'})
                    }
                },
                clearEvent: () => {
                    if (orgSys === "2") {
                        this.itemChange({'qryDate': '', orgpk: ''})
                    } else {
                        this.itemChange({'qryDate': '', orgpk: '', displayPost: 'Y'})
                    }

                },
                type: 'datePickerNoTimeZone',
                width: '50%'
            }]
    },
        {
            title: json['jf6005-000413'], /* 国际化处理： 选择根节点*/
            items: [
                {
                    name: json['jf6005-000405'], /* 国际化处理： 节点类型*/
                    type: 'radio',
                    key: 'orgType',
                    value: orgType,
                    onChange: (value) => {
                        if (value === orgType) return;
                        if (value === '1') {
                            if (!qryDate) {
                                this.itemChange({
                                    includeSubOrg: 'Y',
                                    displayDept: 'Y',
                                    displayCanceledDept: 'N',
                                    displayVirtualDept: 'N',
                                    displayPost: 'Y',
                                    orgType: value,
                                    orgpk: ''
                                })
                            } else {
                                this.itemChange({
                                    includeSubOrg: 'Y',
                                    displayDept: 'Y',
                                    displayCanceledDept: 'N',
                                    displayVirtualDept: 'N',
                                    displayPost: 'N',
                                    orgType: value,
                                    orgpk: ''
                                })
                            }
                        } else if (value === '2') {
                            if (!qryDate) {
                                this.itemChange({
                                    includeSubOrg: 'N',
                                    displayDept: 'Y',
                                    displayCanceledDept: 'N',
                                    displayVirtualDept: 'N',
                                    displayPost: 'Y',
                                    orgType: value,
                                    orgpk: ''
                                })
                            } else {
                                this.itemChange({
                                    includeSubOrg: 'N',
                                    displayDept: 'Y',
                                    displayCanceledDept: 'N',
                                    displayVirtualDept: 'N',
                                    displayPost: 'N',
                                    orgType: value,
                                    orgpk: ''
                                })
                            }
                        } else if (value === '3') {
                            this.itemChange({
                                includeSubOrg: 'N',
                                displayDept: 'N',
                                displayCanceledDept: 'N',
                                displayVirtualDept: 'N',
                                displayPost: 'Y',
                                orgType: value,
                                orgpk: ''
                            })
                        }
                    },
                    options: [{
                        value: '1',
                        display: json['jf6005-000502']/* 国际化处理： 组织,组织*/
                    }, {
                        value: '2',
                        disabled: orgSys === '2',
                        display: json['jf6005-000378']/* 国际化处理： 部门,部门*/
                    }, {
                        value: '3',
                        disabled: orgSys === '2' || (orgSys === '1' && qryDate),
                        display: json['jf6005-000373']/* 国际化处理： 岗位,岗位*/
                    }],
                    width: '100%'
                }, {
                    name: json['jf6005-000404'], /* 国际化处理： 节点名称*/
                    required: true,
                    error: checked && !orgpk,
                    render: getRefer.call(this) /*<OrgRefer getOrgData={(value) => {
                        this.itemChange({
                            orgpk: value
                        })
                    }} orgVal={orgpk}/>*/,
                    width: '50%'
                }]
        },
        {
            title: json['jf6005-000414'], /* 国际化处理： 机构图节点设置*/
            items: [
                {
                    type: 'checkbox',
                    options: [{
                        key: 'includeSubOrg',
                        value: includeSubOrg,
                        disabled: orgType === '2' || orgType === '3',
                        onChange: (value) => {
                            this.itemChange({'includeSubOrg': value ? 'Y' : 'N'})
                        },
                        display: json['jf6005-000415']/* 国际化处理： 包含下级组织*/
                    }],
                    width: '100%'
                }, {
                    type: 'checkbox',
                    options: [{
                        key: 'displayDept',
                        value: displayDept,
                        disabled: orgType === '2' || orgType === '3' || orgSys === '2',
                        onChange: (value) => {
                            this.itemChange({'displayDept': value ? 'Y' : 'N'})
                        },
                        display: json['jf6005-000416']/* 国际化处理： 显示部门*/
                    }, {
                        key: 'displayCanceledDept',
                        value: displayCanceledDept,
                        disabled: orgType === '3' || displayDept !== 'Y' || orgSys === '2',
                        onChange: (value) => {
                            this.itemChange({'displayCanceledDept': value ? 'Y' : 'N'})
                        },
                        display: json['jf6005-000300']/* 国际化处理： 显示撤销部门,显示撤销部门*/
                    }, {
                        key: 'displayVirtualDept',
                        value: displayVirtualDept,
                        disabled: orgType === '3' || displayDept !== 'Y' || orgSys === '2',
                        onChange: (value) => {
                            this.itemChange({'displayVirtualDept': value ? 'Y' : 'N'})
                        },
                        display: json['jf6005-000517']
                    }],
                    width: '100%'
                }, {
                    type: 'checkbox',
                    options: [{
                        key: 'displayPost',
                        value: displayPost,
                        disabled: orgType === '3' || orgSys === '2' || qryDate,
                        onChange: (value) => {
                            this.itemChange({'displayPost': value ? 'Y' : 'N'})
                        },
                        display: json['jf6005-000417']/* 国际化处理： 显示岗位*/
                    }],
                    width: '100%'
                }]
        }
    ];

    if (nodeType === 'ORG_NODE') {
        forms[0].items[0].options = [{
            value: '1',
            display: json['jf6005-000411']/* 国际化处理： 行政体系*/
        }];
    }

    return forms;
}

function getRefer() {
    const {nodeType, orgVal} = this.props;
    const {orgSys, qryDate, orgType, orgpk, displayCanceledDept} = this.state;

    if (orgType === '1') {
        if (nodeType === "GROUP_NODE" && orgSys === "2") {
            if (qryDate) {
                return <HROrgChartDefaultTreeRef
                    onChange={(value) => {
                        this.itemChange({
                            orgpk: value
                        })
                    }}
                    value={orgpk}
                    queryCondition={{
                        orgStruDate: qryDate
                    }}
                />
            } else {
                return <HROrgDefaultTreeRef
                    onChange={(value) => {
                        this.itemChange({
                            orgpk: value
                        })
                    }}
                    value={orgpk}
                />
            }
        }
        if (nodeType === "GROUP_NODE" && orgSys === "1") {
            if (qryDate) {
                return <AOSGroupChartTreeRef
                    onChange={(value) => {
                        this.itemChange({
                            orgpk: value
                        })
                    }}
                    value={orgpk}
                    queryCondition={{
                        orgStruDate: qryDate
                    }}
                />
            } else {
                return <AOSOrgChartRef
                    onChange={(value) => {
                        this.itemChange({
                            orgpk: value
                        })
                    }}
                    value={orgpk}
                />
            }
        }
        if (nodeType === "ORG_NODE" && orgSys === "1") {
            if (qryDate) {
                return <AOSOrgChartTreeRef
                    onChange={(value) => {
                        this.itemChange({
                            orgpk: value
                        })
                    }}
                    value={orgpk}
                    queryCondition={{
                        pk_org: orgVal && orgVal.refpk,
                        orgStruDate: qryDate
                    }}
                />
            } else {
                return <HRManagedOrgTreeRef
                    onChange={(value) => {
                        this.itemChange({
                            orgpk: value
                        })
                    }}
                    value={orgpk}
                    queryCondition={{
                        pk_org: orgVal && orgVal.refpk
                    }}
                />
            }
        }
    } else if (orgType === '3') {
        if (nodeType === "GROUP_NODE") {
            return <AOSPostTreeRef
                onChange={(value) => {
                    this.itemChange({
                        orgpk: value
                    })
                }}
                value={orgpk}
            />
        }
        if (nodeType === "ORG_NODE") {
            return <HRManagedAOSPostTreeRef
                onChange={(value) => {
                    this.itemChange({
                        orgpk: value
                    })
                }}
                value={orgpk}
                queryCondition={{
                    pk_org: orgVal && orgVal.refpk
                }}
            />
        }
    } else if (orgType === '2') {
        if (nodeType === "GROUP_NODE") {
            if (qryDate) {
                return <DeptChartGroupTreeRef
                    onChange={(value) => {
                        this.itemChange({
                            orgpk: value
                        })
                    }}
                    value={orgpk}
                    queryCondition={{
                        displayHrCanceled: displayCanceledDept,
                        selectedDate: qryDate
                    }}
                />
            } else {
                return <AOSDeptmTreeRef
                    onChange={(value) => {
                        this.itemChange({
                            orgpk: value
                        })
                    }}
                    value={orgpk}
                    queryCondition={{
                        displayHrCanceled: displayCanceledDept
                    }}
                />
            }
        } else if (nodeType === "ORG_NODE") {
            if (qryDate) {
                return <DeptChartOrgTreeRef
                    onChange={(value) => {
                        this.itemChange({
                            orgpk: value
                        })
                    }}
                    value={orgpk}
                    queryCondition={{
                        pk_org: orgVal && orgVal.refpk,
                        displayHrCanceled: displayCanceledDept,
                        orgStruDate: qryDate
                    }}
                />
            } else {
                return <HRManagedAOSDeptTreeRef
                    onChange={(value) => {
                        this.itemChange({
                            orgpk: value
                        })
                    }}
                    value={orgpk}
                    queryCondition={{
                        pk_org: orgVal && orgVal.refpk,
                        displayHrCanceled: displayCanceledDept
                    }}
                />
            }
        }
    }
}