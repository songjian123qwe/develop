import React, {Component} from 'react';
import './index.less'

import { Picker, List, WhiteSpace } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import '../../../static/style/ant-theme.less';


const seasons1 = [
    {
        label: '2013',
        value: '2013',
        // id:'201'
      },
      {
        label: '2014',
        value: '2014',
        // id:'202'
      },
  ];


class PullDown extends Component {
  state = {
    data: [],
    cols: 1,
    pickerValue: [],
    asyncValue: [],
    sValue: '',
    visible: false,
    colorValue: ['#00FF00'],
    okText:'哈哈',
    dismissText:'呵呵',
  };

  render() {

    const {

        name= '下拉选项', // 列表名称
        data= data, //[], //	数据源	Array<{value, label, children: Array}>	-
        value= '', //	值, 格式是[value1, value2, value3], 对应数据源的相应级层value	Array	-
        // format	格式化选中目标的函数	(labels: React.ReactNode[]): any	if label is string: (labels) => { return labels.join(',');} else: (labels) => { return labels;}
        cols=1, //	列数	Number	3-
        itemStyle= {}, //	每列样式	Object	-
        // indicatorStyle	indicator 样式	Object	-
        // children	通常是 List.Item	Object	List.Item
        title= '选择季节',//'', //	大标题	String	-
        extra= '请选择', //	Picker children 建议是 List.Item, 如果不是，需要是自定义组件(组件内需处理onClick/extra属性)	String	请选择
        disabled= false, //	是否不可用	Boolean	false
        cascade= true, //	是否联动	Boolean	true

        okText='确定',
        dismissText='取消',
        onOk=(v,i )=> {
            // this.setState({ sValue: v });
            console.log([v,"33",i])}, // 点击确定回调
        onDismiss=v => {
            // this.setState({ sValue: v });
            console.log([v,'99'])}, // 点击取消回调
        onChange=(v,i )=> {
            this.setState({ sValue: v });
            console.log([v,"44",i])}, // 	选中后的回调，可使用rc-form	(val): void	-
        onPickerChange=v => {
            // this.setState({ sValue: v });
            console.log([v,"55"])}, // 	每列数据选择变化后的回调函数	(val): void	-
        onVisibleChange=v => {console.log([v,"66"])}, // 	当显隐状态变化时回调函数	(visible: bool): void	


      } = this.props;
      console.log(data)

    return (<div class="testtest">
      <List style={{ backgroundColor: 'white' }} className="picker-list">
        <Picker
            data={data}
            value={this.state.sValue || value}
            // format={format}
            cols={cols}
            itemStyle={itemStyle}
            // indicatorStyle={indicatorStyle}
            // children={children}
            title={title}
            extra={extra}
            disabled={disabled}
            cascade={cascade}
            okText={okText}
            dismissText={dismissText}
            onOk={onOk}
            onDismiss={onDismiss}
            onChange={onChange}
            onPickerChange={onPickerChange}
            onVisibleChange={onVisibleChange}

        >
          <List.Item arrow="horizontal">{name}</List.Item>
        </Picker>

      </List>
    </div>);
  }
}


export default PullDown