// ==UserScript==
// @name         Lumenfield GitHub 无痕加速 (最终修复版)
// @namespace    https://github.com/lumenfield/tampermonkey-scripts
// @version      1.3.0
// @description  自动将 github.com 请求重定向到自建的 lumenfield 加速通道 (修复登录冲突)
// @author       lumenfield
// @match        *://github.com/*
// @match        *://www.github.com/*
// @match        *://raw.githubusercontent.com/*
// @match        *://gist.github.com/*
// @match        *://avatars.githubusercontent.com/*
// @match        *://user-images.githubusercontent.com/*
// @match        *://collector.github.com/*
// @match        *://api.github.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const PROXY_BASE = 'https://github.lumenfield.work/';
    
    // 定义需要拦截的域名
    const targetHosts = [
        'github.com', 
        'www.github.com', 
        'raw.githubusercontent.com', 
        'gist.github.com',
        'avatars.githubusercontent.com',
        'user-images.githubusercontent.com',
        'collector.github.com',
        'api.github.com'
    ];
    
    const currentHost = window.location.host;

    // 🛡️【核心修复】超级安全锁：只要域名包含 lumenfield.work，立刻退出，绝不干涉！
    if (currentHost.includes('lumenfield.work')) {
        console.log('[Lumenfield] 检测到加速域名，跳过拦截。');
        return; 返回; 
    }

    // 如果当前域名在目标列表中，执行重定向
    if (targetHosts.includes(currentHost)) {如果 (targetHosts.包含(currentHost)) {
        const newUrl = PROXY_BASE + currentHost + window.location位置位置.pathname路径名 + window.location位置位置.search搜索搜索 + window.location位置位置.hash哈希;.路径名 + window.location位置位置.search搜索搜索 + window.location位置位置.哈希;
        
        console.log('[Lumenfield] 加速重定向:', currentHost, '->', newUrl);
        
        // 使用 replace 避免回退到慢速官网
        window.location.replace(newUrl);窗口.位置.替换(newUrl);
    }
})();
