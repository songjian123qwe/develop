/**
 * 查询左树
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function HRDeptQueryAction() {
    if(!this.state.queryActionPkorg){
        //如果没有选择人力资源组织则 直接返回
        return this.creatLeftTree(null)
    }
    const {
        searchModalValue,
        currentSelectDepartment,
        humanResourceOrganizationValue,
        queryOid,
        include_child_depts,
        include_child_orgs
    } = this.state;

    let data = {
        ...searchModalValue,
        tree_node_id: currentSelectDepartment,
        node_type: "ORG_NODE",
        pk_org: humanResourceOrganizationValue.refpk,
        oid: queryOid,
        func_type: 1,
        show_all_info: false,
        show_on_job_psn: false,
        include_child_depts: include_child_depts,
        include_child_orgs: include_child_orgs
    };
    let postData = {
        QueryTemplateInfo4Web: data,
        is_show_hrcanceled: this.state.enablestate,
        pk_org: this.state.queryActionPkorg
        // 测试
        // pk_org:'0001HR10000000002MD5'
    };

    function addClassForDisAction(tar) {
        tar && tar.length && tar.forEach(v => {
            v.isleaf = false;
            if (v.nodeData.nodeValue.hrcanceled) v.titleStyle = {color: 'lightgrey'};
            v.children && addClassForDisAction(v.children);
        })
    }

    if (this.state.treeType === 'psnType') {
        // 请求 岗位序列 数据
        return proFetch({
            url: '/nccloud/hrjf/postseries/treeAction.do',
            body: {
                pk_org: this.businessInfo.groupId,
                showDisable: false
            }
        }).then((res) => {
            successFun.call(this, res)
        });
    } else {
        // 请求 行政组织 数据
        return proFetch({
            url: '/nccloud/hrjf/hrdept/HRDeptQueryAction.do',
            body: postData,
        })
            .then((res) => {
                successFun.call(this, res)
            });
    }

    function successFun(res) {
        if (res.success) {
            // 创建树 组件需要的数据结构
            if (this.state.enablestate && this.state.treeType === 'adminOrg') {
                // 如果撤销 字体显示灰色
                addClassForDisAction(res.data);
            }
            this.creatLeftTree(res.data)
        } else {
            this.creatLeftTree(null)
        }
    }
}
