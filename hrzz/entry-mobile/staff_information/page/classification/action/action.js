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
        let classification = exam.organizationSubset.map((item)=>{
            return (
                <li className="clearfix list-w-scro"
                    onClick = {props.administration.toClassifi(false,item)}
                >
                    <div>
                        <span className="fl">{item.name}</span>
                        <span
                         style={{color:'#D0D0D0'}}
                         className="fr">{item.number}</span>
                    </div>
                    <i style={{
                        display:exam.pageFlag===true?'none':''
                    }} className="hrfont hr-you"></i>
                </li>
            )
        })
        let data={}
        exam.crumbsList.length>0 && (data=exam.crumbsList[exam.crumbsList.length-1])
        return (
            <ul className="list-admin">
                {classification}
            </ul>
        )
    }

    crumbsClick = (data,index) => {
        const {props} = this.comp
        const {dispatch,exam, administration} = props
        return () => {
            let arr = exam.crumbsList
            // 截取掉索引后面的元素，此方法更改元数据
            arr.splice(index+1)
            dispatch({
                type: 'exam/update',
                payload: {
                    crumbsList:arr
                }
            });
            administration.toClassifi(false,data,true)()
        }
       
    }
 

    // 面包屑
    crumbs = () => {
        const {props} = this.comp
        const {exam} = props
        let crumbs = exam.crumbsList.map((item,index)=>{
            return (
                <li className="crumbs-list fl" key={item.pk_defdoc} onClick={index!==(exam.crumbsList.length-1)&&this.crumbsClick(item,index)}>
                   <span>{item.name}</span>
                   <i className="hrfont hr-Arrow1"></i>
                </li>
            )
        })
        return (
            <ul className="clearfix" id="crumbs">
                {crumbs}
            </ul>
        )
    }
}