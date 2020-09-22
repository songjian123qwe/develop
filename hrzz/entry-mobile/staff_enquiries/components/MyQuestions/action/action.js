export default class questionHtml {
    constructor(comp) {
        this.comp = comp
    }
    questionHtml = () => {
        const { props } = this.comp;
        const { exam } = props;
        let question = exam.myQuestions.map((item,index)=>{
            return (
                <li key = {index} onClick={props.hotProblem.toDetail(item.pk_questions,1)}>
                   <span className="fl">{item.title}</span>
                   <span className="fr">{item.creationtime.slice(0,11)}</span>
                </li>
            )
        })
        return (
            <ul>
                {question}
            </ul>
        )
    }
}