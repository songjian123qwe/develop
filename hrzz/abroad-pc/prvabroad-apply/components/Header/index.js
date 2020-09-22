import React from 'react';

import render from '../../../../../hrpub/common/frame/render';

import {connect} from '../../../../../hrpub/common/store';

import OrgRefer from '../../../../../hrpub/common/components/referSearch/org';

import BackBtn from '../../../../../hrpub/common/components/hr-back';

import './index.less'

import { base } from 'nc-lightapp-front';

let { NCSelect, NCDatePicker, NCRow, NCCol, NCCheckbox, NCButton, NCSwitch, NCMenu,NCItem, NCIcon } = base;

let NCOption = NCSelect.NCOption;

const Header = render({
        actions:{
            // header:btn
        }
    })(({props, action, state}) => {
    const { button,exam, cardPagination} = props;
    const { createButtonApp } = button; 
    const { createCardPagination } = cardPagination;
    let dark = exam.dark?'dark':'';

    return (
        <header className = {`${dark}`}>
            <div 
                className="fl"
                style={{display:exam.cardMode === true?'none':'',}}
            >
                <div
                    className = {exam.time === 'custom'?'fl searchAnimation':'search fl'}
                    style={{width:exam.time === 'custom'?'80px':'150px', display:'none'}}
                >
                    <OrgRefer
                        disabled = {props.exam.cardMode}
                        className="selectTrial"
                        getOrgData = {props.btn.handleChangePeople}
                        orgVal={props.exam.refValue}
                    />
                </div>
                <div className = {exam.time === 'custom'?'fl searchAnimation':'search fl'}
                    style = {{
                        display:props.exam.refValue.refpk?'':'none',
                    }}
                >
                     

                </div>
                <div className="search fl"
                    style = {{display:props.exam.refValue.refpk?'':'none'}}
                >
                    <NCSelect
                        placeholder={exam.json['gx6008-000113']}/* 国际化处理： 请选择单据状态*/
                        disabled = {exam.cardMode}
                        onChange={props.btn.statesChange}
                        value={exam.billStatus}
                        multiple="multiple"
                    >
                        <NCOption value="all">{exam.json['ga6013-000016']}</NCOption>{/* 国际化处理： 全部*/}
                        <NCOption value="-1">{exam.json['ga6013-000017']}</NCOption>{/* 国际化处理： 自由*/}
                        <NCOption value="3">{exam.json['ga6013-000018']}</NCOption>{/* 国际化处理： 提交*/}
                        <NCOption value="2">{exam.json['ga6013-000019']}</NCOption>{/* 国际化处理： 审批进行中*/}
                        <NCOption value="1">{exam.json['ga6013-000020']}</NCOption>{/* 国际化处理： 审批通过*/}
                        <NCOption value="0">{exam.json['ga6013-000046']}</NCOption>{/* 国际化处理： 审批不通过*/}
                    </NCSelect>

                </div>
                <div className = {exam.time === 'custom'?'fl searchAnimation':'search fl'}
                     style = {{
                        display:props.exam.refValue.refpk?'':'none'
                    }}
                >
                    <NCSelect
                        disabled = {props.exam.cardMode}
                        defaultValue={props.exam.time}
                        onChange = {props.btn.timeChange}
                        value={props.exam.time}
                    >
                        <NCOption
                            value="oneweek">{exam.json['ga6013-000024']}</NCOption>{/* 国际化处理： 一周内*/}
                        <NCOption
                            value="onemonth">{exam.json['ga6013-000021']}</NCOption>{/* 国际化处理： 一个月内*/}
                        <NCOption
                            value="threemonth">{exam.json['ga6013-000022']}</NCOption>{/* 国际化处理： 三个月内*/}
                        <NCOption
                            value="custom">{exam.json['ga6013-000023']}</NCOption>{/* 国际化处理： 自定义*/}
                    </NCSelect>
                </div>
                <div className="search apply_time fl"
                    style={{display:exam.time === 'custom'?'':'none',width:'80px'}}
                >
                    <NCDatePicker
                        disabled = {props.exam.cardMode}
                        value={props.exam.beginTime}
                        onChange = {props.btn.beginTime}
                        placeholder={exam.json['ga6013-000047']}/* 国际化处理： 申请起始日期*/
                    />
                </div>
                <div className="search apply_time fl"
                     style={{display:exam.time === 'custom'?'':'none',width:'80px'}}
                >
                    
                    <NCDatePicker
                        disabled = {props.exam.cardMode}
                        value={props.exam.endTime}
                        onChange = {props.btn.endTime}
                        placeholder={exam.json['ga6013-000048']}/* 国际化处理： 申请截止日期*/
                    />
                </div>
            </div>
            <div
                className="fl"
                style={{
                    marginTop: '8px',
                    display:(exam.cardMode===true&&exam.editState===false&&exam.fromApprove===false)?'':'none'
                }}
            >
                <BackBtn 
                    onClick={props.formAct.goToBackMainPage}
                    
                />
            </div>
            <div
                // className="" 
                className="header-cardPagination-area fr"
                style = {{
                    display:(exam.cardMode===true&&exam.editState===false&&exam.fromApprove===false)?'':'none',
                    paddingTop: '3px'
                }}
            >
                {createCardPagination({ 
                        handlePageInfoChange: props.formAct.cardPageInfo,
                    })}
            </div>  
            <div className="fr">
                {props.exam.refValue.refpk?(createButtonApp({
                    area:'head',
                    onButtonClick: props.btn.buttonClick
                })):null}
            </div>
        </header>
    )
});

export default connect(Header);