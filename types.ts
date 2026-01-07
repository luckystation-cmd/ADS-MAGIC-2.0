
export interface ServicePackage {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  icon: string;
  image: string;
  capabilities: string;
  systemPrompt: string;
  credits?: string; // จำนวนเครดิตสำหรับแพ็กเกจที่มี API รวม
  apiStatus: 'included' | 'self-key'; // สถานะ API
  recommended?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface VirtualPartner {
  id: string;
  name: string;
  nickname: string;
  visualDescription: string; 
  personality: string;
  image: string;
  price: string;
  themeColor: string;
}

export interface RentalPartner {
  id: string;
  name: string;
  nickname: string;
  role: 'Girlfriend style' | 'Boyfriend style' | 'Friendly Uncle' | 'Professional Stylist';
  description: string;
  visualDescription: string;
  image: string;
  rating: number;
  reviews: number;
  tags: string[];
  pricing: {
    service: string;
    price: string;
  }[];
}
