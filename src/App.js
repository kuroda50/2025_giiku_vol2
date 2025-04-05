// かわいいメッセージの設定
const messages = [
  "この商品、本当に必要かな？♡",
  "似たようなものを持ってない？♡",
  "これがないと困っちゃう？♡",
  "1週間後もほしいと思うかな？♡",
  "お財布に優しい買い物？♡",
  "衝動買いじゃないよね？♡",
  "長く使えるものかな？♡",
  "本当に気に入ってる？♡"
];

// DOM要素の取得
const messageElement = document.getElementById('message');
const progressElement = document.getElementById('progress');
const timerElement = document.getElementById('timer');
const proceedBtn = document.getElementById('proceedBtn');
const characterImage = document.getElementById('character');

// キャラクターの表情（プレースホルダー）
// 実際の実装では、ここに3つの異なるキャラクター画像のパスを設定します
const characterImages = [
  "/api/placeholder/120/120", // 通常
  "/api/placeholder/120/120", // 考え中
  "/api/placeholder/120/120"  // 心配
];

// 現在のメッセージインデックス
let currentMessageIndex = 0;
// 各メッセージの表示時間（ミリ秒）
const messageDelay = 4000;
// タイマーの合計時間（秒）
const totalTime = 30;
// 残り時間
let timeLeft = totalTime;
// タイマーID
let timerId = null;

/**
 * メッセージのアニメーション処理
 * メッセージを徐々にフェードアウトさせてから、新しいメッセージに入れ替えフェードイン
 */
function animateMessage() {
  // メッセージをフェードアウト
  messageElement.style.opacity = 0;
  
  // 0.5秒後に新しいメッセージを表示してフェードイン
  setTimeout(() => {
    messageElement.textContent = messages[currentMessageIndex];
    messageElement.style.opacity = 1;
    
    // キャラクターの表情をランダムに変更
    characterImage.src = characterImages[Math.floor(Math.random() * characterImages.length)];
    
    // 次のメッセージインデックスに進む（配列の最後まで行ったら最初に戻る）
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;
  }, 500);
}

/**
 * タイマーの開始
 * 1秒ごとにカウントダウンしてプログレスバーとテキストを更新
 */
function startTimer() {
  timerId = setInterval(() => {
    timeLeft--;
    
    // プログレスバーの更新
    const progressPercentage = ((totalTime - timeLeft) / totalTime) * 100;
    progressElement.style.width = `${progressPercentage}%`;
    
    // タイマーテキストの更新
    timerElement.textContent = `♡ 考える時間: ${timeLeft}秒 ♡`;
    
    // タイマー終了時の処理
    if (timeLeft <= 0) {
      // タイマーを停止
      clearInterval(timerId);
      // ボタンをアクティブにする
      proceedBtn.classList.add('active');
      proceedBtn.disabled = false;
      // テキストを更新
      timerElement.textContent = "♡ 考える時間が終わりました ♡";
    }
  }, 1000);
}

// 初期メッセージの表示
animateMessage();

// メッセージの自動切り替えを設定（4秒ごと）
setInterval(animateMessage, messageDelay);

// タイマーの開始
startTimer();

// ボタンのクリックイベント設定
proceedBtn.addEventListener('click', function() {
  if (timeLeft <= 0) {
    // 30秒経過後のみ処理を実行
    alert('カートに進みます♡');
    // ここにAmazonのカートページにリダイレクトする処理などを追加
    // 例: window.location.href = 'https://amazon.co.jp/cart';
  }
});
