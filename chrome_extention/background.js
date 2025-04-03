chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "download") {
        chrome.downloads.download({
            url: message.url,
            filename: "amazon_images/" + message.filename,
            saveAs: false  // ユーザーに確認ダイアログを出さずに自動保存
        });
    }
});

// 特に処理なし（Manifest V3 では Service Worker が必要）