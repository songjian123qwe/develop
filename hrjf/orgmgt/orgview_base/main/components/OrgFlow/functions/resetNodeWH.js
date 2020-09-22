/**
 * @param node
 * @param config
 * 根据图像配置重新设置节点大小
 * 1.如果是自定义节点，默认为配置大小
 * 2.不考虑字体的情况下，每组数据的配置为 25px
 *   如果超过配置高度，则更改大小
 * 3.除部门外，其他类型都没有负责人信息
 * 4.根据数据中是否含有图片计算
 */
export default function resetNodeWH(node, config) {
    const {common_width, common_height, common_font} = config;
    const orgType = node.getOrgType(), isCustom = node.getIsCustom(), info = node.getInfo();
    let count = 0, flag = false, line = 0, itemH = common_font.size + 10,
        charW = common_font.size, imgH = 80, lineH = 8;
    //itemH节点每个元素的高度 通过字体大小计算，imgH图片高度,lineH 分割线高度
    // charW每个字符宽度，默认一行显示10个字符？
    if (isCustom) {
        //node.setWH(common_width, common_height);
        node.setWH(Math.max(common_width, charW * 10), Math.max(common_height, count * 3));
    } else {

        /*base_propname: "Y",//显示选项-属性名称
            base_displaycode: "Y",//显示选项-节点编码
            base_displaybudget: "N",//显示选项-编制人数
            base_displayactualbudget: "N",//显示选项-实际编制
            base_displaydm: "N",//显示选项-部门负责人信息
            base_displaydmpost: "N",//显示选项-负责人所在岗位
            base_displaydmphoto: "N",//显示选项-照片*/
        const {
            base_propname, base_displaycode, base_displaybudget, base_displayactualbudget,
            base_displaydm, base_displaydmpost, base_displaydmphoto
        } = config;

        if (config.base_displaybudget === 'Y' || config.base_displayactualbudget === 'Y') line++;
        if (base_propname === 'Y') count++;
        if (base_displaycode === 'Y') count++;
        if (base_displaybudget === 'Y') count++;
        if (base_displayactualbudget === 'Y') count++;
        if ((orgType === 'dept' || orgType === 'virtualDept') && base_displaydm === 'Y') {
            count++;
            line++;
            if (base_displaydmpost === 'Y') count++;
            if (base_displaydmphoto === 'Y' && info.photo_data) flag = true;
        }
        node.setWH(Math.max(common_width, charW * 10), Math.max(common_height, (count * itemH + 24 + line * lineH + (flag ? imgH : 0))));
    }
}