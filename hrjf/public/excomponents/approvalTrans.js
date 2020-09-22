import React, { Component } from 'react';
import CompositeTransfer from './compositeTransfer';
import AssignTransfer from './assignTransfer';

export default class ApprovalTrans extends Component{
    constructor(props){
        super(props);
        this.type = this.props.data.flow_type;
        console.log('display',this.props.display,props.data)
        // this.isMultiSelect = this.props.data.muplityWithOutAssgin;
        this.state = {
            showModal: this.props.display,
            data: this.props.data
        };
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            data: nextProps.data,
            showModal: nextProps.display
        });
    }
    render(){
        return (
            this.type == 'workflow' ?  <AssignTransfer title={this.props.title || this.state.json['jf6005-000022']} getResult={this.props.getResult}  data = {this.state.data} cancel={this.props.cancel} hideNote={this.props.hideNote} display={this.state.showModal}/>/* 国际化处理： 选择下游环节*/
            :<CompositeTransfer title={this.props.title || this.state.json['jf6005-000023']} data={this.state.data} getResult={this.props.getResult} cancel={this.props.cancel} display={this.state.showModal}/>/* 国际化处理： 指派*/
        );
    }
}
