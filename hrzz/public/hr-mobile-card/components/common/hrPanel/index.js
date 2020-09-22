import {Accordion} from 'antd-mobile';
import classNames from 'classnames';
import PanelContent from './PanelContent'
import 'src/hrpub/common/static/fonts/iconfont.css';
import './index.less'
import React from "react";

const {Panel} = Accordion
export default class HrPanel extends Panel {
    constructor(props) {
        super(props)
    }

    handleItemClick = (e) => {
        const {onItemClick, panelKey, iconClick} = this.props;
        if (e.target.classList.contains('icon')) {
            iconClick(panelKey);
            return
        }
        if (typeof onItemClick === 'function') {
            onItemClick(panelKey);
        }
    };

    render() {
        const {
            className,
            id,
            style,
            prefixCls,
            header,
            headerExtra,
            headerClass,
            children,
            isActive,
            showArrow,
            destroyInactivePanel,
            disabled,
            accordion,
            forceRender,
            expandIcon,
            extra,
            hideHeader,
            showHasDataIndicator = false
        } = this.props;
        const headerCls = classNames(`${prefixCls}-header`, {
            [headerClass]: headerClass,
        });
        const itemCls = classNames({
            [`${prefixCls}-item`]: true,
            [`${prefixCls}-item-active`]: isActive,
            [`${prefixCls}-item-disabled`]: disabled,
        }, className);

        let icon = null;
        if (showArrow && typeof expandIcon === 'function') {
            icon = React.createElement(expandIcon, {...this.props});
        }
        const showIndicator = showHasDataIndicator && children && children.length > 0;
        return (
            <div className={itemCls} style={style} id={id}>
                {!hideHeader && <div
                    className={headerCls}
                    onClick={this.handleItemClick}
                    role={accordion ? 'tab' : 'button'}
                    tabIndex={disabled ? -1 : 0}
                    aria-expanded={`${isActive}`}
                    onKeyPress={this.handleKeyPress}
                >
                    <span className="header-left-icon"></span>
                    {showArrow && (icon || <span className="icon hrfont hr-edit2"></span>)}
                    <span className="header-left-span">
                        {header}
                        {headerExtra}
                        {
                            showIndicator &&
                            <span className={'has-data-indicator' + (isActive ? ' indicator-active' : '')}>
                            <span className={`iconfont hrfont hr-right`}/>
                        </span>
                        }
                    </span>
                    {extra && (<div className={`${prefixCls}-extra`}>{extra}</div>)}
                </div>}
                <PanelContent
                    prefixCls={prefixCls}
                    isActive={isActive}
                    destroyInactivePanel={destroyInactivePanel}
                    forceRender={forceRender}
                    role={accordion ? 'tabpanel' : null}
                >
                    {children}
                </PanelContent>
            </div>
        );
    }
}