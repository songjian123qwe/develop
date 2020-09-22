import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

let arr = [];

function findRefpk(treeData) {
    treeData.forEach(item => {
        arr.push(item.refpk);
        if (item.hasOwnProperty('children')) {
            findRefpk(item.children)
        }
    });
    return arr;
}

export default function getCopyInfoData() {
    const {editTable} = this.props;
    arr = [];
    const pks = findRefpk(this.state.transferData.rightTreeData).join();
    const postData = {
        pks
    };

    return proFetch({
        url: '/nccloud/hrjf/postseries/querypksAction.do',
        body: postData,
    })
        .then((res) => {
            if (res.success) {
                editTable.setTableData('copyinfo', {
                    rows: res.data.copyinfo.rows
                });
                editTable.setStatus('copyinfo', 'edit');
            }
        });
}