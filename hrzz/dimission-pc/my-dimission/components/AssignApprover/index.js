import React from 'react';
import './index.less';
import {render, connect} from 'src/hrpub/common/frame';
import {base, high} from 'nc-lightapp-front';
import AssignAppAction from './actions/index';
import formAction from '../../actions/form';
import TableAction from '../../actions/table';
import ButtonAction from '../../actions/btn';

const {NCModal, NCButton, NCSelect} = base;
const {Header: NCModalHeader, Body: NCModalBody, Footer: NCModalFooter} = NCModal;
const {Transfer} = high;
const Wrapper = render({
    actions: {
        assignAct: AssignAppAction,
        formAct: formAction,
        tableAct: TableAction,
        btnAct: ButtonAction
    },
    state: {
        leftData: [],
        rightData: [],
        workflow: [],
        selectedWork: ''
    }
})(({props, state, action}) => {
    const {main} = props;
    const {assignAppVisible, language} = main;
    const {workflow, selectedWork, leftData, rightData} = state;
    return (
        <NCModal
            className="batch-edit-modal"
            show={assignAppVisible}
            onHide={action.assignAct.closeModal}
            onEntered={action.assignAct.getContent}
            backdrop={'static'}
        >
            <NCModalHeader closeButton={true}>
                {language['hrzzpc-000136']}
            </NCModalHeader>
            <NCModalBody>
                <div className='choose-bm-refer'>
                    <NCSelect
                        required={true}
                        value={selectedWork}
                        data={workflow}
                        onChange={action.assignAct.onWorkflowChange}
                    />
                </div>
                <Transfer
                    showMoveBtn={false}
                    treeType={false}
                    dataSource={leftData}
                    titles={[language['hrzzpc-000137'], language['hrzzpc-000138']]}
                    targetKeys={rightData}
                    onTargetKeysChange={action.assignAct.appChange}
                    render={item => item.title}
                    lazy={{container: "modal"}}
                />
            </NCModalBody>
            <NCModalFooter>
                <NCButton colors="primary" onClick={action.assignAct.onSure}>
                    {language['hrzzpc-000074']}
                </NCButton>
                <NCButton onClick={action.assignAct.closeModal}>
                    {language['hrzzpc-000073']}
                </NCButton>
            </NCModalFooter>
        </NCModal>
    );

});


export default connect(Wrapper);