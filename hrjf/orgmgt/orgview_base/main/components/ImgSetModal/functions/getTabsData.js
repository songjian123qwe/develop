export default function getTabsData() {
    const {
        base_maxnodes, base_showlevel, base_orientation, base_propname, base_displaycode,
        base_displaybudget, base_displayactualbudget, base_displaydm, base_displaydmpost,
        base_displaydmphoto, common_width, common_height, common_bordercolor, common_shape,
        common_bordertype, group_backgroundcolor, org_backgroundcolor, dept_backgroundcolor,
        virtualDept_backgroundcolor,
        post_backgroundcolor, custom_backgroundcolor, edge_color, edge_width, edge_begin_arrow,
        edge_end_arrow, edge_shape, common_font_color, common_font
    } = this.state;

    const {json} = this.props;

    return [{
        title: json['jf6005-000428'], /* 国际化处理： 生成选项*/
        key: 'generate',
        forms: [
            {
                title: json['jf6005-000428'], /* 国际化处理： 生成选项*/
                items: [{
                    type: 'numberInput',
                    value: base_maxnodes,
                    min: 1,
                    max: 1000000,
                    onChange: (value) => {
                        this.itemChange('base_maxnodes', value)
                    },
                    name: json['jf6005-000429']/* 国际化处理： 最大节点数*/
                }, {
                    type: 'numberInput',
                    value: base_showlevel,
                    min: 1,
                    max: 10,
                    onChange: (value) => {
                        this.itemChange('base_showlevel', value)
                    },
                    name: json['jf6005-000430']/* 国际化处理： 初始展开层数*/
                }]
            }, {
                title: json['jf6005-000431'], /* 国际化处理： 方向*/
                items: [{
                    type: 'radio',
                    value: base_orientation,
                    onChange: (value) => {
                        this.itemChange('base_orientation', value)
                    },
                    options: [{
                        value: 'hor',
                        display: json['jf6005-000432']/* 国际化处理： 水平*/
                    }, {
                        value: 'ver',
                        display: json['jf6005-000433']/* 国际化处理： 垂直*/
                    }],
                    name: json['jf6005-000431']/* 国际化处理： 方向*/
                }]
            }]
    }, {
        title: json['jf6005-000434'], /* 国际化处理： 显示选项*/
        key: 'display',
        forms: [
            {
                title: json['jf6005-000435'], /* 国际化处理： 通用*/
                items: [{
                    type: 'checkbox',
                    options: [{
                        value: base_propname,
                        onChange: (value) => {
                            this.itemChange('base_propname', value ? 'Y' : 'N')
                        },
                        display: json['jf6005-000436']/* 国际化处理： 属性名称*/
                    }, {
                        value: base_displaycode,
                        onChange: (value) => {
                            this.itemChange('base_displaycode', value ? 'Y' : 'N')
                        },
                        display: json['jf6005-000403']/* 国际化处理： 节点编码*/
                    }],
                    width: '100%'
                }]
            }, {
                title: json['jf6005-000437'], /* 国际化处理： 编制*/
                items: [{
                    type: 'checkbox',
                    options: [{
                        value: base_displaybudget,
                        onChange: (value) => {
                            this.itemChange('base_displaybudget', value ? 'Y' : 'N')
                        },
                        display: json['jf6005-000438']/* 国际化处理： 编制人数*/
                    }, {
                        value: base_displayactualbudget,
                        onChange: (value) => {
                            this.itemChange('base_displayactualbudget', value ? 'Y' : 'N')
                        },
                        display: json['jf6005-000439']/* 国际化处理： 实际编制*/
                    }],
                    width: '100%'
                }]
            }, {
                title: json['jf6005-000378'], /* 国际化处理： 部门,部门*/
                items: [{
                    type: 'checkbox',
                    options: [{
                        value: base_displaydm,
                        onChange: (value) => {
                            this.itemChange('base_displaydm', value ? 'Y' : 'N')
                        },
                        display: json['jf6005-000440']/* 国际化处理： 部门负责人信息*/
                    }],
                    width: '100%'
                }, {
                    type: 'checkbox',
                    options: [{
                        value: base_displaydmpost,
                        onChange: (value) => {
                            this.itemChange('base_displaydmpost', value ? 'Y' : 'N')
                        },
                        disabled: base_displaydm !== 'Y',
                        display: json['jf6005-000441']/* 国际化处理： 负责人所在岗位*/
                    }],
                    width: '100%'
                }, {
                    type: 'checkbox',
                    options: [{
                        value: base_displaydmphoto,
                        onChange: (value) => {
                            this.itemChange('base_displaydmphoto', value ? 'Y' : 'N')
                        },
                        disabled: base_displaydm !== 'Y',
                        display: json['jf6005-000442']/* 国际化处理： 照片*/
                    }],
                    width: '100%'
                }]
            }]
    }, {
        title: json['jf6005-000443'], /* 国际化处理： 节点属性*/
        key: 'point',
        forms: [
            {
                title: json['jf6005-000503'], /* 国际化处理： 大小,大小*/
                items: [{
                    type: 'numberInput',
                    value: common_width,
                    min: 1,
                    max: 500,
                    onChange: (value) => {
                        this.itemChange('common_width', value)
                    },
                    name: json['jf6005-000069']/* 国际化处理： 宽度,宽度*/
                }, {
                    type: 'numberInput',
                    value: common_height,
                    min: 1,
                    max: 500,
                    onChange: (value) => {
                        this.itemChange('common_height', value)
                    },
                    name: json['jf6005-000070']/* 国际化处理： 高度,高度*/
                }]
            }, {
                title: json['jf6005-000444'], /* 国际化处理： 边框*/
                items: [
                    {
                        type: 'colorInput',
                        json: json,
                        value: common_bordercolor,
                        onChange: (value) => {
                            this.itemChange('common_bordercolor', value)
                        },
                        name: json['jf6005-000445']/* 国际化处理： 边框颜色*/
                    }, {
                        name: json['jf6005-000446'], /* 国际化处理： 边框类型*/
                        type: 'select',
                        value: common_shape,
                        onChange: (value) => {
                            this.itemChange('common_shape', value)
                        },
                        options: [{
                            value: 'arc',
                            display: json['jf6005-000447']/* 国际化处理： 圆角*/
                        }, {
                            value: 'rec',
                            display: json['jf6005-000448']/* 国际化处理： 直角*/
                        }]
                    }, {
                        name: json['jf6005-000449'], /* 国际化处理： 显示效果*/
                        type: 'select',
                        value: common_bordertype,
                        onChange: (value) => {
                            this.itemChange('common_bordertype', value)
                        },
                        options: [{
                            value: 'normal',
                            display: json['jf6005-000450']/* 国际化处理： 普通*/
                        }, {
                            value: 'shadow',
                            display: json['jf6005-000451']/* 国际化处理： 阴影*/
                        }]
                    }]
            }, {
                title: json['jf6005-000452'], /* 国际化处理： 节点背景颜色*/
                items: [
                    {
                        type: 'colorInput',
                        json: json,
                        value: group_backgroundcolor,
                        onChange: (value) => {
                            this.itemChange('group_backgroundcolor', value)
                        },
                        name: json['jf6005-000453']/* 国际化处理： 集团背景色*/
                    }, {
                        json: json,
                        type: 'colorInput',
                        value: org_backgroundcolor,
                        onChange: (value) => {
                            this.itemChange('org_backgroundcolor', value)
                        },
                        name: json['jf6005-000454']/* 国际化处理： 业务单元背景色*/
                    }, {
                        json: json,
                        type: 'colorInput',
                        value: dept_backgroundcolor,
                        onChange: (value) => {
                            this.itemChange('dept_backgroundcolor', value)
                        },
                        name: json['jf6005-000455']/* 国际化处理： 部门背景色*/
                    }, {
                        json: json,
                        type: 'colorInput',
                        value: virtualDept_backgroundcolor,
                        onChange: (value) => {
                            this.itemChange('virtualDept_backgroundcolor', value)
                        },
                        name: json['jf6005-000518']
                    }, {
                        json: json,
                        type: 'colorInput',
                        value: post_backgroundcolor,
                        onChange: (value) => {
                            this.itemChange('post_backgroundcolor', value)
                        },
                        name: json['jf6005-000456']/* 国际化处理： 岗位背景色*/
                    }, {
                        json: json,
                        type: 'colorInput',
                        value: custom_backgroundcolor,
                        onChange: (value) => {
                            this.itemChange('custom_backgroundcolor', value)
                        },
                        name: json['jf6005-000457']/* 国际化处理： 自定义节点背景色*/
                    }]
            }, {
                title: json['jf6005-000421'], /* 国际化处理： 字体*/
                items: [
                    {
                        type: 'fontPicker',
                        familyList: this.familyList,
                        json: json,
                        value: {
                            common_font,
                            common_font_color,
                        },
                        onChange: (value) => {
                            this.fontChange(value)
                        }
                    }]
            }]
    }, {
        title: json['jf6005-000458'], /* 国际化处理： 连线属性*/
        key: 'line',
        forms: [
            {
                title: json['jf6005-000459'], /* 国际化处理： 颜色和宽度*/
                items: [{
                    type: 'colorInput',
                    value: edge_color,
                    json: json,
                    onChange: (value) => {
                        this.itemChange('edge_color', value)
                    },
                    name: json['jf6005-000425']/* 国际化处理： 颜色*/
                }, {
                    type: 'numberInput',
                    value: edge_width,
                    min: 1,
                    max: 5,
                    onChange: (value) => {
                        this.itemChange('edge_width', value)
                    },
                    name: json['jf6005-000069']/* 国际化处理： 宽度,宽度*/
                }]
            }, {
                title: json['jf6005-000460'], /* 国际化处理： 终端形状*/
                items: [{
                    name: json['jf6005-000461'], /* 国际化处理： 起始端形状*/
                    type: 'select',
                    value: edge_begin_arrow,
                    onChange: (value) => {
                        this.itemChange('edge_begin_arrow', value)
                    },
                    options: [{
                        value: 'edge_arrow_none',
                        display: json['jf6005-000462']/* 国际化处理： 无形状*/
                    }, {
                        value: 'edge_arrow_classic',
                        display: json['jf6005-000463']/* 国际化处理： 经典箭头*/
                    }, {
                        value: 'edge_arrow_wide',
                        display: json['jf6005-000464']/* 国际化处理： 广口箭头*/
                    }, {
                        value: 'edge_arrow_block',
                        display: json['jf6005-000465']/* 国际化处理： 块状箭头*/
                    }, {
                        value: 'edge_arrow_diamond',
                        display: json['jf6005-000466']/* 国际化处理： 菱形*/
                    }, {
                        value: 'edge_arrow_ellipse',
                        display: json['jf6005-000467']/* 国际化处理： 椭圆形*/
                    }]
                }, {
                    name: json['jf6005-000468'], /* 国际化处理： 结束端形状*/
                    type: 'select',
                    value: edge_end_arrow,
                    onChange: (value) => {
                        this.itemChange('edge_end_arrow', value)
                    },
                    options: [{
                        value: 'edge_arrow_none',
                        display: json['jf6005-000462']/* 国际化处理： 无形状*/
                    }, {
                        value: 'edge_arrow_classic',
                        display: json['jf6005-000463']/* 国际化处理： 经典箭头*/
                    }, {
                        value: 'edge_arrow_wide',
                        display: json['jf6005-000464']/* 国际化处理： 广口箭头*/
                    }, {
                        value: 'edge_arrow_block',
                        display: json['jf6005-000465']/* 国际化处理： 块状箭头*/
                    }, {
                        value: 'edge_arrow_diamond',
                        display: json['jf6005-000466']/* 国际化处理： 菱形*/
                    }, {
                        value: 'edge_arrow_ellipse',
                        display: json['jf6005-000467']/* 国际化处理： 椭圆形*/
                    }]
                }]
            }, {
                title: json['jf6005-000469'], /* 国际化处理： 连接线类型*/
                items: [{
                    name: json['jf6005-000446'], /* 国际化处理： 边框类型*/
                    type: 'select',
                    value: edge_shape,
                    onChange: (value) => {
                        this.itemChange('edge_shape', value)
                    },
                    options: [{
                        value: 'rec',
                        display: json['jf6005-000448']/* 国际化处理： 直角*/
                    }, {
                        value: 'arc',
                        display: json['jf6005-000447']/* 国际化处理： 圆角*/
                    }]
                }]
            }]
    }];
    /*if (!baseInfo.qryDate || (!isAfterBase && page === 'main')) {
        tabsData[1].forms.push(
            {
                title: json['jf6005-000437'], /!* 国际化处理： 编制*!/
                items: [{
                    type: 'checkbox',
                    options: [{
                        value: base_displaybudget,
                        onChange: (value) => {
                            this.itemChange('base_displaybudget', value ? 'Y' : 'N')
                        },
                        display: json['jf6005-000438']/!* 国际化处理： 编制人数*!/
                    }, {
                        value: base_displayactualbudget,
                        onChange: (value) => {
                            this.itemChange('base_displayactualbudget', value ? 'Y' : 'N')
                        },
                        display: json['jf6005-000439']/!* 国际化处理： 实际编制*!/
                    }],
                    width: '100%'
                }]
            }
        );
        tabsData[1].forms.push({
            title: json['jf6005-000378'], /!* 国际化处理： 部门,部门*!/
            items: [{
                type: 'checkbox',
                options: [{
                    value: base_displaydm,
                    onChange: (value) => {
                        this.itemChange('base_displaydm', value ? 'Y' : 'N')
                    },
                    display: json['jf6005-000440']/!* 国际化处理： 部门负责人信息*!/
                }],
                width: '100%'
            }, {
                type: 'checkbox',
                options: [{
                    value: base_displaydmpost,
                    onChange: (value) => {
                        this.itemChange('base_displaydmpost', value ? 'Y' : 'N')
                    },
                    disabled: base_displaydm !== 'Y',
                    display: json['jf6005-000441']/!* 国际化处理： 负责人所在岗位*!/
                }],
                width: '100%'
            }, {
                type: 'checkbox',
                options: [{
                    value: base_displaydmphoto,
                    onChange: (value) => {
                        this.itemChange('base_displaydmphoto', value ? 'Y' : 'N')
                    },
                    disabled: base_displaydm !== 'Y',
                    display: json['jf6005-000442']/!* 国际化处理： 照片*!/
                }],
                width: '100%'
            }]
        })
    }*/
}
