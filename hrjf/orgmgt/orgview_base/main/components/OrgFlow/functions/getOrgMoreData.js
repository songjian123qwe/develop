import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';
import {conventFontToServer} from "../../../container/functions/convert";

/**
 * 图像设置更改之后，需要查询到更多组织信息
 */

export default function getOrgMoreData(isReset, callback) {
    const {hisImageConf, nodeType} = this.props;
    const {
        orgpk, orgType, qryDate, includeSubOrg, displayDept, displayCanceledDept,
        displayVirtualDept, displayPost
    } = this.props.baseInfo;

    let qryConfig = JSON.parse(JSON.stringify(hisImageConf)); //深拷贝
    qryConfig.common_font = conventFontToServer(qryConfig.common_font);
    qryConfig.base_maxnodes = qryConfig.base_maxnodes + "";
    qryConfig.common_width = qryConfig.common_width + "";
    qryConfig.edge_width = qryConfig.edge_width + "";
    qryConfig.common_height = qryConfig.common_height + "";
    qryConfig.base_showlevel = qryConfig.base_showlevel + "";
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
                if (res.data.setting_nodata === 'setting_nodata') return;
                if (!isReset) {
                    resetAllNodeVO.call(this, res.data.orgchartvos);
                    callback && callback();
                } else {
                    const orgData = setTreeData(res.data.orgchartvos);
                    orgData[0].isRoot = true;
                    this.generateTree(orgData[0])
                }
            }
        });
}

function resetAllNodeVO(data) {
    const resetVO = function (node) {
        const id = node.getId(), children = node.getChildren(), isCustom = node.getIsCustom();
        if (!isCustom) {
            const value = data.find(item => item.id === id);
            if (value) {
                node.setNodeVO(value);
            }
        }
        if (children && children.length) {
            children.forEach(child => resetVO(child))
        }
    };
    resetVO(this.nodeData);
    this.tempData.forEach(temp => resetVO(temp));
}

function setTreeData(data) {
    return data.filter(father => {              //循环所有项
        if (!father.nodeVO) father.nodeVO = JSON.parse(JSON.stringify(father));
        let childArr = data.filter((child) => {
            if (!child.nodeVO) child.nodeVO = JSON.parse(JSON.stringify(child));
            return father.nodeVO.id === child.nodeVO.pid      //返回每一项的子级数组
        });
        if (childArr.length > 0) {
            father.children = childArr;    //如果存在子级，则给父级添加一个children属性，并赋值
        }
        return father.nodeVO.pid == null;      //返回第一层
    });
}
