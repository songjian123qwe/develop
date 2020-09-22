export default class HotHtml {
    constructor(comp) {
        this.comp = comp
    }
    hotHtml = () => {
        const { props} = this.comp;
        const { exam } = props
        let arr = exam.hotProblemList.slice(0,5)
        let hotCard = arr.map((item,index)=>{
            return (
                <div onClick={props.hotProblem.toDetail(item.pk_knowledge_base)} key={item.pk_knowledge_base} className={`hotCard hotCard-color${index%3}`}>
                    <div className="content">
                        {item.title}
                    </div>
                    <p>{item.visits_num}<i className="hrfont hr-eye"></i></p>
                </div>
            )
        })
        return (
            <div 
                style={{width:`${2.52*(exam.hotProblemList.length>5?5:exam.hotProblemList.length)}rem`}}
                className="hotBox clearfix">
                {hotCard}
            </div>
        )
    }
}