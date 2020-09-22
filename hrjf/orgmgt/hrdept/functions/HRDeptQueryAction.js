/**
 * 查询
 */
import ajaxHRDeptQueryAction from '../request-functions/getHRDeptQueryAction';

export default function HRDeptQueryAction() {
    const {
        searchModalValue,
        currentSelectDepartment,
        humanResourceOrganizationValue,
        queryOid,
        include_child_depts,
        include_child_orgs
    } = this.state;

    let data = {
        tree_node_id: currentSelectDepartment,
        node_type: "ORG_NODE",
        pk_org: humanResourceOrganizationValue.refpk,
        oid: queryOid,
        func_type: 1,
        show_all_info: false,
        show_on_job_psn: false,
        include_child_depts: include_child_depts,
        include_child_orgs: include_child_orgs,
        ...searchModalValue
    };
    let postData = {
        ...data,
        is_show_hrcanceled: this.state.enablestate,
        pk_org: this.state.queryActionPkorg
        // 测试
        // pk_org:'0001HR10000000002MD5'
    };
    let buttons = this.state.buttons;
    let rootKey = this.root.key;

    function getAllPks(data) {
        let allPks = [];
        let iconData = [{
            key: rootKey,
            value: {
                addIcon: false,
                editIcon: false,
                delIcon: false,
                // stopUpIon: 'stop'
            }
        }];
        let addFlag = buttons.some(item => {
            return item.key === "add"
        });
        let editFlag = buttons.some(item => {
            return item.key === "edit"
        });
        let delFlag = buttons.some(item => {
            return item.key === "delete"
        });

        function getpk(data) {
            if(!data) return;
            if (Array.isArray(data)) {
                data.forEach(item => {
                    getpk(item)
                });
                return
            }
            allPks.push(data.refpk);
            if (data["nodeData"] && data["nodeData"]["nodeValue"]) {
                let nodeValue = data["nodeData"]["nodeValue"];
                let {pk_dept} = nodeValue;
                let temp = {
                    key: data.refpk,      //节点的refpk
                    value: {                        //默认都为true显示，隐藏，设为false
                        addIcon: addFlag,// 如果是组织 则只显示新增按钮
                        editIcon: editFlag && (!!pk_dept),
                        delIcon: delFlag && (!!pk_dept)
                        /*<!--显示停用按钮-->
                        stopUpIon: 'stop'*/
                    }
                };
                iconData.push(temp)
            }
            if (data["children"]) {
                let children = data["children"];
                if (Array.isArray(children)) {
                    children.forEach((item) => {
                        getpk(item);
                    })
                }
            }
        }

        getpk(data);

        return {allPks, iconData};

    }

    return ajaxHRDeptQueryAction(postData)
        .then((res) => {
            if (!res.success) {
                return
            }
            if (this.state.enablestate) {
                // 如果撤销 字体显示灰色
                addClassForDisAction(res.data);
            }
            let {allPks, iconData} = getAllPks(res.data);
            this.allRefPk = allPks;

            // 创建树 组件需要的数据结构
            this.creatLeftTree(res.data, iconData)
        });
}


/**
 * 撤销置灰 添加灰色字体的class
 * @param tar
 */
export function addClassForDisAction(tar, refpk) {
    tar && tar.length && tar.forEach(v => {
        v.isleaf = false;
        if ((v.hasOwnProperty("nodeData") && v.nodeData.nodeValue.hrcanceled) || v.refpk === refpk) {
            v.titleStyle = {color: 'lightgrey'};
        }
        v.children && addClassForDisAction(v.children, refpk);
    })
}
