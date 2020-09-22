import {render} from 'src/hrzz/public/mobile/frame';

import main from '../actions/main';
import hotProblem from '../actions/hotProblem';

import {DEmpty} from '../../../public/mobile/components/index'

import HotProblems from '../components/HotProblems'

import Classification from '../components/Classification'

import NewAnswer from '../components/NewAnswer'

import MyQuestions from '../components/MyQuestions'

import HotProblemPage from '../page/hot_problem'

import Search from '../page/search'

import Detail from '../page/details'

import ClassificationPage from '../page/classification'

import './index.less';

import {DButton} from '../../../public/mobile/components/index'

import {Tabs} from 'antd-mobile';

const Enquiries = render({
    actions: {
        mainAct: main,
        hotProblem: hotProblem
    },
    customData: ''
})(({props, action, state}, {customData}) => {
    const {exam} = props;
    return (
        <div className="staff-enquiries">
            <div onClick={action.mainAct.searchFun}>search</div>
            <div
                className="index-page"
                style={{display: exam.showIndex ? '' : 'none'}}
            >
                {/* 首页 */}
                <Tabs tabs={exam.tabs} initialPage={0} animated={true} useOnPan={true} swipeable={false}>
                    <div
                        className="indexHome"
                        style={{width: '100%', height: '100%'}}
                    >
                        <div
                            style={{display: exam.hotProblemList.length > 0 ? '' : 'none'}}
                        >
                            <HotProblems
                                {...props}
                                hotProblem={action.hotProblem}
                            />
                        </div>
                        <div
                            style={{display: exam.classfiList.length > 0 ? '' : 'none'}}
                        >
                            <Classification
                                {...props}
                                hotProblem={action.hotProblem}
                            />
                        </div>
                        <div
                            style={{display: exam.newProblemList.length > 0 ? '' : 'none'}}
                        >
                            <NewAnswer
                                {...props}
                                hotProblem={action.hotProblem}
                                style={{
                                    display: exam.newProblemList.length > 0 ? '' : 'none'
                                }}
                            />
                        </div>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#fff',
                            display: exam.newProblemList.length === 0 && exam.classfiList.length === 0 && exam.hotProblemList.length === 0 ? '' : 'none'
                        }}>
                            <DEmpty describe={exam.json['hrzzmb-000086']} />
                        </div>
                    </div>
                    <div>
                        <MyQuestions
                            {...props}
                            hotProblem={action.hotProblem}
                        />
                    </div>
                </Tabs>
                {/* 我要提问 */}
                <DButton onClick={action.mainAct.question} type='submit' title={exam.json['hrzzmb-000261']}/>
            </div>
            <div
                className="search-page"
                style={{display: exam.showSearch ? '' : 'none'}}
            >
                {/* 搜索页 */}
                <Search
                    {...props}
                    hotProblem={action.hotProblem}
                />
            </div>
            <div
                className="problem-page"
                style={{display: exam.showHotProblem ? '' : 'none'}}
            >
                {/* 热点问题页 */}
                <HotProblemPage
                    {...props}
                    hotProblem={action.hotProblem}
                    main={action.mainAct}
                />
            </div>
            <div
                className="calss-page"
                style={{display: exam.showClassifi ? '' : 'none'}}
            >
                {/* 问题分类页 */}
                <ClassificationPage
                    {...props}
                    hotProblem={action.hotProblem}
                />
            </div>
            {/* <div
                className="detail-page"
                style={{display:exam.showDetails?'':'none'}}
            > */}
            {/* 详情页,暂时不用了，另外写了单独的详情页 */}
            {/* <Detail
                    {...props}
                /> */}
            {/* </div> */}


        </div>
    )
});

export default Enquiries