import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import { NavBar, Icon } from 'antd-mobile';
import {hrRouter} from '../../../public/mobile/utils/index.js'
import DHeader from '../../../public/mobile/components/Layout/Header';
import './index.less';

class Myentry  extends Component{
    constructor ( props ){
        super(props);
        this.state = {}
        hrRouter.setRoot()
    }
    componentDidMount () {
    }

    //返回上一页
    backClick(){
        let url = "/hrzz/login/login/main/index.html";
        hrRouter.push(url);
    }

    //去录取通知书
    goOffer(){
        let url = "/hrzz/entry-mobile/offer/main/index.html";
        hrRouter.push(url);
    }
    //去入职登记
    goInfo(){
        let url = "/hrzz/psn-mobile/psn-info/main/index.html?from=myentry";
        hrRouter.push(url);
    }

     //去企业介绍
     goEnterprise(){
        let url = "/hrzz/corehr-mobile/enterprise_proList/main/index.html";
        hrRouter.push(url);
    }

     //去入职登记
     goEntrymap(){
        let url = "/hrzz/corehr-mobile/entrymap/main/index.html";
        hrRouter.push(url);
    }
    
    render () {
        return (
            <div className="entry-wrap">
                <DHeader title={'我的入职'} leftClick={()=>this.backClick()} ></DHeader>
                <div className="entry">
                    <div className="entry-box color_01">
                        <div className="entry-list">
                            <div className="step step_1">
                                <span className="setp-icon icon-01"></span>
                                <i className="icon-down"></i>
                            </div>
                            <div className="info">
                                <div className="info-con">
                                    <h3 className="title">录用通知书</h3>
                                    {/* <p className="subhead">请在2018年07月12日前确认Offer</p> */}
                                </div>
                                <span onClick={()=>this.goOffer()} className="check-btn">查看</span>
                                <i class="line-icon"></i>
                            </div>
                        </div>
                    </div>
                    <div className="entry-box color_02">
                        <div className="entry-list">
                            <div className="step step_2">
                                <span className="setp-icon icon-02"></span>
                                <i className="icon-down"></i>
                            </div>
                            <div className="info">
                                <div className="info-con">
                                    <h3 className="title">入职登记表</h3>
                                    <p className="subhead">请及时完善个人信息，方便快速入职</p>
                                </div>
                                <span onClick={()=>this.goInfo()} className="check-btn">填写</span>
                                <i class="line-icon"></i>
                            </div>
                        </div>
                    </div>
                    <div className="entry-box color_03">
                        <div className="entry-list">
                            <div className="step step_3">
                                <span className="setp-icon icon-03"></span>
                                <i className="icon-down"></i>
                            </div>
                            <div className="info">
                                <div className="info-con">
                                    <h3 className="title">企业介绍</h3>
                                    <p className="subhead">请及时完善个人信息，方便快速入职</p>
                                </div>
                                <span onClick={()=>this.goEnterprise()} className="check-btn">查看</span>
                                <i class="line-icon"></i>
                            </div>
                        </div>
                    </div>
                    <div className="entry-box color_04">
                        <div className="entry-list">
                            <div className="step step_4">
                                <span className="setp-icon icon-04"></span>
                                <i className="icon-down"></i>
                            </div>
                            <div className="info">
                                <div className="info-con">
                                    <h3 className="title">入职地图</h3>
                                    <p className="subhead">了解入职过程，提前做好入职准备</p>
                                </div>
                                <span onClick={()=>this.goEntrymap()} className="check-btn">查看</span>
                                <i class="line-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="phone-box">
                    <a href="tel:18514529933" className="tel">
                        <div className="phone-icon-box">
                            <i className="phone-icon icon-phone"></i>
                        </div>
                        <div className="phone-num">
                            <span className="num">18514529933</span>
                            <span className="hr">联系我的HR</span>
                        </div>
                    </a>
                </div> */}
                <div className="bg-top"></div>
                <div className="bg-down"></div>
            </div>
        )
    }
}


ReactDOM.render(<Myentry/>, document.getElementById('app'));