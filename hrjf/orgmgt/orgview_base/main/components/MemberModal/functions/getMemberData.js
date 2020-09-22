import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function getMemberDate(callback) {
    const params = {
        orgType: this.handldNode.getOrgType(),
        id: this.handldNode.getId(),
        pageNum: this.state.pageNum + "",
        versionDate: ''
    };
    proFetch({
        url: '/nccloud/hrjf/orgchart/browsePersonAction.do',
        body: params,
    })
        .then((res) => {
            if (res.success) {
                callback && callback(res.data);
            }
        });
}
