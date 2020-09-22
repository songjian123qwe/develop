
import commonModel from 'src/hrpub/common/components/reportQuery/store/model';


export default {
    name: 'reportQuery',
    data: {
        ...commonModel.data,
        reportTemplateMap: {
            '1001Z71000000000A3GV': 'WaItemQueryConditionPanelForGroup',
            '1001Z71000000000A3GX': 'WaAccountByYearQueryConditionPanel',
            '1001Z71000000000A3GZ': 'WaAccountByMonthQueryConditionPanel'
        },
        reportSearchMap: {
            '1001Z71000000000A3GZ': 'query',
            '1001Z71000000000A3GX': 'query',
            '1001Z71000000000A3GV': 'query'
        },
        ifHideSearchModal: true,
        // 没有穿梭狂的表
        reportWithoutTransfer: []
    },
    sync: {
        ...commonModel.sync
    },
    async: {
        ...commonModel.async
    }
};
