
import React from 'react';

import {start, connect} from 'src/hrzz/public/mobile/frame';

import Infomation from '../container';

import model from '../models/model';
import thirdLog from '../../../login/third-log-method';

const HomePageWithData = connect(Infomation);

thirdLog(() => {
    start({
        root: document.getElementById('app'),
        component: <HomePageWithData/>,
        model: model
    });    
});