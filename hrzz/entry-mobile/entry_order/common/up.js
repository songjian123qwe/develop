/**
 *
 * Created by qiaoshi on 2019-05-18
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ajax from '../../../public/mobile/utils/ajax'
import { Toast,Modal } from 'antd-mobile';



class Upload  extends Component{
    constructor (props) {
        super(props);
        this.state = {
            imgFile : [],
            index:0
        }
        this.changed = this.props.changed
    }
    componentDidMount () {
              // 判断是否是ios
            if(!!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
                let fileNode = document.getElementById('file')
                fileNode.removeAttribute("capture","camera");
            }
    }

    handleInputChange = (event) => {
        // 获取当前选中的文件

        let arr = []
        const file =event.target.files
        
        const imgMasSize = 1024 * 1024 * 10; // 10MB
        if ( Array.from(file).length > 4) {
            Toast.info(this.props.json['hrzzmb-000027'])
            // '最多同时只可上传4个文件'
            return;
        }
        let flag = false
        for(let i = 0;i< Array.from(file).length;i++) {
            // 检查文件类型
            let index = Array.from(file)[i].name.lastIndexOf('.')
            let fileStyle = Array.from(file)[i].name.substr(index + 1)
            if(['jpeg', 'png', 'jpg' ,'pdf','docx','xlsx','xls'].indexOf(fileStyle) < 0&&['jpeg', 'png', 'jpg'].indexOf(Array.from(file)[i].type.split("/")[1]) < 0){
                // 自定义报错方式
                Toast.info(this.props.json['hrzzmb-000026'])
                // 文件类型仅支持 jpeg/png/jpg/pdf/docx/xlsx/xls'

                return;
            }

              // 文件大小限制
            if(Array.from(file)[i].size > imgMasSize ) {
                // 文件大小自定义限制
                // 文件大小不能超过10MB!
                Toast.info(this.props.json['hrzzmb-000028'])
                return;
            }
        }

        this.interface(file)

    }

    interface = (file) => {

        this.changed(file)

    }
   
    render () {
        
        return (
            <div class="uploader" >
               <input type='file'
                id = "file"
                style={{opacity:0}}
                // accept='image/*'
                capture="camera"
                multiple
                onChange={this.handleInputChange} />
            </div>
        )
    }
}

export default Upload 