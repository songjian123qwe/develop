import $ from 'jquery';
import checkCanConn from "./checkCanConn";
import myClick from "./myClick";
import getOverlay from "./getOverlay";
import getComponent from "./getComponent";
import dndChangeSize from "./dndChangeSize";

export default function drawPoint(data) {
    const {edge_color, edge_width, edge_shape} = this.props.hisImageConf;
    const connectStyle = {
        endpoint: 'Dot',
        paintStyle: {fill: "transparent", radius: 0},
        hoverPaintStyle: {fill: "#289CF2", radius: 15},
        isSource: true,    //是否可以拖动(作为连线出发点)
        isTarget: true,    //是否可以放置(连线终点)
        deleteEndpointsOnDetach: true,
        connector: ["Flowchart", {cornerRadius: edge_shape === 'arc' ? 5 : 0}]/*[edge_shape === 'arc' ? 'Bezier' : 'Flowchart']*/,//设置连线
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

    //创建节点
    addPoint.call(this, [data], LConnectStyle, RConnectStyle, TConnectStyle, BConnectStyle);
    //各个节点添加连线
    addLine.call(this, data);
}

//添加节点
function addPoint(data, LConnectStyle, RConnectStyle, TConnectStyle, BConnectStyle) {
    if (!data || !data.length) return;
    const {common_bordercolor, common_shape, common_bordertype, common_font, common_font_color} = this.props.hisImageConf;
    data.forEach(item => {
        const id = item.getId(), wh = item.getWH(), children = item.getChildren(),
            pos = item.getXY(), isCollapsed = item.getIsCollapsed(), orgType = item.getOrgType();
        $("#canvas").append(`<div class="window org-type-${orgType}" id="${id}">         
            <div class="jtk-draw-skeleton">
                <div class="jtk-draw-handle jtk-draw-handle-tl"/>
                <div class="jtk-draw-handle jtk-draw-handle-tr"/>
                <div class="jtk-draw-handle jtk-draw-handle-bl"/>
                <div class="jtk-draw-handle jtk-draw-handle-br"/>
            </div>
            ${getComponent(item, this.props.hisImageConf, this.props.json,this.props.inlt)}
        </div>`);
        myClick($(`#${id} .coll-btn`), () => this.collapse(item));
        const el = $(`#${id}`);
        dndChangeSize.call(this, item, (rect) => {
            const {left, top, width, height} = rect;
            item.setWH(width, height);
            item.setXY(left, top);
            this.instance.updateOffset({elId: id, recalc: true});
            this.instance.repaint([id]);
        });
        /*el.mouseenter(() => {
            console.log('enter')
        });
        el.mouseleave(() => {
            console.log('leave')
        });*/
        el.click((e) => {
            e.stopPropagation();
            this.selectPoint(item);
        });
        el.contextmenu((e) => {
            e.stopPropagation();
            e.preventDefault();
            this.rightMenuClick(e, item);
        });
        el.css({
            left: pos.x,
            top: pos.y,
            width: wh.w,
            height: wh.h,
            border: '1px solid ' + common_bordercolor,
            borderRadius: common_shape === 'arc' ? '5px' : 0,
            boxShadow: common_bordertype === 'shadow' ? '2px 2px 10px #aaa' : 'none'
        });

        el.find('.window-header').css({
            borderTopLeftRadius: common_shape === 'arc' ? '5px' : 0,
            borderTopRightRadius: common_shape === 'arc' ? '5px' : 0
        });

        el.find('.window-header>div,.window-item>div').css({
            color: common_font_color,
            fontSize: common_font.size,
            fontFamily: common_font.family,
            fontWeight: common_font.style === 1 || common_font.style === 3 ? 'bold' : 'normal',
            fontStyle: common_font.style === 2 || common_font.style === 3 ? 'italic' : 'normal'
        });

        el.find('.window-header>div').css({
            color: common_font_color,
            fontSize: common_font.size,
            fontFamily: common_font.family,
            fontWeight: common_font.style === 1 || common_font.style === 3 ? 'bold' : 'normal',
            fontStyle: common_font.style === 2 || common_font.style === 3 ? 'italic' : 'normal'
        });

        el.find('.window-header').css({
            backgroundColor: this.props.hisImageConf[orgType + '_backgroundcolor']
        });

        if (!children.length) el.addClass('no-child');
        if (isCollapsed) el.addClass('collapsed');

        this.instance.addEndpoint(id, {uuid: `${id}-Left`, anchor: "Left", maxConnections: -1}, LConnectStyle);
        this.instance.addEndpoint(id, {uuid: `${id}-Top`, anchor: "Top", maxConnections: -1}, TConnectStyle);
        this.instance.addEndpoint(id, {uuid: `${id}-Right`, anchor: "Right", maxConnections: -1}, RConnectStyle);
        this.instance.addEndpoint(id, {uuid: `${id}-Bottom`, anchor: "Bottom", maxConnections: -1}, BConnectStyle);

        this.instance.draggable(el, {
            'stop': (params) => {
                const [x0, y0] = params.pos;
                item.setXY(x0, y0);
            }
        });
        //递归添加节点
        if (!isCollapsed) addPoint.call(this, children, LConnectStyle, RConnectStyle, TConnectStyle, BConnectStyle);
    });
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