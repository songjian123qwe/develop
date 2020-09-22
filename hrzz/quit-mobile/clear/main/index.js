
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Toast } from 'antd-mobile';




class QuitIndex extends Component{
    constructor (props) {
        super(props);
        this.state = {
        }
        this.clearCookie = this.clearCookie.bind(this)
        this.clearLocalStorage = this.clearLocalStorage.bind(this)
        this.clearSessionStorage = this.clearSessionStorage.bind(this)
        this.clearAll = this.clearAll.bind(this)
    }
    // 清除cookie
    clearCookie(){
        let paths = ['/nccloud','/']
        let domain =[]
        let host = location.hostname
        domain.push(host)
        if(host.indexOf('www') > -1){
            domain.push(host.substr(3))
        }
        let keys = document.cookie.match(/[^ =;]+(?=\=)/g)
        console.log(['keys', keys])
        // paths domain keys

        function deleteCookie(name,path,domain){
            let keys = document.cookie.match(/[^ =;]+(?=\=)/g) || []
            if(keys.indexOf(name)<0)return
            console.log([name,path,domain])
            document.cookie= name + '=' + ((path)?';path='+path:'') + ((domain)?';domain='+domain:'') + ';expires=Thu,01-Jan-1970 00:00:01 GMT';
        }
        let arrs=[]
        paths.forEach(p=>{
            domain.forEach(d=>{
                keys.forEach(k=>{
                    arrs.push({k,p,d})
                    deleteCookie(k,p,d)
                })
            })
        })
        console.log(arrs)
        // Toast.info('clearCookie清除成功', 2, () => {            
        //         console.log("请填写内容")
        //     },true);
    }
    // 清除localStorage
    clearLocalStorage(){
        localStorage.clear()
        Toast.info('clearLocalStorage清除成功', 2, () => {            
                console.log("请填写内容1")
            },true);
    }
    // 清除sessionStorage
    clearSessionStorage(){
        sessionStorage.clear()
        Toast.info('sessionStorage清除成功', 2, () => {            
                console.log("请填写内容2")
            },true);
    }
    // 全清除
    clearAll(){
        this.clearCookie()
        this.clearLocalStorage()
        this.clearSessionStorage()
        Toast.info('clearAll', 2, () => {            
            console.log("请填写内容3")
        },true);
    }

    render () {
        return (
            <ul > 
                <li onClick={this.clearCookie}>清除cookie</li>
                <li onClick={this.clearLocalStorage}>清除localStorage</li>
                <li onClick={this.clearSessionStorage}>清除sessionStorage</li>
                <li onClick={this.clearAll}>全清除</li>
            </ul>
        )
    }
}

ReactDOM.render(<QuitIndex/>, document.getElementById('app'));