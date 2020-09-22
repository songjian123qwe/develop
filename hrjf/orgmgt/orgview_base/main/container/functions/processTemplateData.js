import {base, high, promptBox} from 'nc-lightapp-front';
import React from "react";
// 处理调出调入table meta
export default function processTemplate(temp) {
    const {json} = this.state;
    temp['orgcharthisgrid'].items.push({
        itemtype: 'customer',
        width: '140px',
        label: json['jf6005-000102'], /* 国际化处理： 操作,操作*/
        visible: true,
        attrcode: 'opr',
        render: (text, record, index) => {
            return (
                <div className="history-action">
                    <a
                        href="javascript:void(0)"
                        onClick={() => this.openView(record)}
                    >
                        {json['jf6005-000498']}{/* 国际化处理： 打开图示*/}
                    </a>
                    <a
                        href="javascript:void(0)"
                        onClick={() => this.editHistory(record, index)}
                    >
                        {json['jf6005-000234']}{/* 国际化处理： 编辑*/}
                    </a>
                    <a
                        href="javascript:void(0)"
                        onClick={() => promptBox(
                            {
                                color: "warning",
                                title: json['jf6005-000056'], /* 国际化处理： 提示,提示*/
                                content: json['jf6005-000497'], /* 国际化处理： 删除版本后将无法恢复，是否继续删除？*/
                                beSureBtnClick: () => this.removeHistory(record, index)
                            })}
                    >
                        {json['jf6005-000113']}{/* 国际化处理： 删除*/}
                    </a>
                </div>
            );
        }
    })
}
