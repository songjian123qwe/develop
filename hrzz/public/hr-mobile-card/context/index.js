import React from 'react'
let defaultContext = {
    fieldMeta: {},
    onFieldChange: () => { }
}
export default (config) => {
    let conf = Object.assign({}, defaultContext, config)
    return React.createContext(conf)
}