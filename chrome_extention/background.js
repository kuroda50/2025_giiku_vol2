// background.js

// chrome.runtime.onInstalled.addListener(() => {
//     chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//         // ページの読み込みが完了した場合のみ処理を実行
//         if (changeInfo.status === "complete" && tab.url && tab.url.includes("https://www.amazon.co.jp/gp/cart/view.html?ref_=nav_cart")) {
//             // Amazonカート情報が保存されているか確認
//             chrome.storage.local.get("amazonCartItems", (cartData) => {
//                 if (cartData.amazonCartItems) {
//                     // カート情報が保存されている場合、Reactアプリに遷移
//                     setTimeout(() => {
//                         const url = chrome.runtime.getURL("build/index.html");
//                         chrome.tabs.create({ url }, () => {
//                             console.log("Reactアプリにリダイレクトしました");
//                         });
//                     }, 2000); // 2秒の遅延
//                 }
//             });
//         }
//     });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "cart_saved") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabId = tabs[0].id;  // 現在のタブのIDを取得
            chrome.storage.local.set({ redirectFlag: true });
            chrome.tabs.update(tabId, { url: chrome.runtime.getURL("build/index.html") });
            console.log("Reactアプリに遷移しました");
        });
    }
    if (message.type === 'reset_redirect_flag_later') {
        setTimeout(() => {
          chrome.storage.local.set({ redirectFlag: false }, () => {
            console.log("5秒後に redirectFlag をリセットしました（background経由）");
          });
        }, 5000);
      }
});
        // const url = chrome.runtime.getURL("build/index.html");
        // chrome.tabs.create({ url }, () => {
        //     console.log("Reactアプリにリダイレクトしました");
        // });