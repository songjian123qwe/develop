import { render, connect } from '../../../../../hrpub/common/frame';
import FirstAction from '../../actions/first';
import './index.less';
import FirstBlock from '../firstblock/index';
const FirstContent = render({
	actions: {
		firstAction: FirstAction
	}
})(({ props, action, state }) => {
	const { changeAnalysis } = props;
	const { firstAction } = action;
	let json = changeAnalysis.json;
	let nowDateInfo = firstAction.returnFormatNowDate();
	let now = changeAnalysis.analysisData.now;
	let analysisList = changeAnalysis.analysisData.analysisList;
	let firstBlockList = analysisList.map((item) => {
		return <FirstBlock infoObj={item} />;
	});
	return (
		<div className="firstContent">
			{/* 部门人员变动分析 */}
			<div className="fcTitle">{json['hrzzpc-000018']}</div>
			<div className="fcCon">
				<div className="current">
					<h4 className="now">{nowDateInfo.dateStr}</h4>
					<h4 className="now">{nowDateInfo.workDay}</h4>
					{/* 目前在职人员  人*/}
					<p>{now.totleCount ? `${json['hrzzpc-000019']} ${now.totleCount} ${json['hrzzpc-000020']}` : ''}</p>
					{/* 待进入 */}
					<p>{now.entryCount ? `${json['hrzzpc-000021']} ${now.entryCount}` : ''}</p>
					{/* 待离开 */}
					<p>{now.dimissionCount ? `${json['hrzzpc-000022']} ${now.dimissionCount}` : ''}</p>
					{/* 待转正 */}
					<p>{now.regCount ? `${json['hrzzpc-000023']} ${now.regCount}` : ''}</p>
				</div>
				{firstBlockList}
			</div>
		</div>
	);
});

export default connect(FirstContent);
