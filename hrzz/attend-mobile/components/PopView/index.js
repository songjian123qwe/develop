import React, { Component } from 'react';
import './index.less'
class index extends Component {
    render() {
        const { data = [] , clickChange = ( ) => {},status = false} = this.props
        const showData = (datas) => {
            return data.map(item => {
                 return (
                     <li onClick={()=>{clickChange(item.value)}}> {item.label}</li>
                 )
             })
         }
        return (
            <div className="sheet" style={status?{display:"block"}:{display:"none"}} >
            <ul>
                {data.length > 0 &&status ? showData(data):""}
            </ul>
        </div>
        );
    }
}

export default index;