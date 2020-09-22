import React from 'react';

import {start, connect} from '../../../../hrpub/common/frame';
import MainPage from '../container/index.js'
import model from '../model/model.js'
import {handleHash} from 'src/hrpub/common/utils/utils'
const HomePageWithModel = handleHash('201993135118108', 'c=60651020&p=60651020p')(connect(MainPage));
start({
    root: document.getElementById('app'),
    component: <HomePageWithModel/>,
    model: [model]
})