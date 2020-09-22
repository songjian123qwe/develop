

const obj =  {
    // 清除cookie
    clearCookie: () => {
        let paths = ['/','/nccloud']
        let domain =[]
        let host = location.hostname
        domain.push(host)
        if(host.indexOf('www') > -1){
            domain.push(host.substr(3))
        }
        let keys = document.cookie.match(/[^ =;]+(?=\=)/g) || []
        function deleteCookie(name,path,domain){
            if(keys.indexOf(name)<0)return
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
    },
    clearStorage: () => {
        let accessToken = localStorage.getItem('accessToken');
        
        localStorage.clear();
        sessionStorage.clear();

        accessToken && localStorage.setItem('accessToken', accessToken);
    },
    clear: () => {
        obj.clearCookie();
        obj.clearStorage();
    }
}

export default obj;