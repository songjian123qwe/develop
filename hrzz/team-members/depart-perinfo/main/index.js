import React from 'react';

import {start, connect} from '../../../../hrpub/common/frame';
import MainPage from '../container/index.js'
import model from '../model/model.js'
import {handleHash} from 'src/hrpub/common/utils/utils'
const HomePageWithModel = handleHash('2019820183131110', 'c=60651010&p=60651010nccloud')(connect(MainPage));
start({
    root: document.getElementById('app'),
    component: <HomePageWithModel/>,
    model: [model]
})