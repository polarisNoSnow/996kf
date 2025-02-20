import './popup.css';



document.addEventListener('DOMContentLoaded', () => {
    // 加载保存的设置
    chrome.storage.sync.get({
        selector: 'sup.el-badge__content.is-dot',
        volume: 0.1
    }, settings => {
        document.getElementById('selector').value = settings.selector;
        document.getElementById('volume').value = settings.volume;
        console.log('加载保存的设置', selector.value, volume.value);
    });

    // 保存设置
    document.getElementById('save').addEventListener('click', () => {
        chrome.storage.sync.set({
            selector: document.getElementById('selector').value,
            volume: parseFloat(document.getElementById('volume').value)
        }, () => {
            window.close();
            alert('设置已保存！');
        });
    });
});