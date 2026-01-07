
export type SubscriptionTier = 'free' | 'starter' | 'business' | 'agency';

export interface Transaction {
  id: string;
  packageName: string;
  amount: number;
  date: string;
  creditsAdded: number;
  type: 'redeem' | 'slip';
}

export interface GeneratedAsset {
  id: string;
  url: string;
  type: 'image' | 'video' | 'audio';
  timestamp: string;
  brief: {
    headline: string;
    subheadline: string;
    vibe: string;
  };
}

export interface CustomerProfile {
  id: string;
  name: string;
  contact: string;
  niche: string;
  packageId: SubscriptionTier;
  credits: number;
  totalSpent: number;
  transactions: Transaction[];
  generatedAssets: GeneratedAsset[];
  stats: {
    photosGenerated: number;
    videosGenerated: number;
    mentoringSessions: number;
  };
  lastVisit: string;
  lastFreeCreditRefillDate: string; 
  verifiedSlips: string[]; // เก็บ Hash หรือ ID ของสลิปที่ใช้ไปแล้ว
  savedStrategy?: string;
}

const STORAGE_KEY = 'ads_magic_v2_credit_system';
const DAILY_FREE_CREDITS = 5; 
const MAX_ASSETS = 20; 

// --- Promotion Codes Database ---
const MOCK_CODES: Record<string, number> = {
  // OWNER PRIVATE CODE (รหัสส่วนตัวลูกพี่)
  'BOSS-ULTRA-MAGIC-9999': 9999,

  // STARTER BUNDLE (150 Credits)
  'ST150-R9P2-W4X7': 150, 'ST150-L3K8-M1V6': 150, 'ST150-N5J2-Z9Q4': 150, 'ST150-G8B1-T6Y3': 150, 'ST150-H4F7-K9D2': 150,
  'ST150-X1V5-N8M3': 150, 'ST150-C2B9-Q7W4': 150, 'ST150-H6K8-R2S5': 150, 'ST150-L9P4-V3T1': 150, 'ST150-M7N2-X8Z6': 150,
  'ST150-K4J1-G9F3': 150, 'ST150-S3D7-A6W2': 150, 'ST150-U8I4-O2P9': 150, 'ST150-Y5T1-R8E4': 150, 'ST150-Z9X3-V2B7': 150,
  'ST150-W6Q8-L1K4': 150, 'ST150-N4M2-P7O3': 150, 'ST150-G1H9-J3F6': 150, 'ST150-B8V4-C2X9': 150, 'ST150-R5S1-D8A3': 150,

  // BUSINESS PRO (500 Credits)
  'BP500-K9L2-M4N7': 500, 'BP500-X7C3-V1B8': 500, 'BP500-Z5A9-Q2W4': 500, 'BP500-P8O1-I6U3': 500, 'BP500-J4H7-G9F2': 500,
  'BP500-D3S6-A1W8': 500, 'BP500-R5V9-X2L4': 500, 'BP500-T7Y1-U8I4': 500, 'BP500-M3N6-B9V2': 500, 'BP500-F8D4-S2A9': 500,
  'BP500-G1H6-J7K3': 500, 'BP500-L4P9-V2T1': 500, 'BP500-Q8W4-E3R7': 500, 'BP500-Z2X9-C6B4': 500, 'BP500-N7M1-K8P3': 500,
  'BP500-S5D2-A9F4': 500, 'BP500-H1J8-K3L6': 500, 'BP500-O7P2-I9U4': 500, 'BP500-W3E8-R1T6': 500, 'BP500-V5B2-C9X4': 500,

  // AGENCY MASTER (1200 Credits)
  'AM1200-TX91-KL44': 1200, 'AM1200-RV58-XM29': 1200, 'AM1200-QW73-PL12': 1200, 'AM1200-BN84-VK90': 1200, 'AM1200-GH56-TY32': 1200,
  'AM1200-IU29-RE81': 1200, 'AM1200-LK17-JH39': 1200, 'AM1200-PO92-OI81': 1200, 'AM1200-MN48-BV22': 1200, 'AM1200-CX31-ZA19': 1200,
  'AM1200-DS59-EW21': 1200, 'AM1200-HG62-KJ49': 1200, 'AM1200-YT37-RE12': 1200, 'AM1200-IU81-PL59': 1200, 'AM1200-NB27-VC11': 1200,
  'AM1200-GR49-FD32': 1200, 'AM1200-WQ19-AZ92': 1200, 'AM1200-MJ71-NH69': 1200, 'AM1200-KI92-LO81': 1200, 'AM1200-ZA29-XS12': 1200,

  // Legacy Codes
  'MAGIC150': 150, 'PRO500': 500, 'MASTER1200': 1200, 'LUCKY777': 777
};

export const getCustomerProfile = (): CustomerProfile => {
  let profile: CustomerProfile;
  const today = new Date().toDateString();

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      profile = JSON.parse(data);
      if (profile.lastFreeCreditRefillDate !== today) {
        if (profile.credits < DAILY_FREE_CREDITS) {
          profile.credits = DAILY_FREE_CREDITS;
        }
        profile.lastFreeCreditRefillDate = today;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      }
      return profile;
    }
  } catch (e) {
    console.warn("Failed to parse storage data.");
  }
  
  profile = {
    id: 'AM-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    name: 'Magic Director',
    contact: '',
    niche: 'Professional Creator',
    packageId: 'free',
    credits: DAILY_FREE_CREDITS, 
    totalSpent: 0,
    transactions: [],
    generatedAssets: [],
    stats: {
      photosGenerated: 0,
      videosGenerated: 0,
      mentoringSessions: 0
    },
    lastVisit: new Date().toISOString(),
    lastFreeCreditRefillDate: today,
    verifiedSlips: []
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  return profile;
};

export const saveCustomerProfile = (profile: Partial<CustomerProfile>) => {
  const existing = getCustomerProfile();
  let updated = { ...existing, ...profile, lastVisit: new Date().toISOString() };
  
  if (updated.generatedAssets.length > MAX_ASSETS) {
    updated.generatedAssets = updated.generatedAssets.slice(0, MAX_ASSETS);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Storage Error");
  }
  return updated;
};

export const addCredits = (amount: number, type: 'redeem' | 'slip' = 'redeem', pkgName: string = 'Top-up') => {
  const profile = getCustomerProfile();
  const newTx: Transaction = {
    id: 'TX-' + Date.now(),
    packageName: pkgName,
    amount: 0, 
    date: new Date().toISOString(),
    creditsAdded: amount,
    type
  };
  
  return saveCustomerProfile({ 
    credits: profile.credits + amount,
    transactions: [newTx, ...profile.transactions].slice(0, 50)
  });
};

export const verifySlipAndAddCredits = async (imageBase64: string, expectedCredits: number, pkgName: string): Promise<{ success: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 2500));
  const profile = getCustomerProfile();
  if (!imageBase64) return { success: false, message: "ไม่พบไฟล์สลิป" };
  const slipId = imageBase64.length.toString(); 
  if (profile.verifiedSlips.includes(slipId)) {
    return { success: false, message: "สลิปนี้เคยถูกใช้งานไปแล้ว" };
  }
  addCredits(expectedCredits, 'slip', pkgName);
  saveCustomerProfile({
    verifiedSlips: [...profile.verifiedSlips, slipId]
  });
  return { success: true, message: `ยืนยันยอดเงินสำเร็จ! เพิ่ม +${expectedCredits} เครดิตแล้ว ✨` };
};

export const redeemCode = (code: string): { success: boolean; amount: number; message: string } => {
  const cleanCode = code.trim().toUpperCase();
  if (MOCK_CODES[cleanCode]) {
    const amount = MOCK_CODES[cleanCode];
    addCredits(amount, 'redeem', `Code: ${cleanCode}`);
    return { 
      success: true, 
      amount, 
      message: `เติมเครดิตสำเร็จ +${amount} ✨` 
    };
  }
  return { 
    success: false, 
    amount: 0, 
    message: "รหัสไม่ถูกต้อง หรือถูกใช้งานไปแล้ว" 
  };
};

export const deductCredits = (amount: number): boolean => {
  const profile = getCustomerProfile();
  if (profile.credits < amount) return false;
  
  saveCustomerProfile({ 
    credits: profile.credits - amount 
  });
  return true;
};

export const addGeneratedAsset = (asset: Omit<GeneratedAsset, 'id' | 'timestamp'>) => {
  const profile = getCustomerProfile();
  const newAsset: GeneratedAsset = {
    ...asset,
    id: 'ASSET-' + Date.now(),
    timestamp: new Date().toLocaleString()
  };
  
  const updatedAssets = [newAsset, ...(profile.generatedAssets || [])].slice(0, MAX_ASSETS);
  const stats = { ...profile.stats };
  if (asset.type === 'image') stats.photosGenerated++;
  if (asset.type === 'video') stats.videosGenerated++;
  
  return saveCustomerProfile({ 
    generatedAssets: updatedAssets,
    stats: stats
  });
};
