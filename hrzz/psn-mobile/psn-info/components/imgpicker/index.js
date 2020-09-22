import React, {Component} from 'react';
import './index.less'

class ImagePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageData: props.imageData
        };
        this.removeImage = this.removeImage.bind(this);
        this.uploadImg = this.uploadImg.bind(this);
        this.uploadHandle = this.uploadHandle.bind(this);
    }

    removeImage(e) {
        e.stopPropagation();
        this.props.onChange && this.props.onChange('');
        this.setState({imageData: ''})
    }

    uploadHandle(e) {
        let file = this.inputNode.files[0];
        if (FileReader && file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.props.onChange && this.props.onChange(e.target.result);
                this.setState({
                    imageData: e.target.result
                });
            };
            reader.readAsDataURL(file);
        }
    }

    uploadImg() {
        if (!this.props.editable) return;
        this.inputNode.click();
    }

    render() {
        const {imageData} = this.state;
        const {editable} = this.props;
        return (
            <div className='psn-image-picker'>
                {imageData ? <div className="am-image-picker-item">
                        {editable ?
                            <div className="am-image-picker-item-remove" onClick={(e) => this.removeImage(e)}/> : null}
                        <img src={imageData} onClick={this.uploadImg}/>
                    </div> :
                    editable ? <div className="img-picker-btn" onClick={this.uploadImg}>
                        <i className={`iconfont hrfont hr-head`}/>
                    </div> : null}
                <input
                    type="file"
                    className="photo-upload"
                    ref={node => this.inputNode = node}
                    onChange={this.uploadHandle}
                />
            </div>
        )
    }
}

export default ImagePicker;