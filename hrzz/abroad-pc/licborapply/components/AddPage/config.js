/**
 * 
 * 
 * 编辑页面配置文件
 * 
 */

 // actions
import MainAction from './actions/main';
import FormAction from '../../actions/turnToFormPage';
import RowHandleAction from '../../actions/rowHandle';
import BtnAction from '../../actions/btn'

// 方法
import {render, connect} from '../../../../../hrpub/common/frame';

// 组件
import Layout from '../../../../../hrpub/common/components/Layout';
import BackBtn from '../../../../../hrpub/common/components/hr-back';
import PageHeader from './components/Header';


 export default {
     actions: {
        mainAct: MainAction,
        formAct: FormAction,
        rowAct: RowHandleAction,
        btnAct: BtnAction
     },
     methods: {
        render,
        connect
     },
     components: {
        Layout,
        BackBtn,
        PageHeader
     }
 }