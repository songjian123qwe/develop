import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

/**
 * 保存
 * @param pageid       页面初始化 获取模板的时候获得
 * @param bodys        object :
 * @param head        object :
 * @param operate      number: 3 新增  4：修改
 * @param syncCorpJob      number: 0: 第一次保存；  1： 有弹窗后点击确定；  2： 弹窗后点击取消
 * @returns {Promise<any>}
 * @constructor
 */
export default function SaveAction(pageid, bodys, head, operate, syncCorpJob) {
    const postData = {
        pageid, bodys, head, operate, syncCorpJob
    };

    return new Promise(((resolve, reject) => {
            proFetch({
                url: '/nccloud/hrjf/poststd/SaveAction.do',
                body: postData,
            })
                .then((res) => {
                    if (res.success) {
                        resolve(res)
                    }
                });
        })
    );
}