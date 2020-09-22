import '../container/index.less';
// import moment from 'moment';
export default class ProcessTmp {
    constructor(parent, context) {
        this.comp = context;
    }

    // 编号可单击
    tableBody = (res) => {
        const { props, action } = this.comp;
        const { emp } = props;
        let data = res.list.items;
        data.forEach((item) => {
            if (item.attrcode === 'bill_code') {
                item.renderStatus = 'browse';
                item.render = (text, record, index) => {
                    return (
                        <span style={{ color: '#0073E1', cursor: 'pointer' }}
                            onClick={() => action.formAct.toBrowsePage(record)}
                        >
                            {record && record.values['bill_code'] && record.values['bill_code'].value}
                        </span>
                    );
                };
            }
        })
        return res;
    }

    // 添加附件列
    addAttachButton = (res) => {
        const { props, action } = this.comp;
        const { emp } = props;

        res['list'].items.push({
            attrcode: 'opr',
            itemtype: 'customer',
            hyperlinkflag: false,
            label: emp.language['ga6013-000031'], /* 国际化处理： 附件管理*/
            width: '120px',
            textAlign: 'center',
            visible: true,
            fixed: 'right',
            render: (text, record, index) => {  // approve_state 审批状态的字节
                return (<a style={{ cursor: 'pointer' }}>
                    <i className="icon iconfont icon-fujianshenpi" onClick={() => {
                        action.btnAct.fileManager(record)
                    }} />
                </a>
                )
            }
        });
        return res;
    }
    // 给主页面表格每行添加操作按钮
    addOperatorButton = (res, btnConf = []) => {
        const { props, action } = this.comp;
        const { emp } = props;
        // 操作行的按钮
        res['list'].items.push({
            itemtype: 'customer',
            label: emp.language['ga6013-000004'],/* 国际化处理： 操作*/
            visible: true,
            fixed: 'right',
            width: '250px',
            attrcode: 'opr',
            render: (text, record, index) => {
                const isFree = record && record.values.approve_state && record.values.approve_state.value === '-1';  // 自由状态
                const isSubmit = record && record.values.approve_state && record.values.approve_state.value === '3'; // 已提交状态
                console.log(record)
                console.log(isSubmit)
                // 如果提交并已经审批 则返回1
                return (
                    <div>
                        {isFree ?
                            <a
                                href="javascript:void(0)"
                                className="operator-btn"
                                onClick={() => {
                                    action.rowAct.submitOnes(record)  // 提交
                                }}
                            >
                                {emp.language['ga6013-000018']}
                            </a>
                            : null}
                        {isSubmit ?
                            <a
                                href="javascript:void(0)"
                                className="operator-btn"
                                onClick={() => {
                                    action.rowAct.callbackOnes(record)  // 收回
                                }}
                            >
                                {emp.language['ga6013-000062']}
                            </a>
                            : null}
                        {isFree ?
                            <a
                                href="javascript:void(0)"
                                className="operator-btn"
                                onClick={() => {
                                    action.rowAct.editOnes(record)  // 修改
                                }}
                            >
                                {emp.language['ga6013-000029']}
                            </a>
                            : null}
                        {isFree ?
                            <a
                                href="javascript:void(0)"
                                className="operator-btn"
                                onClick={() => {
                                    action.rowAct.deleteRows(record) // 删除
                                }}
                            >
                                {emp.language['ga6013-000030']}
                            </a>
                            : null}

                        {record.values.def1.value !== "2" && record.values.def1.value !== "0" && record.values.approve_state.value !== "-1" ?
                            <a
                                href="javascript:void(0)"
                                className="operator-btn"
                                onClick={() => {
                                    action.rowAct.previewApproveInfo(record)  // 查看审批详情
                                }}
                            >
                                {emp.language['ga6013-000063']}
                            </a>
                            : null
                        }
                    </div>
                )
            }
        });

        return res;
    }

    // 按钮处理

    // 给查询弹窗的申请日期添加默认值
    // addDefaultSearchData = (res) => {
    //     // res['querybill'].items.map((item) => {
    //     //     if(item.attrcode === 'apply_date' && !item.initialvalue) {
    //     //         let firstValue = moment().date(1).format('YYYY-MM-DD');  // 获取一个月中的某一天
    //     //         let secondValue = moment().format('YYYY-MM-DD');

    //     //         item.initialvalue = {
    //     //             display: `${firstValue},${secondValue}`,
    //     //             value: `${firstValue},${secondValue}`
    //     //         };
    //     //     }
    //     // });

    //     return res;
    // }


    // 修改表格宽度
    modifyTableWidth = (template) => {
        template['list'].items.map((item) => {
            item.width = '130px';
        });
        return template;
    }

    // 处理模版数据
    selfProcessTemplate = (res) => {
        if (!res.org_situation) {
            res.org_situation = {};
        }
        if (!res.batch_add) {
            res.batch_add = {};
        }
        res.template = this.modifyTableWidth(res);
        res = this.tableBody(res);
        res = this.addAttachButton(res);
        res = this.addOperatorButton(res, res.button);
        // res = this.addDefaultSearchData(res);

        return res.template
    }
}