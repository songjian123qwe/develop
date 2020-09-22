import React from 'react';
import './index.less';
import LeftTree from "../LeftTree";

export default class DimissionList extends React.Component {
    render() {
        const {table, onTreeSelect} = this.props;
        return (
            <div className='dimission-list'>
                <LeftTree
                    {...this.props}
                    onTreeSelect={onTreeSelect}
                />
                <div
                    style={{
                        marginLeft: '250px'
                    }}>
                    {table.createSimpleTable('handoverdetailgrid')}
                </div>
            </div>
        );
    }
}