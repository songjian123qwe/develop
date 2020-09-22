// 新增页面子表头部操作按钮组件

import React, {Component} from 'react';
import './index.less';
import {base} from 'nc-lightapp-front';

const {NCButton} = base;

export default (props) => {
    const {area, disabledAreas, areaConf = {}, action, language = {}} = props;
    const conf = areaConf[area] || {};
    const canEdit = conf.isedit === 'Y' && disabledAreas.indexOf(area) === -1;
    return (
        <div className="add-new-page-table-operator">
            {
                canEdit ?
                    <div>
                        {!conf.editing ?
                            <NCButton
                                colors="primary"
                                onClick={() => action('edit', area)}
                            >
                                {language['hrzzpc-000087']}
                            </NCButton> :
                            <React.Fragment>
                                <NCButton
                                    colors="normal"
                                    onClick={() => action('addLine', area)}
                                >
                                    {language['hrzzpc-000089']}
                                </NCButton>
                                <NCButton
                                    colors="normal"
                                    onClick={() => action('delete', area)}
                                >
                                    {language['hrzzpc-000085']}
                                </NCButton>
                                <NCButton
                                    colors="primary"
                                    onClick={() => action('save', area)}
                                >
                                    {language['hrzzpc-000088']}
                                </NCButton>
                                <NCButton
                                    colors="normal"
                                    onClick={() => action('cancel', area)}
                                >
                                    {language['hrzzpc-000073']}
                                </NCButton>
                            </React.Fragment>
                        }
                    </div> : null
            }
        </div>
    );
}
