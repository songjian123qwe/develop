import React from 'react';
import './index.less';
import {createPage, base} from 'nc-lightapp-front';
import {render} from 'src/hrpub/common/frame';
import MainAction from '../actions/main';
import Layout from 'src/hrpub/common/components/Layout';
import FormTitle from '../components/FormTitle';
import Uploader from "../components/UploaderImgWithBase64";
import TableAction from '../actions/table';
import FormAction from '../actions/form';

const {NCAnchor, NCScrollLink, NCScrollElement} = base;
const HomePage = render({
    actions: {
        mainAct: MainAction,
        tableAct: TableAction,
        formAct: FormAction
    }
})(({props, action, state}) => {
    const {cardTable, form, main} = props;
    const {areas, areaCodeList, tempImg, areaConf, language} = main;
    return (
        <div>
            <Layout className={'my-info-pc nc-bill-card'}>
                <NCAnchor>
                    {
                        areaCodeList.map((area) => {
                            return (
                                <NCScrollLink
                                    to={area}
                                    spy={true}
                                    key={area}
                                    smooth={true}
                                    duration={300}
                                    offset={-100}
                                >
                                    <span>{areas && areas[area] && areas[area].name}</span>
                                </NCScrollLink>
                            );
                        })
                    }
                </NCAnchor>
                {
                    areaCodeList.map(area => {
                        return areas && areas[area] ?
                            <NCScrollElement
                                name={area}
                                key={area}
                            >
                                {areas[area].moduletype === 'form' ?
                                    <div
                                        className="my-info-form"
                                        key={area}
                                    >
                                        <FormTitle
                                            language={language}
                                            area={area}
                                            name={areas[area].name}
                                            areaConf={areaConf}
                                            action={action.formAct.btnClick}
                                        />
                                        {area === 'bd_psndoc' &&
                                        <Uploader
                                            value={tempImg}
                                            areaConf={areaConf}
                                            onUpload={action.formAct.uploadImg}
                                            language={language}
                                        />}
                                        {form.createForm(area, {
                                            onAfterEvent: action.formAct.afterEditForm
                                        })}
                                    </div> :
                                    cardTable.createCardTable(area, {
                                        tableHead: () => action.tableAct.renderTableHead(area),
                                        showIndex: true,
                                        showCheck: true,
                                        hideSwitch: () => {
                                            return false
                                        },
                                        onHeadAngleToggle: action.tableAct.getTableData
                                    })}
                            </NCScrollElement> :
                            null
                    })
                }
            </Layout>
        </div>
    );
});

export default createPage({})(HomePage);