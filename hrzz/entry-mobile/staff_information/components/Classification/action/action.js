export default class classHtml {
    constructor(comp) {
        this.comp = comp
    }
    classHtml = () => {
        const { props } = this.comp
        const { exam, hotProblem } = props
        
        let hotCard = exam.classfiList.map((item,index)=>{
            return (
                <div onClick = {hotProblem.toClassifi(item)} className="classCard" key={item.pk_defdoc}>
                    <span
                        style={{backgroundColor:exam.classColor[index%5]}}
                    >{item.name.slice(0,1)}</span>
                    <p>{item.name}</p>
                </div>
            )
        })
        return (
            <div 
                style={{width:`${1.62*exam.classfiList.length}rem`}}
                className="hotBox clearfix">
                {hotCard}
            </div>
        )
    }
}