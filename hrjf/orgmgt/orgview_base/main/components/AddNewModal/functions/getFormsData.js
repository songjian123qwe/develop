export default function getFormsData() {
    const {orgType, code, name, display_text, checked} = this.state;
    const {json} = this.props;
    return [
        {
            title: json['jf6005-000402'], /* 国际化处理： 节点基本信息*/
            items: [{
                type: 'input',
                value: code,
                error: checked && !code,
                onChange: (value) => {
                    this.itemChange('code', value)
                },
                name: json['jf6005-000403'], /* 国际化处理： 节点编码*/
                width: '50%',
                autoFocus: true
            }, {
                type: 'input',
                value: name,
                error: checked && !name,
                onChange: (value) => {
                    this.itemChange('name', value)
                },
                name: json['jf6005-000404'], /* 国际化处理： 节点名称*/
                width: '50%'
            }]
        }, {
            title: json['jf6005-000405'], /* 国际化处理： 节点类型*/
            items: [{
                type: 'radio',
                value: orgType,
                error: checked && !orgType,
                onChange: (value) => {
                    this.itemChange('orgType', value)
                },
                options: [{
                    value: 'org',
                    display: json['jf6005-000502']/* 国际化处理： 组织,组织*/
                }, {
                    value: 'dept',
                    display: json['jf6005-000378']/* 国际化处理： 部门,部门*/
                }, {
                    value: 'post',
                    display: json['jf6005-000373']/* 国际化处理： 岗位,岗位*/
                }, {
                    value: 'custom',
                    display: json['jf6005-000406']/* 国际化处理： 其他*/
                }],
                name: json['jf6005-000405'], /* 国际化处理： 节点类型*/
                width: '100%'
            }]
        }, {
            title: json['jf6005-000407'], /* 国际化处理： 显示类型*/
            items: [{
                type: 'textArea',
                value: display_text,
                onChange: (value) => {
                    this.itemChange('display_text', value)
                },
                name: json['jf6005-000408'], /* 国际化处理： 显示文本*/
                width: '100%'
            }]
        }]
}
