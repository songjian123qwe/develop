
import React from 'react';

import {start, connect} from 'src/hrzz/public/mobile/frame';

import Enquiries from '../container';

import thirdLog from "../../../login/third-log-method";

import model from '../models/model';

const HomePageWithData = connect(Enquiries);

thirdLog(()=>{
    start({
        root: document.getElementById('app'),
        component: <HomePageWithData/>,
        model: model
    });
})

