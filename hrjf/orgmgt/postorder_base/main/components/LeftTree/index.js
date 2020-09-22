import React, {Component} from 'react';
import './index.less';
import getTreeRoot from './functions/getTreeRoot';

class LeftContent extends Component {
    constructor(props) {
        super(props);
        this.getTreeRootData = this.getTreeRootData.bind(this);
        this.selectNode = this.selectNode.bind(this);
    }

    componentDidMount() {
        this.getTreeRootData(this.props.showDisable);
    }

    selectNode(pk) {
        this.props.onSelect(pk);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showDisable !== this.props.showDisable) {
            this.getTreeRootData(nextProps.showDisable);
        }
    }

    refreshTree(callback) {
        this.getTreeRootData(this.props.showDisable, callback);
    }

    getTreeRootData(showDisable, callback) {
        const {
            treeId,
            syncTree,
            pk_org,
            pk_postseries
        } = this.props;

        getTreeRoot({
            pk_org,
            showDisable
        })
            .then((res) => {
                this.addClassForDisAction(res.data);
                let root = [{
                    children: res.data,
                    code: this.props.json['jf6005-000219'], /* 国际化处理： 岗位序列*/
                    id: null,
                    isOrgStruSort: false,
                    innercode: null,
                    isleaf: false,
                    key: 'root',
                    name: this.props.json['jf6005-000219'], /* 国际化处理： 岗位序列*/
                    nodeData: {
                        nodeValue: {}
                    },
                    pid: null,
                    refname: this.props.json['jf6005-000219'], /* 国际化处理： 岗位序列*/
                    refpk: 'custom_root',
                    title: this.props.json['jf6005-000219']/* 国际化处理： 岗位序列*/
                }];
                syncTree.setSyncTreeData(treeId, root);
                if (pk_postseries) {
                    syncTree.openNodeByPk(treeId, ['custom_root', pk_postseries]);
                    syncTree.setNodeSelected(treeId, pk_postseries);
                    const curNode = syncTree.getSelectNode(treeId);
                    if (!curNode) {
                        this.selectNode('', '');
                    } else {
                        callback && callback();
                    }
                } else {
                    syncTree.openNodeByPk(treeId, 'custom_root');
                    callback && callback();
                }
            });
    }

    addClassForDisAction(tar) {
        tar && tar.length && tar.forEach(v => {
            if (v.nodeData.nodeValue.enablestate === '3') v.titleStyle = {color: 'lightgrey'};
            v.children && this.addClassForDisAction(v.children);
        })
    }

    render() {
        const {syncTree, treeId} = this.props;

        return (
            <div className='left-tree'>
                {syncTree.createSyncTree({
                    treeId: treeId,
                    needSearch: false,
                    needEdit: false,
                    showLine: true,
                    onSelectEve: this.selectNode
                })}
            </div>
        );
    }
}

export default LeftContent;
