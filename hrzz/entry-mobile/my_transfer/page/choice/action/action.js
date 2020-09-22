import {DTextarea} from '../../../../../public/mobile/components/index'
import { Picker, List, Checkbox } from 'antd-mobile';
import Uploader from '../../../components/Uploader/up'
import Zmage from 'react-zmage'
import excel from '../../../../img/excel.png'
import pdf from '../../../../img/pdf.png'
import word from '../../../../img/word.png'
import pic from '../../../../img/imglogo.png'
const CheckboxItem = Checkbox.CheckboxItem;
export default class hotProblem {
    constructor(comp) {
        this.comp = comp
    }

    didMount = () => {
    }

    nextStep = () => {
        const {props} = this.comp
        const {dispatch,exam, main} = props
        
        let lock = exam.store.checkAllFields(exam.newFormId)
        let formDataValue = exam.store.getFormData(exam.newFormId)
        if(!lock)return;
        let transMode = formDataValue.rows[0].values.stapply_mode.value;
        let transType = formDataValue.rows[0].values.pk_trnstype.value;
        main.initTwo(transMode,transType)
        
    }

}