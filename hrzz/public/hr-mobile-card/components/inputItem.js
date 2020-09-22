import {List, DatePicker, Picker, Switch, Accordion, WhiteSpace, TextareaItem} from 'antd-mobile'
import HrPanel from './common/hrPanel'
import ListWrapper from './common/hrInputItem/wrapper'
import HrInputItem from './common/hrInputItem'
import HrNumberItem from './common/hrNumber'
import {isT} from '../utils'
import HrRefer from "./common/hrRefer";
import HRInput from './common/hrInputItem/hr_input'
import {langCheck} from "src/hrzz/public/mobile/utils/utils";
import AddrRefer from "./common/addrRefer";
import HRTextarea from "./common/hrInputItem/hr_textarea";

/**
 * metaOptionsToSelect
 * @param {*} options
 */
const metaOptionsToSelect = (options) => {
    for (let i of options) {
        i.label = i.display
    }
    return options
}
/**
 * createItem
 * @param {*} props
 */
export const createItem = props => {
    let {fieldMeta, onChange, ...other} = props
    let currentKey = props.other.collapsed ? '' : props.other.activeKey || props.code
    let content = []
    fieldMeta.forEach((field, index) => {
        content.push(
            <List className={"my-list" + (props.other.showTableLine ? " table-line" : "")}
                  onClick={props.other.contentClick.bind(this, {field, code: props.code})}>
                {
                    props.items.map(obj => createItemByType(obj, field, onChange, index, currentKey, other))
                }
            </List>
        )
    })
    return (
        <React.Fragment>
            <Accordion defaultActiveKey={currentKey} className="my-accordion" onChange={props.other.panelChange}>
                <HrPanel
                    header={props.name}
                    key={props.code}
                    hideHeader={props.other.hideHeader}
                    headerExtra={props.other.headerExtra}
                    iconClick={props.other.headerClick.bind(this, [props.code])}
                    showArrow={props.other.showArrow}
                    showHasDataIndicator={props.other.showHasDataIndicator}
                >
                    {
                        content
                    }
                </HrPanel>
            </Accordion>
            <WhiteSpace/>
        </React.Fragment>
    )
}
/**
 * createItemByType
 * @param {*} props
 * @param {*} fieldMeta
 * @param {*} onChange
 */
export const createItemByType = (props, fieldMeta, onChange, index, currentKey, extral) => {
    let item, other = extral.other
    let {
        attrcode, visible, itemtype: type, label, disabled, required,
        maxlength: maxLength, options, scale, refcode, pk_defdoclist
    } = props
    if (!attrcode) attrcode = props.code;
    if (!visible) return;
    let field = fieldMeta[attrcode]
    let {hasError: error = true} = field
    /**
     * createConf
     * @param  {} type={}
     */
    const createConf = (type = {}) => {
        const defaultConf = {
            index,
            clear: true,
            disabled,
            required,
            error,
            onErrorClick: other.onErrorClick.bind(this, field, props),
            onBeforeHandle: other.onBeforeHandle.bind(this, attrcode, props),
            labelNumber: 10,
            maxLength: maxLength,
            display: (!!visible ? '' : 'none'),
            editable: other.isEdit,
            isFieldChange: field.isEdit,
            onChange: () => {
            },
            placeholder: disabled || !other.isEdit ? '' : `${langCheck("0000PUB-000282")}${label}`,
            label,
            scale,
            addReferBackAct: other.addReferBackAct,
            showIsChangedIndicator: other.showIsChangedIndicator
        };
        return Object.assign({}, defaultConf, {
            ...type
        })
    }
    if (props.render) {
        item = props.render({
            ...createConf(
                {
                    defaultValue: field['display'],
                    onChange: onChange.bind(this, false, 'input', {...props, index}),
                    field
                }
            )
        })
    } else {
        switch (type) {
            case 'refer':
                let refVal = {
                    value: isT(field['value'], 'Array') ? field[0]['value'] : field['value'],
                    display: isT(field['display'], 'Array') ? field[0]['display'] : field['display']
                };
                if (props.refcode === 'uapbd/refer/pubinfo/AddressRef/index') {
                    //地址参照特殊处理，批量导入会导致出现空的地址信息，页面会显示地址的value信息
                    //判断如果display和value相同，则不显示地址信息
                    item = (<AddrRefer ref={ref => field.ref = ref}
                                       {...props}
                                       refVal={refVal}
                                       {...createConf(
                                           {
                                               defaultValue: refVal['display'] === refVal['value'] ? '' : refVal['display'],
                                               onChange: onChange.bind(this, true, 'refer', {...props, index})
                                           }
                                       )}/>);
                } else {
                    item = (<HrRefer ref={ref => field.ref = ref}
                                     {...props}
                                     refVal={refVal}
                                     {...createConf(
                                         {
                                             defaultValue: field['display'],
                                             onChange: onChange.bind(this, true, 'refer', {...props, index})
                                         }
                                     )}/>);
                }

                break;
            case 'residtxt':
            case 'input':
                item = (<HRInput
                    ref={ref => field.ref = ref}
                    {...createConf(
                        {
                            defaultValue: field['display'],
                            onChange: onChange.bind(this, false, 'input', {...props, index})
                        }
                    )}
                >
                    {label}
                </HRInput>)
                // item = (<HrInputItem
                //     ref={ref => field.ref = ref}
                //     {...createConf(
                //         {
                //             defaultValue: field['display'],
                //             onChange: onChange.bind(this, false, 'input', {...props, index})
                //         }
                //     )}
                // >
                //     {label}
                // </HrInputItem>)
                break;
            case 'textarea':
                item = (<HRTextarea
                    ref={ref => field.ref = ref}
                    {...createConf(
                        {
                            visible,
                            required,
                            label,
                            defaultValue: field['display'],
                            disabled: !other.isEdit || disabled,
                            onBlur: onChange.bind(this, false, 'textarea', {...props, index}),
                        }
                    )}
                />);
                /*item = (
                    <List className={required ? 'textarea-required' : null} renderHeader={() => label}
                          style={{display: !!visible ? '' : 'none'}}>
                        <TextareaItem
                            ref={ref => field.ref = ref}
                            {...createConf(
                                {
                                    defaultValue: field['display'],
                                    disabled: !other.isEdit || disabled,
                                    onBlur: onChange.bind(this, false, 'textarea', {...props, index}),
                                }
                            )}
                            rows={3}
                        />
                    </List>
                )*/
                break;
            case 'number':
                const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
                let moneyKeyboardWrapProps;
                if (isIPhone) {
                    moneyKeyboardWrapProps = {
                        // onTouchStart: e => e.preventDefault(),
                    };
                }
                item = (
                    <HrNumberItem
                        ref={ref => field.ref = ref}
                        {
                            ...createConf({
                                type: 'money',
                                moneyKeyboardWrapProps,
                                defaultValue: field['value'],
                                onVirtualKeyboardConfirm: onChange.bind(this, false, 'number', {...props, index})
                            })
                        }>
                        {label}
                    </HrNumberItem>)
                break;
            case 'select':
                const seasons = metaOptionsToSelect(options)
                let selectData = isT(field['value'], 'String') ? [field['value']] : field['value']
                item = (
                    <ListWrapper>
                        <Picker ref={ref => field.ref = ref} {...createConf({disabled: !other.isEdit || disabled})}
                                value={selectData} onChange={onChange.bind(this, true, 'select', {...props, index})}
                                cols={1}
                                okText={langCheck("0000PUB-000001")} dismissText={langCheck("0000PUB-000000")}
                                extra={!other.isEdit || disabled ? ' ' : langCheck("0000PUB-000283")} data={seasons}
                        >
                            <List.Item arrow={disabled || !other.isEdit ? "empty" : "horizontal"}
                                       style={{display: !!visible ? '' : 'none'}}
                                       className={(selectData ? 'has-value-item' : '')
                                       + (other.showIsChangedIndicator && selectData && selectData[0] && field.isEdit ? ' am-filed-changed' : '')}
                            >
                                {label}
                                <i style={{
                                    color: '#e14c46',
                                    display: other.isEdit && required && !disabled ? '' : 'none'
                                }}>*</i>
                            </List.Item>
                        </Picker>
                    </ListWrapper>
                )
                break;
            case 'radio':
            case 'switch':
            case 'checkbox_switch':
            case 'checkbox':
                item = (
                    <ListWrapper shouldChange={false}>
                        <List.Item
                            {...createConf({disabled: !other.isEdit || disabled})}
                            style={{display: !!visible ? '' : 'none'}}
                            extra={
                                (<Switch
                                    ref={ref => field.ref = ref}
                                    {...createConf()}
                                    checked={!!(field['value'] && (field['value'] === 'Y' || field['value'] === true))}
                                    onChange={onChange.bind(this, true, 'switch', {...props, index})}
                                    disabled={!other.isEdit || disabled}
                                    color="#e14c46"
                                />)
                            }
                        >{label}</List.Item>
                    </ListWrapper>
                )
                break;
            case 'datetimepicker':
            case 'datepicker':
            case 'datePickerNoTimeZone':
                /**
                 * 确定日期控件可选的最大最小日期
                 * minDate: 最小日期，可以为数字或者日期类型，如果为数字，则计算具体日期，
                 *          负数标识多少年前，正数标书多少年之后，默认-100，表示一百年前，
                 *          如果为具体日期，则直接使用传过来的日期
                 * maxDate： 最大日期，用法和minDate相同
                 */
                const {minDate = -100, maxDate = 30} = other;
                let dateMin = new Date(), dateMax = new Date();
                if (isT(minDate, 'Date')) {
                    dateMin = minDate;
                } else {
                    dateMin = new Date(dateMin.setFullYear(dateMin.getFullYear() + minDate));
                }

                if (isT(maxDate, 'Date')) {
                    dateMax = maxDate;
                } else {
                    dateMax = new Date(dateMax.setFullYear(dateMax.getFullYear() + maxDate));
                }
                item = (
                    <ListWrapper>
                        <DatePicker
                            ref={ref => field.ref = ref}
                            {...createConf({disabled: !other.isEdit || disabled})}
                            mode={type === 'datetimepicker' ? "datetime" : "date"}
                            format={type === 'datetimepicker' ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD"}
                            value={field['value'] ? new Date(field['value'].replace(/-/g, '/')) : ''}
                            onChange={onChange.bind(this, true, type, {...props, index})}
                            title=""
                            minDate={dateMin}
                            maxDate={dateMax}
                            extra={disabled || !other.isEdit ? ' ' : `${langCheck("0000PUB-000018")}`}
                            locale={{
                                okText: langCheck("0000PUB-000001"),
                                dismissText: langCheck("0000PUB-000000"),
                                DatePickerLocale: {
                                    year: langCheck("0000PUB-000292"),
                                    month: langCheck("0000PUB-000293"),
                                    day: langCheck("0000PUB-000294"),
                                    hour: langCheck("0000PUB-000304"),
                                    minute: langCheck("0000PUB-000305")
                                }
                            }}
                        >
                            <List.Item style={{display: visible ? '' : 'none'}}
                                       arrow={disabled || !other.isEdit ? "empty" : "horizontal"}
                                       className={(field['value'] ? 'has-value-item' : '')
                                       + (other.showIsChangedIndicator && field.isEdit ? ' am-filed-changed' : '')}
                            >
                                {label}
                                <i style={{
                                    color: '#e14c46',
                                    display: other.isEdit && required && !disabled ? '' : 'none'
                                }}>*</i>
                            </List.Item>
                        </DatePicker>
                    </ListWrapper>
                )
                break;
        }
    }

    return item
}
