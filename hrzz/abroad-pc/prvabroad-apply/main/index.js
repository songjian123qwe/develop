
import React from 'react';

import {start, connect} from 'src/hrpub/common/store/index';


import HomePage from '../container';


import model from '../models/model';

import { handleHash } from 'src/hrpub/common/utils/utils'

const HomePageWithData = handleHash('ti9','c=60651110&p=60651110p')(connect(HomePage));


start({
    root: document.getElementById('app'),
    component: <HomePageWithData/>,
    model: model
});
