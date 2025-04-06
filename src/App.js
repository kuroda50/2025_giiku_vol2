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
      console.log("カートアイテム:", cartItems);
      AI(cartItems).then((responses) => {
        console.log("AIの応答(毎回):", responses);
        setAiResponse(prevResponse => [...prevResponse, ...responses]);
      });
    }
  }, [cartItems]);

  // 商品とAI応答を表示
  useEffect(() => {
    const contentWrapper = document.getElementById('content-wrapper');
    console.log("AIの応答：", aiResponse);
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
            src="https://media.discordapp.net/attachments/1356221931896049677/1358051803576537321/817D353C-57B1-402E-82A6-EFD0F0B8ED7C.jpg?ex=67f26fcd&is=67f11e4d&hm=2a61390880e49d35d06fa6cbb14c1cec3b58d8eea529d6d8821727598e7ef637&=&format=webp&width=374&height=543" 
            alt="キャラクター" 
            class="character-image"
          >
        </div>
      </div>
    </div>
  `;
}

const messageElement = document.getElementById('message');
const progressElement = document.getElementById('progress');
const timerElement = document.getElementById('timer');
const proceedBtn = document.getElementById('proceedBtn');
const contentWrapper = document.getElementById('content-wrapper');

// State variables
let currentMessageIndex = 0;
let timeLeft = 30;
let messageInterval;
let timerInterval;

// Message animation function
function updateMessage() {
  messageElement.textContent = messages[0];
  messageElement.style.opacity = '1';
}

// Timer function
function updateTimer() {
  timeLeft--;

  // Update progress bar
  const progress = ((30 - timeLeft) / 30) * 100;
  progressElement.style.width = `${progress}%`;

  // Update timer text
  timerElement.textContent = `♡ 考える時間: ${timeLeft}秒 ♡`;

  // Check if timer is complete
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    proceedBtn.classList.add('active');
    proceedBtn.disabled = false;
    timerElement.textContent = '♡ 考える時間が終わりました ♡';
  }
}

// Initialize the page
function initialize() {
  // Set initial message
  updateMessage();

  // Start message rotation
  messageInterval = setInterval(updateMessage, 4000);

  // Start timer
  timerInterval = setInterval(updateTimer, 1000);

  // Setup proceed button
  proceedBtn.addEventListener('click', () => {
    if (timeLeft <= 0) {
      window.location.href = "https://www.amazon.co.jp/gp/cart/view.html?ref_=nav_cart";
    }
  });
}

// Start everything when the page loads
document.addEventListener('DOMContentLoaded', initialize);

export default App;