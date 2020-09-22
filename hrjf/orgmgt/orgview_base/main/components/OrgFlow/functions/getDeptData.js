import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function getDeptDate(node) {
    const params = {
        orgType: node.getOrgType(),
        pk_org: node.getId()
    };
    proFetch({
        url: '/nccloud/hrjf/orgchart/browseSubDeptAction.do',
        body: params,
    })
        .then((res) => {
            if (res.success) {
                const dept = res.data && res.data.subdeptgrid && res.data.subdeptgrid.rows;
                if (dept && dept.length) {
                    this.setState({
                        deptModalVisible: true
                    }, () => {
                        dept.forEach(item => {
                            item.values.hrcanceled.display = item.values.hrcanceled.value ? this.props.json['jf6005-000337'] : this.props.json['jf6005-000338'];/* 国际化处理： 是,否,是,否*/
                            item.values.refpk = item.values.pk_dept;
                            item.values.pid = item.values.pk_fatherorg;
                        });
                        let datas = this.props.treeTableManyCol.createNewData(dept);
                        this.props.treeTableManyCol.initTreeTableData('subdeptgrid', datas, 'pk_dept', true);
                    });
                }
            }
        });
}
