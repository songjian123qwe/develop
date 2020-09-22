
import CommonAction from './common';

import {toast, cacheTools, promptBox, base} from 'nc-lightapp-front';

let { NCDatePicker } = base;

import {formatDate} from '../../../../hrpub/common/utils/utils'

export default class table extends CommonAction{

    constructor(comp) {
		super();
		this.comp = comp;
		
    }

    didMount = () => {
    
    }

    initData = ({
			queryCondition,
			billStatus,
			time,
			beginTime,
			endTime,
			pk_org,
			pageInfo,
			probationType,
			billTime,
			billState
		} = {}) => {
			
		const { props } = this.comp
		const { dispatch ,editTable, exam, cardPagination,meta} = props
		const { createCardPagination } = cardPagination;
		let template = meta.getMeta();
		let oid = template['query'].oid
		// 如果没有传入参数的话就从store中获取
		!queryCondition && (queryCondition = exam.queryCondition);
		!billStatus&&(billStatus = exam.billStatus)
		!time&&(time = exam.time)
		!pageInfo && (pageInfo = exam.pageInfo);
		!beginTime&&(beginTime = exam.beginTime)
		!endTime&&(endTime = exam.endTime)
		!pk_org&&(pk_org = exam.refValue?exam.refValue.refpk:'')
		!probationType&&(probationType = exam.probationType)
		probationType==='3'&&(probationType = '')
		billTime = time;
		billState = billStatus
		let postData = {
			...queryCondition,
			pageInfo: {
				...pageInfo,
				pageIndex: pageInfo.pageIndex - 1
        	}, 
			billState,
			billTime,
			beginTime,
			endTime,
			pk_org,
			probationType,
			oid,
			queryAreaCode:"search"
		}

		postData.billTime === '' && (postData.billTime = 'custom');

		postData.pageInfo.pageIndex = postData.pageInfo.pageIndex.toString()

		postData.pageInfo.pageSize = postData.pageInfo.pageSize.toString()

		dispatch({
			type: 'exam/getMainTableData',
			payload: {
				postData: postData
			}
		})
			.then((res) => {
				if(res.success) {
					if(res.data && res.data.list) {
						let pageInfo = this.deepCopy(res.data.list.pageInfo);
						dispatch({
							type: 'exam/update',
							payload: {
								pageInfo: {
									...pageInfo,
									pageIndex: parseInt(pageInfo.pageIndex) + 1
								},
								allpks:res.data.list.allpks
							}
						});
						cacheTools.set('allpks',res.data.list.allpks)
						editTable.setTableData('list', res.data.list, false);
					}
					else {
						dispatch({
							type: 'exam/update',
							payload: {
								allpks:[]
							}
						});
						cacheTools.set('allpks',[])
						editTable.setTableData('list', {rows: []}, false);
					}
				} else {
					dispatch({
						type: 'exam/update',
						payload: {
							allpks:[]
						}
					});
					cacheTools.set('allpks',[])
					editTable.setTableData('list', {rows: []}, false);

				}
			});
	}
	
	doubleClickTool = (data) => {
		const { props ,action} = this.comp
		const { dispatch , exam, form} = props
		dispatch({
			type: 'exam/update',
			payload: {
				cardMode: true,
				editState:false,
				billid:data.values.pk_prvabroad.value
			}
		});
		action.formAct.oneAction(data.values.pk_prvabroad.value)
	}

	// 表格双击行事件

	doubleClick = (data,index) => {
		console.log('double')
		const { props ,action} = this.comp
		const { dispatch , exam, form} = props
		if(index === false) {
			// 解决单击跳转与双击跳转是否为函数体的问题
			return () => {
				this.doubleClickTool(data)
			}
		} else {
			this.doubleClickTool(data)
		}
		
		// this.editFunc(data,index)
		
	}

	// 修改表格行数据
	editTableRow = (data,index) => {
		return ()=> {
			this.editFunc(data,index)
		}
	}

	// 修改表格公用方法
	editFunc = (data,index) => {
		const { props ,action} = this.comp
		const { dispatch , exam, form, meta} = props
		let postData = {
			// area_code:'card',
			billid:data?data.values.pk_prvabroad.value:exam.billid,
			// page_code:exam.config.pagecode,
			// isapprove:exam.fromApprove===true?true:false,
		}
		
		dispatch({
			type: 'exam/editAction',
			payload: {
				postData: postData,
			}
		})
		.then((res) => {
			if(res.success) {
				if(res.data && res.data.form_card) {
					form.EmptyAllFormValue('card')
					this.functionStateTool(res.data)

					// 开启卡片模式
					dispatch({
						type: 'exam/update',
						payload: {
							cardMode: true,
							editState:true,
							changeModdle:true,
							page:'',
							
							//type:res.data.form_card.card.values.probation_type.value
						}
					});
					action.btnAct.buttonTool(props,false)
					// 展开子列表
					form.openArea('psninfo');
					form.openArea('oldinfo');
					form.openArea('newinfo');
					form.openArea('execinfo');
					form.openArea('audit_info');
					form.openArea('table_end_info');

					form.setFormStatus('card','edit')
					let card = {...res.data.form_card.card};
					let psninfo = {...res.data.form_psninfo.psninfo}
					let target ={...card.rows[0].values} 
					let obj = psninfo.rows[0].values
					for (let i in obj){
						if(!obj[i].display || !obj[i].value){
							obj[i] = card.rows[0].values[i]
						}
					}
					Object.assign(target, psninfo.rows[0].values);
					card.rows[0].values = {...target}
					form.setAllFormValue({card: card});
				}
				else {
					dispatch({
						type: 'exam/update',
						payload: {
							editState:false,
							page:''
						}
					});
					toast({color:"warning",content:res.data.message})
				}
			}
		})
		

	}

	// 卡片页面功能禁用隐藏公共方法、修改、复制、新增、单条查看
	functionStateTool = async (data) => {
		const { props } = this.comp
		const { form,meta,exam,dispatch} = props

		let psninfo = {} //工作信息禁用集
		let card = {} //主表禁用集
		let approveinfo = {}
		let disableApp = {}
		let	disablePsn = {}
		let disableCard = {}
		let disable = {};
		let visible = {};
		// 设置转正前后信息的显示隐藏
		let required = {}
		let disvalue = false
		let template = meta.getMeta();
		console.log(template)
		data.card.items.map((itemd) => {
			if (itemd.attrcode === 'bill_code') {
                disvalue = itemd.disabled;
			}
		})
		template.approveinfo = data.approveinfo;
		template.card = data.card;
		template.psninfo = data.psninfo;
		template['psninfo'].items.map((items) => {
            // if (items.attrcode === 'pk_psnjob') {
            //     items.queryCondition = {};
			// }
            if (items.attrcode === 'pk_license') {
                items.queryCondition = {};
			}
		})
		dispatch({
			type: 'exam/update',
                    payload: {
                       template:template
                    }
		})
		meta.setMeta(template)
		form.setFormItemsDisabled('card', {
			bill_code:disvalue
		});
		// data.newinfo.items.forEach((item) => {
		// 	newobj[item.attrcode] = item.visible
		// 	required[item.attrcode] = item.required
		// })
		// data.oldinfo.items.forEach((item) => {
		// 	oldobj[item.attrcode] = item.visible
		// 	required[item.attrcode] = item.required
		// })
		// form.setFormItemsVisible('card',{
		// 	...newobj,
		// 	...oldobj
		// })



		// data.approveinfo.items.forEach((item) =>{
		// 	approveinfo[item.attrcode] = item.visible
		// 	disableApp[item.attrcode] = item.disabled
		// 	required[item.attrcode] = item.required
		// })
		// data.psninfo.items.forEach((item) => {
		// 	psninfo[item.attrcode] = item.visible
		// 	disablePsn[item.attrcode] = item.disabled
		// 	required[item.attrcode] = item.required
		// })
		// data.card.items.forEach((item) => {
		// 	card[item.attrcode] = item.disabled
		// 	disableCard[item.attrcode] = item.visible
		// 	required[item.attrcode] = item.required
		// })
		// form.setFormItemsVisible('card',{
		// 	...card,
		// })
		// form.setFormItemsDisabled('card',{
		// 	...disableCard,
		// })

		// form.setFormItemsRequired('card',required)
	}

	// 复制行数据
	copyTableRow = (data,index) => {
		const { props ,action} = this.comp
		const { dispatch , exam, form} = props
		return () => {
			
			let postData = {
				area_code:'card',
				billid:data.values.pk_prvabroad.value,
				page_code:exam.config.pagecode,
				pk_org: exam.refValue.refpk
			}
			dispatch({
				type: 'exam/regApplyCopyAction',
				payload: {
					postData: postData
				}
			})
			.then((res) => {
				if(res.success) {
					if(res.data && res.data.form) {
						dispatch({
							type: 'exam/update',
							payload: {
								cardMode: true,
								editState:true,
								page:'add',
								type:res.data.form.card.rows[0].values.probation_type.value
							}
						});
						this.functionStateTool(res.data)

						if(res.data.isBillCodeEditable===true) {
							form.setFormItemsDisabled('card',{bill_code:false})
						} else {
							form.setFormItemsDisabled('card',{bill_code:true})
						}
						action.btnAct.buttonTool(props,false)
						// 展开子列表
						form.openArea('psninfo');
						form.openArea('oldinfo');
						form.openArea('newinfo');
						form.openArea('execinfo');
						form.openArea('audit_info');
						form.openArea('table_end_info');

						form.setFormStatus('card','edit')
						form.setAllFormValue({card:res.data.form.card})
					
					}
					else {
						toast({color:"warning",content:res.data.message})
					}
				} else {
					// editTable.setTableData('list', {rows: []}, false);

				}
			})
			
			
		}
	}


	// 批量删除
	batchDelete = (billid) => {
		const { props ,action} = this.comp
		const { dispatch , exam, editTable} = props

		if(exam.cardMode === false) {
			// let arr = this.billidTool()
			// if(arr&&arr.length>0) {
				this.promptBoxTool(billid)
			// }
		}
		else {
			this.promptBoxTool(billid)
		}

		
		
	}

	promptBoxTool = (billid) => {
		const { props } = this.comp
		const {  exam } = props
		promptBox({
			color: 'warning', 
			title: exam.json['ga6013-000009'], //您确定要删除吗?
			noCancelBtn: false, 
			beSureBtnName: exam.json['ga6013-000045'], //确定
			cancelBtnName: exam.json['ga6013-000015'], //取消
			hasCloseBtn:false, 
			beSureBtnClick: this.functionSure.bind(this,billid)
		})
	}

	functionSure = (billid) => {
		const { props } = this.comp
		const {  exam } = props
		if(exam.cardMode === true) {
			this.cardDelete(billid)
		} else {
			this.tableDelete(billid)
		}
	}

	// 卡片单个删除
	cardDelete = async (billid) => {
		const { props ,action} = this.comp
		const { dispatch , exam, editTable,cardPagination} = props
		if(!billid) {
			return
		}
		// let nextId = cardPagination.getNextCardPaginationId({id:billid,status:1})
		let arr = cacheTools.get('allpks')
		let ind = cacheTools.get('allpks').indexOf(billid) + 1
		let nextId = arr[ind]
		if(!nextId) {
			nextId = arr[ind-2]
		}
		// return
		let postData = {
			billid:billid,
			// pk_org: exam.refValue.refpk
		}
		try {
			let res = await dispatch({
				type:'exam/delAction',
				payload: {
					postData: postData
				}
			})
			if(res.success) {

				if(res.data.errorMsg) {
					//错误信息存在
					toast({color:"warning",content:res.data.errorMsg})

				} else {
					var allpks = exam.allpks
					var inx = allpks.indexOf(billid)
					allpks.splice(inx,1)
					cacheTools.set('allpks',allpks)

					// cardPagination.setCardPaginationId({id:billid,status:3})
					cardPagination.setCardPaginationId({id:nextId,status:1})

					dispatch({
						type: 'exam/update',
						payload: {
							allpks:allpks
						}
					});
					// 如果缓存allpks为空，则删除后直接返回table页面
					
					if(cacheTools.get('allpks').length <= 0) {
						action.formAct.goToBackMainPage()
					} else {
						// 渲染下一条数据
						action.formAct.oneAction(nextId)
					}
					// 删除成功！
					toast({color:"success",content:exam.json['ga6013-000010']})

				}
			}
		}
		catch(e) {

		}

	}

	// 获取表格多选单据id公共方法
	billidTool = () => {
		const { props ,action} = this.comp
		const { dispatch , exam, editTable} = props
		let data = editTable.getCheckedRows('list')
		if(data.length === 0&&exam.cardMode === false){
			toast({
				color:"warning",
				content:exam.json['ga6013-000005']
			})
			return
		}
		let arr = []
		data.forEach((item) => {
			arr.push(item.data.values.pk_prvabroad.value)
		})
		return arr
	}

	// 表格批量删除
	tableDelete = async (billid) => {
		const { props ,action} = this.comp
		const { dispatch , exam, editTable} = props

		// let arr = this.billidTool()

		// if(!arr||arr.length<=0) {
		// 	return
		// }
		let postData = {
			billid:billid,
			// pk_org: exam.refValue.refpk
		}
		try {
			let res = await dispatch({
				type:'exam/delAction',
				payload: {
					postData: postData
				}
			})
			if(res.success) {

				if(res.data.errorMsg) {

					toast({color:"warning",content:res.data.errorMsg})

				} else {
					
					toast({color:"success",content:exam.json['ga6013-000010']})
					this.pubSub.publish('initData');
				}
			}
		}
		catch(e) {

		}
	}

	// 附件管理存储billid
	enclosure = (data,index) => {
		const { props ,action} = this.comp
		const { dispatch , exam, form} = props
		return () => {
			dispatch({
				type: 'exam/update',
				payload: {
					billid: data.values.pk_prvabroad.value,
					fileManagerModalVisible:true
				}
			});
		}
	}

	// 提交单据

	batchCommit = async (value,compositepostdata = null) => {
		const { props ,action} = this.comp
		const { dispatch , exam, form} = props

		try {
			// let arr = this.billidTool()
			// if(arr.length <= 0&&exam.cardMode === false) {
			// 	return
			// }
			
			console.log(value);
			let postData ={
				billid:exam.cardMode === true?exam.billid:value,
			}
			if (compositepostdata && compositepostdata.content) {
				postData = Object.assign({}, postData, {content: compositepostdata})
			}
			// if(value){
			// 	postData = Object.assign({},{
			// 		billid:exam.cardMode === true?exam.billid:value,
			// 	},)
			// }
			
			let res = await dispatch({
				type: 'exam/batchCommit',
				payload: {
					postData:postData,
				}
			})
			if(res.success) {
				// 提交成功
				if(res.data){
					if(res.data.content){
						dispatch({
							type: 'exam/update',
							payload:{
								compositedata: res.data.content,
								compositedisplay: true
							}
						})
					}
				}else{
					dispatch({
						type: 'exam/update',
						payload:{
							compositedata: null,
							compositedisplay: false,
							isApproved:true
						}
					})
					if(exam.cardMode===true) {
						action.formAct.oneAction(exam.billid)
					} else {
						this.pubSub.publish('initData');
						action.main.initTemplate()
					}
					if(res.data){
						if(res.data.errorMsg){
							toast({color:"danger",content:res.data.errorMsg})
						}
					}else{
						toast({color:"success",content:exam.json['ga6013-000006']})
					}
				}
			}
		}
		catch(e) {
			throw(e)
		}
	}
	// showComposite = ()=>{
	// 	const {props,action} = this.comp;
	// 	const {exam,search,dispatch} = props;
	// 	// console.log(billid)
	// 	console.log(exam.compositedata)
	// 	dispatch({
	// 		type: 'exam/update',
	// 		payload: {
	// 			compositedisplay:true
	// 		}
	// 	});
	//    }
	//指派弹窗确定事件
    getResult = (compositepostdata) => {
        const {props} = this.comp
        const {exam,form,editTable} = props
        let billids = null
        if (exam.cardMode === false) {
			let data = editTable.getClickRowIndex('list');
            billids = data.record.values['pk_prvabroad'].value
        } else if (exam.cardMode) {
            billids = exam.billid;
        }
        // if (!checkBillId(toast, billids, exam)) return;
        this.batchCommit(billids, compositepostdata)
    };
	turnOff  =()=>{
		const {props} = this.comp
		const {dispatch} = props
		dispatch({
			type: 'exam/update',
			payload:{
				compositedata: null,
				compositedisplay: false
			}
		})
	}
	// 批量收回
	batchBack = async (value) => {
		const { props ,action} = this.comp
		const { dispatch , exam, form} = props

		try {
			// let arr = this.billidTool()
			// if(arr.length <= 0&&exam.cardMode === false) {
			// 	return
			// }
			let postData = {
				billid:exam.cardMode === true?exam.billid:value,
			}
			let res = await dispatch({
				type: 'exam/batchBack',
				payload: {
					postData:postData,
				}
			})
			if(res.success) {
				// 收回成功
				await dispatch({
					type:'exam/update',
					payload:{
						isApproved:false
					}
				})
				if(exam.cardMode===true) {
					action.formAct.oneAction(exam.billid)
				} else {
					this.pubSub.publish('initData');
					action.main.initTemplate()
				}
				if(res.data){
					if(res.data.errorMsg) {
						toast({color:"warning",content:res.data.errorMsg})
					}
				}else{
					toast({color:"success",content:exam.json['ga6013-000007']})
				}
			}
		}
		catch(e) {
			
		}
	}

	effectTime = (value) => {
		let {props} = this.comp;
		let {dispatch} = props;
		dispatch({
			type: 'exam/update',
			payload: {
				effectTime: value
			}
		});
	}

	viewOpinion = (data,index) => {
		let {props} = this.comp;
		let {dispatch} = props;
		return ()=> {
			dispatch({
				type: 'exam/update',
				payload: {
					approveDetail: true,
					billid:data.values.pk_prvabroad.value,
					billtype:data.values.transtype.value?data.values.transtype.value:data.values.pk_billtype.value
				}
			});
		}
		
	}

}