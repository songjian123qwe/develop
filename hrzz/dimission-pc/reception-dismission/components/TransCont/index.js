import React from 'react';
import './index.less';
import {base} from 'nc-lightapp-front';
const {NCTextArea, NCDatePicker} = base;

export default (props) => {
    const {index, content, isEdit,onChange, language,} = props;
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
        </div>
        <div className={'lightapp-component-form'}>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
                <div className="leftspace form-item" style={{width: '0%'}}/>
                    <div className="bill_code js-type-input form-item" style={{width: '66%'}}>
                        <div className="form-item-label">
                           {isEdit ? <span className="u-mast">*</span> : null}
                            {language['hrzzpc-000168'] || "交接备注"}
                            {isEdit ? null : <span> :</span>}
                            <span className="form-item-colon"/>
                        </div>
                        <div className="form-item-control ">
                            <div
                                className={"form-component-item-wrapper textarea-wrapper " + (isEdit ? 'edit' : 'browse')}>
                                {isEdit ? <NCTextArea
                                    maxLength={60}
                                    value={content.remark}
                                    onChange={value => onChange('remark', index, value)}
                                /> : <span className='form-item-pre'>
                                    {content.remark}
                                </span>}
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
}