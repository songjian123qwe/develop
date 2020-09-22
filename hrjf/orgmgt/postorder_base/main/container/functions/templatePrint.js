import {print} from 'nc-lightapp-front';

export default function templatePrint() {
    const {appcode, pk_postseries} = this.props;

    const postData = {
        filename: this.props.json['jf6005-000219'],
        funcode: '60054010',     //功能节点编码，即模板编码 写死全局appcode，才可以查找到模板
        appcode: '60054010',
        nodekey: 'fmprint',
        oids: [pk_postseries]   // 单据pk  oids含有多个元素时为批量打印,
    };

    print(
        'pdf',  //支持两类: 'html'为模板打印, 'pdf'为pdf打印
        '/nccloud/hrjf/postseries/printAction.do',
        postData
    );
}
