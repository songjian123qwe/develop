import {conventFontToServer} from './convert';
import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';
import {toast} from 'nc-lightapp-front';

export default function saveOrgView(historyInfo, dataInfo, callback) {
    const {orgVal} = this.state;
    const save_node = [dataInfo.nodeData].concat(dataInfo.tempData);
    const save_conf = easyDeepClone(this.state.hisImageConf);
    save_conf.common_font = conventFontToServer(save_conf.common_font);
    save_conf.base_maxnodes = save_conf.base_maxnodes + "";
    save_conf.common_width = save_conf.common_width + "";
    save_conf.edge_width = save_conf.edge_width + "";
    save_conf.common_height = save_conf.common_height + "";
    save_conf.base_showlevel = save_conf.base_showlevel + "";
    if (save_conf.base_displaydm === "N") {
        save_conf.base_displaydmpost = "N";
        save_conf.base_displaydmphoto = "N";
    }
    save_conf.base_orientation = dataInfo.isLandscape ? 'hor' : 'ver';
    const {snapshotVertexVO, snapshotEdgeVO, root} = conventViewDataToServer(save_node);
    const params = {
        "savetype": "NORMAL",
        "pk_org": orgVal && orgVal.refpk,
        "pk_om_orgchart": historyInfo.pk_om_orgchart.value,
        "code": historyInfo.code.value,
        "name": historyInfo.name.value,
        "createdate": historyInfo.createdate.value,
        "remark": historyInfo.remark.value || '',
        "root": root,
        "scale": dataInfo.zoom / 100,
        "snapshotVertexVO": snapshotVertexVO,
        "snapshotEdgeVO": snapshotEdgeVO,
        "qryConfigCond": save_conf
    };
    proFetch({
        url: '/nccloud/hrjf/orgchart/chartSaveAction.do',
        body: params,
    }).then((res) => {
        if (res.success) {
            toast({
                color: 'success',
                content: this.state.json['jf6005-000043']/* 国际化处理： 保存成功,保存成功*/
            });
            callback && callback();
        }
    });
}

function easyDeepClone(data) {
    return JSON.parse(JSON.stringify(data))
}

function conventViewDataToServer(data) {
    let snapshotVertexVO = [], snapshotEdgeVO = [], root = '';
    const convert = function (data) {
        data.forEach(item => {
            if (item.getIsRoot()) root = item.getId();
            const tempNodeVO = easyDeepClone(item.nodeVO);
            if (tempNodeVO.values.photo_data) {
                tempNodeVO.values.photo_data = tempNodeVO.values.pk_psndoc;
            }
            tempNodeVO.pid = item.parent && item.parent.nodeVO.id;
            tempNodeVO.values.pid = item.parent && item.parent.nodeVO.id;
            const orgchartnodevovalues = conventFontToServer(tempNodeVO.values);
            const orgchartnodevo = conventFontToServer(tempNodeVO);
            snapshotVertexVO.push({
                x: item.x,
                y: item.y,
                width: item.width,
                height: item.height,
                visible: item.visible,
                collapsed: item.collapsed,
                children: item.children && item.children.map(child => child.nodeVO.id).join(),
                orgchartnodevo,
                orgchartnodevovalues
            });
            if (item.parent) {
                snapshotEdgeVO.push({
                    x: "0.0",
                    y: "0.0",
                    width: "1.0",
                    height: "1.0",
                    visible: true,
                    source: item.parent.nodeVO.id,
                    target: tempNodeVO.id,
                    style: ""
                })
            }
            if (item.children && item.children.length) {
                convert(item.children);
            }
        })
    };
    convert(data);
    return {snapshotVertexVO, snapshotEdgeVO, root};
}
