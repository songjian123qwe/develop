
import React from 'react';
import './index.less';
import {connect, render} from "src/hrpub/common/frame";
import TranslateAction from "./action";
import {base} from 'nc-lightapp-front';

import Transfer from 'src/hrpub/common/components/Transfer';

const {NCTransfer, NCModal, NCButton,NCFormControl} = base;

const {Header, Body, Footer} = NCModal;
const Wrapper = render({
    actions: {
        transAct: TranslateAction
    }
})(({props, state, action}) => {
     const {
            language,
            targetKeys,
            onChange,
            visible,
            onClose,
            onClick,
            MultiInit,
            dataSource,
        } = props;
    return (
        <NCModal
                show={visible}
                onHide={onClose}
                onEntered={action.transAct.entered}
            >
                <Header
                    closeButton={true}
                >
                    {language['hrzzpc-000136'] || '指派'}
                </Header>
                <Body>
                    <Transfer
                        leftData={dataSource}
                        leftTitle={language['hrzzpc-000137'] || '待选'}
                        rightTitle={language['hrzzpc-000138'] || '已选'}
                        rightData={targetKeys}
                        onChange={onChange}
                        single = {true}
                        MultiInit={MultiInit}
                    />
                </Body>
                <Footer>
                    <NCButton
                        colors="primary"
                        onClick={onClick}
                    >
                        {language["hrzzpc-000074"] || '确定'}
                    </NCButton>
                    <NCButton
                        onClick={onClose}
                    >
                        {language["hrzzpc-000073"] || '取消'}
                    </NCButton>
                </Footer>
            </NCModal>
    );
});

export default connect(Wrapper);