import React, {Component} from 'react';
import './index.less';
import {base, promptBox, toast} from 'nc-lightapp-front';
import PagePaginationBar from "../../../../../public/components/pagePaginationBar";

const {NCSelect, NCOption, NCPagination} = base;
const tableId = '';

class TableInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 分页
            pageInfo: {
                pageIndex: 1,
                pageSize: 10,
                total: 0,
                totalPage: 0
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showDisable !== this.props.showDisable) {
            this.getPostInfo(nextProps.pk_postseries);
        }
    }

    getPostInfo() {
        console.log('查询列表')
    }

    updateState(data, callback = () => {
    }) {
        this.setState(data, callback)
    }

    /**
     * 右表单击
     */
    onRowClick(props, index, record, e) {
        this.tablePost = record.values.pk_post.value;
        this.updateState({
            billNo: record.values.postcode.value || '',
            pk_post: record.values.pk_post.value || ''
        }, () => {
            // 设置按钮状态 可用
            this.setBtnDisSta({
                viewinpos: false,         //在职人员
                viewoutpos: false,        //曾在职人员
                junior: false,            //下级人员
                print: false,             // 打印
                output: false,            // 输出
                file: false               // 文件管理
            });
        });
    }

    /**
     * 右表双击
     */
    onRowDoubleClick(record, index, e) {
        setDefData('hr_post_table_record', record);
        // 获取部门
        // let pk_org = "0001HR10000000002MD5";
        // let pk_post = "1002HR100000000003TV";
        this.tableOrg = record.values.pk_org.value;
        this.tablePost = record.values.pk_post.value;

        this.PostQueryOneAction(this.tablePost, () => {
            // 显示详情页
            this.updateState({
                isShowDetail: true
            });
        });
    }

    //每页显示条数
    pageSizeSelect = (val) => {
        this.state.pageInfo.pageSize = val;
        this.state.pageInfo.pageIndex = 1;
        this.updateState(this.state.pageInfo, () => {
            let rootFlag = !this.pk_dept && !this.pk_org;
            this.getPostInfo(rootFlag);
            rootFlag = null;
        });
    };
    //分页事件
    paginationEve = (key) => {
        this.state.pageInfo.pageIndex = key;
        this.updateState(this.state.pageInfo, () => {
            let rootFlag = !this.pk_dept && !this.pk_org;
            this.getPostInfo(rootFlag);
            rootFlag = null;
        });
    };

    render() {
        const {editTable, isEditing, pk_postseries} = this.props;
        let {createEditTable} = editTable;
        const {
            pageInfo
        } = this.state;
        return (
            <div className="table-info">
                <div className={'table-box'}>
                    {
                        createEditTable(tableId, {
                            onRowDoubleClick: this.onRowDoubleClick.bind(this),
                            showPagination: true, //是否展示分页
                            height: 'calc(100vh - 174px)',
                            // showCheck: this.state.showOrgDetailPFBtn,
                            onRowClick: this.onRowClick.bind(this)
                        })
                    }
                </div>

                <PagePaginationBar
                    pageInfo={pageInfo}
                    paginationEve={this.paginationEve.bind(this)}
                    pageSizeSelect={this.pageSizeSelect.bind(this)}
                />
            </div>
        );
    }
}

export default TableInfo;