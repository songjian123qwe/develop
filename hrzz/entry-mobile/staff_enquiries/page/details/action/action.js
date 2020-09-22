// import {previewImImage} from '../../../../../public/mobile/utils/jsbridge' 
import { ActionSheet } from 'antd-mobile';
import Zmage from 'react-zmage'
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

export default class searchHtml {
    constructor(comp) {
        this.comp = comp
    }
    didMount = () => {
        
    }
    question = () => {
        const { props } = this.comp
        const{ exam } = props
        let a = ['a','b','c','d']
        let img = true;
        let imgList = a.map((item)=>{
            return (
                <Zmage 
                preset="mobile"
                backdrop="black"    
                controller={{
                    // 关闭按钮
                    close: false,
                    // 缩放按钮
                    zoom: false,
                    // 下载按钮
                    download: false,
                    // 旋转按钮
                    rotate: false,
                }}src="https://s2.51cto.com/oss/201804/15/e7fd81b2ead4b7cdc125fce2f2dc9cb4.jpg-wh_651x-s_3500027895.jpg" />
            )
        })
        return (
            <div className="question-title">
                <i className="hrfont hr-tiwen"></i>
                <p>
                    {exam.oneQuestionDetail.title}
                </p>
                <div className="clearfix imgBox">
                    {img?imgList:null}
                </div>
            </div>
           
        )
    }
    answers = () => {
        const { props } = this.comp
        const{ exam } = props
        return (
            <div className="answers-title">
                <i className="hrfont hr-huida"></i>
                <p onClick={this.showShareActionSheet}>
                    {/* 回答 */}
                    {exam.json['hrzzmb-000271']}
                </p>
                <div className="answers-content" dangerouslySetInnerHTML={{__html: exam.oneQuestionDetail.answer}}>
                    
                </div>
            </div>
           
        )
    }

    // 赞
    fabulous = () => {
        // alert(0)
        const { props, state } = this.comp
        const { dispatch, exam } = props
        // 已赞
        this.comp.setState({
            fabulous:'button fabulous',
            buttonText:exam.json['hrzzmb-000272']
        })
        
    }
    showShareActionSheet = () => {
        const { props } = this.comp
        const { dispatch, exam } = props
       let dataList = [
            { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
            { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
            { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
            { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
            { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
          ].map(obj => ({
            icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
            title: obj.title,
          }));
        ActionSheet.showShareActionSheetWithOptions({
          options: dataList,
          message:'分享到',
          show:exam.share
        },
        (buttonIndex) => {
            // alert(buttonIndex)
            // this.setState({ clicked1: buttonIndex > -1 ? dataList[buttonIndex].title : 'cancel' })
            // dispatch({
            //     type: 'exam/update',
            //     payload: {
            //         share: buttonIndex > -1 ? dataList[buttonIndex].title : 'cancel'
            //     }
            // });
        //   return new Promise((resolve) => {
        //     resolve
        //     console.log(resolve)
        //   });
        });
      }
    cancel = () => {
        const {props} = this.comp
        const {dispatch,exam} = props
        dispatch({
            type: 'exam/update',
            payload: {
                showSearch: false,
                showIndex: true
            }
        });
    }
}