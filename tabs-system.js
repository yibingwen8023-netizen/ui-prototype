/**
 * 跨页面标签页系统
 * 使用 localStorage 在多个 HTML 页面之间共享标签页状态
 */
(function (window) {
    'use strict';

    var STORAGE_KEY = 'wd_open_tabs';
    var STORAGE_ACTIVE_KEY = 'wd_active_tab';

    // 当前页面标识（由各页面在引入后设置）
    var currentPageId = null;

    /**
     * 初始化标签页系统
     * @param {string} pageId - 当前页面的唯一标识（如 'account', 'settle', 'invite', 'approval'）
     * @param {string} pageTitle - 标签页显示的标题
     * @param {string} pageUrl - 当前页面的 URL
     * @param {string} pageGroup - 所属侧边栏分组
     */
    function initTabs(pageId, pageTitle, pageUrl, pageGroup) {
        currentPageId = pageId;

        // 清理指向同一 URL 的重复标签（只保留第一个）
        var tabs = getTabs();
        var seenUrls = {};
        var cleaned = [];
        for (var i = 0; i < tabs.length; i++) {
            var baseUrl = tabs[i].url.split('#')[0];
            if (seenUrls[baseUrl]) {
                // 重复页面，跳过（不保留）
                continue;
            }
            seenUrls[baseUrl] = true;
            cleaned.push(tabs[i]);
        }
        tabs = cleaned;

        // 确保当前页面在标签列表中
        var exists = false;
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].id === pageId) {
                exists = true;
                // 更新标题和 URL（支持 sub-tab 切换后刷新）
                tabs[i].title = pageTitle;
                tabs[i].url = pageUrl;
                break;
            }
        }
        if (!exists) {
            tabs.push({
                id: pageId,
                title: pageTitle,
                url: pageUrl,
                group: pageGroup || ''
            });
        }

        // 设置当前激活
        setActiveTab(pageId);
        saveTabs(tabs);

        // 渲染标签页
        renderTabs();

        // 监听其他标签页的变化（同源其他标签页）
        window.addEventListener('storage', function (e) {
            if (e.key === STORAGE_KEY || e.key === STORAGE_ACTIVE_KEY) {
                renderTabs();
            }
        });
    }

    function getTabs() {
        try {
            var data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }

    function saveTabs(tabs) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tabs));
    }

    function getActiveTab() {
        return localStorage.getItem(STORAGE_ACTIVE_KEY) || '';
    }

    function setActiveTab(id) {
        localStorage.setItem(STORAGE_ACTIVE_KEY, id);
    }

    /**
     * 渲染 tabs-bar
     */
    function renderTabs() {
        var bar = document.querySelector('.tabs-bar');
        if (!bar) return;

        var tabs = getTabs();
        var activeId = getActiveTab();

        // 构建标签 HTML
        var html = '';
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            var isActive = (tab.id === currentPageId) ? ' active' : '';
            var isHome = (i === 0) ? ' is-home' : '';
            html += '<div class="tab-item' + isActive + isHome + '" data-tab-id="' + tab.id + '" data-tab-url="' + escapeAttr(tab.url) + '">';
            html += '<span class="tab-title">' + escapeHtml(tab.title) + '</span>';
            // 第一个标签（首页）不可关闭
            if (i > 0) {
                html += '<span class="tab-close" data-close-id="' + tab.id + '" title="关闭">×</span>';
            }
            html += '</div>';
        }

        bar.innerHTML = html;

        // 绑定事件
        var tabItems = bar.querySelectorAll('.tab-item');
        for (var j = 0; j < tabItems.length; j++) {
            (function (item) {
                // 点击切换标签
                item.addEventListener('click', function (e) {
                    // 如果点击的是关闭按钮，不跳转
                    if (e.target.classList.contains('tab-close')) return;

                    var tabId = item.getAttribute('data-tab-id');
                    var tabUrl = item.getAttribute('data-tab-url');

                    if (tabId === currentPageId) return; // 已经在当前页

                    setActiveTab(tabId);
                    window.location.href = tabUrl;
                });
            })(tabItems[j]);
        }

        // 关闭按钮事件
        var closeBtns = bar.querySelectorAll('.tab-close');
        for (var k = 0; k < closeBtns.length; k++) {
            (function (btn) {
                btn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    var closeId = btn.getAttribute('data-close-id');
                    closeTab(closeId);
                });
            })(closeBtns[k]);
        }

        // 标签过多时支持左右滚动
        updateTabsScrollState(bar);
    }

    /**
     * 关闭标签页
     * @param {string} tabId - 要关闭的标签 ID
     */
    function closeTab(tabId) {
        var tabs = getTabs();
        var tabIndex = -1;
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].id === tabId) {
                tabIndex = i;
                break;
            }
        }
        if (tabIndex === -1) return;

        // 不允许关闭第一个标签
        if (tabIndex === 0) return;

        var tabs = getTabs();
        tabs.splice(tabIndex, 1);
        saveTabs(tabs);

        // 如果关闭的是当前标签，跳转到相邻标签
        if (tabId === currentPageId) {
            var nextTab = tabs[Math.min(tabIndex, tabs.length - 1)];
            if (nextTab) {
                setActiveTab(nextTab.id);
                window.location.href = nextTab.url;
            }
        } else {
            renderTabs();
        }
    }

    /**
     * 打开新标签（从侧边栏调用）
     * @param {string} tabId - 标签 ID
     * @param {string} tabTitle - 标签标题
     * @param {string} tabUrl - 标签 URL
     * @param {string} tabGroup - 所属分组
     */
    function openTab(tabId, tabTitle, tabUrl, tabGroup) {
        var tabs = getTabs();
        var exists = false;
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].id === tabId) {
                exists = true;
                break;
            }
        }

        if (!exists) {
            tabs.push({
                id: tabId,
                title: tabTitle,
                url: tabUrl,
                group: tabGroup || ''
            });
            saveTabs(tabs);
        }

        setActiveTab(tabId);
        window.location.href = tabUrl;
    }

    /**
     * 滚动状态处理（标签过多时显示滚动阴影）
     */
    function updateTabsScrollState(bar) {
        if (!bar) return;
        bar.classList.add('tabs-scrollable');

        function update() {
            var scrollLeft = bar.scrollLeft;
            var maxScroll = bar.scrollWidth - bar.clientWidth;

            if (scrollLeft > 2) {
                bar.classList.add('has-scroll-left');
            } else {
                bar.classList.remove('has-scroll-left');
            }

            if (maxScroll - scrollLeft > 2) {
                bar.classList.add('has-scroll-right');
            } else {
                bar.classList.remove('has-scroll-right');
            }
        }

        bar.addEventListener('scroll', update);
        window.addEventListener('resize', update);
        // 延迟执行以确保 DOM 渲染完成
        setTimeout(update, 50);
    }

    // 工具函数
    function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    function escapeAttr(str) {
        return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    /**
     * 更新当前标签页的标题（不新增标签，用于同页面内 sub-tab 切换）
     * @param {string} newTitle - 新标题
     * @param {string} [newUrl] - 可选，更新 URL（如带 hash）
     */
    function updateCurrentTab(newTitle, newUrl) {
        var tabs = getTabs();
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].id === currentPageId) {
                tabs[i].title = newTitle;
                if (newUrl) tabs[i].url = newUrl;
                break;
            }
        }
        saveTabs(tabs);
        renderTabs();
    }

    // 暴露全局方法
    window.TabsSystem = {
        init: initTabs,
        openTab: openTab,
        closeTab: closeTab,
        getTabs: getTabs,
        renderTabs: renderTabs,
        updateCurrentTab: updateCurrentTab
    };

})(window);
