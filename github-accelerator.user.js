// ==UserScript==
// @name         Lumenfield GitHub 无痕加速
// @namespace    https://github.com/lumenfield/tampermonkey-scripts
// @version      1.0.0
// @description  自动将 github.com 请求重定向到自建的 lumenfield 加速通道，实现无痕访问
// @description:zh-CN  自动将 github.com 请求重定向到自建的 lumenfield 加速通道，实现无痕访问
// @author       lumenfield
// @match        *://github.com/*
// @match        *://www.github.com/*
// @match        *://raw.githubusercontent.com/*
// @match        *://gist.github.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // === 配置区域 ===
    // 在这里修改你的加速域名
    const PROXY_BASE = 'https://github.lumenfield.work/';
    
    // 定义需要拦截的域名列表
    const targetHosts = ['github.com', 'www.github.com', 'raw.githubusercontent.com', 'gist.github.com'];
    
    const currentHost = window.location.host;

    if (targetHosts.includes(currentHost)) {
        // 构建新的加速 URL
        // 逻辑：加速域名 + 原域名 + 原路径 + 参数 + 哈希
        const newUrl = PROXY_BASE + currentHost + window.location.pathname + window.location.search + window.location.hash;

        console.log('[Lumenfield Accelerator] 检测到 GitHub 访问，正在重定向至:', newUrl);

        // 执行重定向 (replace 不会在历史记录中留下原地址，避免回退死循环)
        window.location.replace(newUrl);
    }
})();
