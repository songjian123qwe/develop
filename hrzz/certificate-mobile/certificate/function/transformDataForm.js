//将接受到的三个picker的数据转换成需要的形式 [[]]
export function transfData (Arr) {
    let temp1 = [];
    let temp = [];
    if(Arr.length === 0) {
      return temp;
    }
    if(Arr[0].pk_prove_template){
      Arr.forEach((item,index)=>{
        let temp2 = {};
        temp2.label = item.name;
        temp2.value = item.name;
        temp2.refpk = item.pk_prove_type;
        temp1[index] = temp2;
      }) 
    }else{
      Arr.forEach((item,index)=>{
        let temp2 = {};
        temp2.label = item.refname;
        temp2.value = item.refname;
        temp2.refpk = item.refpk;
        temp1[index] = temp2;
      }) 
    }
    temp[0] = temp1;
    return temp;
}