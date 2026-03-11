
import { CropPrice, ChartData, RegionalPrice, Category, Region } from './types';

export const CROPS: CropPrice[] = [
  {
    id: '1',
    name: 'ပဲစင်းငုံ (နီ)',
    price: '၄၁၀,၀၀၀',
    unit: '၁ တန်',
    change: '+၁၀,၀၀၀',
    trend: 'up',
    color: 'emerald',
    categoryId: 'pulses'
  },
  {
    id: '2',
    name: 'မတ်ပဲ',
    price: '၃၂၅,၀၀၀',
    unit: '၁ တန်',
    change: '+၅,၀၀၀',
    trend: 'up',
    color: 'emerald',
    categoryId: 'pulses'
  },
  {
    id: '3',
    name: 'နှမ်းဖြူ',
    price: '၂၈၀,၀၀၀',
    unit: '၁ အိတ်',
    change: '-၂,၀၀၀',
    trend: 'down',
    color: 'red',
    categoryId: 'oilseeds'
  },
  {
    id: '4',
    name: 'ကြက်သွန်ဖြူ',
    price: '၆,၅၀၀',
    unit: '၁ ပိဿာ',
    change: '၀',
    trend: 'stable',
    color: 'slate',
    categoryId: 'vegetables'
  }
];

export const ALL_CROPS: CropPrice[] = [
  ...CROPS,
  { id: '5', name: 'ကြက်သွန်ဖြူ (တောင်ကြီး)', price: '၈,၅၀၀', unit: '၁ ပိဿာ', change: '+၂၀၀', trend: 'up', color: 'slate', categoryId: 'vegetables' },
  { id: '6', name: 'စပါး (ဧရာဝတီ)', price: '၃,၅၀၀,၀၀၀', unit: '၁၀၀ တင်း', change: '+၅၀,၀၀၀', trend: 'up', color: 'emerald', categoryId: 'cereals' },
  { id: '7', name: 'နှမ်းနက် (စမုန်)', price: '၁၂,၀၀၀', unit: '၁ ပိဿာ', change: '၀', trend: 'stable', color: 'slate', categoryId: 'oilseeds' },
  { id: '8', name: 'အာလူး (ရှမ်း)', price: '၂,၈၀၀', unit: '၁ ပိဿာ', change: '-၁၀၀', trend: 'down', color: 'amber', categoryId: 'vegetables' },
];

export const CATEGORIES: Category[] = [
  { id: 'pulses', name: 'ပဲမျိုးစုံ', iconName: 'Bean' },
  { id: 'oilseeds', name: 'ဆီထွက်သီးနှံ', iconName: 'Droplet' },
  { id: 'cereals', name: 'နှံစားသီးနှံ', iconName: 'Wheat' },
  { id: 'vegetables', name: 'ဟင်းသီးဟင်းရွက်', iconName: 'Carrot' },
];

export const REGIONS: Region[] = [
  { id: 'shan', name: 'ရှမ်းပြည်နယ်' },
  { id: 'sagaing', name: 'စစ်ကိုင်းတိုင်း' },
  { id: 'magway', name: 'မကွေးတိုင်း' },
  { id: 'ayeyarwady', name: 'ဧရာဝတီတိုင်း' },
];

export const MOCK_CHART_DATA: ChartData[] = [
  { day: 'တနင်္လာ', price: 310000 },
  { day: 'အင်္ဂါ', price: 315000 },
  { day: 'ဗုဒ္ဓဟူး', price: 320000 },
  { day: 'ကြာသပတေး', price: 318000 },
  { day: 'သောကြာ', price: 322000 },
  { day: 'စနေ', price: 324000 },
  { day: 'တနင်္ဂနွေ', price: 325000 },
];

export const REGIONAL_PRICES: RegionalPrice[] = [
  { 
    city: "တောင်ကြီး", 
    price: "၄၂၀,၀၀၀", 
    trend: "up", 
    crop: "ပြောင်း",
    status: "လမ်းကြောင်းကောင်း",
    isHighest: false
  },
  { 
    city: "မန္တလေး", 
    price: "၄၅၀,၀၀၀", 
    trend: "up", 
    crop: "မတ်ပဲ",
    status: "ဝယ်လိုအားသွက်",
    isHighest: false
  },
  { 
    city: "တောင်ကြီး", 
    price: "၁,၈၀၀", 
    trend: "stable", 
    crop: "အာလူး (ပိဿာ)",
    status: "ကုန်အဝင်နည်း",
    isHighest: false
  },
  { 
    city: "ဘုရင့်နောင်", 
    price: "၄၅၅,၀၀၀", 
    trend: "up", 
    crop: "မတ်ပဲ",
    status: "ပို့ကုန်သွက်",
    isHighest: true 
  }
];
