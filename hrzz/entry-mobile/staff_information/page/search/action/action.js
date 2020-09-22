export default class searchHtml {
    constructor(comp) {
        this.comp = comp
    }
    

    // 组织结构列表
    organizationHtml = () => {
        const { props } = this.comp;
        const { exam, administration } = props
        let organization = exam.organizationData.map((item,index)=>{
            return (
                <li className="clearfix" key = {index} onClick={administration.toClassifi(item)}>
                   <span className="fl">{item.name}</span>
                </li>
            )
        })
        return (
            <ul className="organization">
                {organization}
            </ul>
        )
    }
    cancel = () => {
        const {props} = this.comp
        const {dispatch,exam} = props
        dispatch({
            type: 'exam/update',
            payload: {
                isSearchData:false,
                searchValue:''
            }
        });
    }

    onblur = () => {
        const {props} = this.comp
        const {dispatch,exam} = props
        if(exam.searchData.length===0&&!exam.searchValue) {
            dispatch({
            type: 'exam/update',
            payload: {
                isSearchData:false
            }
        });
        }
        
    }
}