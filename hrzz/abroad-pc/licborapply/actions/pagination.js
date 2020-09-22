


export default class PaginationAction {
    constructor(comp) {
        this.comp = comp;
    }

    // 翻页
    turnPage = (page) => {
        const { props } = this.comp;
        const {
            emp
        } = props;

        if (page === emp.pageInfo.pageIndex) {
            return;
        }

        let pageInfo = {
            ...emp.pageInfo,
            pageIndex: page
        }

        this.pubSub.publish('getMainTableData', {
            pageInfo: pageInfo
        });
    }

    // c改变每页显示条数
    changePageSize = (size) => {
        const { props } = this.comp;
        const {
            emp
        } = props;

        if (size === emp.pageInfo.pageSize) {
            return;
        }

        let pageInfo = {
            ...emp.pageInfo,
            pageSize: size
        }

        this.pubSub.publish('getMainTableData', {
            pageInfo: pageInfo
        });
    }
}