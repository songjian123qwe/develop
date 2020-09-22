import React, {Component} from 'react';
import './index.less'
/**
 * 文本框组件
 * 
 * @param maxNum  [string] 最多输入的字数
 * @param placeholder [string] 自定义提示语
 * @param textChange [function] 自定义回调函数
 *  eg:
 *  <Textarea 
 *      maxNum={'100} 
 *      textChange={this.leftClick.bind(this)}
 *  />
 * leftClick自定义回调函数
 * 
 */


class Textarea extends Component {
  constructor(props) {
    super(props);
    let maxNum = 140
    this.state = {
      value:this.props.value || '',
      maxNum:this.props.maxNum || maxNum,
      maxNumConst:this.props.maxNum || maxNum,
      placeholder:this.props.placeholder||'请输入',
      flag:false, //是否放开限制，解决中文输入法的问题
    };
    this.textChange = this.props.textChange
  }

  // 监听文字变化的函数
  changFun(e){
    if(!this.state.flag){
      this.backFun(e)
    }
  }

  // 字数变化函数
  numFun(length){
    this.setState((prevState, props) => ({
      maxNum: this.state.maxNumConst-length
    }));
  }

  // 回写数据的方法
  backFun(e){
    e.target.value = e.target.value.slice(0,this.state.maxNumConst)
    this.textChange(e.target.value)
    this.numFun(e.target.value.length)
  }

  // 控制中文输入发的方法
  handleComposition(e){
    if(e.type === 'compositionend'){
      this.setState(() => ({
        flag : false
      }))
      this.backFun(e)
    } else {
      this.setState(() => ({
        flag : true
      }))
    }
  }

  render() {
    const { title } = this.props
    return (
      <div class="d-textarea">
        <div>{title}</div>
        <textarea defaultValue={this.state.value} 
          placeholder={this.state.placeholder} 
          onChange={this.changFun.bind(this)}
          onCompositionStart = {this.handleComposition.bind(this)}
          onCompositionUpdate = {this.handleComposition.bind(this)}
          onCompositionEnd = {this.handleComposition.bind(this)}
          ></textarea>
        <span class="d-fontnum">{this.state.maxNum}</span>
      </div>
    );
  }
}


export default Textarea