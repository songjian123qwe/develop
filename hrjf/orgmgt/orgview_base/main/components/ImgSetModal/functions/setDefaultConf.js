import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';
import {conventFontToLocal, conventFontToServer} from "../../../container/functions/convert";

/**
 display_no_dialog: "N", //是否保存为用户默认设置
 base_maxnodes: "5000",//生成选项-最大节点数
 base_showlevel: "5",//生成选项-初始展开层数
 base_orientation: "hor",//方向 hor：水平， ver：垂直
 base_propname: "Y",//显示选项-属性名称
 base_displaycode: "Y",//显示选项-节点编码
 base_displaybudget: "N",//显示选项-编制人数
 base_displayactualbudget: "N",//显示选项-实际编制
 base_displaydm: "N",//显示选项-部门负责人信息
 base_displaydmpost: "N",//显示选项-负责人所在岗位
 base_displaydmphoto: "N",//显示选项-照片
 common_width: "160",//节点属性-宽度
 common_height: "90",//节点属性-高度
 common_bordercolor: "#ffffff",//节点属性-边框颜色
 common_shape: "arc",//节点属性-边框类型  arc：圆角  rec：直角
 common_bordertype: "shadow",//节点属性-显示效果   shadow：阴影  normal：普通
 group_backgroundcolor: "#c1d3ed",//节点属性-集团背景色
 org_backgroundcolor: "#c1d3ed",//节点属性-业务单元背景色（组织背景色）
 dept_backgroundcolor: "#c4dfbf",//节点属性-部门背景色
 post_backgroundcolor: "#f4f2d2",//节点属性-岗位背景色
 custom_backgroundcolor: "#ffffff",//节点属性-自定义节点背景色
 common_font: "family=Dialog,name=Dialog.plain,style=0,size=16",
 common_font_color: "#000000",//节点属性-字体颜色
 edge_color: "#c0c8d3",//连接线属性-连接线颜色
 edge_width: "1",//连接线属性-连接线宽度
 edge_begin_arrow: "edge_arrow_none",//连接线属性-起始箭头
 edge_end_arrow: "edge_arrow_classic",//连接线属性-末端箭头
 edge_shape: "rec",//连接线属性-连接线形状  arc：圆角  rec：直角
 */
export default function setDefaultConf(isSave, callback) {
    let params = {};
    if (!isSave) {
        params = {optionType: 'setDefault'}
    } else {
        let qryConfig = JSON.parse(JSON.stringify(this.state)); //深拷贝
        qryConfig.base_maxnodes = qryConfig.base_maxnodes + "";
        qryConfig.common_width = qryConfig.common_width + "";
        qryConfig.edge_width = qryConfig.edge_width + "";
        qryConfig.common_height = qryConfig.common_height + "";
        qryConfig.base_showlevel = qryConfig.base_showlevel + "";
        qryConfig.common_font = conventFontToServer(qryConfig.common_font);
        if (qryConfig.base_displaydm === "N") {
            qryConfig.base_displaydmpost = "N";
            qryConfig.base_displaydmphoto = "N";
        }
        params = {optionType: 'setSave', qryConfigCond: qryConfig}
    }

    proFetch({
        url: '/nccloud/hrjf/orgchart/chartOptionAction.do',
        body: params,
    })
        .then((res) => {
            if (res.success) {
                if (!isSave) {
                    res.data.data.common_font = conventFontToLocal(res.data.data.common_font);
                    callback && callback(res.data.data);
                } else {
                    callback && callback();
                }
            }
        });
}
