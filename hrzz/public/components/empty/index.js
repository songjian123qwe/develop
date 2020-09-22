import React, {Component} from 'react'
import './index.less'
import EmptyImg from '../../static/images/empty.png'
export default class Empty extends Component{
    constructor (props) {
        super(props)
        this.state = {

        }
    }
    render(){
        const {title = '暂无数据'} = this.props
        return (
            <div className="empty">
                <div id="pic">
                    <span className="img_empty">
                        <img className="emptyImg" src={EmptyImg}/> 
                        <p className="description">{title}</p>
                    </span>
                </div>
            </div>
        )
    }
}