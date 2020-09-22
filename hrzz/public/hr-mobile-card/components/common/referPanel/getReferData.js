import proFetch from "../../../../mobile/utils/project-fetch";

const typeMap = {
    grid: 'queryGridUrl',
    tree: 'queryTreeUrl',
    gridTree: 'queryGridUrl'
};

export default function (res, keyword, callback) {
    const {pk_defdoclist, queryCondition} = this.props;
    proFetch({
        url: res[typeMap[res.refType]],
        data: {
            "pid": "",
            "pageInfo": this.pageInfo,
            "keyword": keyword,
            "defineItems": [],
            "queryCondition": {
                ...{"isShowUnit": false, "isDataPowerEnable": false, pk_defdoclist},
                ...(typeof queryCondition === 'function'
                    ? queryCondition(this.props)
                    : typeof queryCondition === 'object' ? queryCondition : {})
            }
        }
    })
        .then(result => {
            if (result.success) {
                callback(result.data)
            }
        })
}