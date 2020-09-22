
import React from 'react';
import './index.less';


import {render, connect} from '../../../../../hrpub/common/frame';

import {base} from 'nc-lightapp-front';

import HeaderAction from './actions/index';

const {
    NCSelect,
    NCDatePicker
} = base;

const {NCRangePicker} = NCDatePicker;

const {NCOption} = NCSelect;

const Wrapper = render({
    actions: {
        headerAct: HeaderAction
    }
})(({props, state, action}) => {

    const {emp} = props;
    const statusList = action.headerAct.getOrderStatusList();
    const timeRangeList = action.headerAct.getOrderTimeRangeList();

    let timerRangeValue = (emp.orderBeginTime && emp.orderEndTime) ? [emp.orderBeginTime, emp.orderEndTime] : [];

    return (
        <div className="employing-header-middle-content">
            <span 
                className="header-middle-item-wrapper"
                style={{
                    width: '160px'
                }}
            >
                <NCSelect
                    multiple={true}
                    showClear={false}
                    style={{
                        width: '160px'
                    }}
                    placeholder={emp.language['ga6013-000025']}//单据状态
                    onChange={action.headerAct.changeOrderStatus}
                    value={emp.orderStatus}
                >
                    {/* 组装下拉菜单 */}
                    {statusList.map((item) => {
                        return (
                            <NCOption
                                key={item.key}
                            >
                                {item.label}
                            </NCOption>
                        );
                    })}
                </NCSelect>
            </span>
            <span className="header-middle-item-wrapper">
                <NCSelect
                    style={{
                        width: '140px'
                    }}
                    showClear={false}
                    value={emp.orderTimeRange}
                    // 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数
                    onChange={action.headerAct.changeOrderRange}
                >
                    {Object.keys(timeRangeList).map((key) => {
                        return (
                            <NCOption
                                key={key}
                            >
                                {timeRangeList[key]}
                            </NCOption>
                        );
                    })}
                    
                </NCSelect>
            </span>
            <If condition={emp.orderTimeRange === 'custom'}>
                <span 
                    className="header-middle-item-wrapper"
                    style={{
                        width: '213px'
                    }}
                >
                    <NCRangePicker
                        format={'YYYY-MM-DD'}
                        placeholder={emp.language['ga6013-000026']}//{'开始日期 - 结束日期'}
                        onChange={action.headerAct.changeOrderTime}
                        value={timerRangeValue}
                    />
                </span>
            </If>
        </div>
    );

});


export default connect(Wrapper);