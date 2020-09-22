import render from 'src/hrpub/common/frame/render';

import { high } from 'nc-lightapp-front';

const {ApproveDetail,ApprovalTrans} = high;


import tableAct from '../actions/table';

import formAct from '../actions/form';
import AddCard from '../components/addCard';


import main from '../actions/main';


import {createPage} from 'nc-lightapp-front';

import Header from '../components/Header';

import Table from '../components/Table'

import EmptyImg from 'src/hrpub/common/components/emptyImg';
import Uploader from '../components/upload'
import btn from '../actions/btn'
import Layout from 'src/hrpub/common/components/Layout';
import './index.less';

const Homepage =  render({
    actions: {
        table:tableAct,
        main:main,
        formAct:formAct,
        btnAct:btn
    },
    customData: ''
})(({props, action, state}, {customData}) => {
    const {search,exam} = props;
    const {appshowFlow,appbillid,appbilltype} = exam;
    let dark = exam.dark?'dark':'';
    return (
        <div className={`salaryAuthority ${dark}`}>
            <Header 
                {...props}
                btn = {action.btnAct}
                formAct = {action.formAct}
            />
            <div className="enpty"
                style = {{display:exam.cardMode === true? 'none' : 'block'}} 
            >
                {exam.refValue.refpk&&exam.templateFlag?
                <Table 
                    {...props} 
                    main = {action.main}
                    table = {action.table}
                />:<EmptyImg text = {exam.json['ga6013-000033']} />} 
            </div>
            <div className="enpty"
                style = {{display:exam.cardMode === true? 'block' : 'none'}}
            >
                <AddCard
                    {...props}
                    // main = {action.main}
                />
            </div>
            
            {/* <OrgSituationModal 
            {...props}
            /> */}
            {/* <BatchAddModal
                {...props}
                batAddAct = {action.batAddAct}
                formAct = {action.formAct}
            /> */}
             <div style={{ display: 'none' }}>
                {search.NCCreateSearch('query', {
                    clickSearchBtn: action.main.toSearch
                })}
            </div>
            {
                exam.fileManagerModalVisible === true?(<FileManager
                    billid={exam.billid}
                    json = {exam.json}
                    onClose={action.main.closeModal('fileManagerModalVisible')}
                />):null
            }
            {exam.approveDetail === true?( <ApproveDetail
                show={true}
                close={action.main.closeModal('approveDetail')}
                billtype={exam.billtype}
                billid={exam.billid}
                    />):null}
                     {/* appshowFlow: false,
        appbillid: '',
        appbilltype: '', */}
                {/* <If condition = {exam.appshowFlow}>
                {console.log(exam.appshowFlow)} */}
                    <ApproveDetail
                        show={appshowFlow}
                        close={(e)=>action.formAct.closeFlow()}
                        billtype={appbilltype}
                        billid={appbillid}
                    />
                {/* </If> */}
                <If condition ={exam.showUploader}>
                    <Uploader {...props}/>
                </If>
                {exam.compositedisplay ? <ApprovalTrans
                    title={"指派"}  /* 国际化处理： 指派*/
                    data={exam.compositedata}
                    display={exam.compositedisplay}
                    getResult={action.table.getResult}
                    cancel={action.table.turnOff}
                /> : ""}
            
        </div>
    )
});

export default createPage({})(Homepage)