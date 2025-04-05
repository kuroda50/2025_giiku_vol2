import React, { useEffect, useState } from "react";
import { AI } from './ai';
import './App.css';

function App() {
  let [cartItems, setCartItems] = useState([]);
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

  const [aiResponse, setAiResponse] = useState([]);

  useEffect(()=>{
    if(cartItems.length > 0){
      AI(cartItems).then((responses)=>{
        setAiResponse(prevResponse => [...prevResponse, ...responses]); 
        console.log("AppでのAIの返答:", responses);
      })
    }
  },[]);

  console.log("最終的なAIの返答:", aiResponse);//ここにAIからのデータが入ってます


  // useEffect(() => {
  //   chrome.storage.local.get("amazonCartItems", (data) => {
  //     if (data.amazonCartItems) {
  //       setCartItems(data.amazonCartItems);
  //     }
  //   });
  // }, []);

  return (
    <div>
      <h1>Amazon カート情報</h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <h3>{item.title}</h3>
              <p>{item.price}</p>
              <img src={item.imageUrl} alt={item.title} />
            </li>
          ))}
        </ul>
      ) : (
        <p>カートが空です。</p>
      )}
    </div>
  );
}

export default App;



// import logo from './logo.svg';
// import './App.css';
// import { AI } from './ai';

// function App() {
//   AI();
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

