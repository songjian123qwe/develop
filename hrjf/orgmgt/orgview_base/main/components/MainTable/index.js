import React, {Component} from 'react';
import './index.less';
import {base, promptBox} from 'nc-lightapp-front';
import EmptyImg from "src/hrpub/common/components/emptyImg";

class MainTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeight: 0
        };
        this.emptyImg = this.emptyImg.bind(this);
    }

    componentDidMount() {
        const {nodeType} = this.props;
        let height = document.querySelector('.orgView-content').clientHeight;
        this.setState({tableHeight: height - (nodeType === 'ORG_NODE' ? 106 : 56)});
    }

    emptyImg() {
        const {searching, orgVal, nodeType, json} = this.props;
        if (searching) return;
        if (nodeType === 'ORG_NODE' && (!orgVal || !orgVal.refpk)) {
            return <EmptyImg text={json['jf6005-000473']}/>
            /* 国际化处理： 请先选择人力资源组织！*/
        } else {
            return <EmptyImg text={json['jf6005-000474']}/>
            /* 国际化处理： 还没有历史版本，立即去生成一张组织机构图吧！*/
        }
    }

    render() {
        const {hasHistory, table} = this.props;
        return (
            <div className="history-version">
                {/*{hasHistory ?
                    table.createSimpleTable('orgcharthisgrid', {
                        showIndex: true,
                        height: this.state.tableHeight
                    }) : this.emptyImg()}*/}
                {
                    table.createSimpleTable('orgcharthisgrid', {
                        showIndex: true,
                        height: this.state.tableHeight
                    })
                }
            </div>
        );
    }
}

export default MainTable;
