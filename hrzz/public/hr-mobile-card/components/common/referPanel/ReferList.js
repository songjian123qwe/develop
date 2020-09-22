import {SearchBar, List} from 'antd-mobile';
import React from 'react';
import {DHeader} from "src/hrzz/public/mobile/components";
import {getReferConf} from "../../../utils";
import getReferData from "./getReferData";
import NativeObj from "src/hrzz/public/mobile/utils/jsbridge";
import {compatibleNavImg} from "src/hrzz/public/mobile/utils";
import {langCheck} from "src/hrzz/public/mobile/utils/utils";

const {Item} = List, hasHeader = sessionStorage.getItem('showNav') === 'true';
let rowHeight = 44;

class ReferList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            inputValue: '',
            selectVal: props.refVal || {},
            containerH: 0,
            headerH: 0
        };
        this.oldData = [];
        this.handleData = [];
        this.scrollIndex = 1;
        this.referInfo = {};
        this.pageInfo = {pageSize: 50, pageIndex: 0, totalPage: 1};
        this.editNav();
    }

    editNav = () => {
        try {
            let cbs = {
                cancelSelect: () => this.closePage(),
                sureSelect: () => this.onSure()
            };
            let parameters = {
                leftItems: [
                    {
                        icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png'),
                        callback: 'cancelSelect'
                    }
                ],
                centerItems: [
                    {
                        title: this.props.label
                    }
                ],
                rightItems: [{
                    title: langCheck("0000PUB-000280"),
                    titleColor: '#111111',
                    callback: 'sureSelect'
                }]
            };
            let data = {
                'function': 'configNavBar',
                'parameters': parameters
            };
            NativeObj.configNavBar(data, cbs);
            if (this.props.addReferBackAct) {
                let that = this;
                NativeObj.blockbackbutton('', () => {
                    that.closePage()
                });
            }
        } catch (e) {
        }
    };

    componentDidMount() {
        this.getListData();
        const fontSize = document.documentElement.style.fontSize;
        if (fontSize) {
            const size = Number(fontSize.substr(0, fontSize.length - 2));
            rowHeight = 0.88 * size;
        }
        const headerH = document.querySelector('.nc-m-header') && document.querySelector('.nc-m-header').clientHeight;
        const containerH = document.documentElement.clientHeight - rowHeight - (hasHeader ? headerH : 0);
        this.setState({
            containerH,
            headerH: rowHeight + (hasHeader ? headerH : 0)
        })
    }

    getListData = () => {
        let refUrl = this.props.refcode.endsWith('.js') ?
            this.props.refcode : this.props.refcode + '.js';
        //平台有时候会在refcode前面加mobile_uapbd，不知道什么原因，先处理掉
        if (refUrl.startsWith('mobile_uapbd')) {
            refUrl = refUrl.substr(7);
        }
        let urlIndex = this.props.urlIndex;
        getReferConf({
            url: location.origin + "/nccloud/resources/" + refUrl,
            urlIndex,
            success: res => {
                this.referInfo = res;
                this.referInfo.isPageGroup = false;
                getReferData.call(this, this.referInfo, this.state.inputValue, (data = {}) => {
                    this.setData(data);
                });
            }
        });
    };

    resetData = (val, isCancel) => {
        this.pageInfo = {pageSize: 50, pageIndex: 0, totalPage: 1};
        this.scrollIndex = 1;
        document.querySelector('.outer-cont').scrollTop = 0;
        getReferData.call(this, this.referInfo, val, (data = {}) => {
            if (isCancel) {
                this.oldData = [{
                    refcode: "", refname: "", refpk: ""
                }].concat(data.rows || []);
            } else {
                this.oldData = data.rows || [];
            }
            this.handleData = this.oldData;
            this.pageInfo = data.page;
            this.setState({
                dataSource: this.handleData.slice(0, 30)
            })
        });
    };

    getMoreData = (e) => {
        if (!this.isSearching && this.referInfo.isPageGroup
            && this.pageInfo && Number(this.pageInfo.pageIndex) + 1 < Number(this.pageInfo.totalPage)) {
            const h = e.target.scrollHeight;
            const top = e.target.scrollTop;
            const contH = document.documentElement.clientHeight - rowHeight;
            if (h - top - contH < rowHeight * 5) {
                this.pageInfo.pageIndex = Number(this.pageInfo.pageIndex) + 1;
                this.isSearching = true;
                getReferData.call(this, this.referInfo, this.state.inputValue, (data = {}) => {
                    this.setMoreData(data);
                });
            }
        }
    };

    setMoreData = (data) => {
        this.oldData = this.oldData.concat(data.rows || []);
        this.handleData = this.oldData;
        this.pageInfo = data.page;
        this.isSearching = false;
        const scrollEl = document.querySelector('.outer-cont');
        const top = scrollEl.scrollTop;
        let index = Math.ceil(top / (rowHeight * 10));
        index = index < 1 ? 1 : index;
        this.scrollIndex = index;
        this.setState({
            dataSource: this.handleData.slice((this.scrollIndex - 1) * 10, (this.scrollIndex + 2) * 10)
        });
    };

    setData = (data) => {
        this.oldData = [{
            refcode: "", refname: "", refpk: ""
        }].concat(data.rows || []);
        this.handleData = this.oldData;
        this.pageInfo = data.page;
        this.referInfo.isPageGroup = !!(data.page && data.page.totalPage > 1);
        this.setState({
            dataSource: this.handleData.slice(0, 30)
        })
    };

    onSelect = (selectVal) => {
        this.setState({
            selectVal: {
                value: selectVal.refpk,
                display: selectVal.refpk ? selectVal.refname : ''
            }
        })
    };

    onSearch = (val) => {
        if (this.referInfo.isPageGroup) {
            this.interval = new Date().getTime();
            let s = setTimeout(() => {
                // 停止输入0.5s后执行
                if (new Date().getTime() - this.interval >= 500) {
                    this.resetData(val)
                }
                clearTimeout(s);
            }, 500);
            this.setState({
                inputValue: val
            });
        } else {
            const filterData = [];
            this.oldData.forEach(item => {
                if (item.refname.toLocaleLowerCase().indexOf(val) > -1) {
                    filterData.push(item)
                }
            });
            this.handleData = filterData;
            this.scrollIndex = 1;
            document.querySelector('.outer-cont').scrollTop = 0;
            this.setState({
                inputValue: val,
                dataSource: this.handleData.slice((this.scrollIndex - 1) * 10, (this.scrollIndex + 2) * 10)
            });
        }
    };

    closePage = () => {
        this.props.onClose();
    };

    onSure = () => {
        this.props.onSure(this.state.selectVal)
    };

    onCancel = () => {
        if (this.referInfo.isPageGroup) {
            this.setState({
                inputValue: ''
            }, () => {
                this.resetData(null, true);
            });
        } else {
            this.handleData = this.oldData;
            this.scrollIndex = 1;
            document.querySelector('.outer-cont').scrollTop = 0;
            this.setState({
                inputValue: '',
                dataSource: this.handleData.slice(0, 30)
            });
        }
    };

    scroll = (e) => {
        if (this.handleData.length <= 30) return;
        const top = e.target.scrollTop;
        this.getMoreData(e);
        let index = Math.ceil(top / (rowHeight * 10));
        index = index < 1 ? 1 : index;
        if (this.scrollIndex === index) return;
        this.scrollIndex = index;
        this.setState({
            dataSource: this.handleData.slice((this.scrollIndex - 1) * 10, (this.scrollIndex + 2) * 10)
        });
    };

    render() {
        const {dataSource, inputValue, selectVal, containerH, headerH} = this.state;
        const renderRow = (rowData, index) => {
            const top = (this.scrollIndex - 1) * rowHeight * 10 + rowHeight * index;
            return (
                <Item key={rowData.refpk}
                      onClick={() => this.onSelect(rowData)}
                      style={{position: 'absolute', top: top}}>
                    {rowData.refname}
                    {selectVal.value === rowData.refpk ?
                        <div className='refer-item-selected'>
                            <i className={`iconfont hrfont hr-check-mark`}/>
                        </div>
                        : null}
                </Item>
            );
        };
        return (
            <div style={{paddingTop: headerH, position: 'relative'}}>
                <div style={{position: 'absolute', top: 0, left: 0, right: 0}}>
                    <DHeader title={this.props.label}
                             leftClick={this.closePage}
                             rText={langCheck("0000PUB-000280")}
                             rightstyle={{color: '#111111', fontSize: '0.32rem'}}
                             rightClick={this.onSure}
                             ref={node => this.headerNode = node}
                    />
                    <SearchBar
                        value={inputValue}
                        placeholder={langCheck("0000PUB-000281")}
                        cancelText={langCheck("0000PUB-000000")}
                        onChange={this.onSearch}
                        onCancel={this.onCancel}
                    />
                </div>
                <div
                    style={{height: containerH}}
                    className='outer-cont'
                    onScroll={(e) => this.scroll(e)}
                >
                    <div className="inner-cont" style={{height: this.handleData.length * rowHeight}}>
                        {dataSource.map((row, index) => renderRow(row, index))}
                    </div>
                </div>
            </div>
        );
    }
}

export default ReferList;