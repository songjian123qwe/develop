import img from '../img/right.png'
export default class hotProblem {
    constructor(comp) {
        this.comp = comp
    }

    didMount = () => {
    }

    // 分类列表
    classList = () => {
        const { props, action } = this.comp
        const { exam } = props
        let classification = exam.classfiPageList.list.map((item)=>{
            return (
                <li className="clearfix list-w-scro"
                    onClick = {props.hotProblem.toClassOrDetail(item)}
                >
                   <span>{item.name||item.title}</span>
                   <i style={{
                       display:exam.pageFlag===true?'none':''
                   }} className="hrfont hr-you"></i>
                </li>
            )
        })
        let data={}
        exam.crumbsList.length>0 && (data=exam.crumbsList[exam.crumbsList.length-1])
        return (
            <ul>
                <li onClick={props.hotProblem.searchAllQuestion(data)} style={{display:exam.classfiPageList.isExistQuestion?'':'none'}} className="import-qustion"><span>{data.name}<img src={img}/></span></li>
                {classification}
            </ul>
        )
    }

    crumbsClick = (data,index) => {
        const {props} = this.comp
        const {dispatch,exam, hotProblem} = props
        return () => {
            let arr = exam.crumbsList
            // 截取掉索引3后面的元素，次方法更改元数据
            arr.splice(index+1)
            dispatch({
                type: 'exam/update',
                payload: {
                    crumbsList:arr
                }
            });
            hotProblem.toClassifi()(data,true)
        }
       
    }
 

    // 面包屑
    crumbs = () => {
        const {props} = this.comp
        const {dispatch,exam} = props
        let arr = JSON.parse(JSON.stringify(exam.crumbsList))
        let crumbs = exam.crumbsList.map((item,index)=>{
            return (
                <li className="crumbs-list fl" key={item.pk_defdoc} onClick={index!==(exam.crumbsList.length-1)&&this.crumbsClick(item,index)}>
                   <span>{item.name}</span>
                   <i className="hrfont hr-Arrow1"></i>
                </li>
            )
        })
        
        return (
            <div
                className="width-w"
            >
                <ul className="clearfix">
                    {crumbs}
                </ul>
            </div>
            
        )

        dispatch({
            type: 'exam/update',
            payload: {
                showSearch: false,
                showIndex: true
            }
        });
    }
}