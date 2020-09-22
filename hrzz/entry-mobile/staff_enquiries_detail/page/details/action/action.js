import Zmage from 'react-zmage'

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

export default class searchHtml {
    constructor(comp) {
        this.comp = comp
    }

    question = () => {
        const {props} = this.comp;
        const {exam} = props;
        let a = ['a', 'b', 'c', 'd'];
        let img = true;
        let imgList = exam.fileData.map((item) => {
            return (
                <Zmage
                    preset="mobile"
                    backdrop="black"
                    src={item.previewUrl}
                    controller={{
                        // 关闭按钮
                        close: false,
                        // 缩放按钮
                        zoom: false,
                        // 下载按钮
                        download: false,
                        // 旋转按钮
                        rotate: false,
                    }}/>
            )
        });
        return (
            <div className="question-title">
                <i className="hrfont hr-tiwen"/>
                <p>
                    {exam.oneQuestionDetail.title}
                </p>
                <div className="clearfix imgBox">
                    {img ? imgList : null}
                </div>
            </div>

        )
    };

    answers = () => {
        const {props, action} = this.comp;
        const {exam, mainAct} = props;

        return (
            <div className="answers-title">
                <i className="hrfont hr-huida"/>
                <p>
                    {/* 回答 */}
                    {exam.json['hrzzmb-000271']}
                </p>
                <div onClick={action.mainAct.answerClick} className="answers-content"
                     dangerouslySetInnerHTML={{__html: exam.html && exam.html}}/>
            </div>
        )
    };

    // 赞
    fabulous = () => {
        const {props, state} = this.comp;
        const {dispatch, exam} = props;
        if (exam.fabulous === 'button fabulous') return;
        dispatch({
            type: 'exam/knowledgeSupportAction',
            payload: {
                postData: {
                    billid: exam.id
                },
                info: {
                    appcode: '60652070'
                }
            }
        }).then((res) => {
            if (res.success) {
                dispatch({
                    type: 'exam/update',
                    payload: {
                        fabulous: 'button fabulous',
                        buttonText: exam.json['hrzzmb-000272']//已赞
                    }
                });

            }
        })
    };

    cancel = () => {
        const {props} = this.comp;
        const {dispatch, exam} = props;
        dispatch({
            type: 'exam/update',
            payload: {
                showSearch: false,
                showIndex: true
            }
        });
    }
}