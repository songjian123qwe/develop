import { Container, CreateMeta } from 'src/hrzz/public/hr-mobile-card/index';

export default class hotProblem {
    constructor(comp) {
        this.comp = comp
    }

    didMount = () => {
        // this.container()
    }


    // onExpandHandle = (areaCode) => {
    //     const { props, action } = this.comp
    //     const { exam, dispatch } = props
    //     if(areaCode[0]==='bd_psndoc')return;
    //     if(areaCode[0]==='hi_psnjob_h')return;
    //     if(areaCode[0]==='hi_psnorg_h')return;
        
    //     console.log(areaCode,'uu')
    //     if (!areaCode.length) return;
    //          dispatch({
    //             type: 'exam/psnDocSearchLoadSubDataAction',
    //             payload: {
    //                 postData: {
    //                     pk_psnjob:exam.infoData.pk_psnjob,
    //                     areaCode:areaCode[0]
    //                 }
    //             }
    //         }).then((res) => {
    //             if(res.success&&res.data) {
    //                  console.log('exam',res.data[areaCode])
    //                 dispatch({
    //                     type: 'exam/update',
    //                     payload: {
    //                         store:res.data[areaCode]
    //                     }
    //                 });
    //             }
    //         })
    // }
    

    
    // // 渲染所有模板
    // container = () => {
    //     const { props } = this.comp
    //     const { dispatch,exam } = props
    //     let arr = []
    //     let temp = JSON.parse(JSON.stringify(exam.detailFormData))
    //     let meta = temp.allArea
    //     let getmeta = CreateMeta(meta, {
    //         // iconClick: this.onExpandHandle
    //     })
        
       
    //     let a = 0
    //     exam.detailFormData.areaCodeList.forEach((item) => {
            
    //         let store = null
           
    //         if(item === 'bd_psndoc'||item === 'hi_psnjob_h'||item === 'hi_psnorg_h') {
    //             item === 'bd_psndoc'&&(store = temp.psndocForm.bd_psndoc)
    //             item === 'hi_psnjob_h'&&(store = temp.psnjobForm.hi_psnjob_h)
    //             item === 'hi_psnorg_h'&&(store = temp.psnorgForm.hi_psnorg_h)
    //            arr.push(
    //                     <Container
    //                         store={getmeta}
    //                         cardName={item}
    //                         collapsed={item !== temp.areaCodeList[0]}
    //                         showArrow={false}
    //                         data={store}
    //                         hideHeader={false}
    //                         isEdit={false}
    //                     />
    //                 )
    //         } else {
               
    //             dispatch({
    //                 type: 'exam/psnDocSearchLoadSubDataAction',
    //                 payload: {
    //                     postData: {
    //                         pk_psnjob:exam.infoData.pk_psnjob,
    //                         areaCode:item
    //                     }
    //                 }
    //             }).then((res) => {
    //                 console.log(a++)
    //                 if(res.success) {
    //                     if(res.data) {
    //                         store = res.data[item]
    //                         console.log(item,store,'hht')
    //                         arr.push(
    //                             <Container
    //                                 store={getmeta}
    //                                 cardName={item}
    //                                 collapsed={item !== temp.areaCodeList[0]}
    //                                 showArrow={false}
    //                                 data={store}
    //                                 hideHeader={false}
    //                                 isEdit={false}
    //                             />
    //                         )
    //                     } else {
    //                         arr.push(
    //                             <Container
    //                                 store={getmeta}
    //                                 cardName={item}
    //                                 collapsed={item !== temp.areaCodeList[0]}
    //                                 showArrow={false}
    //                                 data={store}
    //                                 hideHeader={false}
    //                                 isEdit={false}
    //                             />
    //                         )
    //                     }
                        
    //                 }
    //             })
    //         }
           
    //     })

    //      dispatch({
    //             type: 'exam/update',
    //             payload: {
    //                 storeAll:arr
    //             }
    //         });
    // }
 

   
}