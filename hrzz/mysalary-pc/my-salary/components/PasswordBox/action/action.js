import { base,toast,pageTo } from 'nc-lightapp-front';
import md5 from 'md5'
import eye from 'src/hrzz/mysalary-pc/my-salary/img/eye.svg'
import pass from 'src/hrzz/mysalary-pc/my-salary/img/password.png'
const { NCButton,NCModal,NCInput} = base;
export default class wageEnquiry {
    constructor(comp) {
        this.comp = comp
    }
    didMount = () => {
    }
    // 输入密码弹框
    wageEnquiry = () => {
        const { props,state } = this.comp
        const { my } = props
   
        return (
            <div>
                 <NCModal 
                    show = {
                        my.passWordModal
                    }
                    size="sm"
                    dialogClassName="wageEnquiry"
                >
                <NCModal.Body>
                    <p className="title">{my.language['hrzzpc-000144']  || '工资查询'}</p>
                    <p className = "pass-tool">
                        <span>{my.language['hrzzpc-000145'] || '查询密码'} </span>
                        <span onClick={this.forgetPassword}>{my.language['hrzzpc-000146'] || '忘记密码?'}</span>
                    </p>
                    <div className="input-border">
                        <input type={state.eye?'text':'password'} autocomplete="new-password" value={state.password} onChange={this.passwordChange}  placeholder={my.language['hrzzpc-000147'] || "请输入查询密码"} />
                        {state.eye?(<img onClick={this.isPassword} className="eye" src={eye}/>):<img onClick={this.isPassword} src={pass}/>}
                    </div>
                    <p className="errTip"><span style={{display:my.isPasswordCorrect?'none':'block'}}>{my.language['hrzzpc-000148'] || '查询密码有误，请重新输入'}</span></p>
                    <NCButton className="button" onClick={this.searchData} colors="primary" shape="squared">{my.language['hrzzpc-000149'] || '查询'}</NCButton>
                </NCModal.Body>
                </NCModal>
            </div>
           
        )
    }
    // 设置密码弹框
    setWageEnquiry = () => {
        const { props,state } = this.comp
        const { my } = props
   
        return (
            <div>
                 <NCModal 
                    show = {
                        my.setPassWordModal
                    }
                    size="sm"
                    dialogClassName="wageEnquiry"
                >
                <NCModal.Body>
                    <p className="title">{my.language['hrzzpc-000144']  || '工资查询'}</p>
                    <p className = "pass-tool">
                        <span>{my.language['hrzzpc-000150'] || '设置查询密码'}</span>
                    </p>
                    <div className="input-border">
                        <input type={state.eye?'text':'password'} autocomplete="new-password" value={state.password} onChange={this.setPasswordChange} placeholder={my.language['hrzzpc-000151'] || "请输入至少六位查询密码"} />
                        {state.eye?(<img onClick={this.isPassword} className="eye" src={eye}/>):<img onClick={this.isPassword} src={pass}/>}
                    </div>
                <p className="errTip">{state.errtip}</p>
                    <NCButton className="button" onClick={this.passwordSave} colors="primary" shape="squared" disabled={state.disablePass}>{my.language['hrzzpc-000152'] || '确定'}</NCButton>
                </NCModal.Body>
                </NCModal>
            </div>
           
        )
    }

    // 发送验证码弹框
    toEmail = () => {
        const { props,state} = this.comp
        const { my} = props
        this.refs = {}
        return (
            <div>
                 <NCModal 
                    show = {
                        my.emailModal
                    }
                    size="sm"
                    dialogClassName="wageEnquiry"
                >
                <NCModal.Body>
                    <p className="title">{my.language['hrzzpc-000144']  || '工资查询'}</p>
                    <p className = "pass-tool">
                        <span className="email">{my.language['hrzzpc-000153'] || '请输入邮箱验证码'}</span>
                    </p>
                <p className="emailTip">{`${my.language['hrzzpc-000154'] || '验证码已发送到'}${my.email}`}</p> 
                    <div className="input-password">
                        <div className={state.btlineClass}><input ref={(ref)=>{this.refs.code1 = ref}} onKeyDown={this.keyDown(1)} onKeyUp={this.codeChange(1)} maxLength="1"/></div>
                        <div className={state.btlineClass}><input ref={(ref)=>{this.refs.code2 = ref}} onKeyDown={this.keyDown(2)} onKeyUp={this.codeChange(2)} maxLength="1"/></div>
                        <div className={state.btlineClass}><input ref={(ref)=>{this.refs.code3 = ref}} onKeyDown={this.keyDown(3)} onKeyUp={this.codeChange(3)} maxLength="1"/></div>
                        <div className={state.btlineClass}><input ref={(ref)=>{this.refs.code4 = ref}} onKeyDown={this.keyDown(4)} onKeyUp={this.codeChange(4)} maxLength="1"/></div>
                        <div className={state.btlineClass}><input ref={(ref)=>{this.refs.code5 = ref}} onKeyDown={this.keyDown(5)} onKeyUp={this.codeChange(5)} maxLength="1"/></div>
                        <div className={state.btlineClass}><input ref={(ref)=>{this.refs.code6 = ref}} onKeyDown={this.keyDown(6)} onKeyUp={this.codeChange(6)} maxLength="1"/></div>
                    {my.isEmailTo?( <div className="email-again"><em>{my.codeTime+my.codeTimeName}</em></div>):
                    <div className="email-code" onClick={this.emailCode}><em>{my.language['hrzzpc-000155'] || "重新发送"}</em></div>}
                    </div>
                    <p className="errTip"><span style={{display:state.codeFlag?'none':''}}>{my.language['hrzzpc-000156'] || '验证码有误，请重新输入'}</span></p>
                    <NCButton className="button" colors="primary" onClick={this.nextStep} shape="squared" disabled={state.disableCode}>{my.language['rzzpc-000160'] || '下一步'}</NCButton>
                </NCModal.Body>
                </NCModal>
            </div>
        )
    }
    forgetPassword = async () => {
        const { props, refs ,state} = this.comp
        const { dispatch } = props
        await dispatch({
            type: 'my/update',
            payload: {
                forgetPassFlag:true
            }
        });
        await props.main.queryCheckAction()
        // this.emailCode()
    }
    isPassword = () => {
        const { props, refs ,state} = this.comp
      
        this.comp.setState({
            eye:!state.eye
        })
    }
    passwordChange = (value) => {
        const { props, refs ,state} = this.comp
        const { dispatch } = props
        if(value.target.value.length>=6) {
            dispatch({
                type: 'my/update',
                payload: {
                    isPasswordCorrect:true
                }
            });
        }
        this.comp.setState({
            password:value.target.value
        })
    }
    setPasswordChange = (value) => {
        if(value.target.value.length>=6) {
            this.comp.setState({
                errtip:''
            })
        } else if(!value.target.value){
            this.comp.setState({
                disablePass:true
            })
        } else if(value.target.value.length>=1){
            this.comp.setState({
                disablePass:false
            })
        }
        this.comp.setState({
            password:value.target.value
        })
    }
    // 验证码输入事件
    codeChange = (num) => {
        const { refs }= this
       
        return (e) => {
            if(refs[`code${num}`].value.length!=0) {
            
                if(/[^\d]/g.test(refs[`code${num}`].value)) {
                    refs[`code${num}`].value=''
                } else {
                    num!=6&&refs[`code${num+1}`].focus()
                }
                refs[`code${num}`].parentNode.className = "input-btline blue"
                
            }
            let code = ''
            for(let i = 1;i<7;i++){
                code+=this.refs[`code${i}`].value
            }
            if(code.length!=6){
                this.comp.setState({
                    disableCode:true
                })
            } else {
                this.comp.setState({
                    disableCode:false
                })
            }
            
            
        }
    }

    keyDown = (num) => {
        const { refs }= this
        
        return (e) => {
            if(e.keyCode === 8) {
                    if(e.target.value.length!=0){
                        refs[`code${num}`].value=''
                    } else {
                        num!=1&&refs[`code${num-1}`].focus()
                        num!=1&&(refs[`code${num-1}`].value='')
                        num!=1&&(refs[`code${num}`].parentNode.className = "input-btline")
                    }
            }
        }
         
    }
    // 下一步
    nextStep = async () => {
        const { props ,state} = this.comp
        const { my,dispatch } = props;
        let code = ''
        for(let i = 1;i<7;i++){
            code+=this.refs[`code${i}`].value
        }
        if(code.length!=6){
            this.comp.setState({
                codeFlag:false
            })
            return
        }
        console.log(code)
        let postData = {
            cuserid: my.cuserid,
            veritycode:code
        }
        try {
            let res = await dispatch({
                type: 'my/checkVeritycodeAction',
                payload: {
                    postData: postData,
                }
            })
            if (res) {
                if(res.data.status==='1') {
                    // 校验真功，打开设置密码弹框
                    this.comp.setState({
                        codeFlag:true,
                        password:''
                    })
                    dispatch({
                        type: 'my/update',
                        payload: {
                            emailModal:false,
                            codeTime:60,
                            setPassWordModal: true
                        }
                    });
                } else {
                    this.comp.setState({
                        codeFlag:false
                    })
                }
            }
        }
        catch (e) { }
    }
    // 发送验证码
    emailCode = async () => {
        const { props } = this.comp
        const { my,dispatch } = props
        
        dispatch({
            type: 'my/update',
                payload: {
                    isEmailTo:true
                }
        })
        props.main.queryCheckAction()
       
        
    }

    searchData = () => {
        const { props,state} = this.comp
        const { dispatch } = props
        if(state.password&&state.password.length<6||!state.password) {
            dispatch({
                type: 'my/update',
                payload: {
                    isPasswordCorrect:false
                }
            });
            return
        } else {
            let pwd = md5(state.password)
            props.main.changeTime(pwd)()
            dispatch({
                type: 'my/update',
                    payload: {
                        password:pwd
                    }
            })
        }
        
    }
    // 二级密码保存接口
    passwordSave = async () => {
        const { props, refs ,state} = this.comp
        const { my,dispatch } = props;
        // console.log(props,'ff')
        if(state.password&&state.password.length<6) {
            this.comp.setState({
                errtip: my.language['hrzzpc-000157'] //'请输入长度不小于6位的密码'
            })
            return
        } else if(!state.password){
            this.comp.setState({
                disablePass:true
            })
        }
        let pwd = md5(state.password)
        let postData = {
            cuserid: my.cuserid,
            pwd,
        }
        try {
            let res = await dispatch({
                type: 'my/savePwdAction',
                payload: {
                    postData: postData,
                }
            })
            if (res) {
                // 校验真功，打开设置密码弹框
                // props.main.changeTime(pwd)
                toast({
                    color: 'success',     // 提示类别，默认是 "success",非必输
                    content: my.language['hrzzpc-000158'] || '密码设置成功',   // 提示内容，批量操作要输入,非必输.
                
                })
                this.comp.setState({
                    password:''
                })
                dispatch({
                    type: 'my/update',
                    payload: {
                        setPassWordModal: false,
                        passWordModal:true
                    }
                });
               
            }
        }
        catch (e) { }
    }
}