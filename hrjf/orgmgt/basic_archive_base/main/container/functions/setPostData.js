import disabledEditButton from "./disabledEditButton";

export default function setPostData(data) {
    const {form, editTable} = this.props;
    if (data.head) {
        form.setAllFormValue({'baseInfo': data.head.baseInfo});
        this.setState({
            enablestate: data.head.baseInfo.rows[0].values.enablestate.value,
            postName: data.head.baseInfo.rows[0].values.postseriesname.value
        });
        if (this.props.appcode === '60054020' && data.head.baseInfo.rows[0].values.pk_org.value === 'GLOBLE00000000000000') {
            disabledEditButton.call(this, true);
        }
    } else {
        form.EmptyAllFormValue('baseInfo');
    }
    if (data.bodys) {
        editTable.setTableData('postseries_levelrelation', {
            rows: data.bodys.postseries_levelrelation.rows
        });
    } else {
        editTable.setTableData('postseries_levelrelation', {
            rows: []
        });
    }
}