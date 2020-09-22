import React, {Component} from 'react';
import './index.less';
import downloadImg from "../../container/functions/downloadImg";
import printImg from "../../container/functions/printImg";

class Header extends Component {
    constructor(props) {
        super(props);
        this.onBtnOperation = this.onBtnOperation.bind(this);
        this.tabChange = this.tabChange.bind(this);
    }

    tabChange(value) {
        const {page, hasImg} = this.props;
        if (!hasImg || page === value) return;
        this.props.tabChange(value);
    }

    onBtnOperation(props, btncode, areacode, opt) {
        switch (btncode) {
            case 'imgset':
                this.props.updateState({
                    imgSetModalVisible: true,
                    showDefaultCheck: false
                });
                break;
            case 'build':
                this.props.generate();
                /*this.props.updateState({
                    baseSetModalVisible: true
                });*/
                break;
            case 'refresh':
                this.props.getHistory();
                break;
            case 'save':
                this.props.saveView();
                break;
            case 'exportImg':
                downloadImg(this.props.json['jf6005-000419'], this.props.inlt);
                break;
            case 'print':
                printImg(this.props.inlt);
                break;
            default:
                break;
        }
    }

    render() {
        const {button, page, hasImg, json} = this.props;

        return (
            <div className="header">
                <div className="header-tabs">
                    <div className={hasImg ? ("tab " + (page === 'main' ? 'active' : '')) : ''}
                         onClick={() => this.tabChange('main')}>
                        {json['jf6005-000426']}{/* 国际化处理： 组织机构图版本*/}
                        <span/>
                    </div>
                    {hasImg ? <div className={"tab " + (page === 'img' ? 'active' : '')}
                                   onClick={() => this.tabChange('img')}>
                        {json['jf6005-000427']}{/* 国际化处理： 组织机构图图示*/}
                        <span/>
                    </div> : null}
                </div>
                <div className="btn-group">
                    <div className="definition-icons">
                        {button.createButtonApp({
                            area: 'head',
                            onButtonClick: (props, btncode) => {
                                this.onBtnOperation(props, btncode, 'head', this);
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
