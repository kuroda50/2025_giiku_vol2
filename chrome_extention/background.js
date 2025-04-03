chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "download") {
        console.log("ダウンロード開始されたよ");
        chrome.downloads.download({
            url: message.url,
            filename: "amazon_images/" + message.filename,
            saveAs: false  // ユーザーに確認ダイアログを出さずに自動保存
        });
    }
    if (message.action === "cartItems") {
        console.log("カートアイテムを受信:", message.items);
        // カートデータを storage に保存
        chrome.storage.local.set({ cartData: message.items }, () => {
            console.log(data)
        });
    }
});

// 特に処理なし（Manifest V3 では Service Worker が必要）