import React from 'react';
import './index.less';
import TransCont from "../TransCont/index.js"
import {base} from 'nc-lightapp-front';

export default class BusiProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    render() {
        const {
            main,
            onItemChange
        } = this.props
        let transItems = main.transItems
        return(
            <div className="dept-trans-items">
                {transItems.length > 0 ? transItems.map((content, index) => {
                    return <TransCont
                        isEdit={main.isEdit}
                        index={index}
                        content={content}
                        language={main.language}
                        onChange={onItemChange}
                    />
                }) : !main.isEdit ?
                    <div className='wrapper-empty'>{main.language['hrzzpc-000078']}</div> : null}
            </div>
        )
    }
}
