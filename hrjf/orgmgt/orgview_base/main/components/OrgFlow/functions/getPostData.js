import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function getPostDate(node) {
    const params = {
        orgType: node.getOrgType(),
        pk_dept: node.getId()
    };
    proFetch({
        url: '/nccloud/hrjf/orgchart/browseSubPostAction.do',
        body: params,
    })
        .then((res) => {
            if (res.success) {
                const post = res.data && res.data.subpostgrid && res.data.subpostgrid.rows;
                if (post && post.length) {
                    this.setState({
                        postModalVisible: true
                    }, () => {
                        this.props.table.setAllTableData('subpostgrid', {
                            rows: post
                        });
                    });
                }
            }
        });
}
