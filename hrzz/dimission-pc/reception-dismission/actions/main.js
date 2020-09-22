
import CommonAction from './common';
import HeaderAction from './header';
import FormAction from './form';
import TableAction from './table.js'
import {getAppPageConfig} from 'src/hrpub/common/utils/utils';
import cons from "../models/constant.js";
export default class Main extends CommonAction {
    constructor(c) {
        super(c);
        this.c = c;
        this.store = c.props.store;
        this.models = this.store.models;
    }

    extend = [HeaderAction, FormAction , TableAction]

    appConfig = getAppPageConfig()

    processTemplate = (data) => {
        const {reception,button} = this.c.props;
         data.template['list'].items.push({
            itemtype: 'customer',
            label: reception.language['ys6003-000008'],/* 国际化处理： 操作*/
            visible: true,
            fixed: 'right',
            attrcode: 'opr',
            render: (text, record, index) => {
                return (
                    <If condition = {record.values.approve_state.value == "2"}>
                        <div>
                                    <a 
                                    href="javascript:void(0)"
                                    style={{textDecoration:'none'}}
                                    onClick={()=>this.receptionClick(record, index)}
                                >
                                {'部门工作交接'}
                                </a>
                        </div>
                    </If>
                   
                   
                );
            }
        });
        return data.template;
    }
    didMount = () => {
        this.subscribe();
        this.getLanguage('hrzzpc', 'hrzz', (language) => {
            console.log(language);
            this.store.setData('reception.language', language);
            this.setButtonStatus();
            this.getMainData()
        });
        this.getMultiTemplate(cons.templateOption)
            .then((res) => {
                console.log(res);
        });
    }

    // 所有需要订阅的地方
    subscribe = () => {
    }

    // // 每次更新就会查看按钮状态
    // didUpdate = () => {
    //     this.setButtonStatus();
    // }
}