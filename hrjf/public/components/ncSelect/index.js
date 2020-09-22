/**
 * 下拉组件
 */
import React, {Component} from 'react';

import './index.less';

import {
    base
} from 'nc-lightapp-front';

const {
    NCSelect,
} = base;

/**
 * 下拉组件
 *
 */
class NCSelectTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: props.json,
            inlt: props.inlt,
            focus: '',
            iconFlag: '',
            open: false
        };
    }

    componentWillReceiveProps(nextprops) {
        let nextjson = JSON.stringify(nextprops.json);
        let thisjson = JSON.stringify(this.props.json);
        let nextinlt = JSON.stringify(nextprops.inlt);
        let thisinlt = JSON.stringify(this.props.inlt);
        if (nextjson !== thisjson || nextinlt !== thisinlt) {
            this.setState({
                json: nextprops.json,
                inlt: nextprops.inlt,
            })
        }
    }

    onChange = (val) => {
        this.props.onChange(val);
    };

    onInputChange = (e) => {
        let val = e.target.value;
        this.onChange(val);
    };

    onSelectChange = (val) => {
        this.onChange(val);
        let iconFlag = !this.state.open;
        this.setState({
            iconFlag: iconFlag ? 'active' : '',
            open: iconFlag,
            focus: iconFlag ? 'focus' : '',
        })
    };

    iconClick = () => {
        let iconFlag = !this.state.open;
        this.setState({
            iconFlag: iconFlag ? 'active' : '',
            open: iconFlag,
            focus: iconFlag ? 'focus' : '',
        });
        if(iconFlag){
            console.log(this.inputnode);
            this.inputnode.focus();
        }
    };

    render() {
        let {onChange, ...others} = this.props;
        return (
            <div className={'input-select'}>
                <div className={'input-icon ' + this.state.focus}>
                    <input
                        onChange={this.onInputChange}
                        {...others}
                        onFocus={()=>{
                            this.setState({
                                focus:'focus'
                            })
                        }}
                        onBlur={()=>{
                            this.setState({
                                focus:'',
                                iconFlag: '',
                                open: false
                            })
                        }}
                        className={'input-box'}
                        ref={(node)=>{
                            this.inputnode = node;
                        }}
                    />

                    <span className={"icon hrfont " + this.state.iconFlag}
                          onClick={this.iconClick}>&#xe639;</span>

                </div>

                <NCSelect
                    className={'select-box'}
                    onChange={this.onSelectChange}
                    {...others}
                    open={this.state.open}
                />
            </div>
        );
    }
}

export default NCSelectTag
