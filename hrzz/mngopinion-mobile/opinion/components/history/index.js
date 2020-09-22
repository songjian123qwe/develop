import React, {Component} from 'react';
import './index.less'
import ListItem from '../listitem';
import Empty from "src/hrzz/public/mobile/components/Other/Empty";
import PullToRefresh from "antd-mobile/lib/pull-to-refresh";
import proFetch from "../../../../public/mobile/utils/project-fetch";

const hasHeader = sessionStorage.getItem('showNav') === 'true';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            needSearch: true,
            history: [],
            height: document.documentElement.clientHeight,
            searched: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.needSearch && nextProps.tabKey !== this.props.tabKey && nextProps.tabKey === "2") {
            this.getHistory()
        }
    }

    componentDidMount() {
        const hei = document.documentElement.clientHeight - 44 - (hasHeader ? 44 : 0);
        setTimeout(() => this.setState({
            height: hei
        }), 0);
    }

    reset = () => {
        this.setState({
            needSearch: true
        })
    };

    getHistory = () => {
        proFetch({
            url: '/nccloud/hrzz/contopinion/ManContOpinionQryAction.do',
            noNeedShowError: false,
            loading: false,
            data: {
                dealflag: "2"
            }
        }).then((result) => {
            if (result.success) {
                if (result.data && result.data.contopiniongrid) {
                    this.setState({
                        history: result.data.contopiniongrid.rows,
                        needSearch: false,
                        searched: true
                    })
                } else {
                    this.setState({
                        history: [],
                        needSearch: false,
                        searched: true
                    })
                }
            }
        })
    };

    render() {
        const {history, searched, height} = this.state;
        const {json} = this.props;
        return (
            <PullToRefresh
                onRefresh={this.getHistory}
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
                        history.length ?
                            history.map(item => <ListItem
                                data={item}
                                onItemClick={this.props.onItemClick}
                                json={this.props.json}
                            />)
                            : <Empty describe={json['hrzzmb-000135']}/>
                        : null
                }
            </PullToRefresh>
        )
    }
}

export default History;