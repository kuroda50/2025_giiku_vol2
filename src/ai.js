import OpenAI from "openai";

export async function AI() {
  console.log("AI関数が呼ばれました。");
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, // 先程取得したAPI KEY
    dangerouslyAllowBrowser: true
  })
  const message = "ワンと言ってください。"
  const completion = await openai.chat.completions.create({
    model: "gpt-4", // 使いたいGPTのModel
    messages: [{ "role": "user", "content": message }],
  });
  console.log(completion.choices[0].message.content); //GPTの回答
}

