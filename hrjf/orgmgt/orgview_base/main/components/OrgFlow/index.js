import React, {Component} from 'react';
import {jsPlumb} from './functions/jsplumb';
import $ from 'jquery';
import './index.less';
import createFlow from './functions/createFlow';
import initFlow from './functions/initFlow';
import initTemps from './functions/initTemps';
import TreeNode from './functions/initData';
import initTreeData from './functions/initTreeData';
import collapse from './functions/collapse';
import addNew from './functions/addNew';
import actionListener from './functions/actionListener';
import setZoom from "./functions/setZoom";
import AddNewModal from "../AddNewModal";
import resetStyle from "./functions/resetStyle";
import rightMenu from "./functions/rightMenu";
import {base} from 'nc-lightapp-front';
import addSubPoint from "./functions/addSubPoint";
import editPoint from "./functions/editPoint";
import DeptModal from "../DeptModal";
import PostModal from "../PostModal";
import getDeptDate from "./functions/getDeptData";
import getPostDate from "./functions/getPostData";
import MemberModal from "../MemberModal";
import searchPoint from "./functions/searchPoint";

const {NCFormControl, NCSelect, NCButton, NCSlider} = base;
const NCOption = NCSelect.NCOption;
const levelOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class OrgFlow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addNewModalVisible: false,
            deptModalVisible: false,
            postModalVisible: false,
            isLandscape: true,
            editType: 'new',
            zoom: 100,
            oldInfo: null,
            level: 5,
            searchValue: ''
        };
        this.refresh = this.refresh.bind(this);
        this.changeDirection = this.changeDirection.bind(this);
        this.collapse = this.collapse.bind(this);
        this.addNew = this.addNew.bind(this);
        this.paintTree = this.paintTree.bind(this);
        this.selectPoint = this.selectPoint.bind(this);
        this.selectCon = this.selectCon.bind(this);
        this.enlarge = this.enlarge.bind(this);
        this.shrink = this.shrink.bind(this);
        this.setZoom = this.setZoom.bind(this);
        this.clearSelected = this.clearSelected.bind(this);
        this.addNewPoint = this.addNewPoint.bind(this);
        this.resetStyle = this.resetStyle.bind(this);
        this.showDeptData = this.showDeptData.bind(this);
        this.showPostData = this.showPostData.bind(this);
        this.showMemberData = this.showMemberData.bind(this);
        this.getSaveData = this.getSaveData.bind(this);
        this.levelChange = this.levelChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.searchPoint = this.searchPoint.bind(this);
        this.sliderChange = this.sliderChange.bind(this);
        this.tempData = [];
        this.selectedPoint = null;
        this.selectedCon = null;
        this.lastFindId = '';
    }

    componentDidMount() {
        actionListener.call(this);
        jsPlumb.ready(
            () => {
                createFlow.call(this);
            });
    }

    generateTree(orgData) {
        const {hisImageConf} = this.props;
        this.setState({
            isLandscape: hisImageConf.base_orientation === 'hor',
            level: Number(hisImageConf.base_showlevel)
        }, () => {
            this.instance.empty('canvas');
            this.nodeData = new TreeNode(orgData);
            this.tempData = [];
            this.selectedPoint = null;
            this.selectedCon = null;
            this.lastFindId = '';
            initTreeData.call(this, true, true);
            this.paintTree();
        });
    }

    generateHistoryTree(orgData, tempData, zoom) {
        const {hisImageConf} = this.props;
        this.setState({
            isLandscape: hisImageConf.base_orientation === 'hor',
            zoom: zoom,
            level: Number(hisImageConf.base_showlevel)
        }, () => {
            this.setZoom();
            this.instance.empty('canvas');
            this.nodeData = new TreeNode(orgData);
            this.tempData = tempData.map(item => new TreeNode(item));
            this.selectedPoint = null;
            this.selectedCon = null;
            this.lastFindId = '';
            //initTreeData.call(this);
            this.paintTree();
        });
    }

    resetStyle(oldConf) {
        resetStyle.call(this, oldConf);
    }

    refresh() {
        this.instance.empty('canvas');
        initTreeData.call(this);
        this.paintTree();
    }

    paintTree() {
        initFlow.call(this);
        initTemps.call(this);
    }

    changeDirection() {
        this.setState({
            isLandscape: !this.state.isLandscape
        }, () => {
            this.refresh();
        });
    }

    collapse(node) {
        collapse.call(this, node);
    }

    addNew(editType, oldInfo) {
        this.setState({
            addNewModalVisible: true,
            editType: editType,
            oldInfo
        })
    }

    addNewPoint(info) {
        const {editType, oldInfo} = this.state;
        if (editType === 'new') {
            addNew.call(this, info)
        } else if (editType === 'sub') {
            addSubPoint.call(this, info)
        } else if (editType === 'edit') {
            editPoint.call(this, oldInfo, info)
        }
    }

    selectPoint(point) {
        this.clearSelected();
        this.selectedPoint = point;
        const id = this.selectedPoint.getId();
        $('#' + id).addClass('selected');
    }

    selectCon(conn) {
        this.clearSelected();
        this.selectedCon = conn;
        this.selectedCon.setPaintStyle({stroke: "red"});
        this.selectedCon.canvas.style.zIndex = '1';
    }

    clearSelected() {
        if (this.selectedPoint) {
            const id = this.selectedPoint.getId();
            $('#' + id).removeClass('selected');
            this.selectedPoint = null;
        }
        if (this.selectedCon) {
            const {edge_color} = this.props.hisImageConf;
            this.selectedCon.setPaintStyle({stroke: edge_color});
            this.selectedCon.canvas.style.zIndex = '0';
            this.selectedCon = null;
        }
        $("#right-menu").remove();
    }

    sliderChange(value) {
        this.setState({
            zoom: value
        }, () => {
            this.setZoom();
        });
    }

    enlarge() {
        const {zoom} = this.state;
        if (zoom === 200) return;
        this.setState({
            zoom: zoom + 10 > 200 ? 200 : zoom + 10
        }, () => {
            this.setZoom();
        });
    }

    shrink() {
        const {zoom} = this.state;
        if (zoom === 10) return;
        this.setState({
            zoom: zoom - 10 < 10 ? 10 : zoom - 10
        }, () => {
            this.setZoom();
        });
    }

    setZoom() {
        const {zoom} = this.state;
        setZoom.call(this, zoom / 100);
    }

    rightMenuClick(event, node) {
        this.selectPoint(node);
        rightMenu.call(this, event, node);
    }

    showDeptData(node) {
        getDeptDate.call(this, node);
    }

    showPostData(node) {
        getPostDate.call(this, node);
    }

    showMemberData(node) {
        this.memberModalNode.setNodeAndSearch(node);
    }

    getSaveData() {
        return {
            nodeData: this.nodeData,
            tempData: this.tempData,
            zoom: this.state.zoom,
            isLandscape: this.state.isLandscape
        };
    }

    levelChange(level) {
        this.setState({
            level
        }, () => {
            this.instance.empty('canvas');
            initTreeData.call(this, false, true);
            this.paintTree();
        })
    }

    onSearchChange(searchValue) {
        this.setState({
            searchValue
        });
        this.lastFindId = '';
    }

    searchPoint(value) {
        value = value.trim();
        if (!value) return;
        searchPoint.call(this, value);
    }

    render() {
        const {
            addNewModalVisible, isLandscape, zoom, oldInfo, level,
            searchValue, deptModalVisible, postModalVisible
        } = this.state;
        const {json} = this.props;
        return (
            <div className='view-container nc-bill-card'>
                <div className="header">
                    <div className="search-content">
                        <NCFormControl
                            placeHolder={json['jf6005-000104']}/* 国际化处理： 搜索,搜索*/
                            type="search"
                            value={searchValue}
                            clearSearch={this.onSearchChange}
                            onChange={this.onSearchChange}
                            onSearch={this.searchPoint}
                        />
                    </div>
                    <NCButton onClick={() => this.addNew('new')}>{json['jf6005-000060']}</NCButton>{/* 国际化处理： 新增节点*/}
                    <div className='btn-group'>
                        <div className='display-level'>
                            <span>{json['jf6005-000493']}</span>{/* 国际化处理： 显示层级*/}
                            <NCSelect
                                value={level}
                                onChange={this.levelChange}
                            >
                                {levelOptions.map(option => (
                                    <NCOption value={option}>
                                        {option}
                                    </NCOption>
                                ))}
                            </NCSelect>
                        </div>

                        <i className={"icon iconfont icon-shanchu2 " + (zoom > 10 ? '' : 'disabled')}
                           onClick={this.shrink}/>
                        <div className='slider-wrapper'>
                            {this.props.page !== 'main' ?
                                <NCSlider min={10} max={200} step={1}
                                          value={zoom} onChange={this.sliderChange}/> : null}
                        </div>
                        <i className={"icon iconfont icon-zengjia " + (zoom < 200 ? '' : 'disabled')}
                           onClick={this.enlarge}/>

                        <i className="icon iconfont icon-shuaxin" onClick={this.refresh}/>
                        {
                            isLandscape ?
                                <i className="icon hrfont hr-zongxiangpingfen" onClick={this.changeDirection}/> :
                                <i className="icon hrfont hr-hengxiangpingfen" onClick={this.changeDirection}/>
                        }
                    </div>
                </div>
                <div id='container' onClick={this.clearSelected}>
                    <div className="canvas-wide jtk-surface jtk-surface-nopan" id="canvas"/>
                </div>
                <AddNewModal
                    json={json}
                    visible={addNewModalVisible}
                    oldInfo={oldInfo}
                    onClose={() => {
                        this.setState({
                            addNewModalVisible: false
                        })
                    }}
                    onSure={this.addNewPoint}
                />
                <DeptModal
                    json={json}
                    treeTableManyCol={this.props.treeTableManyCol}
                    visible={deptModalVisible}
                    onClose={() => {
                        this.setState({
                            deptModalVisible: false
                        })
                    }}
                />
                <PostModal
                    json={json}
                    table={this.props.table}
                    visible={postModalVisible}
                    onClose={() => {
                        this.setState({
                            postModalVisible: false
                        })
                    }}
                />
                <MemberModal
                    json={json}
                    ref={node => this.memberModalNode = node}/>
            </div>
        );
    }
}

export default OrgFlow;
