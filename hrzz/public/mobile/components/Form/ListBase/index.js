import React, {Component} from 'react';
import './index.less'



class ListBase extends Component {
  
  render() {
    const {
      type = 'delete',
      title = '请输入',
      titleClick = ()=>{},
      iconFun = ()=>{},
    } = this.props;
    let iconDom
    switch (type){
      case 'delete':
        iconDom=
          <div class="info-frame-delete" onClick={iconFun}>
              <div class="info-delete">
                  <i class="icon hrfont hr-dustbin "></i>
              </div>
          </div>
        break;
      default :
        iconDom= <div></div>
        break;
    }
    return (
      <div class="info-list d-list-base" >
          <div class="info-frame-main" onClick={titleClick}>
              <p class="info-main-txt">{title}</p>
          </div>
          {
            iconDom
          }
      </div>
    );
  }
}


export default ListBase