// import OpenAI from "openai";
import { useState, useEffect } from "react";

// export async function AI() {
//   console.log("AI関数が呼ばれました。");
//   const openai = new OpenAI({
//     apiKey: process.env.REACT_APP_OPENAI_API_KEY, // 先程取得したAPI KEY
//     dangerouslyAllowBrowser: true
//   })
//   const message = "ワンと言ってください。"
//   const completion = await openai.chat.completions.create({
//     model: "gpt-4", // 使いたいGPTのModel
//     messages: [{ "role": "user", "content": message }],
//   });
//   console.log(completion.choices[0].message.content); //GPTの回答
// }


export const useCartData = () => {
  console.log("useCartData が実行された"); 
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.get("cartData", (result) => {
        if (result.cartData) {
          setCartData(result.cartData);
        }
      });
      // カートデータが更新されたときに監視
      const handleStorageChange = (changes, areaName) => {
        if (changes.cartData) {
          setCartData(changes.cartData.newValue);
        }
      };

      chrome.storage.onChanged.addListener(handleStorageChange);
      return () => {
        chrome.storage.onChanged.removeListener(handleStorageChange);
      };
    }
  }, []);

  console.log("カートデータ:", cartData);

  return cartData;
}

// export const useCartData = () => {
// export function getCartData() {
//   const data = localStorage.getItem("cartData");
//   console.log("カートデータ:", data);
//   return data ? JSON.parse(data) : [];
// }

// const storedData = localStorage.getItem("cartData");
// if (storedData) {
//   setCartData(JSON.parse(storedData));
// }
// const handleStorageChange = (event) => {
//   if (event.key === "cartData") {
//     console.log("Reactでカートデータを更新:", event.newValue);
//     setCartData(JSON.parse(event.newValue));
//   }
// };
// window.addEventListener("storage", handleStorageChange);
// return () => window.removeEventListener("storage", handleStorageChange);