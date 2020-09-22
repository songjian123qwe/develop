import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, CreateMeta } from '../hr-mobile-card/index'
import meta from '../hr-mobile-card/mock_meta'
import FormData from '../hr-mobile-card/mock_data'
import './index.less'
import {getReferConf} from '../hr-mobile-card/utils'
import {hrAjax} from 'src/hrpub/common/utils/utils'
let timer = new Date().getTime()
let count = 1
class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {
            store: null,
            data: null
        }
        console.log('constructor', new Date().getTime() - timer, 'ms')
    }
    componentDidMount() {
        // 模拟动态获取模板与数据
        let getMeta = CreateMeta(meta, {
            // onAfterHandle: this.onAfterHandle
        })
        this.setState({
            store: getMeta
        },() => {
            setTimeout(()=>{
                this.setState({
                    data: FormData
                })
            },5000)
        })
    }
    onAfterHandle({ key, type, value }) {
        console.log('after', { key, type, value })
    }
    render() {
        let {store, data} = this.state
        console.log(`第${count}次render耗时:`, new Date().getTime() - timer, 'ms')
        count++
        return (
            <Container
                store={store}
                cardName="add_form"
                data={data}
            ></Container>
        )
    }
}
ReactDOM.render((<Test hh={11111} />), document.querySelector('#app'));


// getReferConf({
        //     url: '../../../../hrwa/refer/basic/AlterPsnGridRef/index.js',
        //     success: res => {
        //         // debugger
        //     }
        // })
        // hrAjax({
        //     url: '/nccloud/hrwa/ref/WaPeriodTreeRef.do',
        //     data: {"pid":"","pageInfo":{"pageSize":50,"pageIndex":-1},"keyword":"","defineItems":[],"queryCondition":{"isShowUnit":false,"pk_wa_class":"1001AB100000000059TO","isGroup":""}},
        //     success: res => {
        //         debugger
        //     }
        // })