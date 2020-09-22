/**
 *
 * 一个上传组件加预览组件
 * 利用了filerader
 *
 */

import React, {Component} from 'react';
import './index.less';

class Uploader extends Component {
    constructor(props) {
        super(props);
        this.uploadHandle = this.uploadHandle.bind(this);
    }

    uploadHandle(e) {
        let file = this.input.files[0];

        if (FileReader && file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.props.onUpload && this.props.onUpload(e.target.result, file);
            };
            reader.readAsDataURL(file);
        }
    }

    render() {
        const {value, areaConf = {}, language = {}} = this.props;
        const conf = areaConf['bd_psndoc'] || {};

        return (
            <div className="my-info-photo">
                <div
                    className="uploader-photo-wrapper"
                >
                    <input
                        type="file"
                        className="photo-upload"
                        ref={ref => this.input = ref}
                        onChange={this.uploadHandle}
                        disabled={!conf.editing}
                    />
                    {value ? <img
                        src={value}
                        className="photo-show-box"
                    /> : <div className="no-photo-text">
                        {language['hrzzpc-000090']}
                    </div>}
                </div>
            </div>
        );
    }
}

export default Uploader;
