import React from 'react';
import ReactDom from 'react-dom';

import HomePage from '../container';

import {register, startModel, relate} from 'src/hrpub/common/ader';
// import {getAppPageConfig} from "src/hrpub/common/utils/utils";
import {createPage} from 'nc-lightapp-front';

import MainModel from '../models/model';
import ButtonModel from '../models/button';

import {handleHash,getAppPageConfig} from 'src/hrpub/common/utils/utils';

register([MainModel, ButtonModel]);

const store = startModel();

const MidComp = createPage({
        billinfo:[{
                billtype: 'grid',
                pagecode: getAppPageConfig().appcode,
                bodycode: 'list'
            }
        ]
    })(handleHash('2019', 'c=60651090&p=60651090p')(HomePage));

const Home = relate(MidComp);

ReactDom.render(
    <Home 
        store={store} 
        ref={(ref) => {
            store.pIns = ref
        }}
    />, 
    document.getElementById('app')
);
