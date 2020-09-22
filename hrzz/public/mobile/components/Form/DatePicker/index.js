import React, {Component} from 'react';
import './index.less'

import { DatePicker, List } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import '../../../static/style/ant-theme.less';


const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

let minDate = new Date(nowTimeStamp - (1000*60*60*24*365*20));
let maxDate = new Date(nowTimeStamp + (1000*60*60*24*365*20));


class DateGroup extends Component {
  constructor (props) {
    super(props)
  }
  state = {
    value: '',
  }


  render() {
    const {
      name= '时间', // 列表名称
      mode= 'date', //	日期选择的类型, 可以是日期date,时间time,日期+时间datetime,年year,月month	String	date
      value= '', //	当前选中时间	Date	无
      minDate= minDate, //	最小可选日期	Date	new Date(2000, 1, 1, 0, 0, 0)
      maxDate= maxDate, //	最大可选日期	Date	new Date(2030, 1, 1, 23, 59, 59)
      minuteStep= 1, //	分钟数递增步长设置	Number	1
      disabled= false, //	是否不可用	Boolean	false
      // format: , //	格式化选中的值	(value: Date) => date string / format string(对应 mode 下格式分别为:YYYY-MM-DD,HH:mm,YYYY-MM-DD HH:mm)	-
      title= '', //	弹框的标题	string/React.ReactElement	无
      extra= '请选择', //	显示文案	String	请选择
      prefixCls= 'am-picker', //	class前缀	string	am-picker
      className= '', //	样式类名	string	-
      okText='确定',
      dismissText='取消',
      // onOk=()=>{}, // 点击确定回调
      onOk=date => {this.setState({ value: date });console.log([date,"33"])}, // 点击确定回调
      onDismiss=date => {this.setState({ value: date });console.log(date)}, // 点击取消回调
      onValueChange=date => {
        // this.setState({ value: date });
        console.log(date)}, // 滑动数据回调
      onChange=date => {this.setState({ value: date });console.log(date)}, // 时间发生变化的回调函数
    } = this.props;
    return (
      <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
        <DatePicker
          className="d-cccc" 
          mode={mode}
          value={this.state.value||value}
          minDate={minDate}
          maxDate={maxDate}
          minuteStep={minuteStep}
          disabled={disabled}
          title={title}
          extra={extra}
          prefixCls={prefixCls}
          className={className}
          okText={okText}
          dismissText={dismissText}
          // onOk={date => {this.setState({ value: date });console.log(date);onOk(date)}}
          onOk={onOk}
          onDismiss={onDismiss}
          onValueChange={onValueChange}
          onChange={onChange}
        >
          <List.Item arrow="horizontal">{name}</List.Item>
        </DatePicker>

       
      </List>
    );
  }
}

export default DateGroup