export default class classHtml {
    constructor(comp) {
        this.comp = comp
    }

    answerHtml = () => {
        const {props} = this.comp
        const {exam} = props

        let answer = exam.newProblemList && exam.newProblemList.slice(0, 5).map((item, index) => {
            return (
                <li onClick={props.hotProblem.toDetail(item.pk_knowledge_base)} key={index}
                    className="anwer-list clearfix">
                    <span className="fl">{item.title}</span>
                    <span className="fr">{item.modifiedtime && item.modifiedtime.slice(0, 11)}</span>
                </li>
            )
        })
        return (
            <ul>
                {answer}
            </ul>
        )
    }
}