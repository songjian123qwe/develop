/**
 * Created by wanghongxiang on 2018/5/8.
 * 部门信息
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import 'src/hrpub/common/static/fonts/iconfont.css'
import "./index.less";
import enableHRQueryAction from "../functions/enableHRQueryAction";
import enableHRSaveAction from "../functions/enableHRSaveAction";
import {createPage, base, promptBox, toast} from 'nc-lightapp-front';

const {NCCheckbox, NCButton} = base;
import Transfer from '../../../public/excomponents/Transfer';
import {THEME} from "../../../public/theme/theme";

class JobGrade extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.config = {
            pagecode: '60051020p',
            appcode: '60051020'
        };
        this.state = {
            json: {},
            showMode: 'browse',
            searchVal: '', // 关键字搜索
            showNCCheck: true,
            enablestate: false,
            searchValue: '',
            editPageFlag: false,  // 页面    true: 编辑状态;    false: 非编辑状态
            //穿梭
            selectType: 'onlySelf', // 从左到右的方式 'onlySelf':自己;    'default':全部包含子节点
            selectTypeChange: false,
            targetKeys: [],//展示在右边列表的数据的 key 集合
            allkeys: [], // 所有的节点key集合
            selectedKeys: [],
            dataSource: [],
            topTargetKeys: [],
            transferData: {
                leftTreeData: [],
                rightTreeData: []
            },
            oldTransferData: {
                oldLeftTreeData: [],
                oldRightTreeData: []
            }
        };
        /*props.createUIDom(this.config, (data) => {
            // console.log('createUIDom 回调函数参数 = ', data);
            this.setState({
                buttons: data.button || [],
                context: data.context || {}
            });
            props.meta.setMeta(data && data.template ? data.template : {});
            props.button.setButtons(data && data.button ? data.button : {});
        })*/
    }

    /**
     * 查询参数
     */
    enableHRQueryAction() {
        enableHRQueryAction().then(res => {
            // console.log("res = ",res);
            if (!res.success) {
                return
            }
            let allkeys = [];
            let leftTreeData = res.data.disableHRVOs || [];
            let rightTreeData = res.data.enableHRVOs || [];
            this.getkey(leftTreeData.concat(rightTreeData), allkeys);
            this.setState({
                allkeys: allkeys,
                transferData: {
                    leftTreeData: leftTreeData,
                    rightTreeData: rightTreeData,
                    disabledBtns: true
                },
                oldTransferData: {
                    oldLeftTreeData: JSON.parse(JSON.stringify(leftTreeData)),
                    oldRightTreeData: JSON.parse(JSON.stringify(rightTreeData))
                }
            });
        })
    }

    /**
     * 保存
     */
    enableHRSaveAction() {
        // console.log(this.state.transferData);
        let enable_org_pks = [];
        this.getkey(this.state.transferData.rightTreeData, enable_org_pks);
        let data = {
            enable_org_pks: enable_org_pks.join(',') // 所有启用的组织id,右侧组织树所有节点的id,用逗号分隔  aaa,ddd,vvv,ccc
        };
        // console.log(data);
        enableHRSaveAction(data).then(res => {
            // console.log(res);
            if (res.success) {
                // 页面设置为浏览态
                this.baseBrowseState();
                // 重新设置数据 防止第二次未保存 点击取消时 用旧数据 重置为第一次保存前数据
                let transferData = this.state.transferData;
                this.setState({
                    oldTransferData: {
                        oldLeftTreeData: JSON.parse(JSON.stringify(transferData.leftTreeData)),
                        oldRightTreeData: JSON.parse(JSON.stringify(transferData.rightTreeData))
                    }
                });
                toast({color: "success", content: this.state.json['jf6005-000043']})/* 国际化处理： 保存成功！！！*/
            }
        })
    }

    getkey(data, arr) {
        for (let j = 0, leng = data.length; j < leng; j++) {
            let tempdata = data[j];
            if (tempdata.key) {
                arr.push(tempdata.key)
            }
            if (tempdata.children) {
                this.getkey(tempdata.children, arr)
            }
        }

    }

    /**
     * 页面 返回浏览状态
     */
    backButtonClick() {
        this.baseBrowseState();
    }

    /**
     * 设置页面状态为浏览态
     */
    baseBrowseState() {
        // 设置页面状态为浏览状态
        this.setState({
            editPageFlag: false,
            searchVal: ''
        })

    }

    /***
     * 是否选择
     */
    onCheckShowDisable(val) {
        this.setState({
            enablestate: val,
            selectType: val ? 'default' : "onlySelf",
            selectTypeChange: true
        }, () => {
            this.setState({
                selectTypeChange: false
            })
        })
    }

    saveEdit() {
        promptBox({
            color: 'warning',               // 提示类别默认"success"， "success"/"info"/"warning"/"danger",非必输
            title: this.state.json['jf6005-000050'],                // 提示标题, 默认不同类别下分别为："已成功"/"帮助信息"/"请注意"/"出错啦",非必输/* 国际化处理： 请注意*/
            content: this.state.json['jf6005-000053'],             // 提示内容,非必输/* 国际化处理： 确认要保存更改吗？*/
            noFooter: false,                // 是否显示底部按钮(确定、取消),默认显示(false),非必输
            noCancelBtn: false,             // 是否显示取消按钮,，默认显示(false),非必输
            beSureBtnName: this.state.json['jf6005-000036'],          // 确定按钮名称, 默认为"确定",非必输/* 国际化处理： 确定*/
            cancelBtnName: this.state.json['jf6005-000008'],           // 取消按钮名称, 默认为"取消",非必输/* 国际化处理： 取消*/
            beSureBtnClick: () => {
                this.enableHRSaveAction()
            },   // 确定按钮点击调用函数,非必输
            cancelBtnClick: null  // 取消按钮点击调用函数,非必输
        });
    }

    cancleEdit() {
        promptBox({
            color: 'warning',               // 提示类别默认"success"， "success"/"info"/"warning"/"danger",非必输
            title: this.state.json['jf6005-000050'],                // 提示标题, 默认不同类别下分别为："已成功"/"帮助信息"/"请注意"/"出错啦",非必输/* 国际化处理： 请注意*/
            content: this.state.json['jf6005-000054'],             // 提示内容,非必输/* 国际化处理： 确认要放弃保存更改吗？*/
            noFooter: false,                // 是否显示底部按钮(确定、取消),默认显示(false),非必输
            noCancelBtn: false,             // 是否显示取消按钮,，默认显示(false),非必输
            beSureBtnName: this.state.json['jf6005-000036'],          // 确定按钮名称, 默认为"确定",非必输/* 国际化处理： 确定*/
            cancelBtnName: this.state.json['jf6005-000008'],           // 取消按钮名称, 默认为"取消",非必输/* 国际化处理： 取消*/
            beSureBtnClick: () => {
                this.baseBrowseState();
                this.setState({
                    transferData: {
                        leftTreeData: JSON.parse(JSON.stringify(this.state.oldTransferData.oldLeftTreeData)),
                        rightTreeData: JSON.parse(JSON.stringify(this.state.oldTransferData.oldRightTreeData)),
                        disabledBtns: true
                    }
                });
            },   // 确定按钮点击调用函数,非必输
            cancelBtnClick: null  // 取消按钮点击调用函数,非必输
        });
    }

    toEdit() {
        // 设置页面状态为编辑状态
        this.setState({
            editPageFlag: true,
            searchVal: ''
        })
    }

    //显示设置
    onTargetKeysChange = (targetKeys, direction, moveKey) => {
        this.setState({
            targetKeys
        });
    };

    /**
     * 关键字搜索 （暂时没用）
     * @param val
     */
    searchChange(val) {
        this.setState({
            searchVal: val
        }, () => {
            this.child.rightSearch(val);
            this.child.leftSearch(val);
        });

    };

    /**
     * 绑定子组件 （暂时没用）
     */
    onRef = (ref) => {
        this.child = ref
    };

    /**
     * 搜索关键词 （暂时没用）
     */
    orgSearchFun(val) {
        this.searchChange(val.refname);
    }

    /**
     * 页面初始化
     */
    pageInit() {
        this.enableHRQueryAction()
    }

    componentWillMount() {
        let callback = (json, status, inlt) => {
            if (status) {
                this.setState({json, inlt}, () => {
// this.initTemplate(this.props) //在这里可以进行ceateUIDom
                }) // 保存json和inlt到页面state中并刷新页面
            }
        };
        this.props.MultiInit.getMultiLang({moduleId: 'jf6005', domainName: 'hrjf', callback})

    }

    componentDidMount() {
        window.location.hash = 'c=' + this.config.appcode;
        if (!('remove' in Element.prototype)) {
            Element.prototype.remove = function () {
                if (this.parentNode) {
                    this.parentNode.removeChild(this);
                }
            };
        }
        this.pageInit();
    }

    render() {
        let {allkeys} = this.state;
        return (
            <div>
                {/* 头部 header*/}
                <div className={'header'}>

                    {/* 标题 title*/}
                    <div className="title" style={{display: this.state.showNCCheck ? '' : 'none'}}>
                        {/*组织功能启用*/}
                        <div className="show-off-checkbox">
                            <NCCheckbox onChange={
                                this.onCheckShowDisable.bind(this)
                            } checked={this.state.enablestate}
                                        disabled={!this.state.editPageFlag}>{this.state.json['jf6005-000138']}</NCCheckbox>{/* 国际化处理： 组织包含下级*/}
                        </div>

                    </div>

                    <div className="btn-group" style={{display: (!this.state.editPageFlag) ? '' : 'none'}}>
                        <NCButton shape="border" colors="default"
                                  onClick={this.toEdit.bind(this)}>{this.state.json['jf6005-000139']}</NCButton>{/* 国际化处理： 设置*/}

                    </div>
                    <div className="btn-group" style={{display: this.state.editPageFlag ? '' : 'none'}}>
                        <NCButton shape="border" colors="primary"
                                  onClick={this.saveEdit.bind(this)}>{this.state.json['jf6005-000066']}</NCButton>{/* 国际化处理： 保存*/}
                        <NCButton shape="border" colors="default"
                                  onClick={this.cancleEdit.bind(this)}>{this.state.json['jf6005-000008']}</NCButton>{/* 国际化处理： 取消*/}
                    </div>

                </div>

                {/* 组织转换区域 */}
                <div className={`transferBox ${THEME.bgc}`}>
                    {this.state.selectTypeChange ? null : <Transfer
                        {...this.props}
                        onRef={this.onRef}
                        TransferId={'disapp'}
                        title={{
                            left: this.state.json['jf6005-000136'],
                            right: this.state.json['jf6005-000137']
                        }}/* 国际化处理： 待选行政组织,已选行政组织*/
                        leftTreeData={this.state.transferData.leftTreeData}
                        rightTreeData={this.state.transferData.rightTreeData}
                        value={this.state.transferData}
                        disableBtns={!this.state.editPageFlag}
                        leftTreeConfig={{
                            defaultExpandAll: true,
                            defaultExpandedKeys: allkeys
                        }}
                        rightTreeConfig={{
                            defaultExpandAll: true
                        }}
                        // searchValue={this.state.searchValue}
                        // leftSearch= {(val) =>{
                        //     console.log('sssss',val)
                        // }}
                        // treeType="VRFusion"
                        // onlySelf
                        selectType={this.state.selectType}
                    />}
                </div>
            </div>
        )
    }
}

let JobGradeModal = createPage({})(JobGrade);
ReactDOM.render(<JobGradeModal/>, document.querySelector('#app'));
export default JobGrade
