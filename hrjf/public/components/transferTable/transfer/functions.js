import CONFIG from "./public/config";

import {
    isObj,
    isWrong,
    isTimeType,
    isUndefined,
    undefinedOrfalse,
    typeFormat,
    isBoolean,
    isNumber,
    isBooleanType,
    createScript,
    changeTime,
    isNullOrVoid,
    formatAcuracy,
    isFunction,
    createScripts
} from "./public";
// 页面级别配置项
const _DEFAULT = {
    test_env: false, // node执行环境是否是test
    isMultipleHead: false //是否是多表头
};
// 多表头函数
export function handleMeta(items, meta, moduleId, config, renderItem, model) {
    return items.map(item => {
        if (item.children) {
            _DEFAULT.isMultipleHead = true; //多表头情况
            handleParentMeta.call(this,item);
            return {
                ...item,
                children: handleMeta.call(
                    this,
                    item.children,
                    meta,
                    moduleId,
                    config,
                    renderItem,
                    model
                )
            };
        }
        return handleChildMeta.call(
            this,
            item,
            meta,
            moduleId,
            config,
            renderItem,
            model
        );
    });
}

// 处理子表头
function handleChildMeta(item, meta, moduleId, config, renderItem, model) {
    let {
        attrcode: ICode,
        itemtype: IType,
        required: IReq,
        disabled: metaDisabled,
        label: ILable,
        children: IChildren,
        renderStatus,
        color,
        scale: IScale,
        hyperlinkflag
    } = item;

    const testConfig = _DEFAULT.test_env
        ? { field: ICode, fieldname: ILable }
        : {}; //自动化测试添加字段 当NODE_ENV === ‘test’才添加配置
    let render;
    // 每个column单项的render函数
    if (IType === "customer" && ICode !== "numberindex") {
        render = item.render;
    } else {
        render = (text, record, index) => {
            // 比如操作列不走此分支
            let [values, editItem, value, display, scale, disabled, isEdit] = [
                record.values
            ];
            // 如果有这个键取这个键的value值，否则为null
            value = isObj(values[ICode])
                ? typeFormat(values[ICode].value, IType)
                : null;
            display = isObj(values[ICode]) ? values[ICode].display : null;
            scale = isObj(values[ICode])
                ? !isWrong(values[ICode].scale) && values[ICode].scale != "-1"
                    ? +values[ICode].scale
                    : +IScale || 0
                : +IScale || 0; //最新优化
            disabled = isObj(values[ICode])
                ? values[ICode].disabled || false
                : false; // true为不可编辑
            isEdit = isObj(values[ICode])
                ? values[ICode].isEdit || false
                : false; // true为渲染控件
            // 编辑态meta.status === 'edit' 且  不是label、customer类型  走编辑态   或者switch类型
            if (
                (!CONFIG.noEditType.includes(IType) &&
                    meta.status === "edit") ||
                IType === "switch_browse"
            // || (meta.status === "edit" && IType === "checkbox_switch") ||  改了编辑前就没了，先改回来看看咋办
            // (meta.status === "edit" && IType === "switch")
            ) {
                if (
                    isEdit ||
                    IType === "switch_browse"
                // || IType === "checkbox_switch" || 改了编辑前就没了，先改回来看看咋办
                // IType === "switch"
                ) {
                    return (
                        <div className="edit-table-edit-line">

                        </div>
                    );
                } else {
                    // !isEdit渲染td的文字区域  小铅笔这里有点问题，之后看一下
                    let tableItemValue = handleBrowse(
                        IType,
                        display,
                        value,
                        scale
                    );
                    return (
                        <div
                            style={
                                IType === "number" ? { textAlign: "right" } : {}
                            }
                            onClick={eve => {
                                this.editTable.setClickRowIndex(moduleId, {
                                    record: this.state.table[moduleId].rows[
                                        index
                                        ],
                                    index
                                });
                                const hanlder = () => {
                                    if (
                                        !isObj(
                                            this.state.table[moduleId].rows[
                                                index
                                                ].values[item.attrcode]
                                        )
                                    ) {
                                        this.state.table[moduleId].rows[
                                            index
                                            ].values[item.attrcode] = {};
                                    }
                                    this.state.table[moduleId].rows[
                                        index
                                        ].values[item.attrcode].isEdit = true;
                                    this.setState({ table: this.state.table });
                                };
                                const hanlderBeforeEvent = (
                                    isBoolean,
                                    isContinue,
                                    isPromise
                                ) => {
                                    if (isBoolean && isContinue) {
                                        hanlder();
                                    } else if (!isBoolean) {
                                        const dist = isPromise
                                            ? isContinue
                                            : isContinue();
                                        dist.then(data => {
                                            !!data && hanlder();
                                        });
                                    }
                                };
                                if (
                                    disabled === "off" ||
                                    (!disabled && !metaDisabled)
                                ) {
                                    //如果当前单元格被禁用，就不渲染
                                    if (
                                        config &&
                                        typeof config.onBeforeEvent ===
                                        "function"
                                    ) {
                                        let isContinue = config.onBeforeEvent(
                                            { ...this.props, ...this.output },
                                            moduleId,
                                            item,
                                            index,
                                            values[ICode],
                                            record
                                        );
                                        const type = testType(isContinue);
                                        switch (type) {
                                            // true/flase
                                            case "Boolean":
                                                hanlderBeforeEvent(
                                                    true,
                                                    isContinue
                                                );
                                                break;
                                            // 返回的是async函数
                                            case "AsyncFunction":
                                                hanlderBeforeEvent(
                                                    false,
                                                    isContinue,
                                                    false
                                                );
                                                break;
                                            // 返回的Promise对象
                                            case "Promise":
                                                hanlderBeforeEvent(
                                                    false,
                                                    isContinue,
                                                    true
                                                );
                                                break;
                                            // 取Boolean值
                                            default:
                                                hanlderBeforeEvent(
                                                    true,
                                                    !!isContinue
                                                );
                                                break;
                                        }
                                        // eve.stopPropagation();  业务组需求先注释，有问题再说
                                        return false;
                                    }
                                    hanlder();
                                    // eve.stopPropagation();  业务组需求先注释，有问题再说
                                    return false;
                                }
                            }}
                            className="edit-table-edit-td"
                        >
                            {isWrong(tableItemValue) ? (
                                <span>
                                    {tableItemValue}
                                    &nbsp;
                                    {disabled === "off" ||
                                    (!disabled && !metaDisabled) ? (
                                        <span className="iconfont icon-zhengbiaobianji" />
                                    ) : (
                                        ""
                                    )}
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    );
                }
            } else {
                if (item.render && renderStatus === "browse") {
                    //浏览态，业务组重写render的判断 ，这里只是让他返回展示内容 添加允许重写render的状态判断，业务组需要加renderstatus进行判断
                    return item.render.call(null, text, record, index);
                } else {
                    let tableItemValue = handleBrowse(
                        IType,
                        display,
                        value,
                        scale
                    );
                    return (
                        <div
                            className="edit-table-browse"
                            style={
                                IType === "number" ? { textAlign: "right" } : {}
                            }
                        >

                        </div>
                    );
                }
            }
        };
    }
    let newRender = render; //缓存render，防止递归造成栈溢出
    render = (text, record, index) => {
        //给每个单元格添加上测试标记，不管什么状态
        return <div {...testConfig}>{newRender(text, record, index)}</div>;
    };
    let title = ((req, dis, color, sta) => {
        // req为true为必输  dis为false为可编辑
        return (
            <div
                className="edit-table-title-required"
                style={
                    IType === "number"
                        ? { textAlign: "right", marginRight: "20%", color }
                        : { color }
                }
            >
                {req && sta && <span className="mark-required">*</span>}
                {item.label}
                {/* 去掉表头的小铅笔 */}
                {/* {!dis &&
                        IType !== "switch_browse" &&
                        IType !== "customer" &&
                        meta &&
                        meta.status === "edit" && (
                            <span
                                className="iconfont icon-bianji"
                                style={{ fontWeight: "normal" }}
                            />
                        )} */}
            </div>
        );
    })(IReq, metaDisabled, color, meta.status === "edit");
    item.title = <div {...testConfig}>{title}</div>;
    item.key = ICode;

    //添加默认宽度datetimepicker
    if (isWrong(item.width)) {
        if (item.itemtype === "datetimepicker") {
            item.width = "240px";
        } else if (item.itemtype === "rangepicker") {
            item.width = "390px";
        } else if (CONFIG.timeTypes.includes(item.itemtype)) {
            item.width = "160px";
        } else {
            item.width = "120px";
        }
    }
    return { ...item, render };
}

// 处理父表头 修改meta
function handleParentMeta(item) {
    item.title = item.label;
    item.key = item.attrcode;
    item.className = "parent-column";
    return item;
}

/**
 * 浏览态渲染函数
 * @param {*} IType
 * @param {*} display
 * @param {*} value
 */
function handleBrowse(IType, display, value, scale) {
    switch (true) {
        case isBoolean(IType):
            return !!value ? this.state.json['jf6005-000000'] : this.state.json['jf6005-000001'];/* 国际化处理： 是,否*/
        case isTimeType(IType):
            if (IType === "datetimepicker") {
                //时间这里先这样判断，有好方法再说
                return changeTime(value, "YYYY-MM-DD HH:mm:ss");
            } else if (IType === "timepicker") {
                return value;
            } else {
                return changeTime(value);
            }
        case IType === "number":
            return formatAcuracy(value, scale);
        default:
            return isNullOrVoid(display) ? value : display;
    }
}

// 编辑态的条目
function createEditableItem({
                                moduleId,
                                config = {},
                                type = "line",
                                renderItem = {},
                                item = {},
                                index = 1,
                                value = null,
                                scale,
                                disabled = false,
                                record,
                                model = "origin",
                                status = false
                            }) {
    let _this = this;
    record = Object.keys(record).length
        ? record
        : {
            rowid: null,
            status: "0",
            values: {}
        };
    return renderTableItem.call(
        _this,
        moduleId,
        config,
        type,
        record,
        item,
        index,
        value,
        scale,
        disabled,
        renderItem,
        model,
        status
    );
}

function _renderTableItemByType(
    moduleId,
    record,
    item,
    value,
    scale,
    disabled,
    renderItem,
    model,
    status,
    index
) {
    let editItem = null;
    let { renderStatus = "edit" } = item;
    if (item.render && renderStatus === "edit") {
        //添加判断允许重写render的表格状态，renderstatus
        editItem = item.render.call(
            null,
            value ? value.display || value.value : "",
            record,
            index
        );
    } else if (
        renderItem.table &&
        renderItem.table[moduleId] &&
        renderItem.table[moduleId][item.attrcode]
    ) {
        editItem = renderItem.table[moduleId][item.attrcode];
    }
    // else if (item.refcode) {
    //    createScript.call(this, "table", moduleId, item.attrcode, item.refcode);
    // }
    else {
        switch (item.itemtype) {
            case "input":
                editItem = <FormControl autoFocus={true} />;
                break;
            case "label":
                editItem = <FormControl autoFocus={true} isViewMode />;
                break;
            case "number":
                scale =
                    isWrong(scale) || scale == "-1" ? +item.scale || 0 : scale;
                editItem = <NCNumber autoFocus={true} />;
                break;
            case "textarea":
                editItem = <NCTextArea autoFocus={true} />;
                break;
            case "datepicker":
                editItem = (
                    <NCTZDatePickClientHourTime
                        autofocus={true}
                        tableOpen={true}
                        format="YYYY-MM-DD"
                        locale={zhCN}
                        placeholder={item.placeholder || ""}
                    />
                );
                break;
            case "NCTZDatePickerStart":
                editItem = (
                    <NCTZDatePickerStart
                        tableOpen={true}
                        placeholder={item.placeholder || ""}
                    />
                );
                break;
            case "datetimepicker":
                editItem = (
                    <NCTZDatePickClientTime
                        tableOpen={true}
                        placeholder={item.placeholder || ""}
                    />
                );
                break;
            case "NCTZDatePickerEnd":
                editItem = (
                    <NCTZDatePickerEnd
                        tableOpen={true}
                        placeholder={item.placeholder || ""}
                    />
                );
                break;
            case "rangepicker":
                editItem = (
                    <NCRangePickerClient
                        tableOpen={true}
                        placeholder={item.placeholder || ""}
                    />
                );
                break;
            case "datePickerNoTimeZone":
                editItem = (
                    <NCDatePicker
                        tableOpen={true}
                        placeholder={item.placeholder || ""}
                    />
                );
                break;
            case "timepicker":
                value = record.values[item.attrcode].value
                    ? moment(record.values[item.attrcode].value, "hh:mm:ss")
                    : null;
                editItem = (
                    <NCTimepicker
                        tableOpen={true}
                        placeholder={item.placeholder || ""}
                        format={"HH:mm:ss"}
                    />
                );
                break;
            case "select":
                let fixed =
                    model == "open"
                        ? {
                            getPopupContainer: () =>
                                document.querySelector("#tableModal")
                        }
                        : {};
                // : {
                //       getPopupContainer: () =>
                //           this.primordialTable[moduleId].querySelector(
                //               ".u-table-body"
                //           )
                //   };
                editItem = (
                    <Select
                        {...fixed}
                        // autofocus
                        dropdownClassName={
                            NODE_ENV === "test" &&
                            item.attrcode + "-" + "select"
                        }
                    >
                        {item.options.length &&
                        item.options.map((one, i) => (
                            <Option key={i} value={String(one.value)}>
                                {` ${one.display} `}
                            </Option>
                        ))}
                    </Select>
                );
                break;
            case "radio":
                // 需要value
                editItem = (
                    <RadioGroup selectedValue={String(value)}>
                        {item.options.map((e, i) => {
                            return (
                                <Radio key={i} value={String(e.value)}>
                                    {e.display}
                                </Radio>
                            );
                        })}
                    </RadioGroup>
                );
                break;
            case "switch":
                // 需要value
                editItem = <Switch checked={!!value} />;
                break;
            case "checkbox":
                value = String(value);
                editItem = (
                    <span>
                        {item.options.map((item, i) => {
                            return (
                                <Checkbox colors="dark" checked={false} key={i}>
                                    {item.display}
                                </Checkbox>
                            );
                        })}
                    </span>
                );
                break;
            case "checkbox_switch":
                editItem = (
                    <Checkbox colors="dark" checked={!!value} type="switch" />
                );
                break;
            case "switch_browse": // TODO
                disabled = status ? "on" : disabled === "on" ? "on" : "off";
                editItem = (
                    <NCPopconfirmSwitch checked={!!value} showTip={false} />
                );
                break;
            case "password": //密码输入框
                editItem = <FormControl type="password" />;
                break;
            case "residtxt": //多语文本先写上
                editItem = <FormControl autoFocus={true} />;
                break;
            // default:
            //     editItem = null;
            //     break;
        }
    }

    switch (item.itemtype) {
        case "select":
            value = String(value);
            break;
        case "refer":
            value = record.values[item.attrcode];
            break;
        default:
            break;
    }

    return {
        editItem,
        value,
        scale,
        isdisabled: disabled
    };
}

function renderTableItem(
    moduleId,
    config,
    type,
    record,
    item,
    index,
    value,
    scale,
    disabled,
    renderItem,
    model,
    status
) {
    let {
        editItem,
        isdisabled,
        value: valueData,
        scale: scaleData
    } = _renderTableItemByType.call(
        this,
        moduleId,
        record,
        item,
        value,
        scale,
        disabled,
        renderItem,
        model,
        status,
        index
    );
    if (!editItem) return <div />;
    let showDisable = (disabled => {
        switch (disabled) {
            case false:
                return !undefinedOrfalse(item.disabled);
            case "on":
                return true;
            case "off":
                return false;
            default:
                return false;
        }
    })(isdisabled);
    let [isInputType, unInputType, isLineStatus, changedrows] =
        //用于 onblur 和onchange常量
        [
            CONFIG.blurTypes.includes(item.itemtype),
            CONFIG.changeTypes.includes(item.itemtype),
            type === "line",
            []
        ];
    /**侧拉框不自动获取焦点 */
    const focus = type === "modal" || item.itemtype === "select" ? false : true;
    // const container =
    //     item.itemtype === "refer"
    //         ? this.primordialTable[moduleId].querySelector(".u-table-body")
    //         : null;
    return (
        <Item
            content={{
                ...editItem,
                props: {
                    ...editItem.props,
                    ...item,
                    scale: scaleData, //number的精度 这里是判断了模版和传入的之后的结果
                    value: valueData, //给其他组件设置value
                    foolValue: valueData, //给参照设置的value
                    autoFocus: focus, //当打开侧拉框的时候不获取焦点判断
                    autofocus: focus, //当打开侧拉框的时候不获取焦点判断
                    title: "", //将列的title替换掉，避免出现不必要的值，如果有bug在改zhanghengh
                    disabled: showDisable, // 如果没有disabled或者false 看成false
                    maxLength: item.maxlength, //优化收到跳过number组件错误,覆盖上面的item.maxlength,
                    maxlength: null, //容number组件内部的错误
                    // container: container, //兼容参照定位
                    onChange: (valueChange, foolValue) => {
                        // 用于侧拉框状态下执行编辑前 start
                        if (
                            !isLineStatus &&
                            CONFIG.beforeChangeTypes.includes(item.itemtype)
                        ) {
                            //如果当前单元格被禁用，就不渲染
                            if (
                                config &&
                                typeof config.onBeforeEvent == "function"
                            ) {
                                let isContinue = config.onBeforeEvent(
                                    { ...this.props, ...this.output },
                                    moduleId,
                                    item,
                                    index,
                                    this.state.table[moduleId].rows[index]
                                        .values[item.attrcode],
                                    record
                                );

                                //用于处理侧拉框编辑前所要执行的函数
                                const modelHanlder = falg => {
                                    if (
                                        !isObj(
                                            this.state.table[moduleId].rows[
                                                index
                                                ].values[item.attrcode]
                                        ) &&
                                        !flag
                                    ) {
                                        this.state.table[moduleId].rows[
                                            index
                                            ].values[item.attrcode] = {};
                                    }
                                    if (!falg) {
                                        this.state.table[moduleId].rows[
                                            index
                                            ].values[item.attrcode].disabled = "on";
                                    }
                                    !flag &&
                                    this.setState({
                                        table: this.state.table
                                    });
                                };
                                const type = testType(isContinue);
                                switch (type) {
                                    // true/flase
                                    case "Boolean":
                                        hanlderModelBeforeEvent(
                                            true,
                                            isContinue,
                                            null,
                                            modelHanlder
                                        );
                                        break;
                                    // 返回的是async函数
                                    case "AsyncFunction":
                                        hanlderModelBeforeEvent(
                                            false,
                                            isContinue,
                                            false,
                                            modelHanlder
                                        );
                                        break;
                                    // 返回的Promise对象
                                    case "Promise":
                                        hanlderModelBeforeEvent(
                                            false,
                                            isContinue,
                                            true,
                                            modelHanlder
                                        );
                                        break;
                                    // 取Boolean值
                                    default:
                                        hanlderModelBeforeEvent(
                                            true,
                                            !!isContinue,
                                            null,
                                            modelHanlder
                                        );
                                        break;
                                }

                                // 编辑前返回false直接return，这样才不影响逻辑
                                if (!isContinue) {
                                    return;
                                }
                            }
                        }
                        // 用于侧拉框状态下执行编辑前 end

                        // 判断是否为多选参照start
                        let isMul;
                        editItem.props.hasOwnProperty(
                            "isMultiSelectedEnabled"
                        ) && (isMul = editItem.props.isMultiSelectedEnabled);
                        item.hasOwnProperty("isMultiSelectedEnabled") &&
                        (isMul = item.isMultiSelectedEnabled);
                        let _getValue = function(init) {
                            return isObj(init) ? init.refpk : init;
                        };
                        // 判断是否为多选参照end

                        let attr = isObj(
                            this.state.table[moduleId].rows[index].values[
                                item.attrcode
                                ]
                        );
                        if (!attr) {
                            // 因为有些字段为空值，后台默认为过滤去了
                            this.state.table[moduleId].rows[index].values[
                                item.attrcode
                                ] = {};
                            if (model == "open") {
                                this.state.tableModeldata[moduleId].values[
                                    item.attrcode
                                    ] = {};
                            } else {
                                this.state.table[moduleId].rows[index].values[
                                    item.attrcode
                                    ] = {};
                            }
                        }

                        // 因为timepicker的value特殊，所以特殊转换一下start，有问题在看一下
                        if (item.itemtype === "timepicker") {
                            if (valueChange && valueChange.format) {
                                valueChange = valueChange.format("hh:mm:ss");
                            }
                        }
                        // 因为timepicker的value特殊，所以特殊转换一下end

                        // 处理单元格变化的数据zhnghengh
                        let theValue = handleChangeData(
                            item.itemtype === "refer",
                            foolValue,
                            valueChange,
                            item
                        );
                        this.batchData[moduleId] = {
                            //在onchange时缓存列数据的key 和value  用于批量更改   zhanghengh 18/6/29
                            batchChangeIndex: index,
                            batchChangeKey: item.attrcode,
                            batchChangeValue: isMul ? theValue : theValue.value,
                            batchChangeDisplay: isMul ? null : theValue.display
                        };
                        if (model == "open") {
                            Object.assign(
                                this.state.tableModeldata[moduleId].values[
                                    item.attrcode
                                    ],
                                theValue
                            );
                        } else {
                            Object.assign(
                                this.state.table[moduleId].rows[index].values[
                                    item.attrcode
                                    ],
                                theValue
                            );
                        }

                        // 把status置为1，标识修改     状态不为1的不动 (比如用户自己set但是状态为2的)
                        if (
                            this.state.table[moduleId].rows[index].status == "0"
                        ) {
                            this.state.table[moduleId].rows[index].status = "1";
                        }
                        this.setState({ table: this.state.table });
                        if (unInputType) {
                            let initVal = this.editTableInitValue[
                                `${index}**${item.attrcode}`
                                ];
                            let isRefpk = _getValue(initVal);
                            //let isContinueAfterEvent = true;
                            if (isMul) {
                                //判断新值和旧值是否相等，进而判断是否执行编辑后 TODO多选参照先不做这个
                                // if (_getValue(valueChange[0]) === isRefpk) {
                                //     isContinueAfterEvent = false;
                                // }
                                if (valueChange.length > 0) {
                                    valueChange.forEach((one, ind) => {
                                        changedrows.push({
                                            rowid: record.rowid,
                                            newvalue: {
                                                value: _getValue(one)
                                            },
                                            oldvalue: {
                                                value: ind <= 0 ? isRefpk : null
                                            }
                                        });
                                    });
                                } else {
                                    changedrows.push({
                                        rowid: record.rowid,
                                        newvalue: {
                                            value: null
                                        },
                                        oldvalue: {
                                            value: isRefpk
                                        }
                                    });
                                }
                            } else {
                                //判断新值和旧值是否相等，进而判断是否执行编辑后
                                // if (
                                //     item.itemtype == "refer" &&
                                //     foolValue.value === initVal
                                // ) {
                                //     isContinueAfterEvent = false;
                                // } else if (
                                //     item.itemtype !== "refer" &&
                                //     valueChange === initVal
                                // ) {
                                //     isContinueAfterEvent = false;
                                // }

                                changedrows.push({
                                    rowid: record.rowid,
                                    newvalue: {
                                        value:
                                            item.itemtype == "refer"
                                                ? foolValue.value == ""
                                                ? null
                                                : foolValue.value
                                                : valueChange
                                    },
                                    oldvalue: {
                                        value: initVal
                                    }
                                });
                            }

                            this.relationItems = this.getrelationItems(
                                this.state.meta[moduleId].items
                            );
                            if (
                                this.relationItems &&
                                this.relationItems.includes(item.attrcode)
                            //&&  ((!!changedrows.newvalue.value)!=(!!changedrows.oldvalue.value))
                            ) {
                                this.handleRelationItems({
                                    type: "table",
                                    areaCode: moduleId,
                                    key: item.attrcode,
                                    changedrows: changedrows,
                                    index: index,
                                    callback: () => {
                                        config &&
                                        typeof config.onAfterEvent ==
                                        "function" &&
                                        config.onAfterEvent(
                                            {
                                                ...this.props,
                                                ...this.output
                                            },
                                            moduleId,
                                            item.attrcode,
                                            valueChange,
                                            changedrows,
                                            index,
                                            record,
                                            type,
                                            "change"
                                        );
                                    }
                                });
                            } else {
                                config &&
                                typeof config.onAfterEvent == "function" &&
                                config.onAfterEvent(
                                    { ...this.props, ...this.output },
                                    moduleId,
                                    item.attrcode,
                                    valueChange,
                                    changedrows,
                                    index,
                                    record,
                                    type,
                                    "change"
                                );
                            }
                            //存旧值
                            this.editTableInitValue[
                                `${index}**${item.attrcode}`
                                ] = isMul
                                ? valueChange.length > 0
                                    ? valueChange[0]
                                    : null
                                : item.itemtype === "refer"
                                    ? foolValue.vlaue == ""
                                        ? null
                                        : foolValue.vlaue
                                    : valueChange;
                        }
                    },
                    onFocus: () => {
                        // 用于侧拉框状态下执行编辑前 start
                        if (
                            !isLineStatus &&
                            CONFIG.beforeFocusTypes.includes(item.itemtype)
                        ) {
                            // 如果当前单元格被禁用，就不渲染
                            if (
                                config &&
                                typeof config.onBeforeEvent == "function"
                            ) {
                                let isContinue = config.onBeforeEvent(
                                    { ...this.props, ...this.output },
                                    moduleId,
                                    item,
                                    index,
                                    this.state.table[moduleId].rows[index]
                                        .values[item.attrcode],
                                    record
                                );

                                // 用于处理侧拉框编辑前所要执行的函数
                                const modelHanlder = falg => {
                                    if (
                                        !isObj(
                                            this.state.table[moduleId].rows[
                                                index
                                                ].values[item.attrcode]
                                        ) &&
                                        !flag
                                    ) {
                                        this.state.table[moduleId].rows[
                                            index
                                            ].values[item.attrcode] = {};
                                    }
                                    if (!falg) {
                                        this.state.table[moduleId].rows[
                                            index
                                            ].values[item.attrcode].disabled = "on";
                                    }
                                    !flag &&
                                    this.setState({
                                        table: this.state.table
                                    });
                                };
                                const type = testType(isContinue);
                                switch (type) {
                                    // true/flase
                                    case "Boolean":
                                        hanlderModelBeforeEvent(
                                            true,
                                            isContinue,
                                            null,
                                            modelHanlder
                                        );
                                        break;
                                    // 返回的是async函数
                                    case "AsyncFunction":
                                        hanlderModelBeforeEvent(
                                            false,
                                            isContinue,
                                            false,
                                            modelHanlder
                                        );
                                        break;
                                    // 返回的Promise对象
                                    case "Promise":
                                        hanlderModelBeforeEvent(
                                            false,
                                            isContinue,
                                            true,
                                            modelHanlder
                                        );
                                        break;
                                    // 取Boolean值
                                    default:
                                        hanlderModelBeforeEvent(
                                            true,
                                            !!isContinue,
                                            null,
                                            modelHanlder
                                        );
                                        break;
                                }
                            }
                        }

                        //onFocus 和value  用于批量更改   zhanghengh 18/6/29 先注释，以后可能有用
                        this.batchData[moduleId] = {
                            batchChangeIndex: index,
                            batchChangeKey: item.attrcode,
                            batchChangeValue: this.state.table[moduleId].rows[
                                index
                                ].values[item.attrcode].value,
                            batchChangeDisplay: this.state.table[moduleId].rows[
                                index
                                ].values[item.attrcode].display
                        };

                        //为了兼容refer，否则报错
                        return new Promise(resolve => {
                            resolve(true);
                        });
                    },
                    onBlur: val => {
                        /*
                         * onBlur编辑后 和 切换控件状态
                         * 1、input类型    line   编辑后 + 切状态
                         *                model  编辑后
                         * 2、uninput类型  line   切状态
                         *                model  无编辑后  无切状态
                         */
                        if (isInputType) {
                            if (isLineStatus) {
                                this.state.table[moduleId].rows[index].values[
                                    item.attrcode
                                    ].isEdit = false;
                            }

                            //判断新值和旧值是否相等，进而判断是否执行编辑后
                            // let isContinueAfterEvent = true;
                            // if (
                            //     val ===
                            //     this.editTableInitValue[
                            //         `${index}**${item.attrcode}`
                            //     ]
                            // ) {
                            //     isContinueAfterEvent = false;
                            // }

                            changedrows.push({
                                rowid: record.rowid,
                                newvalue: {
                                    value: val
                                },
                                oldvalue: {
                                    value: this.editTableInitValue[
                                        `${index}**${item.attrcode}`
                                        ]
                                }
                            });

                            this.editTableInitValue[
                                `${index}**${item.attrcode}`
                                ] = val;

                            this.relationItems = this.getrelationItems(
                                this.state.meta[moduleId].items
                            );
                            if (
                                this.relationItems &&
                                this.relationItems.includes(item.attrcode)
                            //isContinueAfterEvent
                            ) {
                                this.handleRelationItems({
                                    type: "table",
                                    areaCode: moduleId,
                                    key: item.attrcode,
                                    changedrows: changedrows,
                                    index: index,
                                    callback: () => {
                                        config &&
                                        typeof config.onAfterEvent ==
                                        "function" &&
                                        config.onAfterEvent(
                                            {
                                                ...this.props,
                                                ...this.output
                                            },
                                            moduleId,
                                            item.attrcode,
                                            val,
                                            changedrows,
                                            index,
                                            record,
                                            type,
                                            "blur"
                                        );
                                    }
                                });
                            } else {
                                config &&
                                typeof config.onAfterEvent == "function" &&
                                config.onAfterEvent(
                                    { ...this.props, ...this.output },
                                    moduleId,
                                    item.attrcode,
                                    val,
                                    changedrows,
                                    index,
                                    record,
                                    type,
                                    "blur"
                                );
                            }
                        } else {
                            if (isLineStatus) {
                                this.state.table[moduleId].rows[index].values[
                                    item.attrcode
                                    ].isEdit = false;
                            }
                        }

                        //在onblur时缓存列数据的key 和value  用于批量更改   zhanghengh 18/6/29
                        this.batchData[moduleId] = {
                            batchChangeIndex: index,
                            batchChangeKey: item.attrcode,
                            batchChangeValue: this.state.table[moduleId].rows[
                                index
                                ].values[item.attrcode].value,
                            batchChangeDisplay: this.state.table[moduleId].rows[
                                index
                                ].values[item.attrcode].display
                        };
                        let isSwitch_browseDisabled =
                            item.itemtype === "switch_browse" && showDisable; // 开关且不可编辑
                        let allRows = this.editTable.getNumberOfRows(moduleId);
                        /*
				 * 增一行的条件：
				 * 1、最后一行
				 * 2、isAddRow 为true
				 * 3、当前单元格值不为空
				 */

                        if (
                            allRows == index + 1 &&
                            config &&
                            !!config.isAddRow &&
                            !isSwitch_browseDisabled &&
                            !isWrong(val)
                        ) {
                            //添加自动增行后的回调
                            const callback =
                                isFunction(config.addRowCallback) || undefined;
                            this.editTable.addRow(
                                moduleId,
                                undefined,
                                false,
                                null,
                                callback
                            );
                        } else {
                            // 为了保证不是最后一行 渲染浏览态
                            this.setState({ table: this.state.table });
                        }
                    }
                }
            }}
        />
    );
}
