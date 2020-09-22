import React from 'react';
import render from 'src/hrpub/common/frame/render';
import { createPage, base } from 'nc-lightapp-front';

// 组件
import Layout from 'src/hrpub/common/components/Layout';
import PasswordBox from '../components/PasswordBox';
import './index.less';

// Action
import MainAction from '../actions/main';
const { NCDatePicker, NCSidebox, NCButton,NCModal} = base;
const { NCRangePicker } = NCDatePicker;

const { Header, Content } = Layout;

const HomePage = render({
	actions: {
		mainAct: MainAction
	}
})(({ props, state, action }) => {
	const { my, button } = props;
	const { isShowDetail, totalMoney, dataList, moneyDetail, dataDetail, dataNote, dark } = my;
	const darkBack = dark ? 'dark-back' : '';
	const darkFront = dark ? 'dark-front' : '';
	const darkBorder = dark ? 'dark-border' : '';
	const darkContent = dark ? 'dark-content' : '';
	const darkBottomBg = dark ? 'dark-bottom-bg' : '';
	const darkFrontBottom = dark ? 'dark-front-bottom' : '';
	const darkBorderBottom = dark ? 'dark-bottom' : '';

	return (
		<div className={`my-salary`}>
			
			{my.pageFlag?<Layout>
				<Header
					showOrgRefer={false}
					button={button}
					// style={{
					// 	height: 'auto'
					// }}
				>
					<NCRangePicker
						format={'YYYY-MM'}
						defaultValue={my.defaultRange}
						placeholder={`${my.defaultRange[0]} - ${my.defaultRange[1]}`}
						onChange={action.mainAct.changeTime()}
						value={my.queryRange}
					/>
				</Header>

				<Content>
					<div className={`salary-content ${darkBack}`} onClick={() => action.mainAct.closeDetail()}>
						<div className={`total-money ${darkBack}`}>
							<div className={`total-query ${darkContent} ${darkBorder}`}>
								<div
									className="item-bg"
									style={{
										background:
											'linear-gradient(180deg,rgba(255,162,139,1) 0%,rgba(255,58,102,1) 100%)'
									}}
								>
									<span className="hrfont">&#xe62a;</span>
								</div>

								<div className="item-query">
									<div className={`item-money ${darkFront}`}>{totalMoney[0]}</div>
									<div style={{ color: 'rgba(136,136,136,1)', lineHeight: '30px', fontSize: '12px' }}
									// className={`${darkFront}`}
									>
										{my.language['hrzzpc-000121'] || '应发汇总'}
									</div>
								</div>
							</div>
							<div className={`total-query ${darkContent} ${darkBorder}`}>
								<div
									className="item-bg"
									style={{
										background:
											'linear-gradient(180deg,rgba(173,146,255,1) 0%,rgba(101,115,239,1) 100%)'
									}}
								>
									<span className="hrfont">&#xe62a;</span>
								</div>

								<div className="item-query">
									<div className={`item-money ${darkFront}`}>{totalMoney[1]}</div>
									<div style={{ color: 'rgba(136,136,136,1)', lineHeight: '30px', fontSize: '12px' }}
									// className={`${darkFront}`}
									>
										{my.language['hrzzpc-000122'] || '实发汇总'}
									</div>
								</div>
							</div>
							<div className={`total-query ${darkContent} ${darkBorder}`}>
								<div
									className="item-bg"
									style={{
										background:
											'linear-gradient(180deg,rgba(255,189,81,1) 0%,rgba(252,150,1,1) 100%)'
									}}
								>
									<span className="hrfont">&#xe629;</span>
								</div>

								<div className="item-query">
									<div className={`item-money ${darkFront}`}>{totalMoney[2]}</div>
									<div style={{ color: 'rgba(136,136,136,1)', lineHeight: '30px', fontSize: '12px' }}
									// className={`${darkFront}`}
									>
										{my.language['hrzzpc-000123'] || '扣税汇总'}
									</div>
								</div>
							</div>
							<div className={`total-query ${darkContent} ${darkBorder}`}>
								<div
									className="item-bg"
									style={{
										background:
											'linear-gradient(180deg,rgba(54,221,155,1) 0%,rgba(0,183,110,1) 100%)'
									}}
								>
									<span className="hrfont">&#xe629;</span>
								</div>

								<div className="item-query">
									<div className={`item-money ${darkFront}`}>{totalMoney[3]}</div>
									<div style={{ color: 'rgba(136,136,136,1)', lineHeight: '30px', fontSize: '12px' }}
									// className={`${darkFront}`}
									>
										{my.language['hrzzpc-000124'] || '扣款汇总'}
									</div>
								</div>
							</div>
						</div>
						<If condition={my.mainPage === 'salary'}>
							<div className={`card-money ${darkBack}`}>
								{dataList.map((item) => {
									let type = item.type;
									let pk_wa_class = item.pk_wa_class;
									let cyear = item.cyear;
									let cperiod = item.cperiod;
									let itemName = item.name;
									let moneyReal = item.f_3;
									return (
										<div
											className={`card-money-content ${darkContent} ${darkBorder}`}
											onClick={(e) => action.mainAct.showDetail(type, pk_wa_class, cyear, cperiod, itemName, moneyReal, e)}
										>
											<ul className={`card-money-top ${darkContent} ${darkBorder}`}>
												<li>
													<span
														style={{
															fontSize: '16px',
															lineHeight: '22px',
															color: 'rgba(17,17,17,1)'
														}}
														className={`${darkFront}`}
													>{`${item.cyear}${my.language['hrzzpc-000007'] ||
														'年'}${item.cperiod}${my.language['hrzzpc-000008'] ||
														'月'}`}</span>
													<span
														style={{
															fontSize: '18px',
															lineHeight: '25px',
															color: 'rgba(17,17,17,1)'
														}}
														className={`${darkFront}`}
													>
														{item.f_3}
													</span>
												</li>
												<li>
													<span style={{ fontSize: '12px', color: 'rgba(136,136,136,1)' }}
													// className={`${darkFront}`}
													>
														{item.name}
													</span>
													<span style={{ fontSize: '12px', color: 'rgba(136,136,136,1)' }}
													// className={`${darkFront}`}
													>
														{my.language['hrzzpc-000125'] || '实发合计'}
													</span>
												</li>
											</ul>
											<ul className={`card-money-bottom ${darkBottomBg}`}>
												<li>
													<span className={`${darkFrontBottom}`}>{my.language['hrzzpc-000126'] || '应发合计'}</span>
													<span className={`${darkFrontBottom}`}>{item.f_1}</span>
												</li>
												<li>
													<span className={`${darkFrontBottom}`}>{my.language['hrzzpc-000127'] || '扣款合计'}</span>
													<span className={`${darkFrontBottom}`}>{item.f_2}</span>
												</li>
												<li>
													<span className={`${darkFrontBottom}`}>{my.language['hrzzpc-000128'] || '本次扣税'}</span>
													<span className={`${darkFrontBottom}`}>{item.f_5}</span>
												</li>
											</ul>
										</div>
									);
								})}
							</div>
						</If>
					</div>
				</Content>

				<div className="side-card">
					<NCSidebox
						show={isShowDetail}
						mask={false}
						maskClose={action.mainAct.closeDetail}
						onClose={action.mainAct.closeDetail}
						title={my.language['hrzzpc-000129'] || '薪资明细'}
					>
						<div>
							<div className={`card-content ${darkContent}`}>
								<ul className={`side-card-top ${darkContent} ${darkBorder} `}>
									<li>
										<span
											style={{ fontSize: '16px', color: 'rgba(17,17,17,1)', lineHeight: '22px' }}
											className={`${darkFront}`}
										>{`${dataDetail.cyear}${my.language['hrzzpc-000007'] || '年'}${dataDetail
											.cperiod}${my.language['hrzzpc-000008'] || '月'}`}</span>
										<span
											style={{ fontSize: '20px', color: 'rgba(17,17,17,1)', lineHeight: '25px' }}
											className={`${darkFront}`}
										>
											{dataDetail.moneyReal}
										</span>
									</li>
									<li>
										<span style={{ fontSize: '12px', color: 'rgba(136,136,136,1)' }}>
											{dataDetail.name}
										</span>
										<span style={{ fontSize: '12px', color: 'rgba(136,136,136,1)' }}>
											{my.language['hrzzpc-000125'] || '实发合计'}
										</span>
									</li>
								</ul>

								<div className='toMember'>{dataNote.title}</div>
								<div className='splitters'></div>
								<ul className={`side-card-bottom ${darkBottomBg}`}>
									{moneyDetail.map((item) => {
										return (
											<li className={`${darkBorderBottom}`}>
												<span className={`${darkFrontBottom}`}>{item.name}</span>
												<span className={`${darkFrontBottom}`}>{item.value}</span>
											</li>
										);
									})}
								</ul>
                            <div className='notting'>{dataNote.tail}</div>
							</div>
						</div>
					</NCSidebox>
				</div>
			</Layout>:""}
			<PasswordBox {...props} language={my.language} main={action.mainAct}/>

		</div>
	);
});
export default createPage({})(HomePage);
