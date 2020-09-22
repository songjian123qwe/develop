import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.less'
import { toast } from "nc-lightapp-front"
import OrgRefer from './org'
import HRTree from 'src/hrpub/common/components/hrTree'
import EmptyImg from '../../../../hrpub/common/components/emptyImg';
import { high, createPage, base ,promptBox} from 'nc-lightapp-front';
import {hrAjax as ajax} from 'src/hrpub/common/utils/utils'  
import '../../../../hrpub/common/static/fonts/iconfont.css'
import {getAppPageConfig,handleHash} from 'src/hrpub/common/utils/utils';


let { NCRow, NCCol,NCSelect,NCCheckbox, NCButton, NCSwitch, NCMenu,NCItem, NCIcon } = base;
let NCOption = NCSelect.NCOption;
const moduleId = "jf6005"
const domainName = "hrjf"

@handleHash('201981519','/ifr?page=201981519&c=60060010&p=60060010p')
class OrganizePower extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            infoConfig:{
                root:{
                    title: ''
                },
                onSelect:(selectedKeys,e)=>this.selectInfo(selectedKeys,2,2,e),
                onCheck :()=>this.onCheck(),
                checkable:true,
                showLine:true,
                defaultExpandAll:true,
                checkedKeys:[]
            },
            userConfig:{
                root:{
                    title: ''
                },
                onSelect:(selectedKeys,e)=>this.selectInfo(selectedKeys,3,2,e),
                onCheck :()=>this.onCheck(),
                checkable:true,
                showLine:true,
                defaultExpandAll:true,
                checkedKeys:[]
            },
            classConfig:{
                root:{
                    title: ''
                },
                onSelect:(selectedKeys,e)=>this.selectInfo(selectedKeys,1,2,e),
                onCheck :()=>this.onCheck(),
                checkable:true,
                defaultExpandAll:true,
                showLine:true,
                checkedKeys:[]
            },
            orgValue:{},
            index:'', //左侧列表选中状态
            pk_org:'', //组织id
            refpk:'', //id
            clickId:'',
            pid:'',
            innercode:'',//判断节点是否可以授权 Y可以，N不可以
            stateIndex:3,//记录当前查看类型 1：方案 3 用户 2 角色
            referFlag:false,
            glouble:0, //全局树显示隐藏 0：隐藏
            Jurisdiction:0,//权限查看类型 0：列表 1：复选框树状态
            dataList:[],
            dataUser:[],
            dataRoles:[],
            dataUserSearch:[], //用于浏览态列表数据
            dataRolesSearch:[], //用于浏览态列表数据角色
            authori:1, // 1授权
            nameButton:'',
            json:{},
            values:'',
            valuesUser:'',
            dataUserList:[], //选中的用户列表
            dataRolesList:[], //选中的角色列表
            dataClassList:[], //选中的方案列表
            disableCheckbox: true, //多选框是否禁用
            jobrows:''
        }
        this.handleTreeChange = this.handleTreeChange.bind(this);
        
    }
    componentWillMount() {
      
        
    }
    componentDidMount () {
        if (!('remove' in Element.prototype)) {
            Element.prototype.remove = function() {
                if (this.parentNode) {
                    this.parentNode.removeChild(this);
                }
            }
        }
        if (window.location.href.match('localhost:3006')) window.location.hash = '#/ifr?page=201981519'
        let callback = (json, status, inlt) => {
            if (status) {
                this.setState({json, inlt})//存json和inlt到页面state中并刷新页面
                this.state.infoConfig.root.title = this.state.json['jf6005-000529']; 
                this.state.classConfig.root.title = this.state.json['jf6005-000530'];
                this.state.userConfig.root.title = this.state.json['jf6005-000528']; 
                this.setState(this.state)
            }
        }
        this.props.MultiInit.getMultiLang({moduleId: moduleId, domainName: domainName, callback})
        this.config = getAppPageConfig()
        this.initiaBtns()
        this.updateButtonStatus()
    } 
    functionSure (props) {
        this.state.infoConfig.selectedKeys = []
        this.state.classConfig.checkedKeys = []
        this.state.userConfig.selectedKeys = []
        this.state.dataClassList = [],
        this.state.dataRolesList = [],
        this.state.dataUserList = [],
        this.state.authori = 2
        this.state.referFlag = false
        this.state.dataRoles = this.state.dataRolesSearch
        this.state.dataUser = this.state.dataUserSearch
        this.state.classConfig.onCheck =()=>this.onCheck()
        this.state.infoConfig.onCheck =()=>this.onCheck()
        this.state.userConfig.onCheck =()=>this.onCheck()
        this.state.values = ''
        this.state.valuesUser = ''
         this.state.disableCheckbox = true
        this.setState(this.state)
        try {
            this.refs.role.state.searchValue = ''
            this.refs.user.state.searchValue = ''
        } catch (error) {
            console.log(error)
        }
        props.button.setButtonsVisible({
            autogen:'head',
            ImPower: true,
            QueryImpower: false,
            Refresh:true,
            Save: false,
            Cancel: false
            
        })
    }
    /**
     * 人员参照触发事件 
     */
    handleTreeChange(value) {
        console.log('www33--',value)
        this.setState({
            orgValue: value,
            pk_org:value.refpk,
            refpk:value.refpk,
            authori:2
        },()=>{
            if(!value.refpk||!value){
                this.setState({
                    glouble:0
                })
            } else {
                this.setState({
                    glouble:1
                },()=>{
                        this.initData(value.refpk,1)
                        this.state.Jurisdiction = 0
                        this.state.stateIndex = 3
                        this.state.index = ''
                        this.state.referFlag = false,
                        this.state.infoConfig.checkable = true
                        this.state.userConfig.checkable = true
                        this.state.infoConfig.checkedKeys = []
                        this.state.infoConfig.selectedKeys = []
                        this.state.userConfig.checkedKeys = []
                        this.state.userConfig.selectedKeys = []
                    }
                )
            }
        })
    }
    // 编辑状态按钮显示状态
    updateButtonStatus() {
        this.props.button.setButtonsVisible({
            save: false,
            cancle: false
        })
    }
    onCheck(type,value) {
        if(type==='classlist'){
            this.state.classConfig.checkedKeys = value
            this.state.dataClassList = value
        }else if(type === 'user'){
            this.state.userConfig.checkedKeys = value
            this.state.dataUserList = value
        }else{
            this.state.infoConfig.checkedKeys = value
            this.state.dataRolesList = value
        }
        
        this.setState(this.state)
    }
    /**
     * 初始化按钮
     */
    initiaBtns() {
        ajax({
            url:'/nccloud/platform/appregister/queryallbtns.do',
            data:{"pagecode": this.config.pagecode,"appcode":this.config.appcode},
            success:(res)=> {
                let meta = res.data
                this.props.button.setButtons(meta);
                this.setState({
                    btnstutstorg:true
                })
                this.props.button.setButtonsVisible({
                    save: false,
                    cancel: false
                })
            }
        })
    }
    /**
     * 进入页面初始化数据
     */
    initData (pk_org,type) {
        this.props.button.setButtonsVisible({
            save:false,
            cancle:false,
            power:true,
            refresh:true
        })
        ajax({
            url:'/nccloud/hrjf/organize/queryPower.do',
            data:{ 
                pk_org:pk_org,
                type:type
             },
            success:(res)=> {
                this.setState({
                    dataRoles:res.data,
                    dataRolesSearch:res.data,
                    dataRolesList: []
                })
                ajax({
                    url:'/nccloud/hrjf/organize/queryDepartment.do',
                    data:{ 
                        pk_org:pk_org,
                        type:type
                     },
                    success:(res)=> {
                       this.setState({
                        dataUser:res.data,
                        dataUserSearch:res.data,
                        dataUserList: [],
                    })
                    }
                })
            }
        })
        
    }
    /**
     * 点击列表获取id
     */
    listClickChange(pk_org,id,type,index){
        this.state.index = index
        this.state.clickId = id
        if(this.state.referFlag) {
            this.state.disableCheckbox = false
        }
        this.setState(this.state)
        if(!id) {
            return
        }
        if(type===1&&this.state.stateIndex===1){
           // console.log(2)
        } else if(type===2&&this.state.stateIndex===2) {
            this.state.infoConfig.selectedKeys = [id]
            this.setState(this.state)
        }  else if(type===3&&this.state.stateIndex===3) {
            this.state.userConfig.selectedKeys = [id]
            this.setState(this.state)
        }else {
            return
        }
        ajax({
            url: '/nccloud/hrjf/organize/queryPartSystemAction.do',
            data:{
                pk_org:this.state.pk_org,
                type:type,
                pk_subject:id},
            success:(res)=> {
                if(res.data!='without'){
                    this.setState({
                        dataList:res.data
                    })
                }else{
                    this.setState({
                        dataList:[]
                    })
                }
            }
        })
    }
    selectInfo(selectedKeys,type,flag, e) {
        console.log(selectedKeys)
        // flag = 2 时禁止点击事件触发
        this.state.pid = e.selectedNodes[0].props.pid?e.selectedNodes[0].props.pid:false
        this.state.innercode = e.selectedNodes[0].props.innercode?e.selectedNodes[0].props.innercode:false
        if(this.state.stateIndex===1&&flag===2) {
            return
        }
        this.listClickChange(this.state.pk_org,selectedKeys[0],type)
    }
    checkedKeyDate(checkedKeys,type) {
        
        const cks = {
			checked: checkedKeys.checked || checkedKeys,
        };
        console.log('a',type)
        if(type===1) {
            this.state.classConfig.checkedKeys = checkedKeys
            this.setState(this.state)
        }
        if(type===2){
            this.state.infoConfig.checkedKeys = checkedKeys
            this.setState(this.state)
        }else if(type===3){
            this.state.userConfig.checkedKeys = checkedKeys
            this.setState(this.state)
        }
            
        console.log(checkedKeys)
    }
    unProgramme () {
        return (
            <HRTree treeData={this.state.dataList} onCheck = {this.onCheck.bind(this,'classlist')} config={this.state.classConfig} 
                ref={(node)=>{this.unprogramme = node}}
                checkedKeys ={this.state.dataClassList}  
                disableCheckbox = {this.state.disableCheckbox} 
            />
        )
        
    }
    flagBox() {
        return (
            <div className="flagBox"></div>
        )
    }
    rightNameButton() {
        return (
            <div>
                <div className="nameButton">{this.state.nameButton}</div>
            </div>
        )
    }
    content() {
        let programme = (
            <div className="sa-box fl">
                    <div>
                        <p className="sa-box-title nc-bill-header-area">{this.state.json['jf6005-000530']}</p>
                        <div className="sa-box-bt">
                            {this.state.glouble!==0?this.peopleList(this.state.dataList):null}
                        </div>
                    </div>
                 </div>
        )
        let role = (
            <div className="sa-box">
                    <div>
                    <p className="sa-box-title nc-bill-header-area">
                        {this.state.json['jf6005-000529']}
                    </p>
                    <div className="sa-box-bt">
                    {this.state.dataRoles.length===0?null:this.rolesList()}
                    </div>
                    </div>
                </div>
        )
        let user = (
            <div className="sa-box fr">
            <div>
                <p className="sa-box-title nc-bill-header-area">
                    {this.state.json['jf6005-000528']}
                </p>
                <div className="sa-box-bt">
                {this.state.dataUser.length===0?null:this.userList()}
                </div>
            </div>
        </div>
        )
        let list;
        if(this.state.stateIndex === 1) {
            list = [programme,role,user]
        } else if(this.state.stateIndex === 2) {
            list = [role,user,programme]
        } else {
            list = [user,role,programme]
        }
        return (
            <div className={this.state.authori === 2?'sa-content disa':'sa-content'}>
                {
                    list
                }
            </div>
        )
    }
    ety() {
        return (
            <div className="contentHeight"><EmptyImg text={this.state.json['i6013-000719']}/></div>
        )
    }
    rolesList () {
        return (
            <HRTree showSearch={true} treeData={this.state.dataRoles} editType={true} config={this.state.infoConfig}
                checkedKeys ={this.state.dataRolesList}
                ref = 'role'
                disableCheckbox ={this.state.disableCheckbox}
                onCheck = {this.onCheck.bind(this,'roles')}
                placeholder = {this.state.json['jf6005-000531']}
             />
        )
    }
    userList() {
        return (
            <HRTree showSearch={true} treeData={this.state.dataUser} config={ 
                this.state.userConfig
            }   ref = 'user'
                placeholder = {this.state.json['i6013-000866']}
                checkedKeys = {this.state.dataUserList}
                disableCheckbox ={this.state.disableCheckbox}
                onCheck = {this.onCheck.bind(this,'user')}

            />
        )
    }
    /**
     * 
     * 判断状态显示列表or树
     */
    peopleList(props) {
 
            let itemList = props.map((item,idx)=>{
                return  <li className={idx === this.state.index? 'peopList u-tree-node-selected':'peopList'} onClick={()=>this.listClickChange(item.pid,item.id,1,idx)} key={idx}><a 
                className={idx === this.state.index? 'u-tree-title u-tree-node-selected':'u-tree-title'}>{item.role_name}</a></li>
            })
            if(this.state.Jurisdiction===0) {
                return (
                    <ul className="nc-tree u-tree">
                        {itemList}
                    </ul>
                )
            }else {
                return (this.unProgramme())
            }
    }
    objCopy = (obj)=>{
        return JSON.parse(JSON.stringify(obj))
    }
    intexChange(event,data,type) {
        let value
        if(type === 2) {
            this.state.values = event.target.value
            value = event.target.value
        } else if(type === 3) {
            this.state.valuesUser = event.target.value
            value = event.target.value
        }
        this.setState(this.state)
            const list = this.objCopy(data)
            console.log('list',list)
            const expandedKeys = [];
            list.forEach((item) => {
               
                let flag = item.children.some((it)=>{
                    return (it.refname.indexOf(value) > -1)
                 })
                if((item.refname.indexOf(value) > -1)&&(flag === true)||flag === true) {
                    var chil = []
                    item.children.forEach((it)=>{
                        // debugger
                        if(it.refname.indexOf(value)>-1) {
                            chil.push(it)
                        }
                    })
                    item.children = chil
                    expandedKeys.push(item)
                } else if((item.refname.indexOf(value) > -1)){
                        expandedKeys.push(item);
                }
             });
                 if(type === 2) {
                    this.state.dataRoles = expandedKeys
                 } else if(type === 3) {
                    this.state.dataUser = expandedKeys
                 }
                 this.setState(this.state)
    }
    //操作
    headerButtonClick (props,code) {
        if(code === 'power'){
            this.setState({
                authori:1,
                disableCheckbox:false
            })
            this.props.button.setButtonsVisible({
                power:false,
                refresh:false,
                save:true,
                cancle:true
            })
        }else if(code === 'save'){
            promptBox({
                color: 'warning',
                title: this.state.json['jf6005-000050'],
                content: this.state.json['jf6005-000053'],
                noFooter: false,
                noCancelBtn: false,
                beSureBtnName: this.state.json['jf6005-000036'],
                cancelBtnName: this.state.json['jf6005-000008'],
                beSureBtnClick: () => {
                    this.enableHRSaveAction()
                },
                cancelBtnClick: null
            });
        }else if(code === 'cancle'){
            this.props.button.setButtonsVisible({
                power:true,
                powersee:true,
                refresh:true,
                save:false,
                cancle:false
            })
            this.setState({
                authori:2,
                disableCheckbox:true,
                dataRolesList: [],
                dataUserList: []
            })
        }else if(code === 'refresh'){
            this.initData(this.state.pk_org,this.state.stateIndex)
        }
    }
    //保存
    enableHRSaveAction(){
        if(this.state.dataUserList.length==0){
            toast({color: "danger", content: this.state.json['jf6005-000532']});
        }else if(this.state.dataRolesList.length==0){
            toast({color: "danger", content: this.state.json['jf6005-000533']});
        }else if(this.state.dataUserList.length>1 ){
            toast({color: "danger", content: this.state.json['jf6005-000534']});
        }else{
            ajax({
                url:'/nccloud/hrjf/organize/partSystemBaseAction.do',
                data:{ 
                    datajobinfoList:this.state.dataUserList,
                    dataDepartmentList:this.state.dataRolesList,
                    pk_org:this.state.pk_org
                 },
                success:(res)=> {
                    if(res.data=='success'){
                        toast({color: "warning", content: this.state.json['jf6005-000043']});
                        this.setState({
                            authori:2,
                            disableCheckbox:true
                        })
                        this.props.button.setButtonsVisible({
                            save:false,
                            cancle:false,
                            power:true,
                            refresh:true
                       })
                        this.initData(this.state.pk_org,this.state.stateIndex)
                    }
                }
            })
        }
    }
    programmeFun = (value) => {
        if(Number(value) === 1) {
            this.initData(this.state.pk_org,1)
                this.state.Jurisdiction = 0
                this.state.stateIndex = 1
                this.state.index = null
                this.state.authori = 2
                this.state.referFlag = false,
                this.state.infoConfig.checkable = true
                this.state.userConfig.checkable = true
                this.state.infoConfig.checkedKeys = []
                this.state.infoConfig.selectedKeys = []
                this.state.userConfig.checkedKeys = []
                this.state.userConfig.selectedKeys = []
                this.state.dataClassList = []
                this.state.dataRolesList = []
                this.state.dataUserList = []
                this.state.userConfig.onCheck =()=>this.onCheck()
                this.state.infoConfig.onCheck =()=>this.onCheck()
                this.state.userConfig.onSelect =(selectedKeys,e)=>this.selectInfo(selectedKeys,3,2,e)
                this.state.infoConfig.onSelect =(selectedKeys,e)=>this.selectInfo(selectedKeys,2,2,e)
                this.setState(this.state)
        } else if(Number(value)===2) {
            this.initData(this.state.pk_org,2)
                this.state.Jurisdiction = 1
                this.state.stateIndex = 2
                this.state.authori = 2
                this.state.referFlag = false,
                this.state.index = null
                this.state.infoConfig.checkable = false
                this.state.userConfig.checkable = false
                this.state.classConfig.checkedKeys = []
                this.state.infoConfig.selectedKeys = []
                this.state.userConfig.selectedKeys = []
                this.state.dataClassList = []
                this.state.dataRolesList = []
                this.state.dataUserList = []
                this.state.classConfig.onCheck =()=>this.onCheck()
                this.state.infoConfig.onSelect =(selectedKeys,e)=>this.selectInfo(selectedKeys,2,2,e)
                this.setState(this.state)
        } else {
            this.initData(this.state.pk_org,3)
            this.state.Jurisdiction = 1
            this.state.stateIndex = 3
            this.state.authori = 2
            this.state.index = null
            this.state.referFlag = false,
            this.state.infoConfig.checkable = false
            this.state.userConfig.selectedKeys = []
            this.state.infoConfig.selectedKeys = []
            this.state.dataClassList = []
            this.state.dataRolesList = []
            this.state.dataUserList = []
            this.state.userConfig.checkable = false
            this.state.classConfig.checkedKeys = []
            this.state.userConfig.onSelect =(selectedKeys,e)=>this.selectInfo(selectedKeys,3,2,e)
            this.state.classConfig.onCheck =()=>this.onCheck()
            this.setState(this.state)
        }
    }
    render() {
        const { button,syncTree } = this.props;
        let { createButtonApp } = button; 
        let {createSyncTree} = syncTree;
        return (
            <div className="salaryAuthority nc-bill-card">
                <header className="nc-bill-header-area">
                    <div className="frbtn">{button.createButtonApp({area:'list',onButtonClick: this.headerButtonClick.bind(this)})}</div>
                    <div className="renli">人力资源组织：</div>
                    <div className="search fl">
                    <div className="header-refer">
                    <OrgRefer
                        getOrgData={this.handleTreeChange.bind(this)}
                        orgVal={this.state.orgValue}
                    />
                    </div>
                    </div>
                </header>
                {this.state.pk_org?this.content():this.ety()}
            </div>
        )
    }
}
let SalaryPro = createPage({
})(OrganizePower)
ReactDOM.render(<SalaryPro />, document.querySelector('#app'));
