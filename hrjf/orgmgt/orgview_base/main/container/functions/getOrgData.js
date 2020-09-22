import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';
import {conventFontToServer} from "./convert";

/**
 * 获取组织机构图数据，并组成树状结构
 */

export default function getOrgData(callback) {
    const {nodeType, pk_org} = this.props;
    const {imageConf} = this.state;
    const {
        orgpk, orgSys, qryDate, orgType, includeSubOrg, displayDept, displayCanceledDept,
        displayVirtualDept, displayPost
    } = this.baseInfo;

    let qryConfig = JSON.parse(JSON.stringify(imageConf)); //深拷贝
    qryConfig.common_font = conventFontToServer(qryConfig.common_font);
    qryConfig.base_maxnodes = qryConfig.base_maxnodes + "";
    qryConfig.common_width = qryConfig.common_width + "";
    qryConfig.edge_width = qryConfig.edge_width + "";
    qryConfig.common_height = qryConfig.common_height + "";
    qryConfig.base_showlevel = qryConfig.base_showlevel + "";
    if (qryConfig.base_displaydm === "N") {
        qryConfig.base_displaydmpost = "N";
        qryConfig.base_displaydmphoto = "N";
    }
    /*if (qryDate) {
        delete qryConfig.base_displaybudget;
        delete qryConfig.base_displayactualbudget;
        delete qryConfig.base_displaydm;
        delete qryConfig.base_displaydmpost;
        delete qryConfig.base_displaydmphoto;
    }*/
    const params = {
        queryCondition: {
            nodeType,
            orgType,
            orgSys,
            qryDate,
            orgpk: orgpk && orgpk.refpk,
            includeSubOrg,
            displayDept,
            displayCanceledDept,
            displayVirtualDept,
            displayPost
        },
        qryConfigCond: qryConfig
    };
    proFetch({
        url: '/nccloud/hrjf/orgchart/buildAction.do',
        body: params,
    })
        .then((res) => {
            if (res.success) {
                const orgData = setTreeData(res.data.orgchartvos);
                orgData[0].isRoot = true;
                callback && callback(orgData[0]);
            }
        });
    /*const orgData = setTreeData(data.orgchartvos);
    callback && callback(orgData[0]);*/
}

function setTreeData(data) {
    return data.filter(father => {              //循环所有项
        if (!father.nodeVO) father.nodeVO = JSON.parse(JSON.stringify(father));
        let hasFather = false;
        let childArr = data.filter((child) => {
            if (!child.nodeVO) child.nodeVO = JSON.parse(JSON.stringify(child));
            if (child.nodeVO.id === father.nodeVO.pid) hasFather = true;
            return father.nodeVO.id === child.nodeVO.pid      //返回每一项的子级数组
        });
        if (childArr.length > 0) {
            father.children = childArr;    //如果存在子级，则给父级添加一个children属性，并赋值
        }
        return father.nodeVO.pid == null || !hasFather;      //返回第一层
    });
}
