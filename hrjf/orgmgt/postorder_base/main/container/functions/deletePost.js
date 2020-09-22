import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';
import {toast} from 'nc-lightapp-front';

export default function deletePost() {
    const {form, editTable, removeLeaf} = this.props;
    const postData = {
        head: JSON.stringify({
            model: {
                areacode: 'baseInfo',
                rows: form.getAllFormValue('baseInfo').rows
            }
        }),
        bodys: JSON.stringify({
            model: {
                areacode: 'postseries_levelrelation',
                rows: editTable.getAllRows('postseries_levelrelation')
            }
        })
    };

    proFetch({
        url: '/nccloud/hrjf/postseries/delAction.do',
        body: postData,
    })
        .then((res) => {
            if (res.success) {
                toast({color: "success", content: this.props.json['jf6005-000164']});
                removeLeaf();
            }
        });
}