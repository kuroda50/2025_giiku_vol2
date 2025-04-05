import React, { useState, useEffect } from 'react';
import { AI } from './ai';
import './App.css';

let messages = [];

function App() {
  let [cartItems, setCartItems] = useState([]);
  const [aiResponse, setAiResponse] = useState([]);
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

  console.log("最終的なAIの返答:", aiResponse);//ここにAIからのデータが入ってます
  messages = aiResponse;
  
  // useEffect(() => {
  //   chrome.storage.local.get("amazonCartItems", (data) => {
  //     if (data.amazonCartItems) {
  //       setCartItems(data.amazonCartItems);
  //     }
  //   });
  // }, []);
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
const productElement = document.getElementById('product-info');

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