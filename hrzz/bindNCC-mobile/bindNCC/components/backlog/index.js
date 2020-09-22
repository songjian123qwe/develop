import React, {Component} from 'react';
import './index.less'
import ListItem from '../listitem';
import Empty from "src/hrzz/public/mobile/components/Other/Empty";
import PullToRefresh from "antd-mobile/lib/pull-to-refresh";
import proFetch from "../../../../public/mobile/utils/project-fetch";

const hasHeader = sessionStorage.getItem('showNav') === 'true';

class Backlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backlogs: [],
            height: document.documentElement.clientHeight,
            searched: false
        };
    }

    componentDidMount() {
        this.getBacklog();
        const hei = document.documentElement.clientHeight - 44 - (hasHeader ? 44 : 0);
        setTimeout(() => this.setState({
            height: hei
        }), 0);
    }

    getBacklog = () => {
        proFetch({
            url: '/nccloud/hrzz/contopinion/ManContOpinionQryAction.do',
            noNeedShowError: false,
            loading: false,
            data: {
                dealflag: "1"
            }
        }).then((result) => {
            if (result.success) {
                if (result.data && result.data.contopiniongrid) {
                    this.setState({
                        backlogs: result.data.contopiniongrid.rows,
                        searched: true
                    })
                } else {
                    this.setState({
                        backlogs: [],
                        searched: true
                    })
                }
            }
        })
    };

    render() {
        const {backlogs, searched, height} = this.state;
        const {json} = this.props;
        return (
            <PullToRefresh
                onRefresh={this.getBacklog}
                distanceToRefresh={50}
                style={{
                    height: height,
                    overflow: 'auto',
                }}
                indicator={{
                    pull: ' ',
                    activate: json['hrzzmb-000136'],
                    deactivate: ' ',
                    release: ' ',
                    finish: ' '
                }}
            >
                {
                    searched ?
                        backlogs.length ?
                            backlogs.map(item => <ListItem
                                data={item}
                                onItemClick={this.props.onItemClick}
                                onAction={this.props.onAction}
                                json={this.props.json}
                            />)
                            : <Empty describe={json['hrzzmb-000135']}/>
                        : null
                }
            </PullToRefresh>
        )
    }
}

export default Backlog;