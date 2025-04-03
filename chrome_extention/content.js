function getCartItems() {
    let items = [];

    // ✅ 「カート内の商品」エリアを特定（id が "sc-active" で始まる要素）
    let activeCart = document.querySelector('[id^="sc-active"]');
    if (!activeCart) {
        alert("カートが空です！");
        return;
    }

    // ✅ カート内の商品だけを取得
    activeCart.querySelectorAll(".sc-list-item-content").forEach(item => {
        let title = item.querySelector(".a-truncate-cut")?.innerText.trim() || "No Title";
        let price = item.querySelector(".sc-item-price-block .a-offscreen")?.innerText.trim() || "No Price";
        let imgElement = item.querySelector("img.sc-product-image");
        let imageUrl = imgElement ? imgElement.src : "No Image";

        items.push(`${title} - ${price} - ${imageUrl}`);

        if (imageUrl !== "No Image") {
            downloadImage(imageUrl, title.replace(/[^a-zA-Z0-9]/g, "_") + ".jpg");
        }
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


// Chrome拡張のdownloads APIを使用
function downloadImage(url, filename) {
    chrome.runtime.sendMessage({ action: "download", url, filename });
}

setTimeout(getCartItems, 1000);
