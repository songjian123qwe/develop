import React, {Component} from 'react';
import classNames from 'classnames'
import ReactDOM from 'react-dom';
import testData from '../../data.js'
import testData2 from '../../data2.js'
import {
    DHeader,
    DEmpty,
    ListBase,
    ListAll,
    ApprovalProcess,
    HrModal
} from '../../../public/mobile/components/index'
import './index.less'
import ajax from '../../../public/mobile/utils/ajax'
import thirdLog from "../../../login/third-log-method";
// import cc from '../../../../hrhi/refer/hiref/TrnsTypeGridRef/index'




class HandoverApproval extends Component{
    constructor (props) {
        super(props);
        this.state = {
            isActive:false
        }
        console.log(["0",'constructor'])
        window.location.hash ='?&c=60652050&p=60652050&ar=0001Z510000000065KV7&id=0'
        // this.ttt()
        // this.zzz()
    }
    componentWillMount () {
        // window.location.hash = 'c=60652050'
    }
    ttt(){
        console.log(444)
        ajax({
            url: '/nccloud/platform/pub/mergerequest.do',
            data: [{
                rqUrl: '/platform/templet/querypage.do',
                rqJson: `{\n  \"pagecode\": \"60652050t\",\n  \"appcode\": \"60652050\"\n}`,
                rqCode: 'template'
            }],
            success: (result) => {
                console.log(['result',result])
                // this.getInfo()
            }
        })

    }
    zzz(){
        // console.log(cc)
        // ajax({
        //     url: '/nccloud/uapbd/refer/userdef/DefdocTreeRef/index',
        //     data: {rqCode: 'querypersonsettings'},
        //     success: (result) => {
        //         console.log(['result',result])
        //         // this.getInfo()
        //     }
        // })


        HrModal.alert('', '我是测试', [
            { text: '返回', onPress: () => {console.log('test success')} },
          ])
    }
    toggle(){
        this.setState({
            isActive:!this.state.isActive
        })
    }
    // 返回 左上角的返回键
    leftClick () {
        window.history.go(-1)
    }
    componentWillMount(){
        console.log(["1",'componentWillMount'])
        // console.log(testData)
        
    }



    // 打开编辑页面
    openDetail(num){ // num 表示数组的下标，-1为新增
        let textarea='';
        if(num === -1){
            textarea = ''
        }else {
            textarea = this.state.listData[num].title
        }
        // 切换组件，并更新数据
        this.setState((prevState, props) => ({
            listNum:num,
            textarea: textarea,
            state: 4,
        }));
    }

    // 编译list数组转为dom
    listToDom(type){
        let contentDom = this.state.listData.map((item,index) => {
            return (
                <ListBase titleClick={this.openDetail.bind(this,index)} iconFun={this.deleteList.bind(this,index)}
                    type = {type}
                    title = {item.title}
                /> 
            )
        })
        return contentDom
    }

    okkk(d,a){
        console.log(['#####',d,a])
        console.log(d[a[0]])
    }

    render () {
        let lists=testData.apply.data.template.card.items
        console.log(lists)
        let types={}
        let currentDom = lists.map((item,index) => {
            types[item.itemtype]=1
            if (item.visible){
                let options = item.options||[]
                console.log(item.options)
                options.forEach((e)=>{
                    e.label=e.display
                })
                return (
                    <ListAll 
                        type={item.itemtype} 
                        name={item.label} 
                        // disabled={item.disabled} 
                        value={this.state.receiveName} 
                        // onOk={(d)=>{console.log(["sss",d,options])}}
                        // onOk={this.okkk.bind(this,options)}
                        />
                );
            }
        })

        // let resData = []
        // console.log(resData)
        // let processData =  []
        // resData.forEach((e)=>{
        //     let eValue = e.values || {}
        //     processData.push({
        //         endTime:eValue.dealdate.value || '', // 处理时间
        //         examineText:(eValue.checknote.value + eValue.approveresult.value) || '', // 批语+审批意见
        //         approvestatus:eValue.approvestatus_value.value || 0, // 审批状态编码 0进行中 1已完成
        //         approvestatusName:eValue.approvestatus.value || '', // 审批状态文案
        //         assigneeName:eValue.dealman.value || '', // 审批人
        //     })
        // })
        let cc=testData2.approvalData.data.rows.rows;
        let dd = ApprovalProcess.formatData(cc)
        console.log(types)
        return (
            <div class="main" > 
                <div class="test" onClick={this.toggle.bind(this)}>
                99999
                </div>
                <div class={classNames({'bbb':true,'cxz':this.state.isActive})}>

                </div>
                {
                    currentDom
                }
                <ApprovalProcess processData={dd}/>
                

            </div>
        )
    }
}
thirdLog(() => {
    ReactDOM.render(<HandoverApproval />, document.getElementById('app'));
});
// ReactDOM.render(<HandoverApproval/>, document.getElementById('app'));