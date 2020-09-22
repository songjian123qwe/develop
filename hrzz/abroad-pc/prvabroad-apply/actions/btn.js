
import {  base, toast, promptBox,output,print} from 'nc-lightapp-front';

import ExportHtml from '../../../../hrpub/common/utils/exportHtml';

import PrintTable from '../../../../hrpub/common/utils/print';
import printTemplate from 'src/hrpub/template/printPage/main/printFromTemplate'

import {hrAjax as ajax} from 'src/hrpub/common/utils/utils';

let { NCSelect } = base;

let NCOption = NCSelect.NCOption;

export default class ButtonAction {
	constructor(comp) {
		this.comp = comp;
	}


	didMount = () => {
		const {props} = this.comp
		this.buttonTool(props,true)
		this.visibleTool(true)
	}

	buttonClick = (props,code) => {
		const {action} = this.comp
		const {dispatch,form,exam} = props
		console.log(code)
		switch (code) {
			case 'add': //新增
				this.addButton()
				break;
			case 'save'://保存
				this.saveButton()
				break;
			case 'refresh': //刷新
			// 卡片模式刷新和表格模式刷新
				this.reflashClick();
				break;
			case 'cancel': //取消
				this.cancelFunction(props,true)
				break;
			case 'print': //打印
				this.printDate()
				break;
			case 'out'://输出
				this.outDate()
				break;
			case 'search': //查询
				this.showSearchModal()
				break;
			case 'del'://删除
				action.table.batchDelete(exam.billid)
				break;
			case 'edit'://修改
				action.formAct.editAction()
				break;
			case 'organization':
				action.orgSta.openOrgSituationModal();
				break;
			case 'commit'://提交
				action.table.batchCommit()
				break;
			case 'recover'://收回
				action.table.batchBack()
				break;
			case 'sendMsg'://提交
				action.table.sendMsgAction()
				break;
				case 'attchment'://附件管理
				action.main.attachment()
				break;
			case 'execute'://执行
				action.table.batchImplementBefore()
				break;
			
		}
	}
	reflashClick = () =>{
		const {action,props} = this.comp
		const {dispatch,form,exam} = props
		if(exam.cardMode){
			action.formAct.oneAction(exam.billid)
		}else if(exam.cardMode == false){
			action.table.initData();
			action.main.initTemplate();
		}
	}
	// 新增页面
	addButton = () =>{
		const {action,props} = this.comp
		const {dispatch,form,exam} = props
		this.pubSub.publish('toAddPage')
	}
	saveButton=() =>{
		const {action,props} = this.comp
		const {dispatch,form,exam} = props
		
		this.pubSub.publish('saveItemState')
	}

	/**
     * 下拉框触发事件
     * @param value 下拉框value值
     */
	handleChange = (value) => {
		const {props,action} = this.comp
		const {
			dispatch
		} = props
		dispatch({
			type: 'exam/update',
			payload: {
				probationType: value
				
			}
		})
		
		this.pubSub.publish('initData', {
			probationType: value
		});
		action.main.initTemplate()
	}
	

	/**
     * 打印
     */
    printDate = () => {
		const {action,props} = this.comp
		const {dispatch, exam} = props
		if(exam.cardMode === false) {
			this.tablePrint()
		} else {
			this.templatePrint()
		}
		
	}

	tablePrint = () => {
		const {action,props} = this.comp
		const {dispatch, exam} = props
        PrintTable(document.querySelector('.u-table'),
        {
            title:exam.json['ga6013-000044'],//"因私出国", 
            maker:exam.json['ga6013-000042'],
            date:exam.json['ga6013-000043'],
            maxColLen:18,
            beforeHtml:"",
			afterHtml:"",
			beforeAppend: (data) => {
                data[0].map((item, rowIndex) => {
                    delete item[0];
                });
                data[1].map((item) => {
                    item.length = item.length - 2;
                });
                return data;
            }
			
		})
	}

	
    // 模板打印
    templatePrint = () => {
		const {action,props} = this.comp
		const {dispatch, exam,meta,form} = props
		let template = meta.getMeta();
		let formData = form.getAllFormValue('card')
		// console.log(template)
		// console.log(formData)
		// printTemplate({
        //     template: template,
        //     moduleId: 'card',
        //     data: formData,
        //     // height: tableHeight,
        //     title: exam.json['ys6003-000072'] || '年度预算',
        //     maker: exam.json['ys6003-000037'] || '制作者',
        //     date: exam.json['ys6003-000038'] || '制作日期',
        //     printType: 'form'
        // });
        print('pdf', '/nccloud/hrga/myprvabroad/MyPrvAbroadPrintAction.do', {
            funcode: '60651110',
			nodekey: '60651110',
			filename:exam.json['ga6013-000044'],//"因私出国", 
            // oids: [template['card'].oid]
            oids:[exam.billid]
        });
    }

	
	/**
     * 输出
     */
    outDate = () => {
		const {action,props} = this.comp
		const {exam,meta,editTable} = props
        if(exam.cardMode === false) {
			this.tableOutDate()
		} else {
			this.templateOutDate()
		}
	}
	
	tableOutDate = () => {
		const {action,props} = this.comp
		const {exam,meta,editTable} = props
        const tableMeta = meta.getMeta();
        ExportHtml(document.querySelector('.u-table'), {
            
            title: exam.json['ga6013-000044'],//"因私出国", 
			fileName: exam.json['ga6013-000044'],//"因私出国", 
			maker:exam.json['ga6013-000042'],
            date:exam.json['ga6013-000043'],

        },{
			meta: tableMeta['list'],
            data: editTable.getAllRows('list'),
            showIndex: false
		})
	}
	templateOutDate = () => {
		const {action,props} = this.comp
		const {dispatch, exam} = props
		// let template = this.comp.props.meta.getMeta();
        output({
			url: '/nccloud/hrga/myprvabroad/MyPrvAbroadPrintAction.do',
							
            data: {
                appcode: '60651110',
				nodekey: '60651110',
				filename:exam.json['ga6013-000044'],//"因私出国", 
                // oids: [template['card'].oid],
                oids:[exam.billid],
                outputType: 'output'
            },
            callback: () => {
            }
        });
	}


	/**
	 * 人力资源组织参照
	 */
	handleChangePeople = (value) => {
		const {props} = this.comp
		const {
			dispatch,
			button,
			exam
		} = props

    	dispatch({
			type: 'exam/update',
			payload: {
				refValue: value
			}
		});
			if(!value.refpk) {
				this.visibleTool(true)
			} else {
				this.visibleTool(false)
				setTimeout(()=>{
					this.pubSub.publish('initData', {
						pk_org: '0001AB10000000000QC5'
					});
				},400)
				
			}
		
	}
	
	/**
	 * 禁用按钮方法
	 */
	visibleTool = (flag) => {
		const {props} = this.comp
		const {
			button
		} = props
		let buttons = {
			add:flag,
			edit: flag,
			del: flag,
			search: flag,
			refresh: flag,
			commit: flag, //提交
			execute: flag, //执行
			batchAdd: flag, //批量新增
			print: flag, //打印
			recover: flag,//收回
			organization: flag,//编辑情况
			enclosure: flag,//附件管理
			sendMsg: flag,//发送通知
			out: flag,//输出
			check_appr_opini: flag, //查看审批意见
			attchment:flag,
		}
		button.setButtonDisabled(buttons);
		button.setButtonsVisible(
			{
				commit:false,
				recover:false,
				del:false,
				attchment:false
			}
		)
	}

	/**
     * 按钮工具
     * @param flag 传入按钮显隐锁
     */
    buttonTool = (props,flag) => {
		const {exam} = props
		let buttonVisible = props.button.setButtonsVisible;
		
		let buttonAction = { //浏览态按钮装状态
			add:flag,
			batchAdd:flag,
			edit:false,
			del: flag,
			copy: flag,
			search: flag,
			refresh: flag,
			commit: flag, //提交
			execute: flag, //执行
			aux_function: flag, //辅助功能
			print: flag, //打印
			template_print: flag, //模板打印
			recover : flag, 
			attchment:false
		}

		let buttonEdit = {//编辑态按钮状态
			save:!flag,
			cancel:!flag
		}
		
		buttonVisible({
			autogen:'head',
			...buttonAction,
			...buttonEdit 
		})
        
	}
	
	   /**
     * 取消提示框
     * @param flag 按钮状态
     */
    cancelFunction = (props,flag) => {
        promptBox({
            color: 'warning', 
            title: props.exam.json['ga6013-000013'], //是否确认取消
            noCancelBtn: false, 
            beSureBtnName: props.exam.json['ga6013-000045'], //确定
            cancelBtnName: props.exam.json['ga6013-000039'], //取消
            hasCloseBtn:false, 
            beSureBtnClick: this.functionSure.bind(this,props,flag)
        })
	}
	
	/**
	 * 确定取消
	 */
	functionSure = (props,flag,flagSave) => {
		const {dispatch,button,form,exam} = props
		this.buttonTool(props,true)
		
		if(!flagSave&&this.comp.props.exam.fromApprove===false) {
			this.cancelAdd()
		} else {
			form.setFormStatus('card', 'browse')
		}
			
		button.setButtonsVisible({
			batchAdd:false,
			search:false,
		})
		dispatch({
			type: 'exam/update',
			payload: {
				editState:false,
				page:''
			}
		})

		this.comp.action.formAct.approveButton()
	}

	// 取消新增通用方法
	cancelAdd = async () => {

		const {props,action} = this.comp
		const {dispatch,exam,form,editTable} = props
		let form_card = form.getAllFormValue('card')
		let postData = {
			form_card: form_card,
		}
		try {
			let res = await dispatch({
				type: 'exam/cancelAction',
				payload: {
					postData: postData
				}
			});
			if(true) {
				let formData = form.getAllFormValue('card')
				form.EmptyAllFormValue('card')
				form.setFormStatus('card', 'browse')

				let data = editTable.getClickRowIndex('list')
				if(data) {
					// 若表格有光标选中数据则显示选中行数据
					let billid = data.record.values.pk_prvabroad.value
					action.formAct.oneAction(billid)
				} else {
					// 显示表格第一行数据
					if(formData && exam.changeModdle){
						//修改
						let bilibilid = formData.rows[0].values['pk_prvabroad'].value;
						action.formAct.oneAction(bilibilid)
					}else{
						if(editTable.getAllRows('list').length>0) {
							let billid = exam.billid===true? exam.billid: editTable.getAllRows('list')[0].values.pk_prvabroad.value
							action.formAct.oneAction(billid)
						} else {
							action.formAct.oneAction()
						}
					}
				}
				
				
			}
		}
		catch (e) {

		}
		
	}


	/**
	 * 
	 * 
	 * 
	 */
	
	statesChange = async (value) => {
		const {props,action} = this.comp
		const {
			dispatch
		} = props
			//但据状态中包含全部且不止全部
			if (value.indexOf('all') > -1 && value.length > 1) {
				for (var i = 0; i < value.length; i++) {
					if (value[0] === "all") {
						value = value.splice(1, 1)
					} else {
						value = ['all']
					}
				}
				dispatch({
					type: 'exam/update',
					payload: {
						billStatus: value
					}
				});
			
				this.pubSub.publish('initData', {
					billStatus: value
				});
			} else {
				let res = await dispatch({
					type: 'exam/update',
					payload: {
						billStatus: value
					}
				});	
				this.pubSub.publish('initData', {
					billStatus: value
				});
			}
			action.main.initTemplate()
	}

	/**
	 * 时间函数
	 */
	timeChange = (value) => {
		let {props,action} = this.comp;
		let {dispatch,exam} = props;
		dispatch({
			type: 'exam/update',
			payload: {
				time: value,
				beginTime: '',
        		endTime: '',
			}
		});
		if(value!=='custom') {
			this.pubSub.publish('initData', {
				time: value
			});
			action.main.initTemplate()
		}
		
	}

	beginTime = (value) => {
		let {props,action} = this.comp;
		let {dispatch,exam} = props;

		if(exam.endTime) {
			this.pubSub.publish('initData', {
				beginTime: value
			});
		}

		dispatch({
			type: 'exam/update',
			payload: {
				beginTime: value
			}
		});
		action.main.initTemplate()
	}
	endTime = (value) => {
		let {props,action} = this.comp;
		let {dispatch,exam} = props;
		if(exam.beginTime) {
			this.pubSub.publish('initData', {
				endTime: value
			});
			action.main.initTemplate()
		}

		dispatch({
			type: 'exam/update',
			payload: {
				endTime: value
			}
		});
		
		
	}

	// 展示查询弹窗
	showSearchModal = () => {
		const {props,action} = this.comp;
		const {search} = props;
		
		search.openAdvSearch('query', true);
	}
}