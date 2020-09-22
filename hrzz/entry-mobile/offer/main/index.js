import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ajax from '../../../public/mobile/utils/ajax';
import DHeader from '../../../public/mobile/components/Layout/Header';
import { Toast } from 'antd-mobile';
import './index.less';

class Offer  extends Component{
    constructor ( props ){
        super(props);
        this.state = {
            con: "",
            isData : true
        }
    }
    componentDidMount () {
        window.location.hash = 'c=60652010';
        Toast.loading('加载中...', 30);
        this.getUserInfo();
    }

    //获取offer数据
    getOfferData( userId ){
        ajax({
            url: '/nccloud/hrzz/entry/GetOfferContentAction.do',
            info: {
                appcode: '60652010'
            },
            data: {
                cuserid: userId
            },
            success: ( res ) => {
                if(res.data){
                    this.setState({
                        con: res.data
                    });
                }else{
                    this.setState({
                        isData: false
                    })
                }
                setTimeout(()=>{
                    Toast.hide();
                },1000)
            },
            error: ( err )=>{
                let data = err.data;
                let error = data && data.error;
                Toast.fail(error.message, 3, false);
            }
        })
    }

    //返回上一页
    backClick(){
        window.history.go(-1);
    }

    //获取用户信息
    getUserInfo(){
        ajax({
            url: '/nccloud/platform/appregister/querypersonsettings.do',
            info: {
                appcode: '60652010'
            },
            data: {
                rqCode: "querypersonsettings"
            },
            success: ( res ) => {
                let data = res.data;
                let userId = data && data.userId;
                this.getOfferData(userId);
            },
            error: ( err )=>{
                Toast.hide();
                Toast.fail(err.message, 2);
            }
        })
    }

    render () {
        let { con, isData} = this.state;
        return (
            <div className="offer-wrap">
                <DHeader title={'录用通知书'} leftClick={()=>this.backClick()} ></DHeader>
                { isData ?
                    <div className="con" dangerouslySetInnerHTML = {{ __html: con }} /> :
                    <div className="empty">
                        <div className="empty-data">
                            <div className="empty-img"></div>
                            <p className="empty-info">暂无数据</p>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

ReactDOM.render(<Offer/>, document.getElementById('app'));