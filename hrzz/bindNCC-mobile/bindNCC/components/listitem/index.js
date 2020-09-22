import React, {Component} from 'react';
import './index.less';
import {WhiteSpace} from "antd-mobile";

class ListItem extends Component {
    constructor(props) {
        super(props);
    }

    itemClick = (pk_opinion) => {
        const {onItemClick} = this.props;
        onItemClick && onItemClick(pk_opinion)
    };

    opinionAct = (event, opinion, pk_opinion) => {
        const {onAction} = this.props;
        event.stopPropagation();
        onAction && onAction(opinion, pk_opinion)
    };

    render() {
        const {data, json} = this.props;
        return (
            <div>
                <WhiteSpace/>
                <div className="list-item"
                     onClick={() => this.itemClick(data.values['pk_opinion'].value)}>
                    <div className="item-top">
                        <div className="item-name">
                            {
                                data.values['pk_psnjob.pk_psndoc.name'].display
                            }
                            {
                                json['hrzzmb-000130']
                            }
                        </div>
                        <div className="item-time">
                            {
                                data.values['opdate'].value
                            }
                        </div>
                        {
                            data.values['deptopinion'].value ?
                                <div
                                    className={"item-img " +
                                    (data.values['deptopinion'].value === 'Y' ? 'pass' : 'refuse')}/> : null
                        }
                    </div>
                    <div className="item-bottom">
                        <div className="item-org">
                            {
                                json['hrzzmb-000131'] + ': ' +
                                data.values['pk_psnjob.pk_org.name'].display
                            }
                        </div>
                        <div>
                            {
                                !data.values['deptopinion'].value ?
                                    <div className="item-action">
                                        <div className="item-action-refuse"
                                             onClick={(event) => this.opinionAct(event, 'N', data.values['pk_opinion'].value)}
                                        >
                                            <div className="item-action-img refuse"/>
                                            {json['hrzzmb-000126']}
                                        </div>
                                        <div className="item-action-agree"
                                             onClick={(event) => this.opinionAct(event, 'Y', data.values['pk_opinion'].value)}
                                        >
                                            <div className="item-action-img agree"/>
                                            {json['hrzzmb-000125']}
                                        </div>
                                    </div> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListItem;