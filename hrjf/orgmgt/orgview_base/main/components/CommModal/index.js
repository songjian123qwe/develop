import React from 'react';
import './index.less';
import {base} from 'nc-lightapp-front';

const {NCModal, NCButton} = base;
const {Header: NCModalHeader, Body: NCModalBody, Footer: NCModalFooter} = NCModal;

//高阶无状态物件，处理只用来显示的弹出框
const commModal = (WrappedComponent, name) => props =>
    <NCModal
        show={props.visible}
        onHide={() => {
            props.onClose && props.onClose()
        }}
        backdrop={'static'}
        size="lg"
    >
        <NCModalHeader
            closeButton={true}
        >
            {props.json[name]}
        </NCModalHeader>
        <NCModalBody>
            <WrappedComponent {...props}/>
        </NCModalBody>
        <NCModalFooter>
            <NCButton
                shape="border"
                onClick={() => {
                    props.onClose && props.onClose()
                }}
            >
                {props.json['jf6005-000031']}{/* 国际化处理： 关闭*/}
            </NCButton>
        </NCModalFooter>
    </NCModal>;

export default commModal;
