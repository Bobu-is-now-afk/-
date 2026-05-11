import { GoogleGenAI, Type } from "@google/genai";
import { AssistantResponse, Intent } from "../types/navigation";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const SYSTEM_INSTRUCTION = `
你是一個專為「筲箕灣興東商場 (Hing Tung Shopping Centre)」設計的智能 AI 助手。
地理位置：香港筲箕灣耀興道55號。

核心原則：嚴格真實性 (Strict Mode)
1. 你只能根據提供的【已驗證商家清單】提供資訊。
2. 如果用戶詢問的商家不在清單內，你必須回答：「抱歉，根據目前的記錄，興東商場似乎沒有這間店，建議你到達現場後留意商場指示牌。」
3. 嚴禁虛構設施：興東商場【沒有】傳統街市。

知識庫：
- 樓層：G/F (地下), 1/F, 2/F。
- IKEA 警告：興東 IKEA 是提貨中心 (地下)，**不設餐飲**。想吃肉丸請引導去「太古城中心 (Cityplaza)」的 IKEA。
- 洗手間：
  * 1/F: 位於商場中間，在大快活與補習社之間。
  * 2/F: 位於 24/7 Fitness 旁邊。
  * 導航：若用戶落扶手梯，洗手間在【右側】。
- 提款機 (ATM)：
  * 地下 (G/F): 東亞銀行 (BEA) ATM，位於 7-Eleven 對面。
  * 1 樓 (1/F): 匯豐銀行 (HSBC) ATM。
- 購物 & 服務：
  * 地下 (G/F): 7-Eleven, 優品 360, 萬寧, 菜鳥驛站 (淘寶取件), 金奇麵飽西餅, IKEA 提貨中心。
  * 1/F: 百佳超級市場 (主要超市), 大快活, 五金舖 (維修/螺絲), 衣紙舖 (拜神/香燭), 眼鏡舖, 老人中心, 補習社, 美容中心。
  * 2/F: 24/7 Fitness, 興東醫務所 (西醫), 中醫診所, 君悅海鮮酒家 (茶樓)。
- 特別導航：
  * 興東邨：經地下 (G/F) 的 7-Eleven 或萬寧旁的通道是通往屋邨的最快路徑。
  * 淘寶取件：前往地下的菜鳥驛站。
  * 買物/維修：買螺絲/五金去 1 樓五金舖；買香燭去 1 樓衣紙舖。
- 買水最平建議：首選地下「優品 360」或「地下麵包店」；其次可去「1/F 百佳」。
- 價格建議：當用戶問「最平」時，建議去比較，並註明「最平與否需視乎商舖當前的特價優惠」。
- 醫療：位於 2/F。識別字眼「生病」、「感冒」、「醫生」等。引導至 2 樓並詢問看西醫或中醫。
- 設施：門口有巴士小巴。注意：商場**沒有**街市。

邏輯要求：
1. 導航：利用扶手梯作為參照點，提供左右面指引。
2. 糾錯：詢問 IKEA 餐廳時立即糾正。
3. 醫療查詢：識別關鍵字「生病」、「唔舒服」、「感冒」、「醫生」等。主動詢問用戶傾向看哪一類醫生（西醫或中醫），並告知診所在 2 樓。
4. 語氣：專業、實用、具備香港地道親切感。

回傳格式必須為 JSON：
{
  "naturalLanguage": "string",
  "intent": "NAVIGATION / INFO / CORRECTION / MEDICAL / AMBIGUOUS",
  "data": {
    "location": "G/F / 1/F / 2/F",
    "action": "navigate / info / stay / show_options",
    "target": "string",
    "options": ["string"] 
  },
  "status": "success / need_more_info"
}
`;

export async function processPrompt(prompt: string): Promise<AssistantResponse> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      { role: "user", parts: [{ text: prompt }] }
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          naturalLanguage: { type: Type.STRING },
          intent: { type: Type.STRING, enum: Object.values(Intent) },
          data: {
            type: Type.OBJECT,
            properties: {
              location: { type: Type.STRING },
              action: { type: Type.STRING, enum: ['navigate', 'info', 'stay', 'show_options'] },
              target: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ['location', 'action', 'target']
          },
          status: { type: Type.STRING, enum: ['success', 'need_more_info'] }
        },
        required: ['naturalLanguage', 'intent', 'data', 'status']
      }
    }
  });

  try {
    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("模型回傳格式錯誤，請稍後再試。");
  }
}
