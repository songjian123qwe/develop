import React from 'react';
import './index.less';
import {base} from 'nc-lightapp-front';

const {NCButton} = base;
export default (props) => {
    const {area, name, areaConf = {}, action, language = {}} = props;
    const conf = areaConf[area] || {};
    return (
        <div className="my-info-form-title">
            <header className="light-tabs-header tabs-header-pack">
                <div className="light-tabs-header-tabs">
                    <ul className="tabs-wraps single-tab">
                        <li className="active">
                            <a href="javascript:"
                               tabIndex="0">{name + (conf.isneedapp === "Y" ? ` (${language['hrzzpc-000104']})` : '')}</a>
                        </li>
                    </ul>
                </div>
            </header>
            {/*<span className="form-title-word">{name}</span>*/}
            <span className="form-title-dashed"/>
            {
                conf.isedit === "Y" ? <React.Fragment>
                    {
                        !conf.editing ?
                            <span className="form-title-btn">
                                <NCButton colors={"primary"}
                                          onClick={() => action('edit', area)}>
                                    {language['hrzzpc-000087']}
                                </NCButton>
                            </span> :
                            <span className="form-title-btn">
                                <NCButton colors={"primary"}
                                          onClick={() => action('save', area)}>
                                    {language['hrzzpc-000088']}
                                </NCButton>
                                <NCButton onClick={() => action('cancel', area)}>
                                    {language['hrzzpc-000073']}
                                </NCButton>
                            </span>
                    }
                </React.Fragment> : null
            }
        </div>
    );
}
