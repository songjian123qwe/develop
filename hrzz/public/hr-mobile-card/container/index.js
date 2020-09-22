import React from 'react';
import PropTypes from 'prop-types';
import createContext from '../context';
import ListCard from '../components/list'
// import 'antd-mobile/dist/antd-mobile.css';
import './index.less';
import classnames from 'classnames';
import {formatDate, formatSwitch} from '../utils';

/**生成child card */
class Provider extends React.Component {
    static propTypes = {
        store: PropTypes.object,
        cardName: PropTypes.string,
        data: PropTypes.any
    };

    constructor(props) {
        super(props);
    }

    /**
     *  isEdit: 初始化时候是否是编辑状态
     *  activeKey: 有多个卡片时默认展开的那个卡片cardName
     *  cardName: 当前操作卡片名称，作为数据key值
     *  collapsed: 初始化时候是否展开状态
     *  hideHeader: 是否隐藏卡片标题
     *  headerExtra: 卡片标题后的扩展，string or React.Element
     *  showArrow: 是否显示标题上的编辑按钮
     */
    state = {
        meta: null,
        fieldMeta: null,
        isEdit: this.props.isEdit,
        activeKey: this.props.cardName,
        cardName: this.props.cardName,
        collapsed: this.props.collapsed,
        hideHeader: this.props.hideHeader,
        headerExtra: this.props.headerExtra,
        showArrow: this.props.showArrow,
        showHasDataIndicator: this.props.showHasDataIndicator,
        showIsChangedIndicator: this.props.showIsChangedIndicator,
        showTableLine: this.props.showTableLine,
        addReferBackAct: this.props.addReferBackAct,
        onFieldChange: this.onFieldChange.bind(this),
        onBeforeHandle: this.onBeforeHandle.bind(this),
        panelChange: this.panelChange.bind(this),
        headerClick: this.headerClick.bind(this),
        contentClick: this.contentClick.bind(this),   // TODO：用于处理模板内容容器的事件
        onErrorClick: this.onErrorClick.bind(this)
    };
    hasError = false;

    onErrorClick(value, meta) {
        // console.log('res', value, meta)
        // this.hasError = this.props.store.checkSingleField(value, meta)
        // if (this.hasError) {
        //     alert(this.hasError.info)
        // }
    }

    onBeforeHandle(attrcode, record) {
        let {store} = this.props;
        // 如果onBeforeHandle 不存在 或者 不是函数 则返回true
        if (!store.hasOwnProperty('onBeforeHandle') || typeof store.onBeforeHandle !== 'function') {
            return true
        }
        return store.onBeforeHandle(attrcode, record);
    }

    contentClick(res) {
        this.props.store.contentClick(res)
    }

    headerClick(res) {
        this.props.store.panelClick(res)
    }

    panelChange(res) {
        this.props.store.iconClick(res);
        this.setState({
            activeKey: res,
            collapsed: false
        })
    }

    cloneArrObject(arrObject) {
        let result = [];
        arrObject.forEach((obj, index) => {
            let temp = {};
            for (let i in obj) {
                temp[i] = {
                    value: obj[i].value,
                    display: obj[i].display,
                    hasError: obj[i].hasError,
                    isEdit: obj[i].isEdit
                }
            }
            result.push(JSON.parse(JSON.stringify(temp)))
        });
        return result
    }

    /**
     * @param  {boolean} flag 是否为受控组件
     * @param  {string} type 组件类型
     * @param  {string} props 字段meta
     * * @param  {string} value 当前值
     */
    onFieldChange(flag, type, props, value) {
        if (document.querySelector('.am-input-clear.am-input-clear-active') || document.querySelector('.am-textarea-clear.am-textarea-clear-active')) {
            value = ''
        }
        if (typeof value === 'string') {
            value = value.replace(/(^\s*)|(\s*$)/g, "");
        }
        let {cardName} = this.state;
        let {index = 0, attrcode: key} = props;
        if (!key) key = props.code;
        let currentProp = this.state.fieldMeta[cardName][index][key];
        let currentCom = {};
        let store = this.props.store;
        switch (type) {
            case 'select':
                currentCom.value = value && value[0];
                break;
            case 'switch':
                // TODO: 找到合适方式之后干掉这个ref
                //currentCom.value = !currentProp.ref.props.checked ? 'Y' : 'N'
                const result = formatSwitch(props, currentProp.value);
                currentCom.value = result.value;
                currentCom.display = result.display;
                break;
            case 'datetimepicker':
                currentCom.value = formatDate(value, 'YYYY-MM-DD HH:mm');
                currentCom.display = formatDate(value, 'YYYY-MM-DD HH:mm');
                break;
            case 'datepicker':
                currentCom.value = formatDate(value, '-','YY-MM-DD');
                currentCom.display = formatDate(value, '-','YY-MM-DD');
                break;
            case 'datePickerNoTimeZone':
                currentCom.value = formatDate(value);
                currentCom.display = formatDate(value);
                break;
            case 'refer':
                currentCom.value = value.value;
                currentCom.display = value.display;
                break;
            default:
                currentCom.value = value;
                currentCom.display = value;
                break;
        }
        //判断数据是否改变，如果没有变则返回
        let isChangedFlag = currentCom.value !== currentProp.value;
        if (!isChangedFlag) return;
        this.hasError = props.required || (props.inputType && props.inputType === 'email' && value) ? this.props.store.checkSingleField(currentCom, props) : false;
        currentCom.hasError = this.hasError;
        let fieldMeta;
        fieldMeta = this.cloneArrObject(store.dataStore[cardName]);
        fieldMeta[index][key] = {
            value: currentCom.value,
            hasError: currentCom.hasError,
            display: currentCom.display || currentCom.value,
            isEdit: true
        };
        let temp = Object.assign(store.dataStore, {[cardName]: fieldMeta});
        store.updateDataStore(temp, {key, type, value: currentCom.value});
        if (flag) {
            this.setState({
                fieldMeta: Object.assign({}, this.state.fieldMeta, temp)
            }, () => {
                this.props.onChange && this.props.onChange(props, value, key, store)
            })
        } else {
            this.props.onChange && this.props.onChange(props, value, key, store)
        }
    }

    componentDidMount() {
        //window.hh = this;
        this.createInitialState(this.props)
        // this.createInitialState(this.props.data)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.store || nextProps.data) {
            this.createInitialState(nextProps)
        }
        if (this.props.headerExtra !== nextProps.headerExtra) {
            this.setState({
                headerExtra: nextProps.headerExtra
            })
        }
    }

    getMeta(props) {
        let store = props.store;
        return store && store.getMeta(props.cardName)
    }

    createInitialState(props) {
        if (!props.store) {
            return
        }
        let {store, data, cardName, hideIfNoData} = props;
        this.setState({
            meta: this.getMeta(props),
            fieldMeta: store.createInitialState(data, cardName, this, hideIfNoData)
        })
    }

    update() {
        this.createInitialState(this.props)
    }

    render() {
        // 整个 state 都被传递进 provider
        let FieldContext = createContext(this.state);
        let comp = this.state.fieldMeta ? (
            <FieldContext.Provider value={this.state}>
                {
                    ListCard({FieldContext})
                }
            </FieldContext.Provider>
        ) : null;
        let show = classnames('hr-mobile-card', this.props.className);
        return (
            <div className={show}>
                {comp}
            </div>
        );
    }
}

export default Provider
