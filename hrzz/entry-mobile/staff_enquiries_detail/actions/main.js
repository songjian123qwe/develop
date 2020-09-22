import {parseQueryString} from '../../../public/mobile/utils/tools.js';
import {hrRouter, compatibleNavImg} from '../../../public/mobile/utils/index';
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js'
import {ActionSheet, Toast, Modal} from 'antd-mobile';
import {getMultiLang} from 'src/hrzz/public/mobile/utils/getMultiLang'

let appcode = '60652070';
export default class Main {
    constructor(comp) {
        this.comp = comp;
    }

    didMount = () => {
        // window.location.hash =
        //     "?&c=60652070&p=60652070nccloud&ar=0001Z510000000065KV7&id=0";
        this.getLanguage()

    };


    getLanguage = () => {
        const {props} = this.comp;
        const {dispatch, exam} = props;
        getMultiLang({
            domainName: 'hrzz',
            moduleId: 'hrzzmb',
            callback: (json, status, init) => {
                dispatch({
                    type: 'exam/update',
                    payload: {
                        json: json
                    }
                });
                this.indexEntry()
            }
        })
    };
    // 首页加载项
    indexEntry = () => {
        const {props, action} = this.comp;
        const {dispatch, exam} = props;

        let type = parseQueryString(window.location.href).type;
        if (type.toString() === '1') {
            this.editNav(exam.json['hrzzmb-000274']);
            // '我的提问'
            dispatch({
                type: 'exam/update',
                payload: {
                    backQuesetion: true
                }
            });
            this.toDetail('questionPreviewOneAction')
        } else {
            // 最新回答
            this.editNav(exam.json['hrzzmb-000270']);
            this.toDetail('KnowledgePreviewOneAction');
            dispatch({
                type: 'exam/update',
                payload: {
                    backQuesetion: false
                }
            });
        }
    };

    // 卸载
    willUnMount = () => {

    };

    didUpdate = () => {

    };

    closeIframe = () => {
        const {props} = this.comp;
        const {dispatch} = props;
        dispatch({
            type: 'exam/update',
            payload: {
                link: ''
            }
        });
        let type = parseQueryString(window.location.href).type;
        if (type.toString() === '1') {
            this.editNav(exam.json['hrzzmb-000274'])
        } else {
            this.editNav(exam.json['hrzzmb-000270'])
        }
    };

    leftClick = () => {
        const isShare = parseQueryString(window.location.href).share;
        if (isShare === '1') {
            NativeObj.closePage()
        } else {
            let url = '/hrzz/entry-mobile/staff_enquiries/main/index.html';
            hrRouter.push(url)
        }
    };

    editNav(title) {
        let parameters = {};
        let cbs = {
            goBack: this.leftClick,
            search: this.showShareActionSheet
        };
        parameters = {
            leftItems: [
                {
                    callback: 'goBack',
                    icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
                }
            ],
            centerItems: [
                {
                    title: title,
                }
            ],
            rightItems: [
                {
                    callback: 'search',
                    icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/hr-share.png')
                }
            ]
        };
        let data = {
            'function': 'configNavBar',
            'parameters': parameters
        };
        NativeObj.configNavBar(data, cbs)
    }

    setLinkNav = (link, isLinkAnswer) => {
        const {props} = this.comp;
        const {exam} = props;
        let type = parseQueryString(window.location.href).type, title;
        if (type.toString() === '1') {
            title = exam.json['hrzzmb-000274']
        } else {
            title = exam.json['hrzzmb-000270']
        }
        let cbs = {
            goBack: link && !isLinkAnswer ? this.closeIframe : this.leftClick
        };
        let parameters = {
            leftItems: [
                {
                    callback: 'goBack',
                    icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
                }
            ],
            centerItems: [
                {
                    title: title,
                }
            ],
            rightItems: []
        };
        let data = {
            'function': 'configNavBar',
            'parameters': parameters
        };
        NativeObj.configNavBar(data, cbs)
    };

    shareTool = (num) => {
        const {props} = this.comp;
        const {dispatch, exam} = props;
        // 1:qq好友 2:qq空间 3:微信好友 4:微信朋友圈 5:企业空间动态 6:企业空间im好友
        NativeObj.share({
            content: exam.oneQuestionDetail.title,
            title: exam.json['hrzzmb-000275'],//问题分享
            imgUrl: 'https://ec.yonyoucloud.com/front/new_front/js/modules/eucIM/images/icon_space_assistant.png',
            url: window.location.href + '&share=1',
            share_type: num
        })
    };

    showShareActionSheet = () => {
        const {props} = this.comp;
        const {dispatch, exam} = props;
        let dataList = [
            //    朋友
            {icon: 'iconShare hrfont hr-tongshi blue', title: exam.json['hrzzmb-000276'], color: '#29b6f6'},
            // 空间
            {icon: 'iconShare hrfont hr-kongjian red', title: exam.json['hrzzmb-000277'], color: '#fa4f52'},
            // 微信
            {icon: 'iconShare hrfont hr-weixin green', title: exam.json['hrzzmb-000278'], color: '#28cd6a'}
        ].map(obj => ({
            icon: <i className={obj.icon} style={{fontSize: '0.7rem', color: obj.color}}></i>,
            title: obj.title,
        }));
        ActionSheet.showShareActionSheetWithOptions({
                options: dataList,
                cancelButtonText:exam.json['hrzzmb-000024'],
                message: exam.json['hrzzmb-000279'],//分享到
                show: exam.share
            },
            (buttonIndex) => {
                buttonIndex === 0 && this.shareTool(6);
                buttonIndex === 1 && this.shareTool(5);
                buttonIndex === 2 && this.shareTool(3);

            });
    };
    aToSpan = (str) => {
        let regexpA = /\<a.*?\>(.+?)\<\/a\>/g
        let regexpUrl = /href\=\"(.+?)\"\>(.+?)\<\/a>/g
        let labelAs = str.match(regexpA) || []
        let newStr = str
        labelAs.forEach((item) => {
            let labelContent = regexpUrl.exec(item)
            regexpUrl.lastIndex = 0
            newStr = newStr.replace(item, `<a href="${labelContent[1]}">${labelContent[2]}</a>`)
        })
        return newStr
    }
    // 打开webview的方法写这里
    openWindow = (url) => {
        NativeObj.openWindow(url)
    }
    // 跳转到详情页
    toDetail = (url) => {
        const {props} = this.comp;
        const {dispatch, exam} = props;
        let urlQuery = parseQueryString(window.location.href);
        // let a = 'http://www.baidu.com'
        // let html = `<a href=${a}>${a}</a>`
        //             dispatch({
        //                 type: 'exam/update',
        //                 payload: {
        //                     html,
        //                     // id: res.data.formData.pk_knowledge_base,
        //                     // link: res.data.formData.link_url,
        //                     // oneQuestionDetail: res.data.formData,
        //                     // isLinkAnswer: true
        //                 }
        //             });
        //             return
        dispatch({
            type: `exam/${url}`,
            payload: {
                postData: {
                    billid: urlQuery.detailId
                },
                info: {
                    appcode: '60652070'
                }
            }
        }).then((res) => {
            if (res.success) {
                if (res.data.formData.answer_type === '2') {
                    //window.location.href = res.data.formData.link_url;
                    // this.openWindow(res.data.formData.link_url)
                    let html = `<a href="${res.data.formData.link_url}">${res.data.formData.link_url}</a>`
                    dispatch({
                        type: 'exam/update',
                        payload: {
                            html,
                            id: res.data.formData.pk_knowledge_base,
                            link: res.data.formData.link_url,
                            oneQuestionDetail: res.data.formData,
                            isLinkAnswer: true
                        }
                    });
                    // this.setLinkNav(res.data.formData.link_url, true);
                    
                } else {
                    let data = res.data.formData.answer && JSON.stringify(res.data.formData.answer)
                    // let newStr = this.aToSpan(data)
                    let html = data && JSON.parse(JSON.parse(data));
                    dispatch({
                        type: 'exam/update',
                        payload: {
                            oneQuestionDetail: res.data.formData,
                            id: res.data.formData.pk_knowledge_base,
                            html: html && html.html
                        }
                    });
                }
                if (res.data.issupport) {
                    // 已赞
                    dispatch({
                        type: 'exam/update',
                        payload: {
                            fabulous: 'button fabulous',
                            buttonText: exam.json['hrzzmb-000272']
                        }
                    });
                } else {
                    dispatch({
                        type: 'exam/update',
                        payload: {
                            fabulous: 'button',
                            buttonText: exam.json['hrzzmb-000280']//赞一个
                        }
                    });
                }

                // 获取图片
                if (url === 'KnowledgePreviewOneAction') {
                    // 最新回答
                    res.data.formData.remark && this.enclosureInfo(res.data.formData.remark)
                } else {
                    // 我的提问
                    res.data.formData.pk_questions && this.enclosureInfo(res.data.formData.pk_questions)
                }

                
            }
        }).catch((err) => {
            //throw(err)
            dispatch({
                type: 'exam/update',
                payload: {
                    fabulous: 'button',
                    buttonText: exam.json['hrzzmb-000280']//赞一个
                }
            });
            // 提示/确定
            Modal.alert(exam.json['hrzzmb-000002'], err.data && err.data.error && err.data.error.message, [
                {text: exam.json['hrzzmb-000003']},
            ])
        })
    };


    // 获取图片列表
    enclosureInfo = (id) => {
        const {props} = this.comp;
        const {dispatch, exam} = props;
        dispatch({
            type: 'exam/query',
            payload: {
                postData: {
                    billId: id,
                    fullPath: id
                },
                info: {
                    appcode: appcode
                }
            }
        }).then((res) => {
            if (res.success === true) {
                dispatch({
                    type: 'exam/update',
                    payload: {
                        fileData: res.data
                    }
                });
            }
        })
    };

    answerClick = (event) => {
        const {props} = this.comp;
        const {dispatch} = props;
        const link = event.target.href;
        event.preventDefault()
        try {
            if (event.target.nodeName === 'A') {
                this.openWindow(link)
                // dispatch({
                //     type: 'exam/update',
                //     payload: {
                //         link,
                //         isLinkAnswer: false
                //     }
                // });
                // this.setLinkNav(link, false);
            }
        } catch (e) {

        }
        return false;
    }
}