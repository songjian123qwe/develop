    
    import promptBox from '../api/promptBox';
    export default function handelExitPage(headers){
        if (headers.contentpath) { 
            if (headers.redirect === "REDIRECT") { 
                SpecialTip(headers.redirectstatus, exitPage, headers.contentpath);
            } else { 
                exitPage(headers.contentpath); 
            } 
        }
        /**
         * 退出页面 
         * */
        function exitPage(hrefString){
            window.location.href = hrefString; 
        };
            
        /** 
        * 强制退出提示 
        * @param {Function} callback 回调 
        * @param {String} status 状态 
        * @param {String} paramData 参数数据 
        */
        function SpecialTip(status, callback, paramData){ 
            promptBox({ 
                title: this.state.json['jf6005-000003'],/* 国际化处理： 退出警告！*/
                color: "warning",
                content: switchStatus(status), 
                beSureBtnClick: () => {
                    callback(paramData); 
                } 
            }); 
        };

        function switchStatus(status){
            switch (status) {
                case "0":
                    return this.state.json['jf6005-000004'];/* 国际化处理： 用户没有登陆，即将跳转到登陆页面！*/
                case "1":
                    return this.state.json['jf6005-000005'];/* 国际化处理： 有人强制登陆,您已被踢出系统！*/
                case "2":
                    return this.state.json['jf6005-000006'];/* 国际化处理： 管理员在系统监视器进行了强制踢出操作！你已被踢出系统!*/
            }
        }
    }
    
