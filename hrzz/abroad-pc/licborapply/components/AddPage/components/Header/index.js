import React, { Component } from 'react';

import './index.less';

import {
    base
} from 'nc-lightapp-front';

const {
    NCButton
} = base;

export default class AddPageHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            status,
            onClick,
            button,
            language,
            cancelEdit,
            cardPagination,
            toBrowsePage,
            fromApprove
        } = this.props;
        return (
            <div className="add-page-header-wrapper">
                <Choose>
                    <When condition={status === 'edit' || status === 'browse'}>
                        {button.createButtonApp({
                            area: 'head',
                            onButtonClick: onClick('browse_status')
                        })}
                        <If condition={!fromApprove && status === 'browse'}>
                            <div style={{
                                display: 'inline-block',
                                verticalAlign: 'middle'
                            }}>
                                {cardPagination.createCardPagination({
                                    handlePageInfoChange: (props, pk_licbor, status = 1) => {
                                        toBrowsePage({
                                            values: {
                                                pk_licbor: {
                                                    value: pk_licbor
                                                }
                                            }
                                        });
                                    }
                                })}
                            </div>
                        </If>
                    </When>
                </Choose>
            </div>
        );
    }
}