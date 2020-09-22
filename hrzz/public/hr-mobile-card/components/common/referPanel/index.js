import React from 'react'
import './index.less'
import {Modal} from 'antd-mobile';
import ReferList from "./ReferList";
import PropTypes from "prop-types";

export default class ReferPanel extends React.Component {
    static contextTypes = {
        referAfterAct: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            modal: false, data: []
        };
    }

    show = () => {
        this.setState({
            modal: true
        });
    };

    close = () => {
        this.setState({
            modal: false
        });
        this.context.referAfterAct && this.context.referAfterAct();
    };

    onSure = (value) => {
        this.props.onChange(value);
        this.close();
    };

    render() {
        return (
            <Modal
                popup
                visible={this.state.modal}
                animationType="slide-up"
                className={'refer-panel-modal'}
            >
                <ReferList
                    {...this.props}
                    onSure={this.onSure}
                    onClose={this.close}
                />
            </Modal>
        )
    }
}