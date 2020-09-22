import React, {Component} from 'react';
import './index.less';
import {base} from 'nc-lightapp-front';
import FontPicker from "../FontPicker";
import ColorPicker from "../ColorPicker";

const {NCSelect, NCDatePicker, NCRadio, NCCheckbox, NCInputNumber, NCTextArea, NCInput} = base;
const NCOption = NCSelect.NCOption;

class MyForm extends Component {
    constructor(props) {
        super(props);
        this.getFormItem = this.getFormItem.bind(this);
        this.getForms = this.getForms.bind(this);
    }

    getForms(formData) {
        if (!formData.items || !formData.items.length) return;
        return formData.items.map(item => <span>
                <div className="leftspace form-item" style={{width: '0%'}}/>
                <div className="postseriesname form-item" style={{width: item.width || '33.3333%'}}>
                    <div className="form-item-label" style={{color: 'rgb(85, 85, 85)'}}>
                        {item.required ? <span className="u-mast">*</span> : null}
                        {item.name}
                    </div>
                    <div className={"form-item-control " + (item.error ? 'verify-error' : '')}>
                        <div className={"form-component-item-wrapper edit " + (item.type + "-wrapper")}>
                            {this.getFormItem(item)}
                        </div>
                    </div>
                </div>
            </span>
        )
    }

    getFormItem(item) {
        if (item.render) return item.render;
        let formitem;
        switch (item.type) {
            case 'colorInput':
                formitem = (
                    <ColorPicker
                        json={item.json}
                        value={item.value}
                        onChange={(value) => item.onChange(value)}/>
                );
                break;
            case 'numberInput':
                formitem = (
                    <NCInputNumber
                        iconStyle="one"
                        max={item.max}
                        min={item.min}
                        scale={Number(item.scale || 0)}
                        value={item.value}
                        onChange={(value) => {
                            if (item.max && value > item.max) return;
                            if (item.min && value < item.min) return;
                            item.onChange(value);
                        }
                        }
                    />
                );
                break;
            case 'input':
                formitem = (
                    <NCInput
                        value={item.value}
                        onChange={item.onChange}
                        autofocus={item.autoFocus ? 'autofocus' : ''}
                    />
                );
                break;
            case "datePickerNoTimeZone":
                formitem = (
                    <NCDatePicker
                        clearEvent={() => {
                            item.clearEvent && item.clearEvent()
                        }}
                        onChange={item.onChange}
                        value={item.value}/>
                );
                break;
            case 'select':
                formitem = (
                    <NCSelect
                        value={item.value}
                        onChange={item.onChange}
                    >
                        {item.options && item.options.map(option => (
                            <NCOption value={option.value}>
                                {option.display}
                            </NCOption>
                        ))}
                    </NCSelect>
                );
                break;
            case 'radio':
                formitem = (
                    <NCRadio.NCRadioGroup
                        selectedValue={item.value}
                        onChange={item.onChange}
                    >
                        {item.options &&
                        item.options.map(option => {
                            return (
                                <NCRadio
                                    color="info"
                                    disabled={option.disabled}
                                    value={option.value}
                                >
                                    {option.display}
                                </NCRadio>
                            );
                        })}
                    </NCRadio.NCRadioGroup>
                );
                break;
            case 'checkbox':
                formitem = item.options &&
                    item.options.map(option => (
                        <NCCheckbox colors="primary"
                                    disabled={option.disabled}
                                    checked={option.value === 'Y'}
                                    onChange={option.onChange}>
                            {option.display}
                        </NCCheckbox>
                    ));
                break;
            case 'textArea':
                formitem = <NCTextArea
                    value={item.value}
                    onChange={item.onChange}
                />;
                break;
            case 'fontPicker':
                formitem = (<FontPicker json={item.json} familyList={item.familyList} value={item.value}
                                        onChange={item.onChange}/>);
                break;
            default:
                break;
        }
        return formitem;
    }

    render() {
        const {formDatas} = this.props;
        return (
            formDatas && formDatas.length ?
                formDatas.map(formData => <div className='lightapp-component-form my-form'>
                    {formData.title ? <div className='form-title'>
                        {
                            formData.title
                        }
                    </div> : null}
                    {this.getForms(formData)}
                </div>) : null
        );
    }
}

export default MyForm;
