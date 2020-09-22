import {Component} from 'react'
import PropTypes from "prop-types";
import Index from './index'
import {compatibleNavImg } from '../../../public/mobile/utils/index';
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js'
export default class Adapter extends Component{
    constructor(props) {
        super(props)
    }
    static childContextTypes = {
        referAfterAct: PropTypes.func
    };
    getChildContext() {
        return {
            referAfterAct: this.resetHeader
        };
    }
    resetHeader = () => {
        const {exam} = this.props
        // 我的调动
        this.editNav(exam.json['hrzzmb-000285']);
    };
    leftClick = () => {
        const {dispatch,exam} = this.props
        const {editstate, examine, chiocLock} = exam
        if(examine) {
            dispatch({
                type: 'exam/update',
                payload: {
                    examine:false
                }
            });
        } else if (!chiocLock) {
            if (editstate) {
                NativeObj.closePage()
            } else {
                dispatch({
                    type: 'exam/update',
                    payload: {
                        chiocLock:true
                    }
                });
            }
        } else {
           NativeObj.closePage()
        }
        
    }
    editNav = (title) => {
        let parameters={}
		let cbs={
            goBack: this.leftClick
		}
		parameters={
			leftItems: [
				{
					callback: 'goBack',                 
					icon:compatibleNavImg(location.origin+'/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
				}
            ],
            centerItems: [
				{
					title: title,
				}
            ],
            rightItems: []
		}
		let data = { 
			'function': 'configNavBar', 
			'parameters': parameters
		}
		NativeObj.configNavBar(data, cbs)
    }
    render () {
        return (
            <Index {...this.props} leftClick={this.leftClick.bind(this)} editNav={this.editNav.bind(this)}/>
        )
    }
}