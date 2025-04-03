document.getElementById("getCart").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: getCartItems
        });
    });
});

function getCartItems() {
    let items = [];
    document.querySelectorAll('.sc-list-item-content').forEach(item => {
        let title = item.querySelector('.sc-product-title')?.innerText.trim() || "No Title";
        let price = item.querySelector('.sc-price')?.innerText.trim() || "No Price";
        items.push(`${title} - ${price}`);
    });

    if (items.length > 0) {
        let blob = new Blob([items.join("\n")], { type: "text/plain" });
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "amazon_cart.txt";
        a.click();
    } else {
        alert("カートが空です！");
    }
}

// document.addEventListener("DOMContentLoaded", () => {
//     chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//         console.log("popupでカートアイテムを受信:", message.items);
//         if (message.action === "sendToPopup") {
//             // 取得したカート情報をReactに渡す（例えばwindow.localStorageなどを使う）
//             console.log("カートデータを保存:", message.items);
//             localStorage.setItem("cartData", JSON.stringify(message.items));
//             window.postMessage({ action: "cartDataUpdated" }, "*");
//         }
//     });
// });