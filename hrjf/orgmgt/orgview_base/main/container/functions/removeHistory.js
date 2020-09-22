import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';
import {toast} from 'nc-lightapp-front';

export default function removeHistory(record, index) {
    proFetch({
        url: '/nccloud/hrjf/orgchart/snapshotInfoDelAction.do',
        body: {
            pk_om_orgchart: record.pk_om_orgchart.value
        }
    })
        .then((res) => {
            if (res.success) {
                this.props.table.deleteTableRowsByIndex('orgcharthisgrid', index);
                if (!this.props.table.getAllTableData('orgcharthisgrid').rows.length) {
                    this.setState({
                        hasHistory: false
                    })
                }
                toast({
                    color: 'success',
                    content: this.state.json['jf6005-000164']/* 国际化处理： 删除成功,删除成功*/
                });
            }
        });
}
