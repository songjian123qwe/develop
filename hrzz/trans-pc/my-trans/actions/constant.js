
export default class Constant {
    reqData = [{
        rqUrl: '/platform/templet/querypage.do',
        rqJson: `{\n  \"pagecode\": \"60651060p\",\n  \"appcode\": \"60651060\"\n}`,
        rqCode: 'template'
    }, {
        rqUrl: '/platform/templet/querypage.do',
        rqJson: `{\n  \"pagecode\": \"60651060batch\",\n  \"appcode\": \"60651060\"\n}`,
        rqCode: 'batch_add'
    }, {
        rqUrl: '/platform/appregister/queryallbtns.do',
        rqJson: `{\n  \"pagecode\": \"60651060p\",\n  \"appcode\": \"60651060\"\n}`,
        rqCode: 'button'
    }, {
        rqUrl: '/platform/appregister/queryappcontext.do',
        rqJson: `{\n  \"appcode\": \"60651060\"}`,
        rqCode: 'context'
    }];

    reqData2 = [{
        rqUrl: '/platform/templet/querypage.do',
        rqJson: `{\n  \"pagecode\": \"60092050nccloud\",\n  \"appcode\": \"60092050\"\n}`,
        rqCode: 'template'
    }, {
        rqUrl: '/platform/templet/querypage.do',
        rqJson: `{\n  \"pagecode\": \"60092050batch\",\n  \"appcode\": \"60092050\"\n}`,
        rqCode: 'batch_add'
    }, {
        rqUrl: '/platform/appregister/queryallbtns.do',
        rqJson: `{\n  \"pagecode\": \"60092050nccloud\",\n  \"appcode\": \"60092050\"\n}`,
        rqCode: 'button'
    }, {
        rqUrl: '/platform/appregister/queryappcontext.do',
        rqJson: `{\n  \"appcode\": \"60092050\"}`,
        rqCode: 'context'
    }];
}