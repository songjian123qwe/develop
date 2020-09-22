
import CommonAction from './common';

import {toast,promptBox} from 'nc-lightapp-front';

export default class OrgSituation extends CommonAction {
    constructor(comp) {
        super();
        this.comp = comp;
    }

    // 打开编制情况弹窗
    openOrgSituationModal = async () => {
        const {props, action, state} = this.comp;
        const {dispatch, exam, editTable} = props;

        let data = editTable.getCheckedRows('list')
		if(data.length === 0&&exam.cardMode===false){
			toast({
				color:"warning",
				content:exam.json['ga6013-000005'] //请先勾选带操作数据
			})
			return
		}
		let selectedRows = []
		data.forEach((item) => {
			selectedRows.push(item.data.values.pk_prvabroad.value)
		})

        if(selectedRows) {
            let postData = {
                billids: exam.cardMode===true?exam.billid:selectedRows,
                pk_org: exam.refValue.refpk
            };

            let res = await dispatch({
                type: 'exam/getOrgSituationInitData',
                payload: {
                    postData: postData
                }
            });

            if(res.success) {
                const {opts, org, dept} = res.data;
                dispatch({
                    type: 'exam/update',
                    payload: {
                        orgSituationModalVisible: true,
                        orgStaOptions: opts||{},
                        orgStaOrgData: org?org.org:[],
                        orgStaDeptData: dept?dept.dept:[],
                        orgStaOrgDimension: opts[0].value
                    }
                });
            }
        }
    }

    // 关闭弹窗
    closeModal = () => {
        this.comp.props.dispatch({
            type: 'exam/update',
            payload: {
                orgSituationModalVisible: false,
                orgStaOrgDimension: 'org'
            }
        });
    }

    // 切换编制维度
    changeOrgDimension = async (value) => {
        const {props, action, state} = this.comp;
        const {dispatch, exam, editTable} = props;
        let data = editTable.getCheckedRows('list')
        let selectedRows = []
		data.forEach((item) => {
			selectedRows.push(item.data.values.pk_prvabroad.value)
		})
        if(selectedRows) {
            let postData = {
                billids: exam.cardMode===true?exam.billid:selectedRows,
                pk_org: exam.refValue.refpk,
                pk_dimension: value
            };

          

            let res = await dispatch({
                type: 'exam/getOrgSituationInitData',
                payload: {
                    postData: postData
                }
            });

            if(res.success) {
                const {org, dept} = res.data;

                dispatch({
                    type: 'exam/update',
                    payload: {
                        orgStaOrgData: org?org.org:[],
                        orgStaDeptData: dept?dept.dept:[],
                        orgStaOrgDimension: value
                    }
                });
                this.setOrgDeptTableData(org?org.org:[], dept?dept.dept:[]);
            }
        }
    }

    // 切换tab的时候
    changeTab = (value) => {
        this.comp.props.dispatch({
            type: 'exam/update',
            payload: {
                orgStaActiveTab: value
            }
        });
    }

    // 显示完了弹窗
    setOrgDeptTableData = (orgData, deptData) => {
        const {props} = this.comp;
        const {exam, editTable} = props;

        !orgData && (orgData = exam['orgStaOrgData']);
        !deptData && (deptData = exam['orgStaDeptData']);

        editTable.setTableData('org', orgData, false);
        editTable.setTableData('dept', deptData, false);
    }
}