// content.js
if (window.location.href.includes("amazon.co.jp/gp/cart/view.html")) {
    let items = [];

    let cartItems = document.querySelectorAll(".sc-list-item-content");
    cartItems.forEach(item => {
        let title = item.querySelector(".a-truncate-cut")?.innerText.trim() || "No Title";
        let price = item.querySelector(".sc-item-price-block .a-offscreen")?.innerText.trim() || "No Price";
        let imgElement = item.querySelector("img.sc-product-image");
        let imageUrl = imgElement ? imgElement.src : "No Image";

        items.push({
            title,
            price,
            imageUrl
        });
    });

    if (items.length > 0) {
        chrome.storage.local.set({ amazonCartItems: items }, () => {
            console.log("カート情報を保存しました");
        });
    }
}
