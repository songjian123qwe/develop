/**
 * 指派人员
 * Created by shenzaifang on 2019-05-21
 */
import React, {Component} from 'react';
import './index.less';
import {Toast, Modal, List, Checkbox} from 'antd-mobile';
import {appoint} from "../../function/appoint";
import DFooter from "../../../../public/mobile/components/Layout/Footer";
import {debounce} from "../../../../public/mobile/utils/utils";

const CheckboxItem = Checkbox.CheckboxItem;

class AppointComponent extends Component {
    constructor(props) {
        super(props);
        this.peopleArr = [];
        this.state = {
            json: props.json,
        };
    }

    componentWillReceiveProps(nextprops) {
        let nextJson = JSON.stringify(nextprops.json);
        let thisJson = JSON.stringify(this.props.json);
        if (nextJson !== thisJson) {
            this.setState({
                json: nextprops.json
            })
        }
    }

    componentDidMount() {
        this.props.editNav(() => {
            this.props.updateState({
                billid: null,
                peopleListData: {}
            }, () => {
                this.props.initPage();
            })
        })
    }


    // 指派人员多选事件
    onChange = (val) => {
        if (this.peopleArr.indexOf(val) >= 0) {
            this.peopleArr.splice(this.peopleArr.indexOf(val), 1)
        } else {
            this.peopleArr.push(val)
        }
    };

    // 确定审核人员
    examineFun = () => {
        if (!debounce()) return;
        if (this.peopleArr.length === 0) {
            Toast.info(this.state.json['hrzzmb-000119']);
            return
        }
        let arr = [];
        let peopleListData = this.props.peopleListData;

        peopleListData.content[0].assginUsers.forEach(item => {
            this.peopleArr.forEach(j => {
                if (item.pk === j) {
                    arr.push(item)
                }
            })
        });
        peopleListData.content[0].assginUsers = arr;

        appoint(peopleListData, this.props.billid)
            .then(res => {
                if (!res.success) {
                    return
                }
                if (res.data.errorMsg) {
                    Modal.alert(this.state.json['hrzzmb-000016'], res.data.errorMsg, [
                        {text: this.state.json['hrzzmb-000003'], onPress: () => this.props.leftClick()},
                    ])
                } else {
                    Modal.alert(this.state.json['hrzzmb-000016'], '', [
                        {
                            text: this.state.json['hrzzmb-000003'], onPress: () => {
                                this.props.updateState({
                                    billid: null,
                                    peopleListData: {}
                                });
                                this.props.leftClick()
                            }
                        },
                    ])
                }
            })
            .catch(err => {
                Modal.alert(this.state.json['hrzzmb-000002'], err.data.error.message, [
                    {text: this.state.json['hrzzmb-000003'], onPress: () => this.props.leftClick()},
                ])
            })
    };

    render() {
        let {peopleListData: {content}} = this.props;
        return (
            <div
                className="peopleList">
                <List renderHeader={() => this.state.json['hrzzmb-000119']}>
                    {content && content[0] && content[0].assginUsers.map(i => (
                        <CheckboxItem key={i.pk} onChange={() => this.onChange(i.pk)}>
                            {i.name}
                        </CheckboxItem>
                    ))}
                </List>
                {this.state.json["hrzzmb-000023"] && <DFooter
                    buttons={[
                        {
                            type: 'brand',
                            title: this.state.json["hrzzmb-000023"],//'提交',
                            onClick: () => {
                                this.examineFun()
                            }
                        }
                    ]}
                />}
            </div>
        );
    }
}

export default AppointComponent;
