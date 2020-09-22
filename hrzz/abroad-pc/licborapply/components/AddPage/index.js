import React from 'react';
import './index.less';

import config from './config';


const {
    actions,
    methods: {
        render,
        connect
    },
    components: {
        PageHeader,
        BackBtn,
        Layout
    }
} = config;

const {Header,Content} = Layout;

const Wrapper = render({
    actions: actions
})(({props, action, state}) => {
    const {form, emp, cardPagination} = props;
    const darkBack = emp.dark ? 'dark-back' : '';
    return (
        <Layout
            className={`employing-add-page ${darkBack}`}
        >
            <Header
                showOrgRefer={false}
                showButtons={false}
                customButton={(() => {
                    return (
                        <PageHeader
                            cardPagination={cardPagination}
                            button={props.button}
                            status={emp.addPageStatus}
                            onClick={action.mainAct.addHeaderClick}
                            language={emp.language}
                            cancelEdit={action.mainAct.cancelFormEdit}
                            fromApprove={emp.fromApprove}
                            form={form}
                            toBrowsePage={action.formAct.toBrowsePage}
                        />
                    );
                })()}
            >
                <If condition={!emp.fromApprove && emp.addPageStatus !== 'edit'}>
                    <BackBtn 
                        onClick={action.mainAct.goToBackMainPage}
                        style={{
                            marginTop: '8px'
                        }}
                    />
                </If>
            </Header>
            <Content>
                {form.createForm('card', {
                    // 编辑前事件
                    onBeforeEvent: action.mainAct.formBeforeEdit,
                    // 编辑后事件
                    onAfterEvent: action.mainAct.formAfterEdit,
                    // onAfterEvent: action.mainAct.formAfterEdit
                })}
            </Content>
        </Layout>
    );
});

export default connect(Wrapper);