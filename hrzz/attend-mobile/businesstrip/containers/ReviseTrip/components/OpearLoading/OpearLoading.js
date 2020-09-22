import React, { Component } from 'react';
import {setStorage,getStorage} from '../../../../../../public/mobile/utils/index'
import './OpearLoading.less'
import tiao from '../../../../../images/tou.png'
import see from '../../../../../images/see.png'
import  yindao from '../../../../../images/yindao.png'
import ranhou from '../../../../../images/ranhou.png'
import  now  from '../../../../../images/now.png'
import deletd from '../../../../../images/delete.png'
const FirstStep = (props) =>{
    const {opearStatus,opearNumber,addNumber =()=>{},hiddenOpear=()=>{}} = props
    return(
        <div className="first">
        <div className="choose">
            <h4>销差详细</h4>
            <div className="xuzhe">
                <div className="left">
                    <div>实际开始时间</div>
                    <div>点击选择</div>
                </div>
                <div className="center">
                    <img src={tiao} />
                </div>
                <div className="right">
                    <div>实际结束时间</div>
                    <div>点击选择</div>
                </div>
            </div>
        </div>
        <div className="yindao">
            <img src={yindao} alt="引导"/>
        </div>
        <div className="tiaozhuan" onClick={addNumber}>
            <img src={ranhou}/>
        </div>
        {opearStatus?<div className="closed" onClick={hiddenOpear} >
            我清楚如何销差，跳过~
        </div>:""}
    </div>
    )
}
const SecondStep = (props) =>{
    const {opearStatus,opearNumber,countNumber =()=>{},hiddenOpear=()=>{}} = props
    
    return (
        <div className="second">
            <div className="deleteOpear">
                <img className="opearImg" src={deletd}/>
                <div className="opear"><span className="icon hrfont hr-Dustbin_bold"></span></div>
            </div>
            <div class="buzou">
            <div onClick={countNumber} ><img src={see}/></div>
            <div onClick={hiddenOpear}><img src={now}/></div>
            </div>
    </div>
    )
}
class OpearLoading extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            opearNumber:1,
            opearStatus:false
        }
    }
    
    componentDidMount() {
        let state = getStorage('leaveState')
        if(state == 1){
            this.setState({
                opearStatus:false
            })
        } else {
            this.setState({
                opearStatus:true
            })
        }
    }
    hiddenOpear = () => {
        this.setState({
            opearStatus:false
        })
        this.opearNumber = 1
        setStorage('leaveState','1')
    }
    showOpear(){
        this.setState({
            opearStatus:true
        })
    }
    countNumber = () => {
        const {opearNumber} = this.state
        this.setState({
            opearNumber:opearNumber-1
        })

    }
    addNumber = () => {
        const {opearNumber} = this.state
        this.setState({
            opearNumber:opearNumber+1
        })
    }
    render() {
        const {opearStatus,opearNumber} = this.state
        return (
            <div className={`navOpear ${opearStatus?'forword':''}`}  >  
                {opearNumber===1?<FirstStep addNumber={this.addNumber} hiddenOpear={this.hiddenOpear} opearStatus={opearStatus}/>:<SecondStep countNumber={this.countNumber} hiddenOpear={this.hiddenOpear}/>}
                
            </div>
        );
    }
}

export default OpearLoading;