export default class titleAct {
    constructor(comp) {
        this.comp = comp;
    }


    didMount = () => {
     
    }

     // 卸载
    willUnMount = () => {
      
    }

    didUpdate = () => {
        
    }

    iconClick = () => {
        const {props} = this.comp
        props.rightClick()
    }
    // 通用关闭弹窗
    closeModal = (field) => {
        return () => {
            const {props} = this.comp;
            const {dispatch,exam} = props;

            dispatch({
                type: 'exam/update',
                payload: {
                    [field]: false
                }
            });
        }
    }

}