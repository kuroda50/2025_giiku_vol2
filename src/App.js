import React, { useState, useEffect } from 'react';
import { AI } from './ai';
import './App.css';

let messages = [];

function App() {
  const [cartItems, setCartItems] = useState([]); // カートアイテムの状態
  const [aiResponse, setAiResponse] = useState([]); // AIの応答の状態

  // カートデータを取得
  useEffect(() => {
    chrome.storage.local.get("amazonCartItems", (data) => {
      if (data.amazonCartItems) {
        setCartItems(data.amazonCartItems); // カートデータを状態にセット
      } else {
        console.warn("カート情報が見つかりません");
      }
    });
  }, []);

  // AI処理を実行
  useEffect(() => {
    if (cartItems.length > 0) {
      AI(cartItems).then((responses) => {
        setAiResponse(prevResponse => [...prevResponse, ...responses]);
      });
    }
  }, [cartItems]);

  // 商品とAI応答を表示
  useEffect(() => {
    const contentWrapper = document.getElementById('content-wrapper');
    if (contentWrapper) {
      contentWrapper.innerHTML = ''; // 初期化
      let i = 0;
      cartItems.forEach((cartItem) => {
        contentWrapper.innerHTML += createProductHTML(cartItem, aiResponse[i++]);
      });
    }
  }, [aiResponse]);

  return (
    <div className="App">
      <h1>Amazonカート情報</h1>
      <div id="content-wrapper"></div>
    </div>
  );
}

// 商品情報とAI応答をHTMLとして生成
function createProductHTML(cartItem, message) {
  return `
    <div class="product_and_message">
      <div class="product-info">
        <img src="${cartItem.imageUrl}" alt="${cartItem.title}">
        <h3>${cartItem.title}</h3>
        <p>${cartItem.price}</p>
      </div>

      <div class="character-section">
        <div class="speech-bubble">
          <p id="message" class="message-text">${message ?? "考え中……"}</p>
        </div>
        <div class="character-container">
          <img 
            src="https://images.unsplash.com/photo-1566206091558-7f218b696731?w=150&h=150&fit=crop" 
            alt="キャラクター" 
            class="character-image"
          >
        </div>
      </div>
    </div>
  `;
}

export default App;