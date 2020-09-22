/** 
 * 
 * container组件的配置文件
 * 
 */

// actions
import MainAction from '../actions/main';
import ButtonAction from '../actions/btn';
import TableAction from '../actions/table';
import FormAction from '../actions/turnToFormPage';
import RowHandleAction from '../actions/rowHandle';
import PaginationAction from '../actions/pagination';

// 本节点组件
import AddPage from '../components/AddPage';
import FileManager from '../components/Uploader';
import HeaderMiddleContent from '../components/Header';
// 公用组件
import Layout from '../../../../hrpub/common/components/Layout';
import Pagination from '../../../../hrpub/common/components/Pagination';
import EmptyPage from '../../../../hrpub/common/components/emptyImg';

// 框架方法
import {createPage, high} from 'nc-lightapp-front';
import {render} from '../../../../hrpub/common/frame';

export default {
    actions: {
        mainAct: MainAction,
        btnAct: ButtonAction,
        tableAct: TableAction,
        formAct: FormAction,
        rowAct: RowHandleAction,
        pageAct: PaginationAction
    },
    components: {
        
        //头部
        HeaderMiddleContent,
        //布局
        Layout,
        //分页
        Pagination,
        EmptyPage,
        //新增页面
        AddPage,
        //附件管理
        FileManager,
    },
    methods: {
        createPage,
        high,
        render
    }
}