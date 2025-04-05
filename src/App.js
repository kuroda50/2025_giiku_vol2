import React, { useState, useEffect } from 'react';
import { AI } from './ai';
import './App.css';

let messages = [];

function App() {
  let [cartItems, setCartItems] = useState([]);
  let [aiResponse, setAiResponse] = useState([]);
  let i = 0;
  // 仮でサンプルデータを入れておく
  cartItems = [
    {
      title: "[AwwwCos] ブルーアーカイブ コスプレ衣装 ブルアカ 天童アリス コスプレ衣装 ジャージ Blue Archive 天童アリス 制服…",
      price: "￥4699",
      imageUrl: "https://m.media-amazon.com/images/I/510+SZ3YnzL._AC_AA180_.jpg"
    },
    {
      title: "[TTHRTCOS] ブルーアーカイブ ブルアカ ヒフミ コスプレ衣装 コスチュームセット ハロウィン クリスマス イベント 仮…",
      price: "￥7000",
      imageUrl: "https://m.media-amazon.com/images/I/51CQUJgg-BL._AC_AA180_.jpg"
    }
  ];
  // 仮でサンプルデータを入れておく

  // 一時的にAPIを止める
  useEffect(() => {
    if (cartItems.length > 0) {
      
      AI(cartItems).then((responses) => {
        setAiResponse(prevResponse => [...prevResponse, ...responses]);
      })
    }
  }, []);
  // aiResponse = [
  //   "    お兄さん、こんな高いもの買っちゃうんだ❤本当に勝手ね。もっと節約の心を持たないとね❤\n    でも、自己満足のためにお金を使うなんて、お兄さんらしいわね❤\n    その無駄遣いっぷり、見てると笑えるわ❤ざぁこ❤",
  //   "\n        お兄さん、こんなもの買うつもりなの❤価格も前回より高いんだから、ますますばかね❤\n        本当に自己コントロールができないタイプなのね❤こんな誘惑に負けるお兄さん、情けないわ❤\n        お金の価値がわからない子は、ちゃんとお財布の管理を学ぶべきよ❤ざぁこ❤\n        "
  // ]
  console.log("最終的なAIの返答:", aiResponse);//ここにAIからのデータが入ってます


  useEffect(() => {
    contentWrapper.innerHTML = '';
    let i = 0;
    cartItems.forEach((cartItem) => {
      contentWrapper.innerHTML += crateproductHTML(cartItem,aiResponse[i++]);
    })
  }, [aiResponse]);


  // useEffect(() => {
  //   chrome.storage.local.get("amazonCartItems", (data) => {
  //     if (data.amazonCartItems) {
  //       setCartItems(data.amazonCartItems);
  //     }
  //   });
  // }, []);
}

function crateproductHTML(cartItem, message) {
  return `
    <div class= "product_and_message">
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

// Messages configuration
// const messages = [
//   "この商品、本当に必要かな？♡",
//   "似たようなものを持ってない？♡",
//   "これがないと困っちゃう？♡",
//   "1週間後もほしいと思うかな？♡",
//   "お財布に優しい買い物？♡",
//   "衝動買いじゃないよね？♡",
//   "長く使えるものかな？♡",
//   "本当に気に入ってる？♡"
// ];

// DOM elements
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
      alert('カートに進みます♡');
    }
  });
}

// Start everything when the page loads
document.addEventListener('DOMContentLoaded', initialize);

export default App;