import React from 'react';

import {start, connect} from '../../../../hrpub/common/frame';

import HomePage from '../container';
import model from '../model/model';


import { handleHash } from 'src/hrpub/common/utils/utils'
const HomePageWithModel = handleHash('2019','c=60651120&p=60651120p')(connect(HomePage))

start({
    root: document.getElementById('app'),
    component: <HomePageWithModel />,
    model: [model],
});


