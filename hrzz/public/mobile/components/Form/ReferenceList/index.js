import React, { Component } from 'react';
import './index.less'

import { Picker, List, WhiteSpace } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import '../../../static/style/ant-theme.less';

class ReferenceList extends Component {
    state = {
        data: [],
        cols: 1,
        pickerValue: [],
        asyncValue: [],
        sValue: '',
        visible: false,
        colorValue: ['#00FF00'],
        okText: '哈哈',
        dismissText: '呵呵',
    };

    render () {

        const {

            name = '下拉选项', // 列表名称
            data = data, //[], //	数据源	Array<{value, label, children: Array}>	-
            value = value, //	值, 格式是[value1, value2, value3], 对应数据源的相应级层value	Array	-
            extra = '请选择', //	Picker children 建议是 List.Item, 如果不是，需要是自定义组件(组件内需处理onClick/extra属性)	String	请选择
            onOk = (v, i) => {
                this.setState({ sValue: v });
                console.log([v, "33", i])
            }, // 点击确定回调
            onDismiss = v => {
                // this.setState({ sValue: v });
                console.log([v, '99'])
            }, // 点击取消回调
            onChange = (v, i) => {
                this.setState({ sValue: v });
                console.log([v, "44222", i])
            }, // 	选中后的回调，可使用rc-form	(val): void	-
            onPickerChange = v => {
                // this.setState({ sValue: v });
                console.log([v, "55"])
            }, // 	每列数据选择变化后的回调函数	(val): void	-
            onVisibleChange = v => { console.log([v, "66444"]) }, // 	当显隐状态变化时回调函数	(visible: bool): void	


        } = this.props;
        console.log(data)

        return (<div class="testtest">
            <List style={{ backgroundColor: 'white' }} className="picker-list">
                <List.Item arrow="horizontal" extra={value || extra} onClick={() => { onOk() }}>{name}</List.Item>
            </List>
        </div>);
    }
}


export default ReferenceList