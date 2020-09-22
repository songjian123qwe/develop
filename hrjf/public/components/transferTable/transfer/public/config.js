

/**
 * 两列布局col取值为6 
 * 三列布局col取值为4
 * 
 */
// 有label
const Layout = {
    3: {
        label: 1,
        control: 2
    },
    4: {
        label: 1,
        control: 3
    },
    6: {
        label: 2,
        control: 4
    },
    12: {
        label: 1,
        control: 11
    }
};

// 无label
const Layout4 = {
    3: {
        label: 0,
        control: 3
    },
    4: {
        label: 0,
        control: 4
    },
    6: {
        label: 0,
        control: 6
    },
    12: {
        label: 0,
        control: 12
    }
};

const layouts = {
    Layout,
    Layout4
};

const fileType = {
    IMG: ['jpg', 'jpeg', 'bmp', 'gif'],
    DOC: [],
    XLS: [],

}

// 总配置项
export default {
    allTypes: ['input', 'number', 'textarea', 'datepicker', 'rangepicker', 'switch', 'select', 'checkbox', 'radio', 'refer', 'customer', 'label', 'NCTZDatePickerStart', 'NCTZDatePickerEnd', 'checkbox_switch', 'switch_browse'],
    displayTypes: ['select', 'radio', 'checkbox', 'refer'],
    string: ['input', 'textarea', 'datepicker', 'select', 'checkbox', 'radio', 'refer', 'label'],
    boolean: ['switch', 'checkbox_switch', 'switch_browse'],
    number: ['number'],
    valueTypesExceptNumber: ['input', 'textarea'],
    changeTypes: ['datepicker', 'rangepicker', 'switch', 'select', 'checkbox', 'radio', 'refer', 'NCTZDatePickerStart', 'NCTZDatePickerEnd', 'checkbox_switch', 'switch_browse', 'timepicker', 'datetimepicker', 'datePickerNoTimeZone'],
    blurTypes: ['input', 'number', 'textarea', 'residtxt'],
    valueTypes: ['input', 'number', 'textarea'],
    noEditType: ['label', 'customer'],
    getDisplay: ['select', 'radio', 'checkbox'],
    status: {  // 表格内数据状态
        origin: '0',
        edit: '1',
        add: '2',
        delete: '3'
    },
    timeTypes: ['datepicker', 'NCTZDatePickerStart', 'NCTZDatePickerEnd', 'timepicker', 'datetimepicker', 'rangepicker', 'datePickerNoTimeZone'],
    layouts, // 表单布局用
    beforeFocusTypes:  ['input', 'select', 'number', 'textarea', 'password', 'switch', 'switch_browse', 'refer'], // //表格侧拉编辑前判断用
    beforeChangeTypes:  ['radio', 'datepicker', 'timepicker', 'datetimepicker', 'NCTZDatePickerStart', 'NCTZDatePickerEnd', 'rangepicker', 'datePickerNoTimeZone', 'checkbox', 'checkbox_switch'] //表格侧拉编辑前判断用
}


