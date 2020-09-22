import React, { Component } from "react";
import './index.less';
import { Modal, Picker, List, WhiteSpace, Toast, Checkbox } from 'antd-mobile';
import { compatibleNavImg, getAppPageConfig } from 'src/hrzz/public/mobile/utils/index.js'
import TextareaWrapper from '../components/textarea';
import Upload from '../components/upload';
// import { Icon, Loading } from 'tinper-bee';
import Ajax from 'src/hrzz/public/mobile/utils/ajax';
import { commitAction } from '../function/commit';
import { transfData } from '../function/transformDataForm';
import { certificateContentMatch } from '../function/certificateContentMatch';
import { getMultiLang } from 'src/hrzz/public/mobile/utils/getMultiLang';
import { getData } from '../function/getData';
import NativeObj from 'src/hrzz/public/mobile/utils/jsbridge/index.js';
import { editNav } from '../function/editNav';
import { DHeader, DEmpty } from 'src/hrzz/public/mobile/components/index';
import DFooter from "src/hrzz/public/mobile/components/Layout/Footer";
import deepCopy from "src/hrpub/common/utils/deep-copy";
import HrEditor from '../hr_editor/index.js';
import domtoimage from 'dom-to-image';
import guanbi from 'src/hrzz/public/mobile/static/images/guanbi@2x.png';
import thirdLog from 'src/hrzz/login/third-log-method/index';

const CheckboxItem = Checkbox.CheckboxItem;
const param = {
  "queryCondition": {
    "isShowUnit": false,
    "isDataPowerEnable": true,
  },
  "pageInfo": { "pageSize": 50, "pageIndex": -1 }
};
if (new RegExp(/localhost:3006/g).test(window.location.href)) {
  sessionStorage.setItem('showNav', 'true');
}

class Certificate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {},
      config: getAppPageConfig(),
      prooftype: [],//接收到的所有[证明类型]
      place: [],//接收到的[领取地点]
      purpose: [],//接收到的[证明用途]
      cols: 1,//picker的列数
      isAttach: false,//附件是否上传了
      showIcon: false,//证明详情图标
      oldValue: false,
      show: false,//有些证明类型含有附加信息，证明类型是否显示附加信息
      ptValue: '',//用户选中的 证明类型
      pValue: '', //用户选中的领取地点
      pVrefpk: '',
      prefpk: '',
      pprefpk: '',
      ppValue: '', //用户选中的证明用途
      extra: '', // 证明类型中的附加信息
      textareaVal: '',//保存文本输入的值
      fileArr: [],//保存上传的附件信息
      certificateContent: [], //接收到的证明详情内容
      page: 'main',//切换页面
      postData: {},//提交给后台的全部数据
      pk_org: '',
      header: {
        name: '',
        rText: ''
      },
      isAssign: false, //是否指派
      peopleArr: [], // 选定的指派人员
      peopleListData: [], // 能指派的人员
      billid: '',
      imgUri: '',
    }
  }
  componentDidMount = async () => {
    this.getLanguage();
    this.getOrg();
    this.addBackBtn();
  }
  getProofType = () => {
    Ajax({
      url: '/nccloud/hrzz/prove/QueryEnableAction.do',
      data: {
        pk_org: this.state.pk_org,
      },
      info: { appcode: this.state.config.appcode || '60652060' },
      success: async (res) => {
        if(!res.data) {
          return;
        }
        if (res.data && res.data.errorMsg) {
          Toast.info(res.data.errorMsg)
        } else {
          let arr = deepCopy(res.data);
          let result = transfData(arr);
          this.setState({
            prooftype: result
          });
        }
      },
      error: (error) => {
        Toast.info("response error:", error.message);
      }
    })
  }
  // getProofType = () => {
  //   let paramProof = deepCopy(param);
  //   paramProof.queryCondition.pk_defdoclist = "1001Z710000000000U4O";
  //   paramProof.queryCondition.pk_org = this.state.pk_org;
  //   paramProof.queryCondition.TreeRefActionExt = 'nccloud.web.hrzz.prove.sqlbuilder.ProveTypeSqlBuilder';
  //   getData(paramProof).then(res => {
  //     if (!res.success) {
  //       Toast.info("response error:", error.message);
  //       return;
  //     }
  //     let arr = res.data.rows;
  //     let result = transfData(arr);
  //     this.setState({
  //       prooftype: result
  //     });
  //   })
  // }

  getLocation = () => {
    let placeParam = deepCopy(param);
    placeParam.queryCondition.pk_defdoclist = "1001Z710000000000U4Q";
    placeParam.queryCondition.pk_org = this.state.pk_org;
    getData(placeParam).then(res => {
      if (!res.success) {
        Toast.info("response error:", error.message);
        return;
      }
      if(!res.data) {
        return;
      }
      let arr = res.data.rows;
      let result = transfData(arr);
      this.setState({
        place: result
      });
    })
  }

  getPurpose = () => {
    let purposeParam = deepCopy(param);
    purposeParam.queryCondition.pk_defdoclist = "1001Z710000000000U4P";
    purposeParam.queryCondition.pk_org = this.state.pk_org;
    getData(purposeParam).then(res => {
      if (!res.success) {
        Toast.info("response error:", error.message);
        return;
      }
      if(!res.data) {
        return;
      }
      let arr = res.data.rows;
      let result = transfData(arr);
      this.setState({
        purpose: result
      });
    })
  }
  //获取当前组织的pk_org
  getOrg = () => {
    let timer1 = null, timer2 = null;
    Ajax({
      url: '/nccloud/hrzz/deptpsn/QueryPsnHROrgAction.do',
      info: { appcode: this.state.config.appcode || '60652060' },
      success: async (result) => {
        if (result.success && result.data) {
          this.setState({
            pk_org: result.data
          }, () => {
            this.getProofType();
            clearTimeout(timer1);
            timer1 = setTimeout(() => {
              this.getLocation();
            }, 100)
            clearTimeout(timer2);
            timer2 = setTimeout(() => {
              this.getPurpose();
            }, 100)

          });
        }
      },
      error: (error) => {
        Toast.info("response error:", error.message);
      }
    })
  }

  // 获取多语
  getLanguage = () => {
    let _this = this;
    getMultiLang({
      domainName: 'hrzz',
      moduleId: 'hrzzmb',
      callback: (json, status, init) => {

        this.setState({
          json: json,
          header: {
            name: json['hrzzmb-000142'],
            rText: json['hrzzmb-000296']
          }
        }, () => {
          const { header } = this.state;
          editNav(header, this.leftClick, this.rightClick, this.state.showIcon); //this.leftClick,
        })
      }
    })
  };
  leftClick = () => {
    NativeObj.closePage();
  }
  commitClick = () => {
    if (this.state.ptValue.length === 0 && this.state.pValue.length === 0) {
      return Toast.info(this.state.json['hrzzmb-000139'])
    }
    if (this.state.ptValue.length === 0) {
      return Toast.info(this.state.json['hrzzmb-000140'])
    }
    if (this.state.pValue == 0) {
      return Toast.info(this.state.json['hrzzmb-000141'])
    }
    if (this.state.ppValue == 0) {
      return Toast.info(this.state.json['hrzzmb-000297'])
    }
    this.throttle(this.commit(), 3000)
  }
  throttle = (fn, interval) => {

    let _self = fn, timer, flag = true;
    return function () {
      let args = arguments, that = this;
      if (flag) {
        _self.apply(that, args);
        return flag = false;
      }
      if (timer) {
        return false;
      }
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        _self.apply(that, args)
      }, interval || 500);
    }
  }
  commit = async () => {
    let postData = new FormData(); //创建form对象
    let formData = {};
    formData.prove_type = this.state.pVrefpk;
    formData.receive_address = this.state.prefpk;
    formData.prove_purpose = this.state.pprefpk;
    formData.remark = this.state.textareaVal;
    formData.approve_state = -1;
    formData.pk_billtype = '6FZM';
    formData.pk_org = this.state.pk_org;
    postData.append('formData', JSON.stringify(formData));
    postData.append('actionType', 1);
    this.state.fileArr.forEach((item) => {
      postData.append('file', item.file)
    });
    //
    let toastContent = this.state.json['hrzzmb-000284'] || '提交中...';
    Toast.loading(this.state.json['hrzzmb-000284'], 0, null, null);
    commitAction(postData, toastContent).then(res => {
      Toast.hide();
      if (res.success) {
        if (res.data.content) {
          // 判断是否有指派
          this.setState({
            page: 'assign',
            peopleArr: [],
            billid: res.data.agg.m_headVo.pk_prove,
            peopleListData: res.data.content, //content[0].assginUsers
            showIcon: false
          })
        } else {
          // 第一个'' 是title
          Modal.alert('', this.state.json['hrzzmb-000016']/* 国际化处理： 提交成功*/, [
            { text: this.state.json['hrzzmb-000003']/* 国际化处理： 确定*/, onPress: () => location.reload() }, //
          ])
          this.setState({
            postData: postData,
          })
        }

      }
    }).catch((err) => {
      Toast.hide();
      let alertMsg;
      if (typeof err === 'object' && err.data && err.data.error && err.data.error.message) {
        alertMsg = err.data.error.message
      } else {
        let str = err.toString();
        alertMsg = str.slice(str.indexOf(':') + 1);
      }

      Modal.alert(this.state.json['hrzzmb-000002'], alertMsg, [
        { text: this.state.json['hrzzmb-000003']/* 国际化处理： 确定*/, onPress: () => { return false } },
      ])
    });
  }

  rightClick = async () => {
    this.setState({
      showIcon: false,
      page: 'detail',
    }, () => {
      let that = this;
      if (document.querySelector(".hr-editor-wrap")) {
        let node = document.querySelector(".hr-editor-wrap");
        // let u = navigator.userAgent, app = navigator.appVersion;
        // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        // let isIOS = !!u.match(/\(i[^;]+;(U;)? CPU.+Mac OS X/);
        setTimeout(() => {
          domtoimage.toSvg(node)
            .then((dataUrl) => {
              that.setState({ imgUri: dataUrl })
            })
            .catch(function (error) {
              console.error('oops, something went wrong!', error);
            });
        }, 500)
      }
    })
  }

  //得到子组件的值
  getTextValue(value) {
    this.setState({
      textareaVal: value
    })
  }
  //上传的附件
  getUploadValue(fileArr) {
    this.setState({
      fileArr: fileArr
    })
  }
  // 证明类型选择
  proofTypeSelected = async (v) => {
    //这里的v就是选中的内容
    // let result;
    this.setState({
      ptValue: v,
      show: false,
      extra: ''
    })
    this.state.prooftype[0].forEach((item) => {
      if (item.label == v[0]) {
        let selectPK = item.refpk;
        this.setState({ pVrefpk: selectPK, showIcon: true }, () => {
        })
        this.isGetAttachAndGetCertContent(selectPK, this.state.pk_org)
      }
    })
  }

  isGetAttachAndGetCertContent = (selectPK, pk_org) => {
    Ajax({
      url: '/nccloud/hrzz/prove/QueryProveTemplateAction.do',
      data: {
        'prove_type': selectPK,
        'pk_org': pk_org,
      },
      info: {
        appcode: this.state.config.appcode || '60652060'
      },
      success: (res) => {

        if (res.success && res.data) {
          let result = JSON.parse(res.data);
          let finalArr;
          let isAttach;
          if (result.contents) {
            let contents = JSON.parse(result.contents);
            let map = { "blocks": [{ "key": "7v2uu", "text": "", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }], "entityMap": {} }
            if (contents.map !== '') {
              map = JSON.parse(contents.map)
              map.blocks.map((item, index) => {
                item.text = decodeURIComponent(item.text)
              })
            }
            let html = contents.html;
            let con = contents.content
            finalArr = certificateContentMatch(map, con);
            this.setState({ certificateContent: finalArr })
          }
          //  是否显示备注信息
          if (result.memo) {
            document.styleSheets[0].insertRule('.am-list-line::after {width: 0 !important}', 0);
            this.setState({
              show: true,
              extra: result.memo
            })
          }
          if (result.customFlag) {
            isAttach = true;
          } else {
            isAttach = false
          }
          this.setState({
            isAttach: isAttach,
            // certificateContent: finalArr,
          })
        }
      },
      error: (error) => {
        Toast.info(error.data.error.message)
      }
    })
  }
  placeSelected(v) {
    this.setState({ pValue: v })
    this.state.place[0].forEach((item) => {
      if (item.label == v[0]) {
        let selectPK = item.refpk;
        this.setState({ prefpk: selectPK })
      }
    })
  }

  purposeSelected(v) {
    this.setState({ ppValue: v })
    this.state.purpose[0].forEach((item) => {
      if (item.label == v[0]) {
        let selectPK = item.refpk;
        this.setState({ pprefpk: selectPK })
      }
    })
  }
  // 指派人员多选事件
  onChange = (val) => {
    if (this.state.peopleArr.indexOf(val) >= 0) {
      this.state.peopleArr.splice(this.state.peopleArr.indexOf(val), 1)
    } else {
      this.state.peopleArr.push(val)
    }
    this.setState({
      peopleArr: this.state.peopleArr
    })
  }
  // 确定指派
  assignFun = async () => {
    this.throttle(this.submit(), 3000)
  }
  submit = () => {
    if (this.state.peopleArr.length === 0) {
      Toast.info(this.state.json['hrzzmb-000119'])//请指派审核人员
      return
    }
    let arr = []
    this.state.peopleListData.content[0].assginUsers.forEach(item => {
      this.state.peopleArr.forEach(j => {
        if (item.pk === j) {
          arr.push(item)
        }
      })
    })
    this.state.peopleListData.content[0].assginUsers = arr;
    this.setState({
      peopleListData: this.state.peopleListData
    })
    Toast.loading(this.state.json['hrzzmb-000284']);
    Ajax({
      url: '/nccloud/hrzz/prove/ProveAssignCommitAction.do',
      data: {
        content: this.state.peopleListData,
        billid: this.state.billid
      },
      info: { appcode: this.state.config.appcode || '60652060' },
      success: async (res) => {
        Toast.hide();
        if (res.data.errorMsg) {
          Modal.alert(this.state.json['hrzzmb-000002'], res.data.errorMsg, [
            { text: this.state.json['hrzzmb-000003'], onPress: () => this.back() },
          ])
        } else {
          Modal.alert('', this.state.json['hrzzmb-000016'], [
            { text: this.state.json['hrzzmb-000003'], onPress: () => location.reload() },
          ])
        }
      },
      error: (error) => {
        Toast.info("response error:", error.message);
      }
    })
  }
  addBackBtn = () => {
    let that = this;
    NativeObj.backbutton('', (data) => {
      if (!data) {
        that.leftClick()
      }
    })
  };
  back = () => {
    this.setState({
      page: 'main',
      showIcon: true,
      imgUri: ''
    }, () => {
      let dom = document.getElementsByClassName('brand')[0];
      dom.style.opacity = '1';
    })
  }

  // closeModal = () => {
  //   this.setState({
  //     page: 'main'
  //     // ptValue: '',//用户选中的 证明类型
  //     // pValue: '', //用户选中的领取地点
  //     // ppValue: '', //用户选中的证明用途
  //     // textareaVal: [],//保存文本输入的值
  //     // fileArr: [],//保存上传的附件信息
  //     // certificateContent: [], //接收到的证明详情内容
  //     // postData: {},//提交给后台的全部数据
  //     // isAttach: false,
  //     // showIcon: false
  //   })
  // }


  render() {
    const { header, ptValue, pValue, ppValue, textareaVal } = this.state;
    if (this.state.showIcon !== this.state.oldValue) {
      this.setState({ oldValue: this.state.showIcon })
      editNav(header, this.leftClick, this.rightClick, this.state.showIcon); //  this.leftClick,
    }
    if (document.getElementsByClassName('brand')[0]) {
      let dom = document.getElementsByClassName('brand')[0];
      if (ptValue || pValue || ppValue || textareaVal) {
        dom.style.opacity = '1';
      } else {
        dom.style.opacity = '0.5';
      }
    }
    return (
      <div className="certificate">
        {/* 头部 */}
        <div className="header">
          <DHeader
            title={this.state.header.name}
            leftClick={this.leftClick}
            rightClick={this.rightClick}
            type={'wide'}
            rText={this.state.header.rText}
          />
        </div>
        {/* 中间 */}
        <Choose>
          <When condition={this.state.page == 'main'}>
            <div className="certificate-content">
              <List style={{ backgroundColor: 'white' }} className="picker-list">
                <Picker
                  data={this.state.prooftype} cascade={false}
                  extra={this.state.json['hrzzmb-000020']}
                  value={this.state.ptValue}
                  onChange={(v) => this.proofTypeSelected(v)}
                  onOk={v => this.setState({ ptValue: v, })}
                  okText={this.state.json['hrzzmb-000003']}
                  dismissText={this.state.json['hrzzmb-000024']}
                >
                  <List.Item arrow="horizontal">
                    {this.state.json['hrzzmb-000143']}
                  </List.Item>
                </Picker>
                {this.state.show ?
                  (
                    <div className="supplementary-contents">
                      <span>{this.state.extra}</span>
                    </div>
                    // <List.Item className="supplementary-contents" extra={this.state.extra}  align="middle" multipleLine='true' wrap="true"></List.Item>
                  )
                  : null
                }
              </List>
              <List style={{ backgroundColor: 'white' }} className="picker-list">
                <Picker
                  data={this.state.place} cascade={false}
                  extra={this.state.json['hrzzmb-000020']}
                  value={this.state.pValue}
                  onChange={(v) => this.placeSelected(v)}
                  onOk={v => this.setState({ pValue: v })}
                  okText={this.state.json['hrzzmb-000003']}
                  dismissText={this.state.json['hrzzmb-000024']}
                >
                  <List.Item arrow="horizontal">{this.state.json['hrzzmb-000144']}</List.Item>
                </Picker>
              </List>
              <List style={{ backgroundColor: 'white' }} className="picker-list">
                <Picker
                  data={this.state.purpose} cascade={false}
                  extra={this.state.json['hrzzmb-000020']}
                  value={this.state.ppValue}
                  onChange={(v) => this.purposeSelected(v)}
                  onOk={v => this.setState({ ppValue: v })}
                  okText={this.state.json['hrzzmb-000003']}
                  dismissText={this.state.json['hrzzmb-000024']}
                >
                  <List.Item arrow="horizontal">{this.state.json['hrzzmb-000145']}</List.Item>
                </Picker>
              </List>
              {/* 选中选项后出现附件选项 */}
              <div>
                {this.state.isAttach ? (
                  <Upload json={this.state.json} fileArr={this.state.fileArr} toMainPage={this.getUploadValue.bind(this)}></Upload>
                ) : null}
              </div>
              {/* 描述证明用途 */}
              <WhiteSpace size="lg" />
              <TextareaWrapper json={this.state.json} textareaVal={this.state.textareaVal} toMain={this.getTextValue.bind(this)}></TextareaWrapper>
            </div>
            <DFooter
              buttons={[
                {
                  type: 'brand',
                  title: this.state.json["hrzzmb-000023"],//'提交',
                  onClick: () => {
                    this.commitClick()
                  }
                }
              ]}
            />
          </When>
          <When condition={this.state.page == 'detail'}>
            <div className="certificate-page">
              <div className="certificate-page-title">
                <div onClick={() => this.back()} className='certificate-page-title-left'>
                  <img src={guanbi} alt="" />
                </div>
                {/* <Icon type="uf-close" onClick={() => this.back()} style={{ paddingLeft: '0.2rem', fontSize: '0.32rem' }}></Icon> */}
                <span style={{ textAlign: 'center' }}>{this.state.ptValue}</span>
                <span className="certificate-page-title-right"></span>
              </div>
              <div className="certificate-page-content">
                {this.state.imgUri ? (<img src={this.state.imgUri}></img>) : (   //
                  <div className='hr-editor-wrap-wrap'><div className='hr-editor-wrap'>
                    <HrEditor ref="proving_editor" defaultContent={this.state.certificateContent} mode="view" /></div>
                    <div className='mask'>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </When>
          {/* 指派 */}
          <When condition={this.state.page == 'assign'}>
            <div className="peopleList">
              {/* 请指派审核人员 */}
              <List renderHeader={() => this.state.json['hrzzmb-000119']}>
                {this.state.peopleListData.content[0].assginUsers.map(item => (
                  <CheckboxItem key={item.pk} onChange={() => this.onChange(item.pk)}>
                    {item.name}
                  </CheckboxItem>
                ))}
              </List>
              {/* 确定 */}
              <div className="btnSure" onClick={() => this.assignFun()}>{this.state.json['hrzzmb-000003']}</div>
            </div>
          </When>
        </Choose>
      </div>
    )
  }
}
thirdLog(() => {
  ReactDOM.render(<Certificate />, document.getElementById('app'));
});
