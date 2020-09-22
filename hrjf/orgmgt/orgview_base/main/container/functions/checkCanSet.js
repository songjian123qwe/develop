export default function checkCanSet(newConf, oldConf) {
    const {base_maxnodes, base_showlevel, base_orientation} = newConf;
    const {base_maxnodes: old_base_maxnodes} = oldConf;
    if (base_maxnodes != old_base_maxnodes) {
        return false;
    }

    const {
        base_propname, base_displaycode, base_displaybudget, base_displayactualbudget,
        base_displaydm, base_displaydmpost, base_displaydmphoto
    } = newConf;
    const {
        base_propname: old_base_propname, base_displaycode: old_base_displaycode,
        base_displaybudget: old_base_displaybudget, base_displayactualbudget: old_base_displayactualbudget,
        base_displaydm: old_base_displaydm, base_displaydmpost: old_base_displaydmpost, base_displaydmphoto: old_base_displaydmphoto
    } = oldConf;
    /**
     * 5.第五类更改，需要重新查询数据并重新画图
     * base_propname, base_displaycode, base_displaybudget, base_displayactualbudget,
     * base_displaydm, base_displaydmpost, base_displaydmphoto中显示增加的
     */
    if ((base_displaybudget === 'Y' && old_base_displaybudget === 'N') ||
        (base_displayactualbudget === 'Y' && old_base_displayactualbudget === 'N') ||
        (base_displaydm === 'Y' && old_base_displaydm === 'N') || (
            base_displaydm === 'Y' && (
                (base_displaydmpost === 'Y' && old_base_displaydmpost === 'N') ||
                (base_displaydmphoto === 'Y' && old_base_displaydmphoto === 'N')
            )
        )) {
        return false;
    }
    return true;
}