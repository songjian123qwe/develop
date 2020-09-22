import React from 'react';
import {start, connect} from 'src/hrpub/common/frame';
import HomePage from '../container';
import model from '../model/model';
import {handleHash} from "../../../../hrpub/common/utils/utils";

const Wrapper = handleHash('20198162232323', '/ifr?page=20198162232323&c=60652010&p=60652010p&ar=0001Z700APPN60652010')(connect(HomePage));

start({
    root: document.getElementById('app'),
    component: <Wrapper/>,
    model: [model]
});