export default class searchHtml {
    constructor(comp) {
        this.comp = comp
    }
    searchHtml = () => {
        const { props } = this.comp;
        const { exam } = props
        let search = exam.searchData.map((item,index)=>{
            return (
                <li className="clearfix" key = {index} onClick={props.hotProblem.toDetail(item.pk_knowledge_base)}>
                   <span className="fl">{item.title}</span>
                </li>
            )
        })
        return (
            <ul>
                {search}
            </ul>
        )
    }
    cancel = () => {
        const {props} = this.comp
        const {dispatch,exam} = props
        dispatch({
            type: 'exam/update',
            payload: {
                showSearch: false
            }
        });
    }
}