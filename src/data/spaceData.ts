import { MallEntity } from '../types/navigation';

export const mallData: MallEntity[] = [
  // G/F Shops & Facilities
  {
    id: 'ikea-pickup',
    name: '宜家家居 (IKEA) 提貨中心',
    floor: 'G/F',
    category: 'shop',
    description: '位於地下 (G/F)，僅供取貨，不設餐廳或肉丸供應。',
    tags: ['shop', 'ikea', 'pickup']
  },
  {
    id: '7-11',
    name: '7-Eleven',
    floor: 'G/F',
    category: 'shop',
    description: '位於地下的便利店，對面有東亞銀行 ATM。',
    tags: ['shop', 'convenience', 'water']
  },
  {
    id: 'bea-atm',
    name: '東亞銀行 (BEA) ATM',
    floor: 'G/F',
    category: 'facility',
    description: '位於地下 7-Eleven 對面。',
    tags: ['facility', 'atm', 'money', 'bea']
  },
  {
    id: 'mannings',
    name: '萬寧 (Mannings)',
    floor: 'G/F',
    category: 'shop',
    description: '位於地下，旁邊通道通往興東邨。',
    tags: ['shop', 'pharmacy', 'personal-care']
  },
  {
    id: 'cainiao',
    name: '菜鳥驛站',
    floor: 'G/F',
    category: 'facility',
    description: '位於地下，提供淘寶取件、快遞服務。',
    tags: ['facility', 'taobao', 'delivery', 'pickup']
  },
  {
    id: 'bakery',
    name: '金奇麵飽西餅 / 意大利餅店',
    floor: 'G/F',
    category: 'food',
    description: '位於地下，早餐及買水最平之選。',
    tags: ['food', 'bakery', 'water', 'cheap']
  },
  {
    id: 'best-mart-360',
    name: '優品 360',
    floor: 'G/F',
    category: 'shop',
    description: '位於地下的零食店，買水首選。',
    tags: ['shop', 'snacks', 'water', 'cheap']
  },
  {
    id: 'laundry',
    name: '洗衣舖 / 剪髮舖 / 芭蕾舞學校',
    floor: 'G/F',
    category: 'shop',
    description: '地下生活服務區域。',
    tags: ['service', 'laundry', 'hair']
  },
  {
    id: 'bus-stop',
    name: '巴士站',
    floor: 'G/F',
    category: 'transport',
    description: '位於地下洗衣舖外面的馬路。',
    tags: ['transport', 'bus', 'kmb', 'citybus']
  },

  // 1/F Shops & Facilities
  {
    id: 'parknshop',
    name: '百佳超級市場',
    floor: '1/F',
    category: 'shop',
    description: '1/F 主要超級市場。',
    tags: ['shop', 'supermarket', 'water']
  },
  {
    id: 'fairwood',
    name: '大快活',
    floor: '1/F',
    category: 'food',
    description: '1/F 連鎖快餐店。',
    tags: ['food', 'fast-food']
  },
  {
    id: 'hsbc-atm',
    name: '匯豐銀行 (HSBC) ATM',
    floor: '1/F',
    category: 'facility',
    description: '位於 1/F 的自動櫃員機。',
    tags: ['facility', 'atm', 'money', 'hsbc']
  },
  {
    id: 'hardware-store',
    name: '五金舖',
    floor: '1/F',
    category: 'shop',
    description: '維修、螺絲、工具店，位於 1/F。',
    tags: ['shop', 'hardware', 'tools']
  },
  {
    id: 'joss-stick-shop',
    name: '衣紙舖',
    floor: '1/F',
    category: 'shop',
    description: '香燭、傳統拜神用品，位於 1/F。',
    tags: ['shop', 'traditional', 'religious']
  },
  {
    id: 'optical-shop',
    name: '眼鏡舖',
    floor: '1/F',
    category: 'shop',
    description: '配眼鏡、驗眼服務，位於 1/F 大快活附近。',
    tags: ['shop', 'optical', 'glasses']
  },
  {
    id: 'beauty-center',
    name: '美容中心',
    floor: '1/F',
    category: 'shop',
    description: '美容服務，位於 1/F。',
    tags: ['shop', 'beauty']
  },
  {
    id: 'elderly-center',
    name: '關啟明紀念松鶴老人中心 (延展中心)',
    floor: '1/F',
    category: 'facility',
    description: '位於 1/F (108號舖)。從 2/F 落 1/F 扶手梯時在左手面。',
    tags: ['facility', 'elderly']
  },
  {
    id: 'tutoring-center',
    name: '補習社',
    floor: '1/F',
    category: 'shop',
    description: '位於 1/F 的教育中心。',
    tags: ['shop', 'education']
  },

  // 2/F Shops & Facilities
  {
    id: 'grand-hyatt-seafood',
    name: '君悅海鮮酒家 (茶樓)',
    floor: '2/F',
    category: 'food',
    description: '位於 2/F 的大型中式海鮮酒家，適合飲茶聚合。',
    tags: ['food', 'chinese', 'dim-sum', 'seafood']
  },
  {
    id: 'gym-24-7',
    name: '24/7 Fitness',
    floor: '2/F',
    category: 'shop',
    description: '24小時健身中心。',
    tags: ['shop', 'gym', 'fitness']
  },
  {
    id: 'western-doctor',
    name: '興東醫務所 (西醫)',
    floor: '2/F',
    category: 'medical',
    description: '位於 2/F 的西醫診所，適合感冒、睇醫生。',
    tags: ['medical', 'doctor', 'western']
  },
  {
    id: 'tcm-clinic',
    name: '中醫診所',
    floor: '2/F',
    category: 'medical',
    description: '位於 2/F 的中醫館。',
    tags: ['medical', 'tcm', 'chinese']
  }
];
