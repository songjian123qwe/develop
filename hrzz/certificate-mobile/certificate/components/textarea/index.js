import List from 'antd-mobile/lib/list';
import TextareaItem from 'antd-mobile/lib/textarea-item';
import 'antd-mobile/lib/list/style/css';
import 'antd-mobile/lib/textarea-item/style/css';
import { createForm } from 'rc-form';
import Toast from "antd-mobile/lib/toast";
import 'antd-mobile/lib/toast/style/css';

class Textarea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      targetValue: props.textareaVal || '',
      json:{}
    }
  }

  componentWillReceiveProps(nextprops) {
    let nextJson = JSON.stringify(nextprops.json);
    let thisJson = JSON.stringify(this.props.json);
    let nexttextareaVal = JSON.stringify(nextprops.textareaVal);
    let thistextareaVal = JSON.stringify(this.props.textareaVal);
    if (nexttextareaVal !== thistextareaVal) {
        this.setState({
          targetValue: nextprops.textareaVal
        })
    }
    if (nextJson !== thisJson) {
        this.setState({
            json: nextprops.json
        })
    }
}
  getTargetValue(value) {
    let targetValue = value;
    if(targetValue.length >= 100){
      Toast.info(this.props.json['hrzzmb-000148']) // '最多输入100个字'
    }
    this.setState({
      targetValue,
    });
    //将文本输入的值向父组件传递
    this.props.toMain(value)
  }
    render() {
      const {targetValue} = this.state;
      const { getFieldProps } = this.props.form;
      return (
        <div>
          <List>
            <TextareaItem 
              {...getFieldProps('count')}
              placeholder={this.props.json['hrzzmb-000147']}
              rows={5}
              count={100}
              value={targetValue}
              onChange={(value) => this.getTargetValue(value)}
            />
          </List>
        </div>
      );
    }
  }
  
  const TextareaWrapper = createForm()(Textarea);
  export default TextareaWrapper;
  
