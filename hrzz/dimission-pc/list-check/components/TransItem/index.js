import React from 'react';
import './index.less';
import TransCont from '../TransCont';
import {hrAjax as proFetch} from "src/hrpub/common/utils/utils";

export default class RowOperator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transItems: []
        }
    }

    componentDidMount() {
        this.getTransItems()
    }

    getTransItems = () => {
        const {billid} = this.props;
        proFetch({
            url: '/nccloud/hrzz/depthandover/PCDeptHandoverAuditQueryOneAction.do',
            body: {billid, func_type: 2} // func_type 我的离职为1 部门经理自助为2
        }).then(res => {
            if (res.success) {
                this.setState({
                    transItems: res.data.list.map(item => {
                        return {
                            handoverman: item.handoverman,
                            item: item.item,
                            handoverdate: item.handoverdate,
                            remark:item.remark
                        }
                    })
                });
            }
        })
    };

    render() {
        const {transItems} = this.state;
        const {language} = this.props;
        return (
            <div className="dept-trans-items">
                {transItems.map((content, index) => {
                    return <TransCont
                        language={language}
                        isEdit={false}
                        index={index}
                        content={content}
                    />
                })}
            </div>
        );
    }
}