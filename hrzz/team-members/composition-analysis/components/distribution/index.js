import { render, connect } from '../../../../../hrpub/common/frame';
import './index.less';
import Empty from '../../../../public/components/empty';
import Bar from '../bar/index';
import Pie from '../pie/index';
import Line from '../line/index';
const Distribution = render({
	actions: {}
})(({ props, action, state }) => {
	const { compositionAnalysis } = props;
	const {
		staffStyleOption,
		staffIsEmpty,
		sexProportionOption,
		sexProportionEmpty,
		hrChangeOption,
		hrChangeEmpty,
		jobGradeStructureOption,
		jobGradeStructureEmpty,
		postStructureOption,
		postStructureEmpty,
		eduStructureOption,
		eduStructureEmpty,
		ageStructureOption,
		ageStructureEmpty,
		corpWorkageStructureOption,
		corpWorkageStructureEmpty,
		workageStructureOption,
		workageStructureEmpty,
		json
	} = compositionAnalysis;
	// let staffStyleOption = compositionAnalysis.staffStyleOption
	// let staffIsEmpty = compositionAnalysis.staffIsEmpty
	// let sexProportionOption = compositionAnalysis.sexProportionOption
	// let sexProportionEmpty = compositionAnalysis.sexProportionEmpty
	// let hrChangeOption = compositionAnalysis.hrChangeOption
	// let hrChangeEmpty = compositionAnalysis.hrChangeEmpty
	// let jobGradeStructureOption = compositionAnalysis.jobGradeStructureOption // 职级分布
	// let jobGradeStructureEmpty = compositionAnalysis.jobGradeStructureEmpty
	// let postStructureOption = compositionAnalysis.postStructureOption // 职位分布
	// let postStructureEmpty = compositionAnalysis.postStructureEmpty
	// let eduStructureOption = compositionAnalysis.eduStructureOption // 学历分布
	// let eduStructureEmpty = compositionAnalysis.eduStructureEmpty
	// let ageStructureOption = compositionAnalysis.ageStructureOption // 年龄分布
	// let ageStructureEmpty = compositionAnalysis.ageStructureEmpty
	// let corpWorkageStructureOption = compositionAnalysis.corpWorkageStructureOption // 司龄分布
	// let corpWorkageStructureEmpty = compositionAnalysis.corpWorkageStructureEmpty
	// let workageStructureOption = compositionAnalysis.workageStructureOption // 工龄分布
	// let workageStructureEmpty = compositionAnalysis.workageStructureEmpty
	// let json = compositionAnalysis.json
	return (
		<div className="distribution">
			<div className="distribution-first">
				<div className="dfFirst">
					{staffIsEmpty ? (
						<div className="titleCon">
							{/* 员工类型构成 */}
							<div className="chartTitle">{json['hrzzpc-000032']}</div>
							<Empty title={json['hrzzpc-000078']} />
						</div>
					) : (
						<Bar barId={'staffStyle'} barOption={staffStyleOption} title={json['hrzzpc-000032']} />
					)}
				</div>
				<div className="dfSecond">
					{jobGradeStructureEmpty ? (
						<div className="titleCon">
							{/* 职等分布 */}
							<div className="chartTitle">{json['hrzzpc-000056']}</div>
							<Empty title={json['hrzzpc-000078']} />
						</div>
					) : (
						<Pie pieId={'jobGradeStructure'} pieOption={jobGradeStructureOption} />
					)}
				</div>
				<div className="dfThree">
					{postStructureEmpty ? (
						<div className="titleCon">
							{/* 职位分布 */}
							<div className="chartTitle">{json['hrzzpc-000057']}</div>
							<Empty title={json['hrzzpc-000078']} />
						</div>
					) : (
						<Pie pieId={'postStructure'} pieOption={postStructureOption} />
					)}
				</div>
			</div>
			<div className="distribution-second">
				<div className="dsFirst">
					{ageStructureEmpty ? (
						<div className="titleCon">
							{/* 年龄分布 */}
							<div className="chartTitle">{json['hrzzpc-000053']}</div>
							<Empty title={json['hrzzpc-000078']} />
						</div>
					) : (
						<Bar barId={'ageStructure'} barOption={ageStructureOption} title={json['hrzzpc-000053']} />
					)}
				</div>
				<div className="dsSecond">
					{corpWorkageStructureEmpty ? (
						<div className="titleCon">
							{/* 司龄分布 */}
							<div className="chartTitle">{json['hrzzpc-000054']}</div>
							<Empty title={json['hrzzpc-000078']} />
						</div>
					) : (
						<Bar barId={'corpWorkageStructure'} barOption={corpWorkageStructureOption} />
					)}
				</div>
				<div className="dsThree">
					{workageStructureEmpty ? (
						<div className="titleCon">
							{/* 工龄分布 */}
							<div className="chartTitle">{json['hrzzpc-000058']}</div>
							<Empty title={json['hrzzpc-000078']} />
						</div>
					) : (
						<Bar barId={'workageStructure'} barOption={workageStructureOption} />
					)}
				</div>
			</div>
			<div className="distribution-three">
				<div className="dtFirst">
					{hrChangeEmpty ? (
						<div className="titleCon">
							{/* 每月人事变动 */}
							<div className="chartTitle">{json['hrzzpc-000048']}</div>
							<Empty title={json['hrzzpc-000078']} />
						</div>
					) : (
						<Line lineId={'hrChange'} lineOption={hrChangeOption} />
					)}
				</div>
				<div className="dtSecond">
					<div className="dtsFirst">
						{sexProportionEmpty ? (
							<div className="titleCon">
								{/* 性别比例 */}
								<div className="chartTitle">{json['hrzzpc-000067']}</div>
								<Empty title={json['hrzzpc-000078']} />
							</div>
						) : (
							<Pie pieId={'sexProportion'} pieOption={sexProportionOption} />
						)}
					</div>
					<div className="dtsSecond">
						{eduStructureEmpty ? (
							<div className="titleCon">
								{/* 学历分布 */}
								<div className="chartTitle">{json['hrzzpc-000055']}</div>
								<Empty title={json['hrzzpc-000078']} />
							</div>
						) : (
							<Pie pieId={'eduStructure'} pieOption={eduStructureOption} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
});

export default connect(Distribution);
