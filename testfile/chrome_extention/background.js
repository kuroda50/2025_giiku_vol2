// background.js

chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        // ページの読み込みが完了した場合のみ処理を実行
        if (changeInfo.status === "complete" && tab.url && tab.url.includes("https://www.amazon.co.jp/gp/cart/view.html?ref_=nav_cart")) {
            // Amazonカート情報が保存されているか確認
            chrome.storage.local.get("amazonCartItems", (cartData) => {
                if (cartData.amazonCartItems) {
                    // カート情報が保存されている場合、Reactアプリに遷移
                    setTimeout(() => {
                        chrome.tabs.create({
                            url: "chrome-extension://eoaodpgnabhkagfjbpkgcmmidaeibefa/build/index.html"
                        });

                        console.log("Reactアプリにリダイレクトしました");
                    }, 2000); // 2秒の遅延
                }
            });
        }
    });
});

