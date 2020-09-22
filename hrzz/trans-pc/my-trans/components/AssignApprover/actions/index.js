import {toast} from 'nc-lightapp-front';

export default class SearchAction {
    constructor(comp) {
        this.comp = comp;
        this.dispatch = this.comp.props.dispatch;
    }

    closeModal = () => {
        const {props} = this.comp;
        const {dispatch} = props;
        dispatch({
            type: 'main/update',
            payload: {
                assignAppVisible: false
            }
        });
        this.comp.setState({
            workflow: [],
            leftData: [],
            rightData: [],
            allAssignInfo: {},
            selectedWork: ''
        })
    };

    getContent = async () => {
        const {props} = this.comp;
        const {dispatch, main} = props;
        const {assignContent} = main;
        const workflow = assignContent.content.map(item => {
            item.users = item.uservos.map(user => {
                return {
                    key: user.userpk,
                    title: user.username
                }
            });
            item.selectUsers = [];
            item.oldUsers = item.uservos;
            item.uservos = [];
            return {
                key: item.desc,
                value: item.activitydefid
            }
        });
        let leftData = assignContent.content[0].users, rightData = [];

        this.comp.setState({
            allAssignInfo: assignContent,
            leftData,
            rightData,
            workflow,
            selectedWork: workflow[0].value
        })
    };

    onWorkflowChange = async (value) => {
        const {state} = this.comp;
        const {allAssignInfo} = state;
        let leftData = [], rightData = [];
        const curInfo = allAssignInfo.content.find(item => item.activitydefid === value);
        if (curInfo) {
            leftData = curInfo.users;
            rightData = curInfo.selectUsers;
        }
        this.comp.setState({
            leftData,
            rightData,
            selectedWork: value
        });
    };

    appChange = (targetKeys, direction, moveKeys) => {
        const {state} = this.comp;
        const {allAssignInfo, selectedWork} = state;
        const curInfo = allAssignInfo.content.find(item => item.activitydefid === selectedWork);
        if (curInfo) {
            curInfo.selectUsers = targetKeys;
            curInfo.uservos = curInfo.oldUsers.filter(item => targetKeys.includes(item.userpk));
        }
        this.comp.setState({
            allAssignInfo,
            rightData: targetKeys
        });
    };

    onSure = () => {
        const {action, state, props} = this.comp;
        const {allAssignInfo} = state;
        const {main} = props;
        const {language} = main;
        let isAssigned = true;
        allAssignInfo.content.forEach(item => {
            if (!item.selectUsers || !item.selectUsers.length) {
                isAssigned = false
            }
        });
        if (!isAssigned) {
            toast({color: 'danger', content: language['hrzzpc-000139']});
            return;
        }
        action.formAct.assignApp(allAssignInfo, () => {
            this.closeModal()
        });
    }
}