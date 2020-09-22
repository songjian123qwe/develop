
import React from 'react';

import {start, connect} from 'src/hrzz/public/mobile/frame';

import Enquiries from '../container';

import model from '../models/model';

import thirdLog from "../../../login/third-log-method";

const HomePageWithData = connect(Enquiries);

thirdLog(()=>{
    start({
        root: document.getElementById('app'),
        component: <HomePageWithData/>,
        model: model
    });
})

