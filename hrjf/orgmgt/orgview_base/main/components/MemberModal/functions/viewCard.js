import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function viewCard() {
    const {memberList, selectedMember} = this.state;
    let selRow = 0;
    const allPsnPk = memberList.map((member, index) => {
        if (member.pk_psndoc === selectedMember.pk_psndoc) selRow = index;
        return member.pk_psndoc;
    });
    const params = {
        allPsnPk: allPsnPk.join('_'),
        selRow: selRow
    };
    proFetch({
        url: '/nccloud/hrhi/psndoc/PsndocCardReptQueryAction.do',
        body: params,
    })
        .then((res) => {
            if (res.success && res.data) {
                let location = window.location;
                location.port ?
                    window.open("uclient://start/http://" + location.hostname + ":" + location.port + res.data) :
                    window.open("uclient://start/http://" + location.hostname + res.data);
            }
        });
}
