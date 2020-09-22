import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default {
    name: 'main',
    data: {
        language: {}, // 多语
        context: {},
        isEdit: false,
        areas: {},
        areaCodeList: [],
        tempImg: '',
        imageData: '',
        photoChange: false,
        areaConf: {},
        disabledAreas: []
    },
    sync: {
        update(state, payload) {
            return {
                ...state,
                ...payload
            };
        }
    },
    async: {
        //获取页面meta配置
        getTemplate(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/psninfo/PsninfoTempletQueryAction.do',
                body: payload
            });
        },
        //获取主表数据
        getPsnDoc(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/psninfo/PsninfoQueryAction.do',
                body: payload
            });
        },
        //获取子表数据
        getSubData(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/psninfo/PsninfoSubQueryAction.do',
                body: payload
            });
        },
        //获取照片数据
        getPhoto(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/psninfo/PsninfoPhotoQueryAction.do',
                body: payload
            });
        },
        //保存数据
        saveData(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/psninfo/PsninfoSaveAction.do',
                body: payload
            });
        }
    }
};