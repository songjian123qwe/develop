
import React from 'react';

import {start, connect} from 'src/hrzz/public/mobile/frame';

import Transfer from '../container/adapter';

import model from '../models/model';

import thirdLog from "../../../login/third-log-method";

const HomePageWithData = connect(Transfer);

thirdLog(()=>{
    start({
        root: document.getElementById('app'),
        component: <HomePageWithData/>,
        model: model
    });
})

