import React, { Component } from 'react';
import {setStorage,getStorage} from '../../../../../../public/mobile/utils/index'
import './OpearLoading.less'
import tiao from '../../../../../images/tou.png'
import see from '../../../../../images/see.png'
import  yindao from '../../../../../images/yindao1.png'
import ranhou from '../../../../../images/ranhou.png'
import  now  from '../../../../../images/now.png'
import deletd from '../../../../../images/delete1.png'
const FirstStep = (props) =>{
    const {json={},opearStatus,opearNumber,addNumber =()=>{},hiddenOpear=()=>{}} = props
    return(
        <div className="first">
        <div className="choose">
            <h4>{json["hrzzmb-000168"]}</h4>
            <div className="xuzhe">
                <div className="left">
                    <div>{json["hrzzmb-000211"]}</div>
                    <div>{json["hrzzmb-000210"]}</div>
                </div>
                <div className="center">
                    <img src={tiao} />
                </div>
                <div className="right">
                    <div>{json["hrzzmb-000212"]}</div>
                    <div>{json["hrzzmb-000210"]}</div>
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
            {json["hrzzmb-000213"]}                                                     
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
        const {json={}} =this.props
        return (
            <div className={`navOpear ${opearStatus?'forword':''}`}  >  
                {opearNumber===1?<FirstStep json={json} addNumber={this.addNumber} hiddenOpear={this.hiddenOpear} opearStatus={opearStatus}/>:<SecondStep json={json} countNumber={this.countNumber} hiddenOpear={this.hiddenOpear}/>}
                
            </div>
        );
    }
}

export default OpearLoading;