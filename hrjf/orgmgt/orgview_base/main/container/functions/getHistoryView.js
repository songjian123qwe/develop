import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';
import {conventFontToLocal} from "./convert";

/**
 * 获取历史版本
 */

export default function getHistoryView(record, callback) {
    proFetch({
        url: '/nccloud/hrjf/orgchart/snapshotInfoLoadAction.do',
        body: {pk_om_orgchart: record.pk_om_orgchart.value},
    })
        .then((res) => {
            if (res.success) {
                const orgData = setTreeData(res.data.data.orgchartobj.persistenceVertexVOs,
                    res.data.data.orgchartobj.root);
                const hisImageConf = res.data.data.orgchartobj.persistenceConfigs;
                hisImageConf.common_font = conventFontToLocal(hisImageConf.common_font);
                const scale = res.data.data.orgchartobj.scale * 100;
                res.data.data.orgchartobj = null;
                res.data.data.code = record.code;
                res.data.data.createdate = record.createdate;
                res.data.data.name = record.name;
                res.data.data.remark = record.remark;
                callback(res.data.data, orgData, hisImageConf, scale);
            }
        });
}

function setTreeData(data, root) {
    return data.filter(father => {              //循环所有项
        let childArr = data.filter((child) => {
            return father.children && father.children.indexOf(child.nodeVO.id) > -1      //返回每一项的子级数组
        });
        if (childArr.length > 0) {
            father.children = childArr;    //如果存在子级，则给父级添加一个children属性，并赋值
        }
        if (father.nodeVO.id === root) {
            father.isRoot = true;
        }
        return father.nodeVO.pid == null;      //返回第一层
    });
}
