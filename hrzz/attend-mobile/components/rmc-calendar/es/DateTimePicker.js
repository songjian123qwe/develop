import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import MultiPicker from 'rmc-picker/es/MultiPicker';
import Picker from 'rmc-picker/lib/Picker';
import defaultLocale from './locale/en_US';
function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
function pad(n) {
    return n < 10 ? '0' + n : n + '';
}
function cloneDate(date) {
    return new Date(+date);
}
var TIME = 'time';
var HALFDATE = 'halfDate';
var ONE_DAY = 24 * 60 * 60 * 1000;

var DatePicker = function (_React$Component) {
    _inherits(DatePicker, _React$Component);

    function DatePicker() {
        _classCallCheck(this, DatePicker);

        var _this = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).apply(this, arguments));

        _this.state = {
            date: _this.props.date || _this.props.defaultDate
        };
        _this.getNewDate = function (values, index) {
            var value = parseInt(values[index], 10);
            var props = _this.props;
            var mode = props.mode;

            var newValue = cloneDate(_this.getDate());
            if (mode === HALFDATE) {
                _this.setAmPm(newValue, value);
            } else if (mode === TIME) {
                switch (index) {
                    case 0:
                        _this.setHours(newValue, value);
                        break;
                    case 1:
                        newValue.setMinutes(value);
                        break;
                    case 2:
                        _this.setAmPm(newValue, value);
                        break;
                    default:
                        break;
                }
            }
            return _this.clipDate(newValue);
        };
        _this.onValueChange = function (values, index) {
            var props = _this.props;
            var newValue = _this.getNewDate(values, index);
            if (!('date' in props)) {
                _this.setState({
                    date: newValue
                });
            }
            if (props.onDateChange) {
                props.onDateChange(newValue);
            }
            if (props.onValueChange) {
                props.onValueChange(values, index);
            }
        };
        _this.onScrollChange = function (values, index) {
            var props = _this.props;
            if (props.onScrollChange) {
                var newValue = _this.getNewDate(values, index);
                props.onScrollChange(newValue, values, index);
            }
        };
        return _this;
    }

    _createClass(DatePicker, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('date' in nextProps) {
                this.setState({
                    date: nextProps.date || nextProps.defaultDate
                });
            }
        }
    }, {
        key: 'setHours',
        value: function setHours(date, hour) {
            if (this.props.use12Hours) {
                var dh = date.getHours();
                var nhour = hour;
                nhour = dh >= 12 ? hour + 12 : hour;
                nhour = nhour >= 24 ? 0 : nhour;                 
                date.setHours(nhour);
            } else {
                date.setHours(hour);
            }
        }
    }, {
        key: 'setAmPm',
        value: function setAmPm(date, index) { // index 0 上午  1 下午
            if (index === 0) {
                date.setHours(8);
            } else {
                date.setHours(20);
            }
        }
    }, {
        key: 'getDefaultMinDate',
        value: function getDefaultMinDate() {
            if (!this.defaultMinDate) {
                this.defaultMinDate = new Date(2000, 1, 1, 0, 0, 0);
            }
            return this.defaultMinDate;
        }
    }, {
        key: 'getDefaultMaxDate',
        value: function getDefaultMaxDate() {
            if (!this.defaultMaxDate) {
                this.defaultMaxDate = new Date(2030, 1, 1, 23, 59, 59);
            }
            return this.defaultMaxDate;
        }
    }, {
        key: 'getDate',
        value: function getDate() {
            return this.clipDate(this.state.date || this.getDefaultMinDate());
        }
        
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.getDate();
        }
    }, {
        key: 'getMinDay',
        value: function getMinDay() {
            return this.getMinDate().getDate();
        }
    }, {
        key: 'getMaxDay',
        value: function getMaxDay() {
            return this.getMaxDate().getDate();
        }
    }, {
        key: 'getMinHour',
        value: function getMinHour() {
            return this.getMinDate().getHours();
        }
    }, {
        key: 'getMaxHour',
        value: function getMaxHour() {
            return this.getMaxDate().getHours();
        }
    }, {
        key: 'getMinMinute',
        value: function getMinMinute() {
            return this.getMinDate().getMinutes();
        }
    }, {
        key: 'getMaxMinute',
        value: function getMaxMinute() {
            return this.getMaxDate().getMinutes();
        }
    }, {
        key: 'getMinDate',
        value: function getMinDate() {
            return this.props.minDate || this.getDefaultMinDate();
        }
    }, {
        key: 'getMaxDate',
        value: function getMaxDate() {
            return this.props.maxDate || this.getDefaultMaxDate();
        }
    }, {
        key: 'getDateData',
        value: function getDateData() {
            var _props = this.props,
                locale = _props.locale,
                formatDay = _props.formatDay;
            var date = this.getDate();
            var days = [];
            var minDay = 1;
            var maxDay = getDaysInMonth(date);
            for (var _i2 = minDay; _i2 <= maxDay; _i2++) {
                var _label = formatDay ? formatDay(_i2, date) : _i2 + locale.day + '';
                days.push({
                    value: _i2 + '',
                    label: _label
                });
            }
            return [{ key: 'day', props: { children: days } }];
        }
    }, {
        key: 'getDisplayHour',
        value: function getDisplayHour(rawHour) {
            if (this.props.use12Hours) {
                if (rawHour === 0) {
                    rawHour = 12;
                }
                if (rawHour > 12) {
                    rawHour -= 12;
                }
                return rawHour;
            }
            return rawHour;
        }
    }, {
        key: 'getTimeData',
        value: function getTimeData(date) {
            var _props2 = this.props,
                _props2$minHour = _props2.minHour,
                minHour = _props2$minHour === undefined ? 0 : _props2$minHour,
                _props2$maxHour = _props2.maxHour,
                maxHour = _props2$maxHour === undefined ? 23 : _props2$maxHour,
                _props2$minMinute = _props2.minMinute,
                minMinute = _props2$minMinute === undefined ? 0 : _props2$minMinute,
                _props2$maxMinute = _props2.maxMinute,
                maxMinute = _props2$maxMinute === undefined ? 59 : _props2$maxMinute;
            var _props3 = this.props,
                locale = _props3.locale,
                minuteStep = _props3.minuteStep,
                use12Hours = _props3.use12Hours;

            var minDateMinute = this.getMinMinute();
            var maxDateMinute = this.getMaxMinute();
            var minDateHour = this.getMinHour();
            var maxDateHour = this.getMaxHour();
            var hour = date.getHours();
            minHour = minDateHour;
            if (minDateHour === hour) {
                minMinute = minDateMinute;
            }
            maxHour = maxDateHour;
            if (maxDateHour === hour) {
                maxMinute = maxDateMinute;
            }
            var hours = [];
            if (minHour === 0 && maxHour === 0 || minHour !== 0 && maxHour !== 0) {
                minHour = this.getDisplayHour(minHour);
            } else if (minHour === 0 && use12Hours) {
                minHour = 1;
                hours.push({ value: '0', label: locale.hour ? '12' + locale.hour : '12' });
            }
            maxHour = this.getDisplayHour(maxHour);
            for (var i = minHour; i <= maxHour; i++) {
                hours.push({
                    value: i + '',
                    label: locale.hour ? i + locale.hour + '' : pad(i)
                });
            }
            var minutes = [];
            var selMinute = date.getMinutes();
            for (var _i3 = minMinute; _i3 <= maxMinute; _i3 += minuteStep) {
                minutes.push({
                    value: _i3 + '',
                    label: locale.minute ? _i3 + locale.minute + '' : pad(_i3)
                });
                if (selMinute > _i3 && selMinute < _i3 + minuteStep) {
                    minutes.push({
                        value: selMinute + '',
                        label: locale.minute ? selMinute + locale.minute + '' : pad(selMinute)
                    });
                }
            }
            var cols = [{ key: 'hours', props: { children: hours } }, { key: 'minutes', props: { children: minutes } }].concat(use12Hours ? [{
                key: 'ampm',
                props: { children: [{ value: '0', label: locale.am }, { value: '1', label: locale.pm }] }
            }] : []);
            return { cols: cols, selMinute: selMinute };
        }
    }, {
        key: 'clipDate',
        value: function clipDate(date) {
            var mode = this.props.mode;

            var minDate = this.getMinDate();
            var maxDate = this.getMaxDate();
            if (mode === TIME) {
                var maxHour = maxDate.getHours();
                var maxMinutes = maxDate.getMinutes();
                var minHour = minDate.getHours();
                var minMinutes = minDate.getMinutes();
                var hour = date.getHours();
                var minutes = date.getMinutes();
                if (hour < minHour || hour === minHour && minutes < minMinutes) {
                    return cloneDate(minDate);
                }
                if (hour > maxHour || hour === maxHour && minutes > maxMinutes) {
                    return cloneDate(maxDate);
                }
            }
            return date;
        }
    }, {
        key: 'getValueCols',
        value: function getValueCols() {
            var _props4 = this.props,
                locale = _props4.locale,
                mode = _props4.mode,
                use12Hours = _props4.use12Hours;
            var date = this.getDate();
            var cols = [];
            var value = [];
            if (mode === TIME) {
                var time = this.getTimeData(date);
                cols = cols.concat(time.cols);
                var hour = date.getHours();
                var dtValue = [hour + '', time.selMinute + ''];
                var nhour = hour;
                if (use12Hours) {
                    nhour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                    dtValue = [nhour + '', time.selMinute + '', (hour >= 12 ? 1 : 0) + ''];
                }
                value = value.concat(dtValue);
            } else if (mode === HALFDATE) {
                var hours = date.getHours()
                cols = cols.concat([
                    {
                        key: 'ampm',
                        props: { 
                            children: [
                                { value: '0', label: locale.am }, 
                                { value: '1', label: locale.pm }
                            ]
                        }
                    }
                ]);
                value = value.concat(hours > 12 ? '1' : '0');
            }
            return {
                value: value,
                cols: cols
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _getValueCols = this.getValueCols(),
                value = _getValueCols.value,
                cols = _getValueCols.cols;

            var _props5 = this.props,
                disabled = _props5.disabled,
                pickerPrefixCls = _props5.pickerPrefixCls,
                prefixCls = _props5.prefixCls,
                rootNativeProps = _props5.rootNativeProps,
                className = _props5.className,
                style = _props5.style,
                itemStyle = _props5.itemStyle;

            var multiStyle = _extends({ flexDirection: 'row', alignItems: 'center' }, style);
            return React.createElement(MultiPicker, { style: multiStyle, rootNativeProps: rootNativeProps, className: className, prefixCls: prefixCls, selectedValue: value, onValueChange: this.onValueChange, onScrollChange: this.onScrollChange }, cols.map(function (p) {
                return React.createElement(Picker, { style: { flex: 1 }, key: p.key, disabled: disabled, prefixCls: pickerPrefixCls, itemStyle: itemStyle }, p.props.children.map(function (item) {
                    return React.createElement(Picker.Item, { key: item.value, value: item.value }, item.label);
                }));
            }));
        }
    }]);

    return DatePicker;
}(React.Component);

DatePicker.defaultProps = {
    prefixCls: 'rmc-date-picker',
    pickerPrefixCls: 'rmc-picker',
    locale: defaultLocale,
    mode: TIME,
    disabled: false,
    minuteStep: 1,
    onDateChange: function onDateChange() {},

    use12Hours: false
};
export default DatePicker;