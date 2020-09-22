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
 *      maxNum={'100'} 
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
      placeholder:this.props.placeholder,
      flag:false, //是否放开限制，解决中文输入法的问题
    };
    this.textChange = this.props.textChange
    this.changFun = this.changFun.bind(this)
    this.blurFun = this.blurFun.bind(this)
    this.textBlur = this.props.textBlur
    this.handleComposition = this.handleComposition.bind(this)
    console.log([this.state.value,this.state.value.length])

  }
  componentDidMount () {
    this.numFun(this.state.value.length)
  }

  // 监听文字变化的函数
  changFun(e){
    if(!this.state.flag){
      this.backFun(e)
    }
  }

  // 字数变化函数
  numFun(length){
    console.log(length)
    this.setState((prevState, props) => ({
      maxNum: this.state.maxNumConst-length
    }));
  }

  blurFun() {
    this.textBlur && this.textBlur()
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
    return (
      <div class="d-textarea">
        <textarea defaultValue={this.state.value} 
          placeholder={this.props.placeholder} 
          onChange={this.changFun}
          onBlur={this.blurFun}
          onCompositionStart = {this.handleComposition}
          onCompositionUpdate = {this.handleComposition}
          onCompositionEnd = {this.handleComposition}
          ></textarea>
        <span class="d-fontnum">{this.state.maxNum}</span>
      </div>
    );
  }
}


export default Textarea