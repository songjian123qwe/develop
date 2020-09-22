import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function addLine(data) {
    const {editTable} = this.props;
    const addPks = data.map(item => item.refpk).join();
    const postData = {
        addPks,
        model: JSON.stringify({
            model: {
                areacode: 'postseries_levelrelation',
                rows: editTable.getAllRows('postseries_levelrelation')
            }
        })
    };

    return proFetch({
        url: '/nccloud/hrjf/postseries/addLineAction.do',
        body: postData,
    })
        .then((res) => {
            if (res.success) {
                editTable.setTableData('postseries_levelrelation', {
                    rows: res.data.postseries_levelrelation.rows
                })
            }
        });
}