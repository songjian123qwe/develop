import Ajax from 'src/hrzz/public/mobile/utils/ajax';
export function getData(param) {
    let body = param;
    let data = {
        url: '/nccloud/uapbd/userdef/DefdocTreeRef.do',
        body,
    };
    return new Promise((resolve, reject) => {
        const { body, ...config } = data;
        Ajax({
            data: body,
            ...config,
            success: (res) => {
                resolve(res);
            },
            error: (err) => {
                reject(err);
            }
        });
    });
}

export function find(str,cha,num){
    var x=str.indexOf(cha);
    for(var i=0;i<num;i++){
        x=str.indexOf(cha,x+1);
    }
    return x;
}