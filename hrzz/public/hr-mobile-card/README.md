
## Ncc移动端框架

- 背景
- 实现原理
- 使用方式

---

## 背景简介

- 需要采用web端模板配置
- 平台没有没有提供配套移动端模板
- 工期紧急

---

## 实现原理

- 采用Context进行数据传输
- 顶层组件采用Provider进行封装，同时监听组件的整个状态
- 卡片列表组件采用Consumer进行封装

#### 相关源码
- [Provider](../out/container_index.js.html)
- [Consumer](../out/components_generator.js.html)
---

### 核心能力

- 属性
    - 获取字段meta getFieldProps(key, code)
    - 设置字段meta setFieldProps(key, code, obj)
- 字段值
    - 获取字段信息 getFieldValue(key)
    - 设置字段信息 setFieldValue({flag, type, key, value})
- 事件钩子
    - 编辑后事件 onAfterHandle() 

---

- 页面编辑性
    - 获取card是否可以编辑 getFormEditStatus()
    - 设置card是否可编辑 setFormEditStatus(flag)
- 页面信息
    - 获取当前卡片数据 getFormData()

[具体使用方式信息](../out/HrMobileFieldMeta.html)

---

### 具体使用方法

```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, CreateMeta } from '../hr-mobile-card/index'
import meta from '../hr-mobile-card/mock_meta'
import FormData from '../hr-mobile-card/mock_data'
import './index.less'
import {getReferConf} from '../hr-mobile-card/utils'
import {hrAjax} from 'src/hrpub/common/utils/utils'
let timer = new Date().getTime()
let count = 1
class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {
            store: null,
            data: null
        }
        console.log('constructor', new Date().getTime() - timer, 'ms')
    }
    componentDidMount() {
        // 模拟动态获取模板与数据
        let getMeta = CreateMeta(meta, {
            // onAfterHandle: this.onAfterHandle
        })
        this.setState({
            store: getMeta
        },() => {
            setTimeout(()=>{
                this.setState({
                    data: FormData
                })
            },5000)
        })
    }
    onAfterHandle({ key, type, value }) {
        console.log('after', { key, type, value })
    }
    render() {
        let {store, data} = this.state
        console.log(`第${count}次render耗时:`, new Date().getTime() - timer, 'ms')
        count++
        return (
            <Container
                store={store}
                cardName="add_form"
                data={data}
            ></Container>
        )
    }
}
ReactDOM.render((<Test hh={11111} />), document.querySelector('#app'));

```

---

### 自定义组件

设置字段属性，增加render

```
render: (config)=>{
            return (
                <div className="am-list-item am-input-item am-list-item-middle">
                    <InputItem {...config}>sdsdsd</InputItem>
                </div>
            )
        }
```

---


### TODO

-[x] table相关处理

-[x] 默认iconClick

-[x] 隐藏panel头

-[ ] 校验

-[x] setMeta

-[x] getFormEditStatus

-[x] setFormEditStatus

-[x] setFieldProps

-[x] getFieldProps

-[x] getFieldValue

-[x] setFieldValue

-[x] getFormData


---

### 注意事项

- 非必输项 email 验证 
- 需添加meta中添加 字段 itemtype = 'email'；

```
jsdoc -c jsdoc.json -t ../../../../node_modules/ink-docstrap/template -R README.md -r
```