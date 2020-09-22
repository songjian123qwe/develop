// from utils
import Toast from 'antd-mobile/lib/toast'
import {isObject, isT, isMeta, isFormRelation, Maybe, sizeof} from '../utils'
import deepCopy from 'src/hrpub/common/utils/deep-copy'
import {langCheck} from "../../mobile/utils/utils";

/**
 * 用于存储模板数据
 */
class HrMobileFieldMeta {
    constructor(meta) {
        this.temp = meta     // 临时数据
        this.cacheMeta = deepCopy(meta) // 请示回来的所有数据
        this.fieldsMeta = {}  // 根据原始数据形成的初始meta
        this.currentMeta = {} // 当前要显示的meta
        this.dataStore = {}  // 数据数据
        this.context = null  // Provider上下文
        this.requiredItem = null,   // 校验项
            this.formStatus = 'browse'
    }

    static of(val) {
        if (!isObject(val)) {
            //请传入正确的meta对象
            Toast.info(`${langCheck('0000PUB-000291')}`)
            return
        }
        return new HrMobileFieldMeta(val)
    }

    bindContext(ctx) {
        this.context = ctx
    }

    /**
     * 初始化meta数据
     */
    initMeta() {
        let isRelation = isFormRelation(this.temp)
        if (isRelation) {
            let formRelation = this.temp.formrelation
            this.assignRelationMeta(formRelation)
        }
        for (let i in this.temp) {
            let currentMeta = this.temp[i]
            if (!isMeta(currentMeta)) {
                delete this.temp[i]
                continue;
            }
            // table form search?
            let {moduletype, name, code, items} = currentMeta
            if (moduletype === 'form') {
                this.handleFormMeta(name, code, items, moduletype)
            } else if (moduletype === 'table') {
                this.handleTableMeta(name, code, items, moduletype)
            } else {

            }
            delete this.temp[i]
        }
        return this
    }

    handleFormMeta(name, code, items, moduletype) {
        this.fieldsMeta[code] = [
            {name, code, items, moduletype}
        ]
    }

    getCurrentMeta(key) {
        let current = this.temp[key]
        return current
    }

    getMeta(key) {
        return this.getFormMeta(key)
    }

    /**
     * setMeta
     * @param key
     * @param obj
     */
    setMeta(key, obj) {
        // 有key合并，无key新加
        let cache = this.cacheMeta
        if (key in cache) {
            Object.assign(this.cacheMeta, {
                [key]: obj
            })
        } else {
            this.cacheMeta[key] = obj
        }
        this.temp = JSON.parse(JSON.stringify(this.cacheMeta))
        this.initMeta()
        this.context.update()
    }

    assignRelationMeta(formRelation) {
        for (let i in formRelation) {
            let relationArr = formRelation[i]
            let {name, code, items} = this.getCurrentMeta(i)
            this.fieldsMeta[i] = [
                {name, code, items}
            ]
            delete this.temp[i]
            for (let j of relationArr) {
                let {name, code, items} = this.getCurrentMeta(j)
                // 预留分层信息，抽取field信息应自动过滤掉
                this.fieldsMeta[i].push(
                    {name, code, items}
                )
            }
        }
    }

    handleTableMeta(name, code, items, moduletype) {
        this.fieldsMeta[code] = [
            {name, code, items, moduletype}
        ]
    }

    getFormMeta(key) {
        let meta = this.fieldsMeta
        this.currentMeta = meta[key]
        if (!this.currentMeta || !this.currentMeta.length) {
            alert('模板不存在')
        }
        return this.currentMeta
    }

    getFormVisibleMeta(key) {
    }

    getAllFieldsObj() {
        let fields = []
        for (let i of this.currentMeta) {
            if (i.items) {
                fields = [...fields, ...i.items]
            }
        }
        return fields
    }

    getAllFields() {
        let fieldsObjArr = this.getAllFieldsObj()
        if (!fieldsObjArr.length) {
            alert('meta 初始化有问题')
            return
        }
        let currentMeta = !!fieldsObjArr.length && fieldsObjArr.map((item) => item.attrcode || item.code)
        return new Set(currentMeta)
    }

    // 根据meta动态初始化state
    createInitialState(data = {}, cardName, ctx, hideIfNoData) {
        let state = {}
        let result = []
        let initData = data ? Maybe.of(data).getValue(['rows[0]', 'values']) : null
        let fields = this.getAllFields()
        if (!data) {
            initData = null
            for (let i of fields) {
                let current = {value: null, display: null}
                let {value, display, isEdit} = current || {}
                state[i] = {
                    ref: null,
                    hasError: false,
                    value,
                    isEdit,
                    display: display || value
                }
            }
            result = hideIfNoData ? [] : [state]
        } else {
            initData = Maybe.of(data).getValue(['rows'])
            for (let j of initData) {
                state = {}
                for (let i of fields) {
                    let current = j.values[i]
                    let {value, display, isEdit} = current || {}
                    state[i] = {
                        ref: null,
                        hasError: false,
                        value,
                        isEdit,
                        display: display || value
                    }
                }
                result.push(state)
            }
        }
        this.dataStore = Object.assign({}, this.dataStore, {
            [cardName]: result
        })
        // 获得校验项
        this.getRequiredItem()
        // 绑定上下文
        this.bindContext(ctx)
        return this.dataStore
    }

    // 生成特定refs
    createCompRef() {
        let states = this.createInitialState()
        let fieldRefs = {}
        for (let i in states) {
            fieldRefs[i] = {
                ref: null
            }
        }
        this.dataStore = fieldRefs
        return fieldRefs
    }

    updateDataStore(obj, {key, type, value}) {
        this.dataStore = obj
        if (this.formStatus !== 'add') {
            this.formStatus = 'edit'
        }
        // TODO 单个字段校验
        // this.checkSingleField({key, type, value})
        // 编辑后事件
        this.onAfterHandle.bind(this, {key, type, value})()
    }

    /**
     * 获取当前卡片数据
     */
    getFormData(key = '', istable = false) {
        if (!key && !istable) {
            alert('请传入key')
            return
        }
        // TODO: 缺少新增更新删除标识
        let dataSoure = this.dataStore
        let result = {}
        let callback = {
            areaType: 'form',
            rows: []
        }
        // status: {add:2, edit:1, browse:null}
        let status, formStatus = this.formStatus
        if (formStatus === 'edit') {
            status = '1'
        } else if (formStatus === 'add') {
            status = '2'
        } else {
            status = '0'
        }
        let data = {
            values: {},
            // status: this.context.state.isEdit ? '1' : null
            status: status
        }
        const createData = (dataSoure, result = {}) => {
            for (let i in dataSoure) {
                if (isT(dataSoure[i].value, 'Array')) {
                    dataSoure[i].value = dataSoure[i].value[0]
                }
                if (isT(dataSoure[i].display, 'Array')) {
                    dataSoure[i].display = dataSoure[i].display[0]
                }
                result[i] = {
                    value: dataSoure[i].value,
                    display: dataSoure[i].display,
                    isEdit: dataSoure[i].isEdit
                }
            }
            return result
        }
        if (istable) {
            // table
            // 代表是一个table
            let arr = []
            for (let i in dataSoure) {
                let data = dataSoure[i]
                for (let i = 0, j = data.length; i < j; i++) {
                    arr.push({status: this.context.state.isEdit ? '1' : null, values: createData(data[i])})
                }
            }
            callback.areaType = 'table'
            callback.rows = arr
        } else {
            // form
            if (isT(key, 'String')) {
                let data = dataSoure[key]
                for (let i = 0, j = data.length; i < j; i++) {
                    createData(data[i], result)
                }
            } else if (isT(key, 'Array')) {
                for (let i of key) {
                    createData(dataSoure[i], result)
                }
            }
            data.values = result
            callback.rows = [data]
        }
        return callback
    }

    /******************event callback*********************/

    /**
     * @description 编辑后事件
     */
    onAfterHandle({key, type, value}) {
        // console.log('defaultAfter', {key, type, value})
    }

    panelClick(res) {
        // console.log('panelCLick default callback', res)
    }

    iconClick(res) {
        // 默认是设置本小节的可编辑性

        // console.log('iconClick default callback', res)
    }

    contentClick(res) {
        // console.log('panelContent', res)
    }

    /******************field props 操作*********************/
    /**
     * @description 设置字段信息
     * @param  {boolean} {flag 是否为受控组件
     * @param  {string} type 组件类型
     * @param  {string} index 需要设置的类table中的哪一行，默认为0
     * @param  {string} key 字段名称 [必填]
     * @param  {string} value} 当前值 [必填]
     * @param  {string} metaName} 当前meta名称 [必填]
     * @example this.state.store.setFieldValue({key: 'cperiod', value: '33333', metaName: 'add_form'})
     */
    setFieldValue({flag = true, type = '', index = 0, key, value, metaName}) {
        if (!this.context.props.data) {
            //请先设置数据模型
            Toast.info(`${langCheck('0000PUB-000290')}`)
            return
        }
        let props = this.getFieldProps(metaName, key)
        props.index = index
        this.context.onFieldChange(flag, type, props, value)
    }

    /**
     * 获取字段信息
     * @param key meta名称
     * @param field 字段名称
     * @param index 索引默认第一条
     * @returns {*}
     */
    getFieldValue({key, field, index = 0}) {
        let currentField = this.dataStore[key][index][field]
        return currentField
    }

    /**
     * @param  {string} key 字段名称
     * @param  {string} code 区域编码
     * @example this.state.store.getFieldProps('mid', 'add_form')
     */
    getFieldProps(key, code) {
        if (isT(key, 'Undefined') || isT(code, 'Undefined')) {
            //检查key code 是否已经正确填写
            Toast.info(`${langCheck('0000PUB-000288')}key code ${langCheck('0000PUB-000289')}`)
            return
        }
        let currentMeta = this.currentMeta
        let items
        for (let i of currentMeta) {
            if (code && i.code === key) {
                items = i.items
            }
        }
        let props = items.filter(res => res.attrcode === code || res.code === code)[0]
        return props
    }

    /**
     * @param  {string} key 字段名称
     * @param  {string} code 区域编码
     * @param  {object} obj={}
     * @example this.state.store.setFieldProps('mid', 'add_form', {disabled: false})
     */
    setFieldProps(key, code, obj = {}) {
        if (isT(key, 'Undefined') || isT(code, 'Undefined')) {
            alert('检查key code 是否已经正确填写')
            return
        }
        let currentMeta = this.currentMeta
        let itemObject
        for (let i of currentMeta) {
            if (i.code === code) {
                itemObject = i
            }
        }
        itemObject.items.map(item => {
            let attrcode = item.attrcode || item.code;
            if (attrcode === key) {
                Object.assign(item, obj)
            }
        })
        this.handleState({meta: currentMeta})
    }

    handleState(obj, callback = () => {
    }) {
        this.context.setState(obj, () => {
            callback()
        })
    }

    /******************formstatus*********************/
    /**
     * 设置card是否可编辑
     * @param  {boolean} flag
     * @param  {string} status 新增 编辑 浏览
     * @example this.state.store.setFormEditStatus(true)
     */
    setFormEditStatus(flag, status = '') {
        let statusName
        if (!flag) {
            statusName = 'browse'
        } else {
            statusName = status ? status : 'edit'
        }
        this.formStatus = statusName
        this.handleState({isEdit: flag})
    }

    /**
     * 获取card是否可以编辑
     */
    getFormEditStatus() {
        return this.context.state.isEdit
    }

    /******************validate*********************/

    /**
     * 单个字段校验
     * @param fieldValue
     * @param meta
     */
    checkSingleField(fieldValue, meta) {
        let str = ''
        if (!fieldValue.value) {
            // ***不能为空!
            Toast.info(`${meta.label + langCheck('0000PUB-000003')}`, 1);
            return true
        }
        switch (meta.itemtype) {
            // input textarea residtxt 校验长度
            case 'input':
                // 如果是email 则进行
                if (meta.inputType === 'email') {
                    return !this.validateEmail(fieldValue.value, meta);
                }
            case 'textarea':
            case 'residtxt':
                if (this.validateLength(fieldValue.value, meta)) {
                    return false
                } else {
                    return true
                }
                break;
            case 'number':
                if (this.validateNumber(fieldValue.value, meta)) {
                    return false
                } else {
                    // label length  需要在 min，max范围
                    Toast.info(`${meta.label}length${langCheck('0000PUB-000285')}${meta.min},${meta.max}${langCheck('0000PUB-000286')}`, 1);
                    return true
                }
                break;
            default:
                return false
                break;
        }
    }

    /**
     * 校验数字长度
     * @param value
     * @param meta
     * @returns {boolean}
     */
    validateNumber(value, meta) {
        return value.length <= Number(meta.max) && Number(value) >= Number(meta.min)
    }

    /**
     * 校验字符串长度
     * @param value
     * @param meta
     * @returns {boolean}
     */
    validateLength(value, meta) {
        return sizeof(value) <= Number(meta.maxlength)
    }

    /**
     * 校验email格式
     * @param value
     * @param meta
     * @returns {boolean}
     */
    validateEmail(value, meta) {
        let pattern = /^[a-zA-Z0-9_.-]+@[a-zA-Z-]+(\.[a-zA-Z0-9]+)*\.[a-zA-Z0-9]{2,6}$/;
        let isEmail = pattern.test(value);
        if (!isEmail) {
            // ***格式错误
            Toast.info(`${meta.label}${langCheck('0000PUB-000287')}`, 1);
        }
        return isEmail;
    }

    /**
     * 获取必输项字段名
     */
    getRequiredItem() {
        this.requiredItem = this.getAllFieldsObj().filter(item => item.required)
    }

    /**
     * check表单是否已经输入必填项
     * @param key  meta中的key
     */
    checkAllFields(key) {
        let requiredKeys = {}
        this.requiredItem.map(item => {
            let key = item.attrcode || item.code
            requiredKeys[key] = item
        })
        let data = this.dataStore[key]
        let str = []
        data.forEach((v, k) => {
            for (let i in v) {
                requiredKeys[i] && this.checkAllInfo(v[i], requiredKeys[i], k + 1, str)
            }
        })
        if (str.length) {
            Toast.info(str.join('\n'), 3);
            return false
        }
        return true

    }

    checkAllInfo(fieldValue, meta, index, strArr = null) {

        if (!fieldValue.value) {
            // strArr.push(`第${index}个表单的${meta.label}不能为空`)
            strArr.push(`${meta.label}${langCheck('0000PUB-000003')}`);
            return;
        }
        switch (meta.itemtype) {
            // input textarea residtxt 校验长度
            case 'input':
            case 'textarea':
            case 'residtxt':
                if (!this.validateLength(fieldValue.value, meta)) {
                    // strArr.push(`第${index}个表单的${meta.label}length需要在${meta.maxlength}范围`)
                    //strArr.push(`${meta.label}length${langCheck('0000PUB-000285')}${meta.maxlength}${langCheck('0000PUB-000286')}`)
                    strArr.push(`${meta.label}${langCheck('0000PUB-000306')}${meta.maxlength}}`)
                }
                break;
            case 'number':
                if (!this.validateNumber(fieldValue.value, meta)) {
                    // strArr.push(`第${index}个表单的${meta.label}length需要在${meta.min},${meta.max}范围`)
                    strArr.push(`${meta.label}${langCheck('0000PUB-000307')}${langCheck('0000PUB-000285')}${meta.min},${meta.max}${langCheck('0000PUB-000286')}`)
                }
                break;
            default:
                break;
        }
    }
}

/**
 * @param  {} meta
 * @param  {} config={onAfterHandle,panelClick,iconClick}
 */
export default (meta, config = {onAfterHandle, onBeforeHandle, panelClick, iconClick, contentClick}) => {
    return Object.assign(HrMobileFieldMeta.of(meta).initMeta(), config)
}


