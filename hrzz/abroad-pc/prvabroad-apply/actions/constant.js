
export default {
    ins: {},
    templateOption: [{
        rqUrl: '/platform/templet/querypage.do',
        rqJson: `{\n  \"pagecode\": \"60651110p\",\n  \"appcode\": \"60651110\"\n}`,
        rqCode: 'template'
    },{
        rqUrl: '/platform/appregister/queryallbtns.do',
        rqJson: `{\n  \"pagecode\": \"60651110p\",\n  \"appcode\": \"60651110\"\n}`,
        rqCode: 'button'
    }, {
        rqUrl: '/platform/appregister/queryappcontext.do',
        rqJson: `{\n  \"appcode\": \"60651110\"}`,
        rqCode: 'context'
    }],
    pubSubName: {
    },
    budgetTypeMap: {}
}