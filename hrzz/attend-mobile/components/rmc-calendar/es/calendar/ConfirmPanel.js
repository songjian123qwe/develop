import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as React from 'react';
import { formatDate as _formatDate } from '../util';

var ConfirmPanel = function (_React$PureComponent) {
    _inherits(ConfirmPanel, _React$PureComponent);

    function ConfirmPanel() {
        _classCallCheck(this, ConfirmPanel);

        var _this = _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));

        _this.onConfirm = function () {
            var _this$props = _this.props,
                onConfirm = _this$props.onConfirm,
                disableBtn = _this$props.disableBtn;
            !disableBtn && onConfirm();
        };
        return _this;
    }

    ConfirmPanel.prototype.formatDate = function formatDate(date) {
        var _props = this.props,
            _props$formatStr = _props.formatStr,
            formatStr = _props$formatStr === undefined ? '' : _props$formatStr,
            locale = _props.locale;

        return _formatDate(date, formatStr, locale);
    };

    ConfirmPanel.prototype.render = function render() {
        var _props2 = this.props,
            type = _props2.type,
            locale = _props2.locale,
            disableBtn = _props2.disableBtn;

        var btnCls = disableBtn ? 'button button-disable' : 'button';
        if (type === 'one') {
            btnCls += ' button-full';
        }
        return React.createElement(
            'div',
            { className: 'confirm-panel' },
            React.createElement(
                'div',
                { className: btnCls, onClick: this.onConfirm },
                locale.confirm
            )
        );
    };

    return ConfirmPanel;
}(React.PureComponent);

export default ConfirmPanel;

ConfirmPanel.defaultProps = {
    formatStr: 'yyyy-MM-dd hh:mm'
};