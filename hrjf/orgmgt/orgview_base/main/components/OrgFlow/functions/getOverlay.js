/**箭头下拉取值有-->
 * edge_arrow_none：无形状，
 * edge_arrow_classic：经典箭头，
 * edge_arrow_wide：广口箭头，
 * edge_arrow_block：块状箭头，
 * edge_arrow_diamond：菱形，
 * edge_arrow_ellipse：椭圆形
 * TODO 需要自己添加几种箭头样式
 * */

import $ from 'jquery';

export default function getOverlay(config, position) {
    const {edge_color, edge_begin_arrow, edge_end_arrow, edge_width} = config;
    let overlay = [], edgeWidth = 7 + Number(edge_width);
    if (edge_begin_arrow !== 'edge_arrow_none') {
        if (edge_begin_arrow === 'edge_arrow_ellipse') {
            overlay.push(["Custom", {
                create: function () {
                    return $(`<div style='height: ${edgeWidth}px;
                                width: ${edgeWidth}px;
                                margin-left: ${getMargin(position, 'left', edgeWidth)}px;
                                margin-top: ${getMargin(position, 'top', edgeWidth)}px;
                                border-radius: 50%;
                                background: ${edge_color}'/>`);
                },
                location: 0,
                direction: -1,
                fill: edge_color,
                width: edgeWidth,
                length: edgeWidth
            }])
        } else {
            const arrow = getArrow(edge_begin_arrow);
            overlay.push([arrow, {
                location: 0,
                foldback: edge_begin_arrow === 'edge_arrow_wide' ? 0.1 : 0,
                direction: -1,
                fill: edge_color,
                width: edgeWidth,
                length: edgeWidth
            }])
        }
    }

    if (edge_end_arrow !== 'edge_arrow_none') {
        if (edge_end_arrow === 'edge_arrow_ellipse') {
            overlay.push(["Custom", {
                create: function () {
                    return $(`<div style='height: ${edgeWidth}px;
                                width: ${edgeWidth}px;
                                margin-left: ${-getMargin(position, 'left', edgeWidth)}px;
                                margin-top: ${-getMargin(position, 'top', edgeWidth)}px;
                                border-radius: 50%;
                                background: ${edge_color}'/>`);
                },
                location: 1,
                fill: edge_color,
                width: edgeWidth,
                length: edgeWidth
            }])
        } else {
            const arrow = getArrow(edge_end_arrow);
            overlay.push([arrow, {
                location: 1,
                foldback: edge_end_arrow === 'edge_arrow_wide' ? 0.1 : 0,
                fill: edge_color,
                width: edgeWidth,
                length: edgeWidth
            }])
        }

    }

    return overlay;
}

function getArrow(type) {
    let arrow = '';
    switch (type) {
        case 'edge_arrow_classic':
            arrow = 'Arrow';
            break;
        case 'edge_arrow_wide':
            arrow = 'Arrow';
            break;
        case 'edge_arrow_block':
            arrow = 'PlainArrow';
            break;
        case 'edge_arrow_diamond':
            arrow = 'Diamond';
            break;
        default:
            arrow = 'Arrow';
            break;
    }
    return arrow;
}

function getMargin(position, margin, width) {
    let result = 0;
    switch (position) {
        case 'L':
            if (margin === 'left') result = -width / 2;
            break;
        case 'R':
            if (margin === 'left') result = width / 2;
            break;
        case 'T':
            if (margin === 'top') result = -width / 2;
            break;
        case 'B':
            if (margin === 'top') result = width / 2;
            break;
        default:
            break;
    }
    return result;
}