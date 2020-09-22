import $ from 'jquery';

export default function editPoint(oldInfo, info) {
    const id = oldInfo.getId(), oldType = oldInfo.getOrgType();
    oldInfo.nodeVO.orgType = info.orgType;
    oldInfo.nodeVO.values = {
        code: info.code,
        name: info.name,
        display_text: info.display_text
    };

    $(`#${id}`).removeClass('org-type-' + oldType);
    $(`#${id}`).addClass('org-type-' + info.orgType);
    $(`#${id}code`).text(info.code);
    $(`#${id}name`).text(info.name);
    $(`#${id}display_text`).text(info.display_text);
    $(`#${id} .window-header`).css({
        backgroundColor: this.props.hisImageConf[info.orgType + '_backgroundcolor']
    });
}
