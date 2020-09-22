import React, { Component } from 'react';

class PageCacheUtil {
    //测试数据
    name = 'test';

    //全局缓存对象,刷新后会失效
    cache = {} ;

    //设置缓存
    setCache = (key, value) => {
        this.cache[key] = value;
    };

    //获取缓存
    getCache = (key) => {
        return this.cache[key];
    } ;

    //判断缓存是否存在
    isCache = (key) => {
        //return !this.cache.hasOwnProperty(key)&&(key in this.cache);
        return this.cache[key] != undefined;
    };

    // 清楚缓存
    delCache = (key) => {
        if(this.cache.hasOwnProperty('key')){
            delete this.cache[key]
        }
    }
}

export default new PageCacheUtil();
