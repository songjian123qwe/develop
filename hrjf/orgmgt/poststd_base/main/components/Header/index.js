import React, {Component} from 'react';
import './index.less';
import {
    base,
    toast,
    high,
    promptBox,
    output,
    print,
    cacheTools
} from 'nc-lightapp-front';
import UseFlagAction from "./functions/UseFlagAction";
import StdValidateAction from "./functions/StdValidateAction";
import DeleteAction from "./functions/DeleteAction";
import NCBackBtn from 'src/hrpub/common/components/hr-back';
import {COMMON} from "../../common/common";

const {NCCheckbox} = base;
const formId = COMMON.poststd_card;
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: props.json,
            isBtnFirst: true  //是否是按钮的第一次触发
        };
        this.onBtnOperation = this.onBtnOperation.bind(this);
    }

    componentWillReceiveProps(nextprops) {
        let nextjson = JSON.stringify(nextprops.json);
        let thisjson = JSON.stringify(this.props.json);
        if (nextjson !== thisjson) {
            this.setState({
                json: nextprops.json
            })
        }
    }

    onChangeHandle(type) {
        return (value) => {
            this.props.updateState({
                [type]: value
            });
        }
    }

    onBtnOperation(props, btncode, areacode, opt) {
        if (areacode === 'list') {
            switch (btncode) {
                case 'add':
                    this.add();
                    break;
                case 'edit':
                    // 保存新增按钮 不可用
                    this.props.button.setButtonDisabled({
                        saveAdd: true
                    });
                    this.edit();
                    break;
                case 'delete':
                    promptBox(
                        {
                            color: "warning",
                            title: this.props.json['jf6005-000153'], /* 国际化处理： 确认删除*/
                            content: this.props.json['jf6005-000253'], /* 国际化处理： 您确定要删除所选数据吗*/
                            beSureBtnClick: () => {
                                console.log("delete");
                                this.deleteAction();
                            }
                        });
                    break;
                case 'copy':
                    this.stdValidateAction(5).then(res => {

                        this.props.form.setFormStatus('copy_template', 'edit');
                        this.props.updateState({
                            copyModalVisible: true
                        });
                    });
                    break;
                case 'query':
                    // 打开查询区
                    this.props.search.openAdvSearch(this.props.searchId, true);
                    break;
                case 'refresh':
                    this.props.refreshAll();
                    break;
                case 'enable':
                    promptBox(
                        {
                            color: "warning",
                            title: this.props.json['jf6005-000097'], /* 国际化处理： 注意*/
                            content: `${this.props.json['jf6005-000098']}?`, /* 国际化处理： 是否确认启用*/
                            beSureBtnClick: () => {
                                // 启用
                                this.useFlagAction('3');
                            }
                        });
                    break;
                case 'disable':
                    if (!this.state.isBtnFirst) return;
                    this.state.isBtnFirst = false;
                    promptBox(
                        {
                            color: "warning",
                            title: this.props.json['jf6005-000149'], /* 国际化处理： 注意*/
                            content: `${this.props.json['jf6005-000100']}?`, /* 国际化处理： 是否确认停用*/
                            beSureBtnClick: () => {
                                this.state.isBtnFirst = true;
                                // 停用
                                this.useFlagAction('2');
                            },
                            cancelBtnClick: () => {
                                this.state.isBtnFirst = true;
                            }
                        });
                    break;
                case 'file':
                    this.props.updateState({
                        showUploader: true
                    });
                    break;
                case 'print':
                    let printOids = [this.props.pk_post];
                    print(
                        'pdf',
                        '/nccloud/hrjf/poststd/PrintAction.do',
                        {
                            funcode: this.props.appcode,
                            nodekey: this.props.isGlb?'poststd_glb':'poststd_grp',
                            oids: printOids
                        }
                    );
                    break;
                case 'output':
                    // 点击输出按钮
                    let outputOids = [this.props.pk_post];
                    output({
                        url: '/nccloud/hrjf/poststd/PrintAction.do',
                        data: {
                            funcode: this.props.appcode,      //功能节点编码，即模板编码
                            nodekey: this.props.isGlb?'poststd_glb':'poststd_grp',     //模板节点标识
                            oids: outputOids,    // 功能节点的数据主键
                            outputType: 'output',
                            filename: this.state.json['jf6005-000243'] // 输出文件名
                        },
                        callback: function () {

                        }
                    });
                    break;
                default:
                    break;
            }
        } else if (areacode === 'edit') {
            switch (btncode) {
                case 'save':
                    this.saveEdit();
                    break;
                case 'saveAdd':
                    this.saveAdd();
                    break;
                case 'cancel':
                    this.cancleEdit();
                    break;
                default:
                    break;
            }
        }
    }

    /**
     * 新增
     */
    add = ()=> {
        this.stdValidateAction(0).then(res => {
            // 保存新增 按钮可用
            this.props.button.setButtonDisabled({
                saveAdd: false
            });
            this.props.updateState({
                isNewAddFlag: true,
                isDetail: true,
                isEditing: true
            }, () => {
                this.props.setDetailStatus('edit');
                this.props.add();
                this.props.updateButtonStatus();
                this.props.form.setFormItemsValue(formId, {"postcode": {value: res.data.billCode}});
                this.props.form.setFormItemsDisabled(formId, {"postcode": !res.data.codeEditFlag});
            })
        })
    };

    /**
     *  编辑
     */
    edit() {
        this.stdValidateAction(2).then(res => {
            let isDetail = this.props.isDetail;
            this.props.updateState({
                isDetail: true,
                isEditing: true
            }, () => {
                if (!isDetail) {
                    this.props.getDetailPostInfo()
                }
                this.props.setDetailStatus('edit')
            })
        })

    }

    /**
     * 保存编辑
     */
    saveEdit() {
        // 表单验证
        if (!this.props.form.isCheckNow(formId)) {
            return
        }
        promptBox({
            color: 'warning',               // 提示类别默认"success"， "success"/"info"/"warning"/"danger",非必输
            title: this.state.json['jf6005-000050'],                // 提示标题, 默认不同类别下分别为："已成功"/"帮助信息"/"请注意"/"出错啦",非必输/* 国际化处理： 请注意*/
            content: this.state.json['jf6005-000053'],             // 提示内容,非必输/* 国际化处理： 确认要保存更改吗？*/
            noFooter: false,                // 是否显示底部按钮(确定、取消),默认显示(false),非必输
            noCancelBtn: false,             // 是否显示取消按钮,，默认显示(false),非必输
            beSureBtnName: this.state.json['jf6005-000036'],          // 确定按钮名称, 默认为"确定",非必输/* 国际化处理： 确定*/
            cancelBtnName: this.state.json['jf6005-000008'],           // 取消按钮名称, 默认为"取消",非必输/* 国际化处理： 取消*/
            beSureBtnClick: () => {
                this.props.savePostInfo(2)
            },   // 确定按钮点击调用函数,非必输
            cancelBtnClick: null  // 取消按钮点击调用函数,非必输
        });
    }

    /**
     * 保存新增
     */
    saveAdd() {
        // 表单验证
        if (!this.props.form.isCheckNow(formId)) {
            return
        }
        promptBox({
            color: 'warning',               // "success"/"info"/"warning"/"danger",非必输
            title: this.state.json['jf6005-000050'],         // 提示标题
            content: this.state.json['jf6005-000055'],             // 提示内容,非必输
            noFooter: false,                // 是否显示底部按钮(确定、取消),默认显示(false),非必输
            noCancelBtn: false,             // 是否显示取消按钮,，默认显示(false),非必输
            beSureBtnName: this.state.json['jf6005-000036'],          // 确定按钮名称, 默认为"确定",非必输
            cancelBtnName: this.state.json['jf6005-000008'],           // 取消按钮名称, 默认为"取消",非必输
            beSureBtnClick: () => {
                // 保存新增
                this.props.savePostInfo(this.add)
            },   // 确定按钮点击调用函数,非必输
            cancelBtnClick: null  // 取消按钮点击调用函数,非必输
        });
    }

    /**
     * 取消编辑
     */
    cancleEdit() {
        promptBox({
            color: 'warning',               // "success"/"info"/"warning"/"danger",非必输
            title: this.state.json['jf6005-000050'],                // 提示标题
            content: this.state.json['jf6005-000054'],             // 提示内容,非必输
            noFooter: false,                // 是否显示底部按钮(确定、取消),默认显示(false),非必输
            noCancelBtn: false,             // 是否显示取消按钮,，默认显示(false),非必输
            beSureBtnName: this.state.json['jf6005-000036'],          // 确定按钮名称, 默认为"确定",非必输
            cancelBtnName: this.state.json['jf6005-000008'],           // 取消按钮名称, 默认为"取消",非必输
            beSureBtnClick: () => {
                this.back();
            },   // 确定按钮点击调用函数,非必输
            cancelBtnClick: null  // 取消按钮点击调用函数,非必输
        });
    }

    /**
     * 启用/停用
     * @param enablestate  '2'：停用   '3'： 启用
     * @constructor
     */
    useFlagAction(enablestate) {
        let pk_org, pk_post;
        pk_org = this.props.pk_org;
        pk_post = this.props.pk_post;
        UseFlagAction(pk_org, pk_post, enablestate).then(res => {
            let lang = enablestate === '2' ? "jf6005-000101" : "jf6005-000099";
            this.props.getPostInfo(() => {
                toast({color: 'success', content: this.state.json[lang]});//停用成功！· 停用成功！
            });
            this.props.button.setButtonDisabled({
                enable: true,//  启用,
                disable: true,//  停用
            });
        })
    }

    /**
     * 操作前（复制，新增，删除，修改）校验
     * @param pk_org                string : 全局： GLOBLE00000000000000'；  集团：getBusinessInfo() || {groupId: '0001HR100000000005M3'};
     * @param pk_post        object : 查询条件
     * @param operate      number : operate：0:新增；2:修改；5:复制；6:新增或复制取消
     * @returns {Promise<any>}
     * @constructor
     */
    stdValidateAction(operate,postcode=null) {
        let pk_org = this.props.pk_org;
        let pk_post = this.props.pk_post;
        return StdValidateAction(pk_org, pk_post, operate,postcode)
    }

    deleteAction() {
        DeleteAction(this.props.pk_org, this.props.pk_post).then(res => {
            toast({color: 'success', content: this.state.json['jf6005-000164']});//删除成功！
            if(!this.props.isDetail){
                this.props.getPostInfo();
                return
            }
            let allpks = cacheTools.get('allpks');
            if (!Array.isArray(allpks)) {
                allpks = [];
            }
            let index = allpks.indexOf(this.props.pk_post);
            if (index !== -1) {
                allpks.splice(index, 1);
                cacheTools.set('allpks', allpks);
                if (allpks.length < 1) {
                    this.props.emptyDetailPage();
                    return
                }
                let nextPkPost = '';
                if (index <= (allpks.length - 1)) {
                    nextPkPost = allpks[index]
                } else {
                    nextPkPost = allpks[(index - 1)]
                }
                this.props.updateState({
                    pk_post: nextPkPost
                },()=>{
                    this.props.getDetailPostInfo()
                });
            }
        })
    }

    /**
     * 翻页插件 按钮点击事件
     */
    pageQueryClick = (props, val) => {
        this.props.updateState({
            pk_post: val
        },()=>{
            this.props.getDetailPostInfo();
        })
    };

    /**
     * 返回按钮
     */
    back() {
        // 如果是新增 则需要调用   取消新增  接口
        if (this.props.isNewAddFlag) {
            this.props.updateState({
                isNewAddFlag: false
            });
            // 取消新增接口
            let postcode = this.props.form.getFormItemsValue(formId, "postcode").value;
            this.stdValidateAction(6, postcode).then(res => {
                this.props.emptyDetailPage();
            })
        }
        // 保存新增 按钮可用
        this.props.button.setButtonDisabled({
            saveAdd: true
        });
        if (this.props.isEditing) {
            this.props.updateState({
                isEditing: false
            }, () => {
                this.props.getDetailPostInfo();
                this.props.setDetailStatus('browse');
                this.props.updateButtonStatus();
            });
            return
        }
        if (this.props.isDetail) {
            this.props.updateState({
                pk_post: null,
                postFlag: null,
                postcode: null,
                isEditing: false,
                isDetail: false
            }, () => {
                this.props.updateButtonStatus();
                this.props.getPostInfo();
            })
        }
    }

    render() {
        const {button, showDisable, isEditing, isDetail, cardPagination} = this.props;
        const {createCardPagination} = cardPagination;
        return (
            <div className="page-header header">
                {isDetail ? <div className={'content'}>
                    <div>
                        <NCBackBtn onClick={this.back.bind(this)} title={this.state.json['jf6005-000022']}></NCBackBtn>
                        {/* 国际化处理： 返回*/}
                    </div>
                    <div style={{display: isEditing ? "none" : "flex"}}>
                        {button.createButtonApp({
                            area: 'list',
                            onButtonClick: (props, btncode) => {
                                this.onBtnOperation(props, btncode, 'list', this);
                            }
                        })}
                        {createCardPagination({
                            handlePageInfoChange: this.pageQueryClick
                        })}
                    </div>
                    <div style={{display: isEditing ? "" : "none"}}>
                        {button.createButtonApp({
                            area: 'edit',
                            onButtonClick: (props, btncode) => {
                                this.onBtnOperation(props, btncode, 'edit', this);
                            }
                        })}
                    </div>
                </div> : <div className={'content'}>
                    <div className="header-checkbox-group">
                        <NCCheckbox
                            disabled={isEditing}
                            checked={showDisable}
                            className="header-checkbox"
                            color="primary"
                            onChange={this.onChangeHandle('showDisable')}
                        >
                            {this.props.json['jf6005-000130']}{/* 国际化处理： 显示停用*/}
                        </NCCheckbox>
                    </div>

                    <div className="btn-group">
                        <div className="definition-icons">
                            {button.createButtonApp({
                                area: 'list',
                                onButtonClick: (props, btncode) => {
                                    this.onBtnOperation(props, btncode, 'list', this);
                                }
                            })}
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

export default Header;
