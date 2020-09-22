import React from 'react';
import {start, connect} from 'src/hrpub/common/frame';
import HomePage from '../container';
import model from '../model';
import {handleHash} from "src/hrpub/common/utils/utils";

const Wrapper = handleHash('20191012111', 'c=60652510&p=60656013p')(connect(HomePage));

start({
    root: document.getElementById('app'),
    component: <Wrapper/>,
    model: [model]
});