console.log('初始化监听器');

// 初始化监听器
function initObserver(selector) {
    console.log('当前选择器:', selector);
    const audio = new Audio(chrome.runtime.getURL('sounds/alert.mp3'));
    audio.volume = 0.5;
    observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                console.log('子节点:', node);
                const elements = node.querySelectorAll ?
                    node.querySelectorAll(selector) : [];
                // 如果找到匹配元素
                if (elements.length > 0) {
                    audio.play().catch(error => {
                        if (error.name === 'NotAllowedError') {
                            console.log('⚠️ 需要先点击页面任意位置激活音频权限！！');
                        }
                    });

                }
            });
        });
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// 从存储加载配置
chrome.storage.sync.get({
    selector: 'sup.el-badge__content.is-dot',
    volume: 0.5
}, settings => {
    initObserver(settings.selector);
});

// 监听配置变化
chrome.storage.onChanged.addListener(changes => {
    if (changes.selector) {
        initObserver(changes.selector.newValue);
    }
});