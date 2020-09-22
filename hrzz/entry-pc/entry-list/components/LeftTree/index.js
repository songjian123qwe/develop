import React from 'react';
import './index.less';

export default class LeftTree extends React.Component {
    render() {
        const {syncTree, onTreeSelect} = this.props;
        return (
            <div className="entry-page-left-tree">
                {syncTree.createSyncTree({
                    treeId: 'entryList',
                    needSearch: false,
                    needEdit: false,
                    onSelectEve: onTreeSelect
                })}
            </div>
        );
    }
}