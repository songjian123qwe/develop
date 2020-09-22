/**
 * 分页组件
 */
import React, {Component} from 'react';

import './index.less';

import Pagination from 'src/hrpub/common/components/Pagination'
/**
 * 分页组件
 *
 */
class PagePaginationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: props.json,
            inlt: props.inlt
        };
    }

    componentWillReceiveProps(nextprops) {
        let nextjson = JSON.stringify(nextprops.json);
        let thisjson = JSON.stringify(this.props.json);
        let nextinlt = JSON.stringify(nextprops.inlt);
        let thisinlt = JSON.stringify(this.props.inlt);
        if (nextjson !== thisjson || nextinlt !== thisinlt) {
            this.setState({
                json: nextprops.json,
                inlt: nextprops.inlt,
            })
        }
    }

    render() {
        const {pageInfo,paginationEve,pageSizeSelect} = this.props;
        const pageParam = {
            current: pageInfo.pageIndex,//当前页面, 从 1 开始计算，如果传入了这个props，则组件视为可控组件
            // defaultCurrent: pageInfo.pageIndex,// 默认当前页
            defaultPageSize: pageInfo.pageSize,// 默认每页条数
            hideOnSinglePage: false,// 只有一页时是否隐藏分页器
            pageSize: pageInfo.pageSize,// 每页条数
            pageSizeOptions: [10,20,30,40,50],// 指定每页显示多少条
            showQuickJumper: false,// 是否可以快速跳转至某页
            showSizeChanger: true,// 是否可以改变pageSize
            showTotal: '',// 函数 用于展示有多少条
            // size: pageInfo.,// 分页器尺寸
            total: pageInfo.total,// 数据总数
            onChange: paginationEve,// 页码改变回调函数
            onShowSizeChange: pageSizeSelect// pageSize改变的回调函数
        };
        return (
            <div className="page-pagination-bar">
                {pageInfo.total > 0 && <Pagination
                    {...pageParam}
                />}
            </div>
        );
    }
}

PagePaginationBar.defaultProps = {
    json: null, // 多语言
    inlt: null, // 多语言
    pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        totalPage: 0
    },
    paginationEve: (key) => {
    },//分页事件
    pageSizeSelect: (key) => {
    }//每页显示条数改变
};

export default PagePaginationBar
