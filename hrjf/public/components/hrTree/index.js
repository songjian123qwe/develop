
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { base } from 'nc-lightapp-front';
import './index.less'
const { NCTree} = base
const propTypes = {
    editType: PropTypes.boolean,
    treeData: PropTypes.array,
    config: PropTypes.object,
    event: PropTypes.object
};
const defaultProps = {
    config: {
        root:{
            title: '部门',
            key: 'null'
        },
        defaultExpandAll: true,
        checkable:false,
        datas: [],
        selectedKeys:  [],
        openIcon: <i className="icon iconfont icon-shu_zk"></i>,
        closeIcon: <i className="icon iconfont icon-shushouqi"></i>,
        selectedNode: undefined,
        showRoot:true,
        iconClassArr:['icon iconfont icon-biangengjilu','icon iconfont icon-zengjia add-icon','icon iconfont icon-shanchu delete-icon']
    },
    event: {
        editRender: (a, b, c)=>{
        },
        addRender: (a, b, c)=>{
        },
        delRender: (a, b, c)=>{
        }
    }
};
class Index extends Component {
    constructor(props) {
        super(props)
        this.renderTreeTitle = this.renderTreeTitle.bind(this)
        this.events = Object.assign(defaultProps.event,this.props.event)
        this.editRender = this.events.editRender.bind(this)
        this.addRender = this.events.addRender.bind(this)
        this.delRender = this.events.delRender.bind(this)
        this.addIconBox = this.addIconBox.bind(this)
        this.config = Object.assign(defaultProps.config,this.props.config)
    }
    addIconBox (data){
        if (data && data instanceof Array && data.length > 0) {
            data.forEach((item) => {
                item.iconBox = {
                    addIcon: true,
                    delIcon: true,
                    editIcon: true
                };
                if (Array.isArray(item.children)) {
                    this.addIconBox(item.children);
                }
            });
        }
        return data
    }
    renderTreeTitle(item, editType) {
        let editIcon, titleInfo, addIcon, delIcon, iconBox, beforeName, afterName;
        //编辑图标
        let flag = item.flag ? item.flag : true;
        let addField = true;

        editType = this.config.editType;

        if (editType) {
            if (item.iconBox) {
                debugger
                if (item.iconBox.editIcon && item.code && item.code != 'system') {
                    let icon = this.config.iconClassArr[0] ? 
                        this.config.iconClassArr[0] : '';

                    editIcon = (
                        <i
                            field={addField ? 'editIcon' : null}
                            fieldname={addField ? '编辑' : null}
                            className={icon}
                            onClick={(e) => this.editRender.call(this, item, e, 'editIcon')}
                        />
                    );
                }
                if (item.iconBox.addIcon) {
                    let icon = this.config.iconClassArr[1] 
                        && (flag == 2 || flag === true)? this.config.iconClassArr[1] : '';

                    addIcon = (
                        <i
                            field={addField ? 'addIcon' : null}
                            fieldname={addField ? '新增' : null}
                            className={icon}
                            onClick={(e) => this.addRender.call(this, item, e, 'addIcon')}
                        />
                    );
                }
                if (item.iconBox.delIcon && item.code && item.code != 'system') {
                    let icon = this.config.iconClassArr[2]?this.config.iconClassArr[2]:'';
                    delIcon = (
                        <i
                            field={addField ? 'delIcon' : null}
                            fieldname={addField ? '删除' : null}
                            className={icon}
                            onClick={(e) => this.delRender.call(this, item, e, 'delIcon')}
                        />
                    );
                }
            } else {
                console.warn('请设置iconBox属性，{editIcon, addIcon, delIcon}');
            }
        }
        iconBox = (
            <span className="NC_iconBox">
                {editIcon} {addIcon} {delIcon}
            </span>
        );
        
        titleInfo = <span className={"title-middle " + item.className}>{item.refname || item.title}</span>;
        item.hasOwnProperty('beforeName') ? (beforeName = item.beforeName) : null;
        item.hasOwnProperty('afterName') ? (afterName = item.afterName) : null;

        return (
            <div className="syncTreeCom">
                <div className="title-con">
                    {beforeName}
                    {titleInfo}
                    {afterName}
                    {editType? iconBox : null}
                </div>
            </div>
        );
    };
    render () {
        const loop = data => data.map((item) => {
            if (item.children && item.children.length) {
                return (
                    <NCTree.NCTreeNode 
                        title={this.renderTreeTitle(item)} 
                        key={item.key}
                        pid = {item.pid}
                    >
                        {loop(item.children)}
                    </NCTree.NCTreeNode>
                );
            }
            return (
                <NCTree.NCTreeNode 
                    title={this.renderTreeTitle(item)} 
                    key={item.key}
                    pid = {item.pid}
                    isLeaf={true} 
                    disabled={item.key === '0-0-0'} 
                />
            );
        });
        let data  = this.addIconBox(this.props.treeData)
       
        const treeNodes = loop(data);

        let tree = this.config.showRoot ?
            (
                <NCTree.NCTreeNode 
                    className="sn-first-title" 
                    title={this.renderTreeTitle(this.props.config.root)}
                >
                    {treeNodes}
                </NCTree.NCTreeNode>
            ) : (treeNodes);

        return(
            <div id ="sn-hr-tree" className="sn-hr-tree">
                <NCTree 
                    {...Object.assign(defaultProps.config,this.props.config)}
                >
                    {tree}
                </NCTree>
            </div>

        )
    }
}
Index.propTypes = propTypes;
Index.defaultProps = defaultProps;
export default Index;