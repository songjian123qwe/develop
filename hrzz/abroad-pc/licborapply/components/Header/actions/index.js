

let timer = null;

import CommonAction from 'src/hrpub/common/actions';

export default class HeaderAction extends CommonAction {
    constructor(comp) {
        super();
        this.comp = comp;
        this.dispatch = this.comp.props.dispatch;
    }

    // 单据状态下拉框的内容数据
    getOrderStatusList = () => {
        const {props} = this.comp;
        const {emp} = props;

        return [{
            key: 'all',
            label: emp.language['ga6013-000016'], // 全部
        }, {
            key: '-1',
            label: emp.language['ga6013-000017'], // '自由态'
        }, {
            key: '3',
            label: emp.language['ga6013-000018'], // 提交
        }, {
            key: '2',
            label: emp.language['ga6013-000019'], // 审批进行中
        }, {
            key: '1',
            label: emp.language['ga6013-000020'], // 审批通过
        }];
    }

    // 单据时间范围的下拉框内容
    getOrderTimeRangeList = () => {
        const {props} = this.comp;
        const {emp} = props;

        return {
            'oneWeek': emp.language['ga6013-000024'], // 一周内
            'oneMonth': emp.language['ga6013-000021'], // 一个月内
            'threeMonth': emp.language['ga6013-000022'], // 三个月内
            'custom': emp.language['ga6013-000023'], // 自定义
        };
    }

    // 单据订单状态
    changeOrderStatus = (value) => {
        
        const {props} = this.comp;
        const {
            emp: {
                orderStatus: prevOrderStatus
            }
        } = props;
        let valueWithoutAll = [];
        if((value.includes('all') && !prevOrderStatus.includes('all')) || value.length === 0) {
            valueWithoutAll = ['all'];
            this.update({
                orderStatus: valueWithoutAll
            });
        }
        else {
            value.map((item) => {
                if(item !== 'all') {
                    valueWithoutAll.push(item);
                }
            });
            this.update({
                orderStatus: valueWithoutAll
            });
        }
        
        clearTimeout(timer);
        timer = setTimeout(() => {
            this.pubSub.publish('getMainTableData', {
                billstate: valueWithoutAll
            });
        }, 1000);
    }

    // 选择订单时间范围
    changeOrderRange = (value) => {
        
        if(value !== 'custom') {
            this.pubSub.publish('getMainTableData', {
                time: value
            });
        }

        this.update({
            orderTimeRange: value,
            orderBeginTime: '',
            orderEndTime: ''
        });
    }

    // 自定义订单时间范围
    changeOrderTime = (value) => {
        this.update({
            orderBeginTime: value[0],
            orderEndTime: value[1]
        });
        this.pubSub.publish('getMainTableData', {
            orderBeginTime: value[0],
            orderEndTime: value[1]
        });
    }

    // 本节点更新
    update = async (obj) => {
        const {props} = this.comp;
        const {dispatch} = props;

        await dispatch({
            type: 'emp/update',
            payload: obj
        });
    }
}