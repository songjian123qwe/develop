import React, {Component} from 'react';
import './index.less'

import {  List } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import '../../../static/style/ant-theme.less';


class BasicRefer extends Component {
  componentDidMount() {
    // this.autoFocusInst.focus();
  }
  handleClick = () => {
    this.inputRef.focus();
  }
  render() {

    const {

      name= '下拉选项', // 列表名称
      value= '', //	值, 格式是[value1, value2, value3], 对应数据源的相应级层value	Array	-
      itemStyle= {}, //	每列样式	Object	-
      extra= '请选择', //	Picker children 建议是 List.Item, 如果不是，需要是自定义组件(组件内需处理onClick/extra属性)	String	请选择
      disabled= false, //	是否不可用	Boolean	false
      cascade= true, //	是否联动	Boolean	true
      placeholder=placeholder||'请输入',
      onChange=(v) => { console.log('onChange', v); },
      onBlur=(v) => { console.log('onBlur', v); },


    } = this.props;


    return (
      <div>
        <List>
            <List.Item arrow="horizontal">{name}</List.Item>
        </List>
      </div>
    );
  }
}


export default BasicRefer