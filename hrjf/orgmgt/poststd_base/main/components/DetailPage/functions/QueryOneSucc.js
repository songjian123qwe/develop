/**
 * 详情页查询 成功
 */
import {COMMON} from "../../../common/common";

export default function QueryOneSucc(pk_post, param, res, setDefData, AddCondition, tableIdArr) {
    let formId = COMMON.poststd_card;
    //设置 翻页组件显示当前页
    this.setCardPage(pk_post);
    if (!res.data) {
        console.error('no data...');
        return;
    }
    // 设置翻页的当前页
    this.props.cardPagination.setCardPaginationId({id: pk_post, status: 1});

    //岗位素质指标是否可编辑
    let cpFlag = res.data.cpFlag;
    this.setState({
        cpFlag
    });

    // 设置主键是否可以编辑
    if (res.data.hasOwnProperty('isCodeEditable')) {
        // 设置编码的可编辑性
        this.props.form.setFormItemsDisabled(formId, {postcode: !res.data.isCodeEditable});
    }
    // 设置表单数据
    if (res.data.dataResult.head && res.data.dataResult.head[formId]) {
        let rows = res.data.dataResult.head[formId].rows[0];
        // 保存 record 新增用
        setDefData('hrjf', 'poststd', rows);
        let rowValues = rows.values;
        // 设置详情页的修改 删除 复制 按钮是否可用
        let postFlag = rowValues.postFlag.value;
        let postcode = rowValues.postcode.value;  // 岗位编码  附件已用
        this.props.updateState({
            postFlag,
            postcode
        }, () => {
            this.props.updateButtonStatus();
        });

        let formdata = {
            [formId]: {
                rows: res.data.dataResult.head[formId].rows
            }
        };
        this.props.form.setAllFormValue(formdata);
        let queryCondition = {
            pk_org: rowValues.pk_org.value
        };
        let meta = this.props.meta.getMeta();
        AddCondition(meta[formId], {
            ...queryCondition
        }, 'pk_dept');
        this.props.meta.setMeta(meta);
    }

    // 设置表格数据
    this.setState({
        loaddingData: false
    }, () => {
        let tableData = res.data.dataResult.bodys;

        tableIdArr.map(tableId => {
            this.props.cardTable.toggleCardTable(tableId, false);
            if (tableData.hasOwnProperty(tableId)) {
                this.props.cardTable.setTableData(tableId, tableData[tableId]);
                if (tableId === 'poststd_levelrelation') {
                    setDefData('hrjf_hrpost', 'hrjf.hrpost.poststd_levelrelation', tableData[tableId])
                }
            } else {
                if (tableId === 'poststd_levelrelation') {
                    setDefData('hrjf_hrpost', 'hrjf.hrpost.poststd_levelrelation', null);
                }
                this.props.cardTable.setTableData(tableId, {rows: []})
            }
        });
        this.setDetailStatus(this.state.isEditing);
    });
}
