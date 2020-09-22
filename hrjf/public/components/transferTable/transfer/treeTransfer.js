import React, { Component } from 'react';
import { base } from 'nc-lightapp-front';
let { NCButton, NCFormControl} = base;
import './treeTransfer.less';

class Treetransfer extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            disableBtns: this.props.disableBtns,
            hiddenAllMoveBtns: this.props.hiddenAllMoveBtns       
        }
    }

    componentWillReceiveProps(nextProps){
    }
    
    render(){
        return (
            <div className = {this.props.fullscreen ? 'transfer-main-table fullscreen-transfer-main':'transfer-main-table'}>
                <div className='left-wrapper'>
                    <h2>{this.props.title && this.props.title.left ? this.props.title.left : ''}</h2>
                    <div className = {this.props.fullscreen ? 'left-area fullscreen-left-area':'left-area'}>
                        {this.props.leftArea()}
                    </div>
                </div>
                <div className = 'button-area'>
                    <div className="opr-botton">
                        <NCButton onClick= {this.props.toRight} disabled={this.state.disableBtns} className={'uf uf-arrow-right'}></NCButton>
                    </div>
                    {
                        !this.state.hiddenAllMoveBtns ? 
                        <div>
                            <div className= "opr-botton">
                                <NCButton onClick={this.props.allToRight} disabled={this.state.disableBtns} className={'uf uf-2arrow-right'}></NCButton>
                            </div>
                            <div className= "opr-botton">
                                <NCButton onClick={this.props.allToLeft} disabled = {this.props.rightFixed || this.state.disableBtns ? true: false} className={'uf uf-2arrow-left'}></NCButton>
                            </div> 
                        </div> : ''
                    }
                    
                    <div className="opr-botton">
                        <NCButton onClick= {this.props.toLeft} disabled={this.state.disableBtns} className={'uf uf-arrow-left'}></NCButton>
                    </div>
                </div>
                <div className="right-wrapper">
                    <h2>{this.props.title && this.props.title.right ? this.props.title.right : ''}</h2>
                    <div className = {this.props.fullscreen ? 'right-area fullscreen-right-area':'right-area'}>
                        <div className="tree-box">
                            {this.props.rightArea()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Treetransfer.defaultProps = {
    showSearch: true
};
export default Treetransfer;
