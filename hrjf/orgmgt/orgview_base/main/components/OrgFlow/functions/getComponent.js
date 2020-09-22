import $ from 'jquery';

export default function getComponent(data, config, json, inlt) {
    const langFlag = !inlt || ['tradchn', 'simpchn'].indexOf(inlt) > -1;
    const id = data.getId(), info = data.getInfo(), orgType = data.getOrgType(), isCustom = data.getIsCustom();
    let oDiv = $('<div></div>');
    let headerDiv = $('<div></div>');
    let subDiv = $('<div></div>');
    if (isCustom) {
        headerDiv.append(`<div class="window-header">
                <div id=${id + "name"}>${info.name}</div>              
                <div class="coll-btn"/>
            </div>`);
        subDiv.append(`<div class="window-item">
                <div>${json['jf6005-000505']}</div>
                <div id=${id + "code"}>${info.code}</div>
            </div>
            <div class="window-item">
                        <div>${json['jf6005-000408']}</div>
                        <div id=${id + "display_text"}>${getString(info.display_text)}</div>
            </div>`)
    } else {
        headerDiv.append(`<div class="window-header">
                <div>${orgType === 'post' ? info.postname : info.name}</div>                
                <div class="coll-btn"/>
            </div>`);

        if (config.base_displaycode === 'Y') {
            subDiv.append(`<div class="window-item">
                <div>${json['jf6005-000505']}</div>
                <div>${orgType === 'post' ? info.postcode : info.code}</div>
            </div>`)
        }
        /*if (config.base_propname === 'Y') {
            oDiv.append(`<div class="window-item">
                <div>名称</div>
                <div>${orgType === 'post' ? info.postname : info.name }</div>
            </div>`)
        }*/
        if (config.base_displaybudget === 'Y' || config.base_displayactualbudget === 'Y') {
            if (config.base_displaycode === 'Y') {
                subDiv.append(`<div class="window-split" 
                                style="display: ${langFlag ? "table-row" : "block"};">
                            <div style="display: ${langFlag ? "table-cell" : "block"};"><div/></div>
                                ${langFlag ? '<div style="display:table-cell"><div/></div>' : ''}
                            </div>`);
            }
            if (config.base_displaybudget === 'Y') {
                subDiv.append(`<div class="window-item">
                <div>${json['jf6005-000438']}</div>
                <div>${getString(info.budget_self)}</div>
            </div>`)
            }
            if (config.base_displayactualbudget === 'Y') {
                subDiv.append(`<div class="window-item">
                <div>${json['jf6005-000439']}</div>
                <div>${getString(info.budget_actual)}</div>
            </div>`)
            }
        }

        if ((orgType === 'dept' || orgType === 'virtualDept') && config.base_displaydm === 'Y') {
            if (config.base_displaycode === 'Y') {
                subDiv.append(`<div class="window-split" 
                                style="display: ${langFlag ? "table-row" : "block"};">
                            <div style="display: ${langFlag ? "table-cell" : "block"};"><div/></div>
                                ${langFlag ? '<div style="display:table-cell"><div/></div>' : ''}
                            </div>`);
            }
            subDiv.append(`<div class="window-item">
                <div>${json['jf6005-000506']}</div>
                <div>${getString(info.principal)}</div>
            </div>`)
            if (config.base_displaydmpost === 'Y') {
                subDiv.append(`<div class="window-item">
                <div>${json['jf6005-000483']}</div>
                <div>${getString(info.principal_post)}</div>
            </div>`)
            }
            if (config.base_displaydmphoto === 'Y' && info.photo_data) {
                const str = info.photo_data.replace(/[\n\r]/g, "");
                subDiv.append(`<div class="window-item">
               <div class="img-item" style="height: 80px;width: 80px;background: url(${str}) no-repeat;background-size: contain;"/>
            </div>`)
            }
        }
    }

    oDiv.append(`${headerDiv.html()}
                <div class="point-content">
                    <div class="point-table" 
                        style="display: ${langFlag ? "table" : "block"};">
                        ${subDiv.html()}
                    </div>                  
                </div>`);

    return oDiv.html();
}

function getString(str) {
    return str === undefined || str === null ? '' : str;
}
