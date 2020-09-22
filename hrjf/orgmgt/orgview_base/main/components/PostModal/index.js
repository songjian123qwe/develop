import React, {Component} from 'react';
import commModal from '../CommModal';

class PostModal extends Component {
    render() {
        const {table} = this.props;
        return (
            <div>
                {
                    table.createSimpleTable('subpostgrid', {
                        showIndex: true
                    })
                }
            </div>
        );
    }
}

export default commModal(PostModal, 'jf6005-000030');/* 国际化处理： 联查岗位,联查岗位*/
