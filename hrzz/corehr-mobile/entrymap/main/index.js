import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ajax from '../../../public/mobile/utils/ajax'
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js'
import {DHeader} from '../../../public/mobile/components/index'
import {getMultiLang} from "../../../public/mobile/utils/getMultiLang"
import Empty from '../../../public/mobile/components/Other/Empty/index'
import './index.less'
import {Toast, Modal} from 'antd-mobile';
import {compatibleNavImg} from '../../../public/mobile/utils/index.js'
import {hrRouter} from '../../../public/mobile/utils/index.js'
import thirdLog from '../../../login/third-log-method';
const alert = Modal.alert,
      hasHeader = sessionStorage.getItem('showNav') === 'true';
class EntryMap extends Component{
    constructor (props) {
        super(props);
        this.state = {
            mapurl: '',
            title: '',
            iframeSrc: '',
            json: {},
            noData: false
        }
    }
    componentWillMount () {
        this.getLanguage()
    }
    initPage = (json) => {
        window.location.hash = 'c=606520B0'
        this.queryEntryMapAction(json)
        this.editNav()
        // sessionStorage.setItem('showNav', false)
    }
    getLanguage = () => {
        getMultiLang({
            domainName: 'hrzz',
            moduleId: 'hrzzmb',
            callback: (json, status, init) => {
                this.setState({
                    json: json,
                    title: json['hrzzmb-000038'] // 入职地图
                }, () => {
                    this.initPage(json)
                })
            }
        })
    }
    editNav(){
        let title = this.state.title
        let parameters={}
		let cbs={
			entrymapLeft: this.closePage
		}
		parameters={
			leftItems: [
				{
					callback: 'entrymapLeft',
					icon: compatibleNavImg(location.origin+'/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
				}
			],
			centerItems: [
				{
					title: title,
				}
			]
		}
		let data = {
			'function': 'configNavBar',
			'parameters': parameters
		}
		NativeObj.configNavBar(data, cbs)
    }
    closePage () {
        NativeObj.closePage()
    }
    leftClick () {
        let url = '/hrzz/entry-mobile/myentry/main/index.html'
        hrRouter.push(url)
    }
    // 移动端入职地图数据查询
    queryEntryMapAction (json) {
        ajax({
            url: '/nccloud/platform/appregister/querypersonsettings.do',
            data: {rqCode: 'querypersonsettings'},
            info: {
				appcode: '606520B0'
			},
            success: (result) => {
                if (result.success || result.code === '1000' || result.message === 'success') {
                    let cuserid = result.data.userId
                    let paramObj = {
                        cuserid: cuserid,
                        appcode: '606520B0'
                    }
                    ajax({
                        url: '/nccloud/hrzz/entrymap/QueryEntryMapAction.do',
                        data: paramObj,
                        info: {
                            appcode: '606520B0'
                        },
                        success: (result) => {
                            if (result.success) {
                                if (!result.data) {
                                    this.setState({
                                        noData: true
                                    })
                                    return false
                                }
                                if (result.data) {
                                    let data = result.data
                                    let entrymap = data.entrymap
                                    let rows = entrymap.rows
                                    if (!entrymap || !rows || rows.length === 0 || !rows[0].values.mapurl.value) {
                                        this.setState({
                                            noData: true
                                        })
                                        return false
                                    }
                                    let mapurl = rows[0].values.mapurl.value
                                    this.setState({
                                        iframeSrc: mapurl
                                    });
                                    if(!hasHeader){
                                        NativeObj.openWindow(mapurl,this.closePage);
                                    }else{
                                        Toast.loading(json['hrzzmb-000001'], 0) // 加载中...
                                    }
                                }
                            }
                        },
                        error: (err) => {
                            this.setState({
                                noData: true
                            })
                            alert(json['hrzzmb-000002'], err.data.error.message, [
                                { text: json['hrzzmb-000003'], onPress: () => {}, style: 'default' }
                            ])
                        }
                    })
                }
            }
        })
    }
    // iframe加载完成之后
    iframeLoaded = () => {
        Toast.hide()
    }
    render () {
        const {iframeSrc, title, noData, json} = this.state
        return (
            <div className="entryMap">
                <DHeader title={title} leftClick={this.leftClick.bind(this)}/>
                <div className="entryCom">
                    {
                        noData ? <Empty describe={json['hrzzmb-000086']}/> :
                            hasHeader? <iframe className="entryIframe" src={iframeSrc} frameborder="0" onLoad={this.iframeLoaded}></iframe>:null
                    }
                </div>
            </div>
        )
    }
}
thirdLog(() => {
    ReactDOM.render(<EntryMap/>, document.getElementById('app'));
})
