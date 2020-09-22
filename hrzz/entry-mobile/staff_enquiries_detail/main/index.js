
import React from 'react';

import {start, connect} from 'src/hrzz/public/mobile/frame';

import Enquiries from '../container';

import model from '../models/model';

const HomePageWithData = connect(Enquiries);

import thirdLog from "../../../login/third-log-method";

thirdLog(()=>{
    start({
        root: document.getElementById('app'),
        component: <HomePageWithData/>,
        model: model
    });
})

