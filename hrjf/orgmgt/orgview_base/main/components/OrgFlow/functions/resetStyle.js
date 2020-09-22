import $ from "jquery";
import getOverlay from "./getOverlay";
import checkCanConn from "./checkCanConn";
import getOrgMoreData from './getOrgMoreData';
import initTreeData from "./initTreeData";

const types = ['org', 'dept', 'post', 'custom', 'virtualDept'];

/**
 * @param oldConf 原来的配置
 * 1.第一类更改，只需要该节点style的：
 * common_bordercolor，common_shape，common_bordertype，group_backgroundcolor
 * org_backgroundcolor，dept_backgroundcolor，post_backgroundcolor，custom_backgroundcolor，
 * common_font，common_font_color
 * 2.第二类更改，需要重新渲染endpoint和连线的
 * edge_color，edge_width，edge_begin_arrow，edge_end_arrow，edge_shape
 * 3.第三类更改, 需要更改数据，节点style，并重新渲染endpoint和连线的，单不需要重新计算位置
 * common_width，common_height 改变
 * 4.第四类更改，需要重新画图
 * 4.1 base_orientation更改
 * 4.2 base_propname, base_displaycode, base_displaybudget, base_displayactualbudget,
 * base_displaydm, base_displaydmpost, base_displaydmphoto中显示减少的
 * 5.第五类更改，需要重新查询数据，但当前数据结构不变，并重新画图
 * base_propname, base_displaycode, base_displaybudget, base_displayactualbudget,
 * base_displaydm, base_displaydmpost, base_displaydmphoto中显示增加的
 * 6.第六类更改，需要重查数据并重新画图
 * base_maxnodes
 * 优先级 5,4,3有一个运行则停止，如果都没有1,2独立运行
 */
export default function resetStyle(oldConf) {
    const {base_maxnodes, base_showlevel, base_orientation} = this.props.hisImageConf;
    const {base_maxnodes: old_base_maxnodes} = oldConf;
    if (base_maxnodes != old_base_maxnodes) {
        getOrgMoreData.call(this, true);
        return;
    }

    const {
        base_propname, base_displaycode, base_displaybudget, base_displayactualbudget,
        base_displaydm, base_displaydmpost, base_displaydmphoto
    } = this.props.hisImageConf;
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
        getOrgMoreData.call(this, false, () => {
            this.setState({
                isLandscape: base_orientation === 'hor',
                level: Number(base_showlevel)
            }, () => {
                this.instance.empty('canvas');
                initTreeData.call(this, true);
                this.paintTree();
            })
        });
        return;
    }

    /**
     * 4.第四类更改，需要重新画图
     * 4.1 base_orientation更改
     * 4.2 base_propname, base_displaycode, base_displaybudget, base_displayactualbudget,
     * base_displaydm, base_displaydmpost, base_displaydmphoto中显示减少的
     */

    if ((base_orientation === 'hor') !== this.state.isLandscape) {
        this.setState({
            isLandscape: base_orientation === 'hor',
            level: Number(base_showlevel)
        }, () => {
            this.instance.empty('canvas');
            initTreeData.call(this, true);
            this.paintTree();
        });
        return;
    }


    const {common_width, common_height} = this.props.hisImageConf;
    const {common_width: old_common_width, common_height: old_common_height} = oldConf;

    //原配置有可能是字符串
    const whFlag = common_width != old_common_width || common_height != old_common_height;
    const levelFlag = base_showlevel != this.state.level;

    if (levelFlag || whFlag) {
        this.setState({
            level: base_showlevel
        }, () => {
            this.instance.empty('canvas');
            initTreeData.call(this, whFlag, levelFlag);
            this.paintTree();
        });
        return;
    }

    if ((old_base_displaybudget === 'Y' && base_displaybudget === 'N') ||
        (old_base_displayactualbudget === 'Y' && base_displayactualbudget === 'N') ||
        (old_base_displaydm === 'Y' && base_displaydm === 'N') || (
            base_displaydm === 'Y' && (
                (old_base_displaydmpost === 'Y' && base_displaydmpost === 'N') ||
                (old_base_displaydmphoto === 'Y' && base_displaydmphoto === 'N')
            )
        )) {
        this.instance.empty('canvas');
        initTreeData.call(this, true);
        this.paintTree();
        return;
    }

    /**
     * 2.第二类更改，需要重新渲染endpoint和连线的
     * edge_color，edge_width，edge_begin_arrow，edge_end_arrow，edge_shape
     */
    const {edge_color, edge_width, edge_begin_arrow, edge_end_arrow, edge_shape} = this.props.hisImageConf;
    const {
        edge_color: old_edge_color, edge_width: old_edge_width,
        edge_begin_arrow: old_edge_begin_arrow, edge_end_arrow: old_edge_end_arrow,
        edge_shape: old_edge_shape
    } = oldConf;

    if (edge_color !== old_edge_color || edge_width !== old_edge_width ||
        edge_begin_arrow !== old_edge_begin_arrow || edge_end_arrow !== old_edge_end_arrow ||
        edge_shape !== old_edge_shape) {
        const connectStyle = {
            endpoint: 'Dot',
            paintStyle: {fill: "transparent", radius: 0},
            hoverPaintStyle: {fill: "#289CF2", radius: 20},
            isSource: true,    //是否可以拖动(作为连线出发点)
            isTarget: true,    //是否可以放置(连线终点)
            deleteEndpointsOnDetach: true,
            connector: ["Flowchart", {cornerRadius: edge_shape === 'arc' ? 5 : 0}],//设置连线
            connectorStyle: {stroke: edge_color, strokeWidth: edge_width},
            beforeDrop: (params) => {
                return checkCanConn.call(this, params);
            }
        };

        const LConnectStyle = {
            ...connectStyle,
            connectorOverlays: getOverlay(this.props.hisImageConf, 'L')
        };

        const RConnectStyle = {
            ...connectStyle,
            connectorOverlays: getOverlay(this.props.hisImageConf, 'R')
        };

        const TConnectStyle = {
            ...connectStyle,
            connectorOverlays: getOverlay(this.props.hisImageConf, 'T')
        };

        const BConnectStyle = {
            ...connectStyle,
            connectorOverlays: getOverlay(this.props.hisImageConf, 'B')
        };

        resetConnect.call(this);
        addEndpoint.call(this, [this.nodeData], LConnectStyle, RConnectStyle, TConnectStyle, BConnectStyle);
        this.tempData.forEach(item => addEndpoint.call(this, item, LConnectStyle, RConnectStyle, TConnectStyle, BConnectStyle));
        addLine.call(this, this.nodeData);
        this.tempData.forEach(item => addLine.call(this, item));
    }

    /**
     * 1.第一类更改，只需要该节点style的：
     * common_bordercolor，common_shape，common_bordertype，group_backgroundcolor
     * org_backgroundcolor，dept_backgroundcolor，post_backgroundcolor，custom_backgroundcolor，
     * common_font，common_font_color
     */

    const {
        common_bordercolor, common_shape, common_bordertype, group_backgroundcolor,
        org_backgroundcolor, virtualDept_backgroundcolor, dept_backgroundcolor,
        post_backgroundcolor, custom_backgroundcolor, common_font, common_font_color
    } = this.props.hisImageConf;
    const {
        common_bordercolor: old_common_bordercolor, common_shape: old_common_shape,
        common_bordertype: old_common_bordertype, group_backgroundcolor: old_group_backgroundcolor,
        org_backgroundcolor: old_org_backgroundcolor, dept_backgroundcolor: old_dept_backgroundcolor,
        virtualDept_backgroundcolor: old_virtualDept_backgroundcolor,
        post_backgroundcolor: old_post_backgroundcolor, custom_backgroundcolor: old_custom_backgroundcolor,
        common_font: old_common_font, common_font_color: old_common_font_color
    } = oldConf;

    if (common_bordercolor !== old_common_bordercolor || common_shape !== old_common_shape ||
        common_bordertype !== old_common_bordertype || group_backgroundcolor !== old_group_backgroundcolor ||
        org_backgroundcolor !== old_org_backgroundcolor || dept_backgroundcolor !== old_dept_backgroundcolor
        || virtualDept_backgroundcolor !== old_virtualDept_backgroundcolor ||
        post_backgroundcolor !== old_post_backgroundcolor || custom_backgroundcolor !== old_custom_backgroundcolor ||
        common_font_color !== old_common_font_color || common_font.family !== old_common_font.family ||
        common_font.size !== old_common_font.size || common_font.style !== old_common_font.style) {
        const window = $("#canvas .window");

        window.css({
            border: '1px solid ' + common_bordercolor,
            borderRadius: common_shape === 'arc' ? '5px' : 0,
            boxShadow: common_bordertype === 'shadow' ? '2px 2px 10px #aaa' : 'none'
        });
        window.find('.window-header>div,.window-item>div').css({
            color: common_font_color,
            fontSize: common_font.size,
            fontFamily: common_font.family,
            fontWeight: common_font.style === 1 || common_font.style === 3 ? 'bold' : 'normal',
            fontStyle: common_font.style === 2 || common_font.style === 3 ? 'italic' : 'normal'
        });
        window.find('.window-header').css({
            borderTopLeftRadius: common_shape === 'arc' ? '5px' : 0,
            borderTopRightRadius: common_shape === 'arc' ? '5px' : 0
        });
        window.find('.window-header>div').css({
            color: common_font_color,
            fontSize: common_font.size,
            fontFamily: common_font.family,
            fontWeight: common_font.style === 1 || common_font.style === 3 ? 'bold' : 'normal',
            fontStyle: common_font.style === 2 || common_font.style === 3 ? 'italic' : 'normal'
        });
        types.forEach(type => {
            $("#canvas .window.org-type-" + type + " .window-header").css({
                backgroundColor: this.props.hisImageConf[type + '_backgroundcolor']
            })
        });
    }
}

function resetConnect() {
    this.instance.deleteEveryEndpoint();
    this.instance.deleteEveryConnection();

}

function addEndpoint(data, LConnectStyle, RConnectStyle, TConnectStyle, BConnectStyle) {
    data.forEach(item => {
        const id = item.getId(), isCollapsed = item.getIsCollapsed(), children = item.getChildren();
        this.instance.addEndpoint(id, {uuid: `${id}-Left`, anchor: "Left", maxConnections: -1}, LConnectStyle);
        this.instance.addEndpoint(id, {uuid: `${id}-Top`, anchor: "Top", maxConnections: -1}, TConnectStyle);
        this.instance.addEndpoint(id, {uuid: `${id}-Right`, anchor: "Right", maxConnections: -1}, RConnectStyle);
        this.instance.addEndpoint(id, {uuid: `${id}-Bottom`, anchor: "Bottom", maxConnections: -1}, BConnectStyle);

        //递归添加节点
        if (!isCollapsed) addEndpoint.call(this, children, LConnectStyle, RConnectStyle, TConnectStyle, BConnectStyle);
    })
}

//添加连线  从后往前连
function addLine(data) {
    const parent = data.getParentNode(), id = data.getId();
    if (parent) {
        const parentId = parent.getId();
        const point = this.state.isLandscape ? ["-Right", "-Left"] : ["-Bottom", "-Top"];
        this.instance.connect({uuids: [parentId + point[0], id + point[1]]});
    }
    //如果当前节点为展开状态，才继续让子节点连线
    if (!data.getIsCollapsed()) {
        const children = data.getChildren();
        if (children && children.length) {
            children.forEach(child => addLine.call(this, child))
        }
    }
}