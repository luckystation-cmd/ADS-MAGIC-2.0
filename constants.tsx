
import { ServicePackage, RentalPartner, VirtualPartner } from './types';

// อัตราค่าธรรมเนียมเครดิตต่อการประมวลผล (Service Fee)
export const CREDIT_COSTS = {
  STRATEGY: 0,       
  MAGIC_SCAN: 2,     
  RENDER_1K: 1,      
  RENDER_2K: 3,      
  RENDER_4K: 5,      
  AI_EDIT: 2,        
  VIDEO_MOTION: 10   
};

export const NAV_LINKS = [
  { name: { th: 'ขุมพลังโปรแกรม', en: 'CAPABILITIES' }, href: '#about' },
  { name: { th: 'เติมเครดิต', en: 'TOP-UP' }, href: '#packages' },
  { name: { th: 'ลองใช้สตูดิโอ', en: 'STUDIO' }, href: '#ai-stylist' }
];

export const TOP_SALES_SETS = [
  { 
    id: 'luxe_product', 
    vibe: 'Minimal Luxury', 
    label: { th: 'สินค้าหรูหรา', en: 'LUXURY PRODUCT' }, 
    icon: '💎' 
  },
  { 
    id: 'beauty_skin', 
    vibe: 'Vogue High-End', 
    label: { th: 'บิวตี้ & สกินแคร์', en: 'BEAUTY & SKIN' }, 
    icon: '✨' 
  },
  { 
    id: 'food_gourmet', 
    vibe: 'Nature Organic', 
    label: { th: 'อาหาร & คาเฟ่', en: 'FOOD & CAFE' }, 
    icon: '☕' 
  },
  { 
    id: 'fashion_street', 
    vibe: 'Street Viral', 
    label: { th: 'แฟชั่นสตรีท', en: 'STREET FASHION' }, 
    icon: '🛹' 
  },
  { 
    id: 'tech_gadget', 
    vibe: 'Cyber Future', 
    label: { th: 'เทคโนโลยี', en: 'TECH & GADGET' }, 
    icon: '🧬' 
  }
];

export const PACKAGES: ServicePackage[] = [
  {
    id: 'starter',
    title: 'Starter Bundle',
    description: 'ลดราคาพิเศษ! เหมาะสำหรับการเริ่มต้นทำแบรนด์',
    price: '199.-',
    duration: '150 Credits',
    credits: '150',
    apiStatus: 'self-key',
    recommended: false,
    features: [
      'เครดิตไม่มีวันหมดอายุ',
      'ใช้ API Key ของคุณเอง (Self-Key)',
      'เฉลี่ยเพียง 1.3 บาท/รูป',
      'เข้าถึง Art Direction พื้นฐาน'
    ],
    icon: '🌱',
    image: '',
    capabilities: '',
    systemPrompt: ''
  },
  {
    id: 'business',
    title: 'Business Pro',
    description: 'แพ็กเกจสุดคุ้มยอดนิยม สำหรับพ่อค้าแม่ค้าออนไลน์',
    price: '450.-',
    duration: '500 Credits',
    credits: '500',
    apiStatus: 'self-key',
    recommended: true,
    features: [
      'ใช้ API Key ของคุณเอง (Self-Key)',
      'เฉลี่ยเพียง 0.9 บาท/รูป',
      'แถมฟรี! คู่มือการเขียน Vision Prompt',
      'ปลดล็อกความละเอียด 4K Master'
    ],
    icon: '🔥',
    image: '',
    capabilities: '',
    systemPrompt: ''
  },
  {
    id: 'agency',
    title: 'Agency Master',
    description: 'คุ้มค่าที่สุดสำหรับองค์กรหรือเอเจนซี่สื่อโฆษณา',
    price: '790.-',
    duration: '1200 Credits',
    credits: '1200',
    apiStatus: 'self-key',
    recommended: false,
    features: [
      'ใช้ API Key ของคุณเอง (Self-Key)',
      'เฉลี่ยเพียง 0.6 บาท/รูป',
      'ใช้ระบบ Magic Scan ได้ไม่จำกัด',
      'ฟีเจอร์ฝังโลโก้สินค้าอัตโนมัติ'
    ],
    icon: '💎',
    image: '',
    capabilities: '',
    systemPrompt: ''
  }
];

export const ART_DIRECTIONS = [
  { id: 'Festive Gifting', label: { th: 'ของขวัญ & โปรโมชั่น', en: 'FESTIVE PROMO' }, icon: '🎁', isPremium: true },
  { id: 'Silk Luxury', label: { th: 'หรูหราดุจแพรไหม', en: 'SILK LUXURY' }, icon: '🧣', isPremium: true },
  { id: 'Retail Promo', label: { th: 'โปรโมชั่นค้าปลีก', en: 'RETAIL PROMO' }, icon: '🛍️', isPremium: false },
  { id: 'Heritage Thai', label: { th: 'ไทยเฮอริเทจ', en: 'THAI HERITAGE' }, icon: '🪷', isPremium: true },
  { id: 'Art Toy Studio', label: { th: 'อาร์ตทอยสตูดิโอ', en: 'ART TOY STUDIO' }, icon: '🧸', isPremium: false },
  { id: 'Luxe Dark Auto', label: { th: 'หรู ดาร์ก เท่ (รถยนต์)', en: 'LUXE DARK AUTO' }, icon: '🏎️', isPremium: true },
  { id: 'Cinematic Movie', label: { th: 'ภาพยนตร์', en: 'CINEMATIC' }, icon: '🎬', isPremium: false },
  { id: 'Editorial Fashion', label: { th: 'แฟชั่นนิตยสาร', en: 'EDITORIAL' }, icon: '📸', isPremium: true },
  { id: 'Street Viral', label: { th: 'สตรีทไวรัล', en: 'STREET VIRAL' }, icon: '🛹', isPremium: false },
  { id: '3D Render', label: { th: 'เรนเดอร์ 3 มิติ', en: '3D RENDER' }, icon: '🧊', isPremium: true },
  { id: 'Pop Art', label: { th: 'ป๊อปอาร์ต', en: 'POP ART' }, icon: '🍬', isPremium: false },
  { id: 'Noir Dramatic', label: { th: 'แสงเงาลึกลับ ทรงพลัง', en: 'NOIR DRAMATIC' }, icon: '🎞️', isPremium: true },
  { id: 'Old Money Classic', label: { th: 'ผู้ดีเก่า คลาสสิก', en: 'OLD MONEY CLASSIC' }, icon: '🏰', isPremium: true },
  { id: 'Cyberpunk Tech', label: { th: 'ไซเบอร์พังค์', en: 'CYBER TECH' }, icon: '🧬', isPremium: true },
  { id: 'Tropical', label: { th: 'ทรอปิคอล', en: 'TROPICAL' }, icon: '🏝️', isPremium: false },
  { id: 'Minimal Soft', label: { th: 'มินิมอลซอฟต์', en: 'MINIMAL SOFT' }, icon: '🤍', isPremium: false },
  { id: 'Vogue Luxe', label: { th: 'โว้กไฮเอนด์', en: 'VOGUE LUXE' }, icon: '💎', isPremium: true },
  { id: 'Zen Architecture', label: { th: 'สถาปัตย์เซน', en: 'ZEN ARCHITECTURE' }, icon: '🏛️', isPremium: true },
  { id: 'Golden Craft', label: { th: 'หัตถศิลป์ทองคำ', en: 'GOLDEN CRAFT' }, icon: '🔱', isPremium: true },
  { id: '3D Hyper-real', label: { th: '3D ไฮเปอร์เรียล', en: '3D HYPER-REAL' }, icon: '💧', isPremium: true },
  { id: 'World-Class Minimal', label: { th: 'มินิมอลระดับโลก', en: 'WORLD MINIMAL' }, icon: '🍎', isPremium: true },
  { id: 'Neon Tokyo', label: { th: 'นีออนโตเกียว', en: 'NEON TOKYO' }, icon: '🏮', isPremium: true },
  { id: 'High Speed Splash', label: { th: 'สแปลชความเร็วสูง', en: 'SPLASH SPEED' }, icon: '🌊', isPremium: true },
  { id: 'Surreal Floating', label: { th: 'สินค้าลอยตัวเหนือจริง', en: 'SURREAL FLOAT' }, icon: '☁️', isPremium: true }
];

export const BRAND_VIBES = [
  { id: 'Mutelu Premier', label: { th: 'มูเตลูพรีเมียม', en: 'MUTELU PREMIER' }, icon: '🔮', isPremium: true },
  { id: 'Cyber Future', label: { th: 'อนาคตสุดล้ำ', en: 'CYBER FUTURE' }, icon: '🤖', isPremium: true },
  { id: 'Travel Luxury', label: { th: 'ท่องเที่ยวหรู', en: 'TRAVEL LUXURY' }, icon: '✈️', isPremium: true },
  { id: 'Minimal Luxury', label: { th: 'มินิมอลหรู', en: 'MINIMAL LUXURY' }, icon: '🤍', isPremium: false },
  { id: 'Exclusive VIP', label: { th: 'เอ็กซ์คลูซีฟ', en: 'EXCLUSIVE VIP' }, icon: '🥂', isPremium: true },
  { id: 'Thai Heritage', label: { th: 'มรดกไทย', en: 'THAI HERITAGE' }, icon: '🪷', isPremium: true },
  { id: 'Urban Street', label: { th: 'สตรีทเมือง', en: 'URBAN STREET' }, icon: '🏙️', isPremium: false },
  { id: 'Nature Organic', label: { th: 'ธรรมชาติ', en: 'NATURE ORGANIC' }, icon: '🌿', isPremium: false },
  { id: 'Vibrant Luxe', label: { th: 'สีสันพรีเมียม', en: 'VIBRANT LUXE' }, icon: '🎨', isPremium: false },
  { id: 'Ageless Power', label: { th: 'อำนาจไร้กาล', en: 'AGELESS POWER' }, icon: '🎩', isPremium: true },
  { id: 'Noir Mystery', label: { th: 'ปริศนาแสงเงา (Noir)', en: 'NOIR MYSTERY' }, icon: '🕵️', isPremium: true },
  { id: 'Retro Futuro', label: { th: 'เรโทรฟิวเจอร์', en: 'RETRO FUTURO' }, icon: '📺', isPremium: false },
  { id: 'Zen Harmony', label: { th: 'เซนสมดุล', en: 'ZEN HARMONY' }, icon: '🧘', isPremium: true },
  { id: 'Street Grunge', label: { th: 'สตรีทกรันจ์', en: 'STREET GRUNGE' }, icon: '🎸', isPremium: false },
  { id: 'Royal Classic', label: { th: 'คลาสสิกราชวงศ์', en: 'ROYAL CLASSIC' }, icon: '👑', isPremium: true },
  { id: 'Quiet Luxury', label: { th: 'หรูหรา สง่างาม (Quiet Luxury)', en: 'QUIET LUXURY' }, icon: '🔇', isPremium: true },
  { id: 'Spiritual Premier', label: { th: 'บารมีพรีเมียม', en: 'SPIRITUAL PREMIER' }, icon: '🕉️', isPremium: true },
  { id: 'Gen-Z Playful', label: { th: 'วัยรุ่นตัวตึง', en: 'GEN-Z PLAYFUL' }, icon: '🤪', isPremium: false },
  { id: 'Mystic Forest', label: { th: 'มนตราพงไพร', en: 'MYSTIC FOREST' }, icon: '🌲', isPremium: true },
  { id: 'High Speed', label: { th: 'พลังงานความเร็ว', en: 'HIGH SPEED' }, icon: '⚡', isPremium: true },
  { id: 'Ethereal Dream', label: { th: 'ฝันอันนุ่มนวล', en: 'ETHEREAL DREAM' }, icon: '🌌', isPremium: true }
];

export const INCLUSIVE_GROUPS = [
  { name: 'Professionals', label: 'Professionals', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800' },
  { name: 'Creators', label: 'Creators', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800' },
  { name: 'Leaders', label: 'Leaders', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800' }
];

export const VIRTUAL_PARTNERS = [];
export const RENTAL_PARTNERS = [];
