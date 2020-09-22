import React from 'react';
import './index.less';
import {base} from 'nc-lightapp-front';
import HrInput from 'src/hrpub/common/components/hr-input';

const {NCTextArea, NCInput, NCDatePicker,NCFormControl} = base;

export default (props) => {
    const {index, content, isEdit, onInsert, onRemove, onChange, language,onSearch} = props;
    return <div className='dept-trans-cont'>
        <div className="tran-cont-header">
            <header className="light-tabs-header tabs-header-pack">
                <div className="light-tabs-header-tabs">
                    <ul className="tabs-wraps single-tab">
                        <li className="active">
                            <a href="javascript:"
                               tabIndex="0">
                                {language['hrzzpc-000112']} {index + 1}
                            </a>
                        </li>
                    </ul>
                </div>
            </header>
            <span className="form-title-dashed"/>
            {
                isEdit ? <div className="header-action">
                    <i className={"icon iconfont icon-zengjia"} onClick={() => onInsert(index)}/>
                    {index !== 0 ?
                        <i className={"icon iconfont icon-shanchu2"} onClick={() => onRemove(index)}/> : null}
                </div> : null
            }
        </div>
        <div className={'lightapp-component-form'}>
            <span>
                <div className="leftspace form-item" style={{width: '0%'}}/>
                <div className="bill_code js-type-input form-item" style={{width: '33%'}}>
                        <div className="form-item-label">
                            {isEdit ? <span className="u-mast">*</span> : null}
                            {language['hrzzpc-000113']}
                            {isEdit ? null : <span> :</span>}
                            <span className="form-item-colon"/>
                        </div>
                        <div className="form-item-control ">
                            <div className="form-component-item-wrapper input-wrapper edit">
                                {isEdit ? <HrInput
                                    maxTextLength={20}
                                    width = {'200px'}
                                    value={content.handoverman}
                                    placeholders={language['hrzzpc-000139'] || '请选择指派人员'}
                                    // onChange={value => onChange('handoverman', index, value)}
                                    // type = 'search'
                                    onSearch = {()=>onSearch(index)}
                                /> : <span>
                                    {content.handoverman?content.handoverman:null}
                                </span>}
                            </div>
                        </div>
                    </div>
            </span>
            <span>
                <div className="leftspace form-item" style={{width: '0%'}}/>
                <div className="bill_code js-type-input form-item" style={{width: '33%'}}>
                        <div className="form-item-label">
                            {isEdit ? <span className="u-mast">*</span> : null}
                            {language['hrzzpc-000114']}
                            {isEdit ? null : <span> :</span>}
                            <span className="form-item-colon"/>
                        </div>
                        <div className="form-item-control ">
                            <div className="form-component-item-wrapper input-wrapper edit">
                                {isEdit ? <NCDatePicker
                                    value={content.handoverdate}
                                    onChange={value => onChange('handoverdate', index, value)}
                                /> : <span>
                                    {content.handoverdate}
                                </span>}
                            </div>
                        </div>
                    </div>
            </span>
            <span>
                <div className="leftspace form-item" style={{width: '0%'}}/>
                    <div className="bill_code js-type-input form-item" style={{width: '66%'}}>
                        <div className="form-item-label">
                           {isEdit ? <span className="u-mast">*</span> : null}
                            {language['hrzzpc-000115']}
                            {isEdit ? null : <span> :</span>}
                            <span className="form-item-colon"/>
                        </div>
                        <div className="form-item-control ">
                            <div
                                className={"form-component-item-wrapper textarea-wrapper " + (isEdit ? 'edit' : 'browse')}>
                                {isEdit ? <NCTextArea
                                    maxLength={60}
                                    value={content.item}
                                    onChange={value => onChange('item', index, value)}
                                /> : <span className='form-item-pre'>
                                    {content.item}
                                </span>}
                            </div>
                        </div>
                    </div>
                </span>
        </div>
    </div>
}