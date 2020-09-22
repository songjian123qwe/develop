import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function getHistory() {
    let params = {};
    if (this.props.nodeType === 'ORG_NODE') {
        const pk_org = this.state.orgVal && this.state.orgVal.refpk;
        if (!pk_org) {
            this.setState({
                hasHistory: false
            });
            this.props.table.setAllTableData('orgcharthisgrid', {
                rows: []
            });
            return;
        }
        params.pk_org = pk_org;
    }
    proFetch({
        url: '/nccloud/hrjf/orgchart/historyAction.do',
        body: params,
    })
        .then((res) => {
            if (res.success) {
                const history = res.data && res.data.orgcharthisgrid && res.data.orgcharthisgrid.rows;
                if (history && history.length) {
                    this.setState({
                        searched: true,
                        searching: false,
                        hasHistory: true
                    });
                    this.props.table.setAllTableData('orgcharthisgrid', {
                        rows: history
                    });
                } else {
                    this.setState({
                        searched: true,
                        searching: false,
                        hasHistory: false
                    });
                    this.props.table.setAllTableData('orgcharthisgrid', {
                        rows: []
                    });
                }
            }
        });
}
