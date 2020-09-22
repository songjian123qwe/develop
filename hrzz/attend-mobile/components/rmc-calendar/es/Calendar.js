import _extends from 'babel-runtime/helpers/extends';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import React from 'react';
import Animate from 'rc-animate';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';
import ConfirmPanel from './calendar/ConfirmPanel';
import ShortcutPanel from './calendar/ShortcutPanel';
import AnimateWrapper from './calendar/AnimateWrapper';
import Header from './calendar/Header';
import { mergeDateTime } from './util';
import defaultLocale from './locale/zh_CN';
import { formatDate as _formatDate } from './util';
import '../assets/index.less';

export var StateType = function StateType() {
    _classCallCheck(this, StateType);

    this.showTimePicker = false;
    this.startDate = undefined;
    this.disConfirmBtn = true;
    this.clientHight = 0;
};

var Calendar = function (_React$PureComponent) {
    _inherits(Calendar, _React$PureComponent);

    function Calendar(props) {
        _classCallCheck(this, Calendar);

        var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

        _this.selectDate = function (date) {
            var useDateTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var props = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _this.props;

            if (!date) return {};
            var newState = {};
            var pickTime = props.pickTime && props.dateType !== 'date',
                defaultTimeValue = props.defaultTimeValue,
                _props$locale = props.locale,
                locale = _props$locale === undefined ? {} : _props$locale;
            var newDate = pickTime && !useDateTime ? mergeDateTime(date, defaultTimeValue) : date;
            newState = _extends({}, newState, { startDate: newDate, disConfirmBtn: false });
            if (pickTime) {
                newState = _extends({}, newState, { timePickerTitle: locale.selectTime, showTimePicker: true });
            }
            return newState;
        };
        _this.onSelectedDate = function (date) {
            var _this$state = _this.state,
                startDate = _this$state.startDate;
            _this.setState(_this.selectDate(date, false, { startDate: startDate}));
        };
        _this.onSelectHasDisableDate = function (date) {
            _this.onClear();
            if (_this.props.onSelectHasDisableDate) {
                _this.props.onSelectHasDisableDate(date);
            }
        };
        _this.onClose = function () {
            _this.setState(new StateType());
        };
        _this.onCancel = function () {
            _this.props.onCancel && _this.props.onCancel();
            _this.onClose();
        };
        _this.onConfirm = function () {
            var onConfirm = _this.props.onConfirm;
            var _this$state2 = _this.state,
                startDate = _this$state2.startDate;
            var date = _this.formatDate(startDate);
            onConfirm && onConfirm(date);
            _this.onClose();
        };
        _this.onTimeChange = function (date) {
            var _this$state3 = _this.state,
                startDate = _this$state3.startDate
            if (startDate) {
                _this.setState({
                    startDate: date
                });
            }
        };
        _this.onClear = function () {
            _this.setState({
                startDate: undefined,
                showTimePicker: false
            });
            _this.props.onClear && _this.props.onClear();
        };
        _this.setClientHeight = function (height) {
            _this.setState({
                clientHight: height
            });
        };
        _this.state = new StateType();
        if (props.defaultValue) {
            var defaultValue = props.defaultValue;
            _this.state = _extends({}, _this.state, _this.selectDate(defaultValue[1], true, { startDate: defaultValue[0] }, props));
        }
        return _this;
    }
    Calendar.prototype.formatDate = function formatDate(date) {
        debugger
        var _props = this.props,
            _props$formatStr = _props.formatStr,
            dateType = _props.dateType,
            formatStr = _props$formatStr === undefined ? (dateType === 'time' ? 'yyyy-MM-dd hh:mm' : dateType === 'date' ? 'yyyy-MM-dd' : 'yyyy-MM-dd ap') : _props$formatStr,
            locale = _props.locale;
        return  {
            display: _formatDate(date, formatStr, locale),
            value: _formatDate(date, 'yyyy-MM-dd hh:mm:ss', locale)
        }
    };
    Calendar.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (!this.props.visible && nextProps.visible && nextProps.defaultValue) {
        }
    };

    Calendar.prototype.render = function render() {
        var _props = this.props,
            type = _props.type,
            _props$locale2 = _props.locale,
            locale = _props$locale2 === undefined ? {} : _props$locale2,
            prefixCls = _props.prefixCls,
            dateType = _props.dateType,
            visible = _props.visible,
            pickTime = _props.pickTime,
            renderHeader = _props.renderHeader,
            infiniteOpt = _props.infiniteOpt,
            initalMonths = _props.initalMonths,
            defaultDate = _props.defaultDate,
            minDate = _props.minDate,
            maxDate = _props.maxDate,
            getDateExtra = _props.getDateExtra,
            rowSize = _props.rowSize,
            defaultTimeValue = _props.defaultTimeValue,
            enterDirection = _props.enterDirection,
            timePickerPrefixCls = _props.timePickerPrefixCls,
            timePickerPickerPrefixCls = _props.timePickerPickerPrefixCls,
            minuteStep = _props.minuteStep,
            style = _props.style;
        var _state = this.state,
            showTimePicker = _state.showTimePicker,
            timePickerTitle = _state.timePickerTitle,
            startDate = _state.startDate,
            disConfirmBtn = _state.disConfirmBtn,
            clientHight = _state.clientHight;

        var headerProps = {
            locale: locale,
            showClear: !!startDate,
            onCancel: this.onCancel,
            onClear: this.onClear
        };
        return React.createElement(
            'div',
            { className: '' + prefixCls, style: style },
            React.createElement(
                Animate,
                { showProp: 'visible', transitionName: 'fade' },
                React.createElement(AnimateWrapper, { className: 'mask', visible: !!visible, onCancel: this.onCancel })
            ),
            React.createElement(
                Animate,
                { showProp: 'visible', transitionName: enterDirection === 'horizontal' ? 'slideH' : 'slideV' },
                React.createElement(
                    AnimateWrapper,
                    { className: 'content', visible: !!visible },
                    renderHeader ? renderHeader(headerProps) : React.createElement(Header, headerProps),
                    React.createElement(DatePicker, { locale: locale, type: 'one', prefixCls: prefixCls, infiniteOpt: infiniteOpt, initalMonths: initalMonths, defaultDate: defaultDate, minDate: minDate, maxDate: maxDate, getDateExtra: getDateExtra, onCellClick: this.onSelectedDate, onSelectHasDisableDate: this.onSelectHasDisableDate, onLayout: this.setClientHeight, startDate: startDate, rowSize: rowSize }),
                    showTimePicker && React.createElement(TimePicker, { prefixCls: timePickerPrefixCls, pickerPrefixCls: timePickerPickerPrefixCls, locale: locale, title: timePickerTitle, defaultValue: defaultTimeValue, value: startDate, onValueChange: this.onTimeChange, minDate: minDate, maxDate: maxDate, clientHeight: clientHight, dateType: dateType, minuteStep: minuteStep}),
                    startDate && React.createElement(ConfirmPanel, { type: 'one', locale: locale, onConfirm: this.onConfirm, disableBtn: disConfirmBtn, formatStr: pickTime ? locale.dateTimeFormat : locale.dateFormat })
                )
            )
        );
    };

    return Calendar;
}(React.PureComponent);

export default Calendar;

Calendar.DefaultHeader = Header;
Calendar.DefaultShortcut = ShortcutPanel;
Calendar.defaultProps = {
    visible: false,
    showHeader: true,
    locale: defaultLocale,
    pickTime: true,
    showShortcut: false,
    prefixCls: 'rmc-calendar',
    type: 'one',
    defaultTimeValue: new Date(2000, 0, 1, 8),
    minuteStep: 10
};