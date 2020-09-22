export default (data, fromParam, toParam) => {

    function paramMap(data, fromParam, toParam) {
        data.forEach((e) => {
            if(Array.isArray(fromParam)){
                fromParam.forEach((item,index)=>{
                    if (e.values[item]) {
                        e.values[toParam[index]] = e.values[item];
                    }
                })
            }else{
                if (e.values[fromParam]) {
                    e.values[toParam] = e.values[fromParam];
                }
            }
            if(e.children){
                paramMap(e.children, fromParam, toParam)
            }
        });
    }

    paramMap(data, fromParam, toParam)
}
