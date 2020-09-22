import NativeObj from 'src/hrzz/public/mobile/utils/jsbridge/index.js'
import { compatibleNavImg } from 'src/hrzz/public/mobile/utils//index.js'
export default class hotProblem {
    constructor(comp) {
        this.comp = comp
    }
    didMount = () => {
        const { props } = this.comp;
        const { main, exam } = props
        this.editNav(exam.json['hrzzmb-000269'])
        // 热点问题
    }

    // 热点问题页修改导航头
    editNav(title){
        const { props } = this.comp;
        const { main } = props
        let parameters={}
		let cbs={
            goBack: main.leftClick,
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
            ]
            
		}
		let data = { 
			'function': 'configNavBar', 
			'parameters': parameters
		}
		NativeObj.configNavBar(data, cbs)
    }

    // 热点问题列表
    hotProblem = () => {
        const { props } = this.comp;
        const { exam } = props
        let problem = exam.hotProblemList.map((item)=>{
            return (
                <li className="clearfix" key = {item.pk_knowledge_base} onClick={props.hotProblem.toDetail(item.pk_knowledge_base)}>
                   <span>{item.title}</span>
                   <p>{item.remark}</p>
                </li>
            )
        })
        return (
            <ul>
                {problem}
            </ul>
        )
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