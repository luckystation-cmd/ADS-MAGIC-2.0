// World-Class AI Agency Studio - Mobile Responsive Master Edition
import React, { useState, useRef, useEffect } from 'react';
import { 
  getCreativeBrief,
  generateAdAsset,
  CreativeBrief,
  analyzeProductImage,
  MagicScanResult,
  generateCinematicVideo,
  editImageAsset,
  GroomingOptions
} from '../services/geminiService';
import { addGeneratedAsset, CustomerProfile, getCustomerProfile, deductCredits, redeemCode } from '../services/crmService';
import { ART_DIRECTIONS, BRAND_VIBES, CREDIT_COSTS, TOP_SALES_SETS, PACKAGES } from '../constants';
import { sounds } from '../services/soundService';
import { ServicePackage } from '../types';

interface AIStudioProps {
  initialTab: string;
  packageId?: string | null;
  profile?: CustomerProfile | null;
  lang: 'th' | 'en';
  onLangToggle: () => void;
  onExitStudio?: () => void;
}

const CLOTHING_PRESETS = [
  { id: 'suit', label: { th: 'สูทนักธุรกิจหรู', en: 'Business Suit' }, icon: '👔', prompt: 'Full high-end charcoal business suit set: bespoke jacket, matching trousers, crisp white shirt, and polished black oxfords' },
  { id: 'thai_royal', label: { th: 'ชุดไทยพระราชนิยม', en: 'Thai Royal' }, icon: '🪷', prompt: 'Majestic modern Thai royal silk outfit: golden embroidery top, matching silk chong-kraben/pants, and premium Thai leather shoes' },
  { id: 'street_oversize', label: { th: 'สตรีทแฟชั่น', en: 'Street Style' }, icon: '🛹', prompt: 'Complete high-end designer streetwear: luxury oversized hoodie, matching techwear baggy pants, and hype sneakers' },
  { id: 'silk_dress', label: { th: 'ราตรีผ้าไหม', en: 'Silk Gown' }, icon: '👗', prompt: 'Ethereal flowing Thai silk evening gown with full matching couture embroidery and luxury heels' },
  { id: 'sport_pro', label: { th: 'ชุดกีฬามืออาชีพ', en: 'Sport Pro' }, icon: '👟', prompt: 'Full matching pro athlete kit: high-performance jersey, matching athletic training joggers, and technical running shoes' },
  { id: 'smart_casual', label: { th: 'สมาร์ทแคชชวล', en: 'Smart Casual' }, icon: '🧥', prompt: 'Bespoke smart casual set: cashmere sweater, tailored slim-fit chinos, and premium leather loafers' }
];

const GROOMING_PRESETS = [
  { id: 'shave', label: { th: 'โกนหนวดสะอาด', en: 'Clean Shave' }, icon: '🪒', type: 'beard', value: 'removed' },
  { id: 'trim', label: { th: 'แต่งหนวดเนี้ยบ', en: 'Groomed Beard' }, icon: '✂️', type: 'beard', value: 'groomed' },
  { id: 'smooth', label: { th: 'ผิวเนียนกระจก', en: 'Porcelain Skin' }, icon: '✨', type: 'retouch', value: 'smooth' },
  { id: 'makeup', label: { th: 'แต่งหน้าสตูดิโอ', en: 'Luxury Makeup' }, icon: '💄', type: 'retouch', value: 'luxury_makeup' }
];

const RATIO_PRESETS = [
  { id: '1:1', label: '1:1', icon: '⏹️', class: 'aspect-square' },
  { id: '3:4', label: '3:4', icon: '📱', class: 'aspect-[3/4]' },
  { id: '4:3', label: '4:3', icon: '📺', class: 'aspect-[4/3]' },
  { id: '9:16', label: '9:16', icon: '🎬', class: 'aspect-[9/16]' },
  { id: '16:9', label: '16:9', icon: '📽️', class: 'aspect-video' }
];

const RESOLUTION_PRESETS = [
  { id: '1K', label: '1K', cost: CREDIT_COSTS.RENDER_1K },
  { id: '2K', label: '2K', cost: CREDIT_COSTS.RENDER_2K },
  { id: '4K', label: '4K', cost: CREDIT_COSTS.RENDER_4K }
];

const SectionHeader: React.FC<{ title: string, color: string }> = ({ title, color }) => (
  <div className="relative mb-3 flex items-center gap-2">
    <div className={`w-1 h-4 rounded-full ${color}`}></div>
    <h4 className="text-[11px] md:text-xl font-black text-white uppercase tracking-tighter italic">
      {title.split(' ')[0]} <span className="magic-gradient-text">{title.split(' ').slice(1).join(' ')}</span>
    </h4>
  </div>
);

const getAspectClass = (ratio: string) => {
  switch (ratio) {
    case '1:1': return 'aspect-square';
    case '3:4': return 'aspect-[3/4]';
    case '4:3': return 'aspect-[4/3]';
    case '9:16': return 'aspect-[9/16]';
    case '16:9': return 'aspect-video';
    default: return 'aspect-square';
  }
};

const getQRCodeImage = (packageId: string) => {
  switch(packageId) {
    case 'starter': return "https://img2.pic.in.th/S__23519236_199_ok.png";
    case 'business': return "https://img5.pic.in.th/file/secure-sv1/S__23519237_450_ok.png";
    case 'agency': return "https://img2.pic.in.th/S__23519238_790_ok.png";
    default: return "";
  }
};

const PRESET_INTELLIGENCE: Record<string, { vibe: string, ratio: string, target?: 'human' | 'product' }> = {
  'Retail Promo': { vibe: 'Exclusive VIP', ratio: '1:1' },
  'Heritage Thai': { vibe: 'Thai Heritage', ratio: '4:3' },
  'Art Toy Studio': { vibe: 'Gen-Z Playful', ratio: '1:1' },
  'Luxe Dark Auto': { vibe: 'Noir Mystery', ratio: '16:9', target: 'product' },
  'Cinematic Movie': { vibe: 'Ethereal Dream', ratio: '16:9' },
  'Editorial Fashion': { vibe: 'Quiet Luxury', ratio: '3:4', target: 'human' },
  'Street Viral': { vibe: 'Urban Street', ratio: '9:16' },
  '3D Render': { vibe: 'Vibrant Luxe', ratio: '1:1' },
  'Noir Dramatic': { vibe: 'Noir Mystery', ratio: '16:9' },
  'Old Money Classic': { vibe: 'Royal Classic', ratio: '3:4' },
  'Cyberpunk Tech': { vibe: 'Cyber Future', ratio: '9:16' },
  'Minimal Soft': { vibe: 'Minimal Luxury', ratio: '1:1' },
  'Vogue Luxe': { vibe: 'Exclusive VIP', ratio: '3:4', target: 'human' },
  'Zen Architecture': { vibe: 'Zen Harmony', ratio: '16:9' },
  'Golden Craft': { vibe: 'Thai Heritage', ratio: '1:1' },
  '3D Hyper-real': { vibe: 'Vibrant Luxe', ratio: '1:1' },
  'World-Class Minimal': { vibe: 'Quiet Luxury', ratio: '1:1' },
  'Neon Tokyo': { vibe: 'Cyber Future', ratio: '9:16' },
  'High Speed Splash': { vibe: 'High Speed', ratio: '1:1' },
  'Surreal Floating': { vibe: 'Ethereal Dream', ratio: '3:4' },
  'Silk Luxury': { vibe: 'Quiet Luxury', ratio: '1:1' },
  'Festive Gifting': { vibe: 'Vibrant Luxe', ratio: '3:4' }
};

const AIStudio: React.FC<AIStudioProps> = ({ lang, onLangToggle, onExitStudio }) => {
  const [phase, setPhase] = useState<'ideation' | 'review' | 'final' | 'assets'>('ideation');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMsg, setProcessingMsg] = useState('');
  const [fakeProgress, setFakeProgress] = useState(0);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [showKeyDialog, setShowKeyDialog] = useState(false);
  const [showMobileSettings, setShowMobileSettings] = useState(false);
  const [selectedPkgForPay, setSelectedPkgForPay] = useState<ServicePackage | null>(null);
  
  const [apiReady, setApiReady] = useState(true); 
  const [credits, setCredits] = useState(0);
  const [promoInput, setPromoInput] = useState('');
  const [redeemMsg, setRedeemMsg] = useState<{s: boolean, m: string} | null>(null);
  const [pendingScan, setPendingScan] = useState(false);
  
  // UI State
  const [productionTarget, setProductionTarget] = useState<'human' | 'product'>('product');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K'); 
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [showText, setShowText] = useState(true);
  const [designPalette, setDesignPalette] = useState('GOLD');
  const [selectedClothing, setSelectedClothing] = useState<string | null>(null);
  const [groomingOptions, setGroomingOptions] = useState<GroomingOptions>({ beard: 'original', faceRetouch: 'natural' });

  // Creative Content State (SET TO THAI AS DEFAULT)
  const [lifestyleCmd, setLifestyleCmd] = useState(lang === 'th' ? 'สร้างภาพโฆษณาคนไทยระดับไฮเอนด์ บรรยากาศหรูหรา พร้อมข้อความภาษาไทยที่ทรงพลัง' : 'High-end Thai advertising portrait, luxury atmosphere, with powerful Thai script typography');
  const [vibe, setVibe] = useState('Minimal Luxury');
  const [artDir, setArtDir] = useState('Editorial Fashion');
  const [editableBrief, setEditableBrief] = useState<CreativeBrief | null>(null);
  const [finalAsset, setFinalAsset] = useState<string | null>(null);
  const [videoAsset, setVideoAsset] = useState<string | null>(null);
  const [inventoryAssets, setInventoryAssets] = useState<any[]>([]);
  const [aiEditPrompt, setAiEditPrompt] = useState('');

  const [subjData, setSubjData] = useState<string | null>(null);
  const [refData, setRefData] = useState<string | null>(null);
  const [logoData, setLogoData] = useState<string | null>(null);

  const subjRef = useRef<HTMLInputElement>(null);
  const refRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);

  const syncProfile = () => {
    const profile = getCustomerProfile();
    setCredits(profile.credits);
    setInventoryAssets(profile.generatedAssets || []);
  };

  useEffect(() => { syncProfile(); }, [phase, isProcessing, showCreditModal]);

  useEffect(() => {
    if (pendingScan && subjData) {
      setPendingScan(false);
      handleMagicScan(subjData);
    }
  }, [subjData, pendingScan]);

  useEffect(() => {
    if (isProcessing) {
      sounds.startProcessingLoop();
      setFakeProgress(0);
      const timer = setInterval(() => {
        setFakeProgress(prev => {
          if (prev >= 98) return 98;
          return prev + (Math.random() > 0.8 ? 8 : 2);
        });
      }, 400);
      return () => clearInterval(timer);
    } else {
      sounds.stopProcessingLoop();
      setFakeProgress(100);
    }
  }, [isProcessing]);

  useEffect(() => {
    const checkApi = async () => {
      // @ts-ignore
      if (window.aistudio) {
        // @ts-ignore
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setApiReady(hasKey);
      } else {
        const isEnvKeyValid = !!process.env.API_KEY && process.env.API_KEY !== 'undefined';
        setApiReady(isEnvKeyValid);
      }
    };
    checkApi();
    const interval = setInterval(checkApi, 10000); 
    return () => clearInterval(interval);
  }, []);

  const handleBtnClick = () => sounds.playClick();

  const handleExitStudio = () => {
    handleBtnClick();
    if (onExitStudio) onExitStudio();
  };

  const getSanitizedFileName = () => {
    const title = editableBrief?.headline || 'ADS_MAGIC';
    const cleanTitle = title.replace(/[^\w\u0E00-\u0E7F]/g, '_').slice(0, 20);
    const shortTime = Date.now().toString().slice(-6);
    const ext = videoAsset ? 'mp4' : 'png';
    return `ADS_MAGIC_${cleanTitle}_${shortTime}.${ext}`;
  };

  const getTypoClass = () => {
    switch (designPalette) {
      case 'GOLD': return 'text-commercial-gold';
      case 'WHITE': return 'text-commercial-white';
      case 'SILVER': return 'text-commercial-silver';
      case 'ROSE': return 'text-commercial-rose';
      default: return 'text-commercial-gold';
    }
  };

  const handleConnectApi = async () => {
    // @ts-ignore
    if (window.aistudio) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      setApiReady(true);
      setShowKeyDialog(false);
    } else {
      if (!!process.env.API_KEY) {
        setApiReady(true);
      } else {
        alert(lang === 'th' ? "โปรดเพิ่ม API_KEY ในหน้าตั้งค่า Environment Variables" : "Please set API_KEY in Environment Variables.");
      }
    }
  };

  const handleBuyCredits = () => {
    handleBtnClick();
    setShowCreditModal(true);
    setRedeemMsg(null);
  };

  const handleRedeemInStudio = () => {
    sounds.playClick();
    const result = redeemCode(promoInput);
    setRedeemMsg({ s: result.success, m: result.message });
    if (result.success) {
      sounds.playSuccess();
      setPromoInput('');
      syncProfile();
      setTimeout(() => setRedeemMsg(null), 4000);
    }
  };

  const checkCreditLimit = (required: number) => {
    const currentCredits = getCustomerProfile().credits;
    if (currentCredits < required) {
      handleBuyCredits();
      return false;
    }
    return true;
  };

  const handleErrorResetKey = async (e: any) => {
    const errorMsg = (e?.message || "").toUpperCase();
    if (
      errorMsg.includes("PRO_ENGINE_REQUIRED") || 
      errorMsg.includes("RESELECT_KEY") || 
      errorMsg.includes("403") || 
      errorMsg.includes("PERMISSION_DENIED") ||
      errorMsg.includes("NOT FOUND")
    ) {
      // @ts-ignore
      if (window.aistudio) {
        setShowKeyDialog(true);
        return true;
      }
    }
    return false;
  };

  const applyVibePreset = (v: any) => {
    setVibe(v.id);
    handleBtnClick();
    sounds.playMagic();
    setLifestyleCmd(lang === 'th' ? `จัดวางแคมเปญในสไตล์ ${v.label.th} ให้ดูแพงและมีระดับ พร้อมข้อความไทยที่โดนใจ` : `Create ${v.label.en} campaign with premium Thai script...`);
    if (window.innerWidth < 1024) setShowMobileSettings(false);
  };

  const applyArtDirPreset = (a: any) => {
    setArtDir(a.id);
    handleBtnClick();
    sounds.playMagic();
    
    const intelligence = PRESET_INTELLIGENCE[a.id];
    if (intelligence) {
      setVibe(intelligence.vibe);
      setAspectRatio(intelligence.ratio);
      if (intelligence.target) setProductionTarget(intelligence.target);
    }

    setLifestyleCmd(lang === 'th' ? `ทิศทางศิลปะแบบ ${a.label.th} สำหรับกลุ่มเป้าหมายพรีเมียมในไทย` : `Elite Thai campaign in ${a.label.en} direction...`);
    if (window.innerWidth < 1024) setShowMobileSettings(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string | null) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleMagicScan = async (overrideImage?: string) => {
    const imgToScan = overrideImage || subjData;
    if (!imgToScan) {
      setPendingScan(true);
      subjRef.current?.click();
      return;
    }
    if (!checkCreditLimit(CREDIT_COSTS.MAGIC_SCAN)) return;
    setIsProcessing(true);
    setProcessingMsg(lang === 'th' ? "AI Agency กำลังวิเคราะห์กลยุทธ์ไทยพรีเมียม..." : "AI Agency analyzing premium Thai strategy...");
    try {
      const result: MagicScanResult = await analyzeProductImage(imgToScan);
      setLifestyleCmd(result.visualPrompt);
      setArtDir(result.suggestedArtDir);
      setVibe(result.suggestedVibe);
      deductCredits(CREDIT_COSTS.MAGIC_SCAN);
      syncProfile();
      sounds.playMagic();
    } catch (e: any) {
       const handled = await handleErrorResetKey(e);
       if (!handled) alert(e.message);
    } finally { setIsProcessing(false); }
  };

  const handleInstantProduction = async () => {
    const renderCost = imageSize === '4K' ? CREDIT_COSTS.RENDER_4K : imageSize === '2K' ? CREDIT_COSTS.RENDER_2K : CREDIT_COSTS.RENDER_1K;
    const totalCost = renderCost + CREDIT_COSTS.STRATEGY;
    if (!checkCreditLimit(totalCost)) return;
    
    setIsProcessing(true);
    setProcessingMsg(lang === 'th' ? "AI กำลังคิด Big Idea และวางเลย์เอาต์ภาษาไทย..." : "AI thinking of Big Idea and Thai layout...");
    
    try {
      const brief = await getCreativeBrief(lifestyleCmd, vibe, artDir, productionTarget === 'product');
      setEditableBrief(brief);
      setProcessingMsg(lang === 'th' ? "กำลังเรนเดอร์งานระดับ Campaign Gold..." : "Rendering Campaign Gold masterpiece...");
      
      const res = await generateAdAsset(
        subjData, refData, brief, 'Anuphan', aspectRatio, imageSize, 
        productionTarget, showText ? 'adtext' : 'clean', Math.floor(Math.random() * 999999), 
        logoData, 'enhanced', 'retouch', 'Cinematic', designPalette, 
        selectedClothing || undefined, groomingOptions
      );
      
      if (res) {
        deductCredits(renderCost); 
        setFinalAsset(res);
        setVideoAsset(null);
        setPhase('final');
        addGeneratedAsset({ url: res, type: 'image', brief: { headline: brief.headline, subheadline: brief.subheadline, vibe: vibe } });
        syncProfile();
        sounds.playSuccess();
      }
    } catch (e: any) {
       const handled = await handleErrorResetKey(e);
       if (!handled) alert(e.message);
    } finally { setIsProcessing(false); }
  };

  const handleRenderAsset = async () => {
    const cost = imageSize === '4K' ? CREDIT_COSTS.RENDER_4K : imageSize === '2K' ? CREDIT_COSTS.RENDER_2K : CREDIT_COSTS.RENDER_1K;
    if (!checkCreditLimit(cost)) return;
    
    setIsProcessing(true);
    setProcessingMsg(lang === 'th' ? "กำลังปรับจูนรายละเอียดและข้อความภาษาไทย..." : "Refining details and Thai script...");
    
    try {
      const res = await generateAdAsset(
        subjData, refData, editableBrief!, 'Anuphan', aspectRatio, imageSize, 
        productionTarget, showText ? 'adtext' : 'clean', Math.floor(Math.random() * 999999), 
        logoData, 'enhanced', 'retouch', 'Cinematic', designPalette, 
        selectedClothing || undefined, groomingOptions
      );
      
      if (res) {
        deductCredits(cost);
        setFinalAsset(res);
        setVideoAsset(null);
        setPhase('final');
        addGeneratedAsset({ url: res, type: 'image', brief: { headline: editableBrief!.headline, subheadline: editableBrief!.subheadline, vibe: vibe } });
        syncProfile();
        sounds.playSuccess();
      }
    } catch (e: any) {
       const handled = await handleErrorResetKey(e);
       if (!handled) alert(e.message);
    } finally { setIsProcessing(false); }
  };

  const handleAIEdit = async () => {
    if (!finalAsset || !aiEditPrompt.trim()) return;
    if (!checkCreditLimit(CREDIT_COSTS.AI_EDIT)) return;
    
    setIsProcessing(true);
    setProcessingMsg(lang === 'th' ? "AI กำลังรีทัชภาพตามสั่ง..." : "AI is retouching based on command...");
    
    try {
      const res = await editImageAsset(finalAsset, aiEditPrompt);
      if (res) {
        deductCredits(CREDIT_COSTS.AI_EDIT);
        setFinalAsset(res);
        setVideoAsset(null);
        addGeneratedAsset({ url: res, type: 'image', brief: { headline: editableBrief!.headline, subheadline: editableBrief!.subheadline, vibe: vibe } });
        syncProfile();
        sounds.playSuccess();
        setAiEditPrompt('');
      }
    } catch (e: any) {
       const handled = await handleErrorResetKey(e);
       if (!handled) alert(e.message);
    } finally { setIsProcessing(false); }
  };

  const handleCopySection = (text: string, type: string) => {
    const formattedTags = editableBrief?.hashtags.map(h => `#${h.replace(/^#+/, '')}`).join(' ') || '';
    const fullContent = `${text}\n\n${formattedTags}`;
    navigator.clipboard.writeText(fullContent);
    setCopyStatus(type);
    setTimeout(() => setCopyStatus(null), 2000);
    sounds.playSuccess();
  };

  const handleVideoMotion = async () => {
    if (!finalAsset) return;
    if (!checkCreditLimit(CREDIT_COSTS.VIDEO_MOTION)) return;
    setIsProcessing(true);
    setProcessingMsg(lang === 'th' ? "กำลังสร้างโมชั่น Cinematic ระดับสากล..." : "Generating Global Cinematic Motion...");
    try {
      const vid = await generateCinematicVideo(editableBrief!.visualPrompt, finalAsset, aspectRatio);
      if (vid) {
        deductCredits(CREDIT_COSTS.VIDEO_MOTION);
        setVideoAsset(vid);
        syncProfile();
        sounds.playSuccess();
      }
    } catch (e: any) {
       const handled = await handleErrorResetKey(e);
       if (!handled) alert(e.message);
    } finally { setIsProcessing(false); }
  };

  const toggleGrooming = (type: 'beard' | 'retouch', value: any) => {
    handleBtnClick();
    setGroomingOptions(prev => ({
      ...prev,
      [type]: prev[type as keyof GroomingOptions] === value ? (type === 'beard' ? 'original' : 'natural') : value
    }));
    sounds.playMagic();
  };

  const SidebarContent = (
    <div className="flex flex-col h-full space-y-4 md:space-y-6 pb-32">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-black italic tracking-tighter text-white uppercase leading-none">STUDIO <span className="text-emerald-500">MASTER.</span></h2>
          <button onClick={() => setShowMobileSettings(false)} className="lg:hidden text-white text-2xl">✕</button>
        </div>
        
        <div className={`px-4 py-3 md:px-5 md:py-4 rounded-[1.5rem] md:rounded-[2rem] border-2 transition-all flex items-center justify-between ${apiReady ? 'bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-rose-500/10 border-rose-500/40'}`}>
           <div className="flex items-center gap-2 md:gap-3">
              <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${apiReady ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-rose-500 shadow-[0_0_10px_#f43f5e] animate-pulse'}`}></div>
              <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest ${apiReady ? 'text-emerald-400' : 'text-rose-400'}`}>
                {apiReady ? 'READY' : 'CONNECTION NEEDED'}
              </span>
           </div>
           {(!apiReady || (window as any).aistudio) && (
             <button onClick={handleConnectApi} className="btn-3d-white px-2.5 py-1 md:px-3 md:py-1.5 rounded-full font-black text-[8px] md:text-[9px] uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">CONNECT</button>
           )}
        </div>

        <div className="bg-[#0a0f1e] p-3 md:p-5 rounded-[1.5rem] md:rounded-[2rem] border border-indigo-500/20 shadow-xl text-center space-y-1">
           <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400">CREDITS</p>
           <div className="flex items-center justify-center gap-2">
              <span className="text-3xl md:text-4xl font-black text-white">{credits}</span>
              <span className="text-xl">✨</span>
           </div>
           <button onClick={handleBuyCredits} className="mt-1 w-full py-1.5 md:py-2 btn-3d-white rounded-full font-black text-[8px] md:text-[9px] uppercase tracking-widest transition-all shadow-md">RECHARGE</button>
        </div>
      </div>

      <section className="space-y-1.5">
        <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">TARGET</p>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setProductionTarget('human')} className={`flex flex-col items-center justify-center py-2 md:py-4 rounded-2xl md:rounded-3xl border-2 transition-all ${productionTarget === 'human' ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-lg scale-105' : 'bg-slate-900/50 border-white/5 text-slate-500'}`}>
            <span className="text-lg md:text-2xl">👤</span>
            <span className="text-[7px] md:text-[8px] font-black uppercase">HUMAN</span>
          </button>
          <button onClick={() => setProductionTarget('product')} className={`flex flex-col items-center justify-center py-2 md:py-4 rounded-2xl md:rounded-3xl border-2 transition-all ${productionTarget === 'product' ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-lg scale-105' : 'bg-slate-900/50 border-white/5 text-slate-500'}`}>
            <span className="text-lg md:text-2xl">📦</span>
            <span className="text-[7px] md:text-[8px] font-black uppercase">PRODUCT</span>
          </button>
        </div>
      </section>

      {productionTarget === 'human' && (
        <>
          <section className="space-y-1.5 animate-in slide-in-from-top-4 duration-500">
             <p className="text-[8px] font-black text-indigo-400 uppercase tracking-[0.2em]">WARDROBE MASTER</p>
             <div className="grid grid-cols-3 gap-1.5">
                {CLOTHING_PRESETS.map(cloth => (
                  <button 
                    key={cloth.id} 
                    onClick={() => {
                      handleBtnClick();
                      setSelectedClothing(selectedClothing === cloth.prompt ? null : cloth.prompt);
                      sounds.playMagic();
                    }} 
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all relative group ${selectedClothing === cloth.prompt ? 'bg-indigo-500/20 border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.3)]' : 'bg-slate-900/50 border-white/5 text-slate-500 hover:border-indigo-500/30'}`}
                  >
                     <span className="text-xl md:text-2xl mb-1 group-hover:scale-110 transition-transform">{cloth.icon}</span>
                     <span className="text-[6px] md:text-[7px] font-black uppercase text-center leading-tight whitespace-pre-wrap">{cloth.label[lang]}</span>
                     {selectedClothing === cloth.prompt && <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_5px_#6366f1]"></div>}
                  </button>
                ))}
             </div>
          </section>

          <section className="space-y-1.5 animate-in slide-in-from-top-4 duration-700">
             <p className="text-[8px] font-black text-emerald-400 uppercase tracking-[0.2em]">GROOMING MASTER</p>
             <div className="grid grid-cols-2 gap-1.5">
                {GROOMING_PRESETS.map(gp => {
                  const isActive = gp.type === 'beard' ? groomingOptions.beard === gp.value : groomingOptions.faceRetouch === gp.value;
                  return (
                    <button 
                      key={gp.id} 
                      onClick={() => toggleGrooming(gp.type as any, gp.value)}
                      className={`flex items-center gap-2 p-2 rounded-xl border-2 transition-all ${isActive ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-md' : 'bg-slate-900/50 border-white/5 text-slate-500 hover:border-emerald-500/20'}`}
                    >
                       <span className="text-lg">{gp.icon}</span>
                       <span className="text-[7px] md:text-[8px] font-black uppercase leading-tight">{gp.label[lang]}</span>
                    </button>
                  );
                })}
             </div>
          </section>
        </>
      )}

      <section className="space-y-1.5">
        <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">INVENTORY</p>
        <div className="grid grid-cols-3 gap-1.5">
          {[ 
            { id: 'SUBJ', ref: subjRef, data: subjData, setter: setSubjData, icon: '👤', label: 'FACE/IMG' }, 
            { id: 'REF', ref: refRef, data: refData, setter: setRefData, icon: '🎨', label: 'REF' }, 
            { id: 'LOGO', ref: logoRef, data: logoData, setter: setLogoData, icon: '🏷️', label: 'LOGO' } 
          ].map(item => (
            <div key={item.id} className="flex flex-col items-center gap-1 relative">
              <div onClick={() => item.ref.current?.click()} className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-all overflow-hidden relative ${item.data ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-800 bg-slate-900/30'}`}>
                {item.data ? (
                  <>
                    <img src={item.data} className="w-full h-full object-cover p-1 rounded-xl" />
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        item.setter(null);
                        if (item.ref.current) item.ref.current.value = '';
                      }} 
                      className="absolute top-0.5 right-0.5 w-4 h-4 md:w-5 md:h-5 bg-rose-500 text-white text-[8px] md:text-[10px] rounded-full flex items-center justify-center shadow-lg hover:bg-rose-600 transition-colors z-20"
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  <span className="text-base md:text-lg opacity-30">{item.icon}</span>
                )}
                <input type="file" ref={item.ref} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, item.setter)} />
              </div>
              <span className="text-[7px] md:text-[8px] font-black text-slate-500 uppercase">
                {item.id === 'SUBJ' && !subjData ? 'DESIGN' : item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-1.5">
        <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">ASPECT RATIO</p>
        <div className="grid grid-cols-5 gap-1">
          {RATIO_PRESETS.map(r => (
            <button key={r.id} onClick={() => setAspectRatio(r.id)} className={`flex flex-col items-center gap-0.5 p-1 rounded-lg border-2 transition-all ${aspectRatio === r.id ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-md scale-110 z-10' : 'bg-slate-900/30 border-white/5 text-slate-500'}`}>
              <span className="text-base md:text-lg">{r.icon}</span>
              <span className="text-[6px] md:text-[8px] font-black leading-none">{r.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-1.5">
        <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">QUALITY</p>
        <div className="bg-slate-900/50 p-1 rounded-xl flex gap-1 border border-white/5 shadow-inner">
          {RESOLUTION_PRESETS.map(res => (
            <button key={res.id} onClick={() => setImageSize(res.id as any)} className={`flex-1 py-1 rounded-lg transition-all flex flex-col items-center ${imageSize === res.id ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
              <span className="text-[9px] md:text-[10px] font-black">{res.id}</span>
              <span className="text-[6px] md:text-[7px] font-black uppercase mt-0.5">{res.cost} ✨</span>
            </button>
          ))}
        </div>
      </section>

      <div className="bg-slate-900/50 p-2 md:p-4 rounded-2xl md:rounded-3xl border border-white/5 flex items-center justify-between shadow-sm">
        <span className="text-[9px] md:text-[10px] font-black text-white uppercase">AD TEXT</span>
        <button onClick={() => setShowText(!showText)} className={`w-8 h-4 md:w-10 md:h-5 rounded-full relative transition-all ${showText ? 'bg-indigo-600 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-slate-700'}`}>
          <div className={`absolute top-0.5 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full transition-all ${showText ? 'right-0.5' : 'left-1'}`}></div>
        </button>
      </div>

      <div className="pt-4 border-t border-white/5">
        <button onClick={handleExitStudio} className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all group shadow-sm">
           <span className="text-xl group-hover:rotate-12 transition-transform">🏠</span>
           <span className="text-[10px] font-black uppercase tracking-widest">{lang === 'th' ? 'กลับหน้าแรก' : 'EXIT STUDIO'}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-[#020617] flex overflow-hidden font-anuphan relative pt-safe pb-safe">
      {isProcessing && (
        <div className="fixed inset-0 z-[5000] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl px-6 text-center">
           <div className="w-24 h-24 relative mb-12">
              <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-emerald-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-4xl">🧠</div>
           </div>
           <div className="text-5xl font-black text-white italic mb-4">{fakeProgress}%</div>
           <p className="text-lg font-bold text-emerald-400 italic bg-emerald-500/10 px-8 py-3 rounded-full border border-emerald-500/20 max-w-sm">"{processingMsg}"</p>
        </div>
      )}

      <div className={`fixed inset-0 z-[3000] bg-black/95 transition-opacity lg:hidden ${showMobileSettings ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setShowMobileSettings(false)}>
        <div className={`absolute left-0 top-0 bottom-0 w-72 bg-[#020617] p-6 overflow-y-auto custom-scrollbar shadow-2xl border-r border-white/10 transform transition-transform duration-300 ${showMobileSettings ? 'translate-x-0' : '-translate-x-full'}`} onClick={e => e.stopPropagation()}>
          {SidebarContent}
        </div>
      </div>

      <aside className="hidden lg:flex flex-col w-80 bg-[#020617] border-r border-white/5 p-8 overflow-y-auto custom-scrollbar shrink-0 z-10">
        {SidebarContent}
      </aside>

      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#020617]">
        <header className="px-6 py-4 flex justify-between items-center glass-menu-20 shrink-0 border-b border-white/5 z-40">
           <div className="flex items-center gap-4">
              <button onClick={handleExitStudio} className="lg:hidden w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 text-xl shadow-sm hover:bg-white/10 active:scale-95 transition-all">🏠</button>
              <button onClick={() => setShowMobileSettings(true)} className="lg:hidden w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 text-xl shadow-sm hover:bg-white/10 active:scale-95 transition-all">⚙️</button>
              <div className="hidden sm:flex items-center gap-6 ml-2">
                 {['ideation', 'review', 'final', 'assets'].map(p => (
                   <button key={p} onClick={() => setPhase(p as any)} className={`text-[11px] font-black uppercase tracking-[0.3em] transition-all ${phase === p ? 'text-white border-b-2 border-emerald-500 pb-1' : 'text-slate-500 hover:text-white'}`}>{p}</button>
                 ))}
              </div>
              <div className="sm:hidden text-[10px] font-black uppercase text-white italic tracking-widest leading-none">{phase.toUpperCase()}</div>
           </div>
           <div className="flex items-center gap-4">
              <div className="bg-white/5 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 text-[8px] md:text-[9px] font-black uppercase text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]">{credits} ✨</div>
              <button onClick={onLangToggle} className="w-8 h-8 rounded-full overflow-hidden border border-white/10 shadow-sm transition-transform active:scale-90"><img src={lang === 'th' ? "https://flagcdn.com/w80/th.png" : "https://flagcdn.com/w80/us.png"} className="w-full h-full object-cover" /></button>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-12 pb-[450px]">
           {phase === 'ideation' && (
             <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700">
                <section>
                  <SectionHeader title="TOP SALES SETS" color="bg-rose-500" />
                  <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-4">
                    {TOP_SALES_SETS.map(set => (
                      <button key={set.id} onClick={() => { 
                        setVibe(set.vibe); 
                        setLifestyleCmd(lang === 'th' ? `จัดวางโฆษณาในสไตล์ ${set.vibe} พร้อมข้อความภาษาไทยที่ทรงพลัง` : `Place Thai person in ${set.vibe} style with Thai text...`);
                        handleBtnClick(); 
                      }} className="flex flex-col items-center justify-center p-1.5 md:p-6 rounded-xl md:rounded-[2.5rem] bg-slate-900/30 border-2 border-white/5 hover:border-rose-500/40 transition-all group aspect-square shadow-md active:scale-95">
                        <span className="text-xl md:text-4xl mb-0.5 md:mb-3 group-hover:scale-110 transition-transform">{set.icon}</span>
                        <span className="text-[6px] md:text-[10px] font-black text-white uppercase text-center leading-[1.1]">{set.label[lang]}</span>
                      </button>
                    ))}
                  </div>
                </section>
                
                <section>
                  <SectionHeader title="ART DIRECTION HUB" color="bg-emerald-500" />
                  <div className="grid grid-cols-5 md:grid-cols-7 gap-1 md:gap-3">
                    {ART_DIRECTIONS.map(a => (
                      <button key={a.id} onClick={() => applyArtDirPreset(a)} className={`flex flex-col items-center justify-center p-1 md:p-4 rounded-lg md:rounded-2xl border-2 transition-all aspect-square active:scale-95 ${artDir === a.id ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-lg scale-105' : 'bg-slate-900/30 border-white/5 hover:border-white/10'}`}>
                        <span className="text-lg md:text-2xl mb-0.5">{a.icon}</span>
                        <span className="text-[5px] md:text-[8px] font-black uppercase text-center leading-[1.1]">{a.label[lang]}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section>
                  <SectionHeader title="BRAND VIBE HUB" color="bg-amber-500" />
                  <div className="grid grid-cols-5 md:grid-cols-7 gap-1 md:gap-3">
                    {BRAND_VIBES.map(v => (
                      <button key={v.id} onClick={() => applyVibePreset(v)} className={`flex flex-col items-center justify-center p-1 md:p-4 rounded-lg md:rounded-2xl border-2 transition-all aspect-square active:scale-95 ${vibe === v.id ? 'bg-amber-950/40 border-amber-500 text-white shadow-lg scale-105' : 'bg-slate-900/30 border-white/5 hover:border-white/10'}`}>
                        <span className="text-lg md:text-2xl mb-0.5">{v.icon}</span>
                        <span className="text-[5px] md:text-[8px] font-black uppercase text-center leading-[1.1]">{v.label[lang]}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <div className="h-[450px] w-full" />
             </div>
           )}

           {phase === 'final' && finalAsset && (
             <div className="min-h-full flex flex-col items-center justify-center py-4 md:py-8 animate-in zoom-in duration-700">
                <div className="max-w-4xl xl:max-w-[1400px] w-full grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12 items-start">
                   <div className="space-y-6 flex flex-col w-full">
                      <div className="flex items-center justify-between">
                         <h2 className="text-2xl md:text-5xl font-black italic uppercase text-white tracking-tighter">RENDER <span className="magic-gradient-text">OUT.</span></h2>
                         <button onClick={() => setPhase('ideation')} className="text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors">START NEW</button>
                      </div>
                      <div className={`rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-black/40 shadow-2xl border-4 border-white/5 relative w-full flex items-center justify-center p-2 ${getAspectClass(aspectRatio)}`}>
                        {videoAsset ? <video src={videoAsset} className="w-full h-full object-contain rounded-[1.8rem] md:rounded-[2.5rem]" autoPlay loop muted playsInline /> : <img src={finalAsset} className="w-full h-full object-contain rounded-[1.8rem] md:rounded-[2.5rem]" />}
                        <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-[7px] md:text-[8px] font-black uppercase tracking-widest z-10 shadow-lg">{imageSize} QUALITY</div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                         <a href={videoAsset || finalAsset} download={getSanitizedFileName()} className="h-14 md:h-16 btn-3d-white rounded-2xl font-black flex items-center justify-center uppercase tracking-widest text-[10px] md:text-[11px] shadow-lg transition-all">DOWNLOAD</a>
                         <button onClick={handleVideoMotion} disabled={!!videoAsset} className="h-14 md:h-16 btn-3d-indigo text-white rounded-2xl font-black flex items-center justify-center uppercase tracking-widest text-[10px] md:text-[11px] shadow-lg disabled:opacity-30">MOTION VIDEO</button>
                      </div>
                   </div>

                   <div className="space-y-6">
                     <div className="bg-[#0a0f1e] p-6 md:p-10 rounded-[2.5rem] md:rounded-[4rem] border border-white/10 space-y-6 md:space-y-8 flex flex-col shadow-2xl relative overflow-hidden w-full">
                        <div className="mb-4 md:mb-8 p-6 md:p-10 bg-slate-950/80 rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-inner text-center space-y-3 md:space-y-4 max-w-full overflow-hidden">
                           <h1 className={`text-lg sm:text-xl md:text-3xl italic transition-all duration-500 leading-tight ${getTypoClass()}`}>
                             {editableBrief?.headline || 'Commercial Headline'}
                           </h1>
                           <div className="gold-divider max-w-[60%] mx-auto my-3 md:my-4"></div>
                           <p className="text-luxury-sub text-[9px] sm:text-[10px] md:text-xs px-4 max-w-md mx-auto">
                             {editableBrief?.subheadline || 'Elegance redefined through AI Alchemy.'}
                           </p>
                        </div>

                        {/* MAGIC AI EDIT MASTERPIECE (DIRECT IMAGE EDIT) */}
                        <div className="space-y-6 border-b border-white/5 pb-8 mb-4">
                           <div className="flex items-center gap-3">
                              <div className="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                              <h3 className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em]">Magic AI Edit (Direct Command)</h3>
                           </div>
                           
                           <div className="space-y-2">
                              <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest ml-1">Edit Command (e.g. "เปลี่ยนพื้นหลังเป็นกรุงเทพ", "ใส่แว่นกันแดด")</label>
                              <div className="flex flex-col sm:flex-row gap-3">
                                <textarea 
                                  value={aiEditPrompt} 
                                  onChange={(e) => setAiEditPrompt(e.target.value)} 
                                  className="flex-1 bg-white/5 rounded-xl px-4 py-3 text-[10px] font-medium text-white/80 outline-none border border-white/5 focus:border-indigo-500 transition-all shadow-inner h-16 resize-none custom-scrollbar" 
                                  placeholder="พิมพ์คำสั่งแก้ไขภาพที่นี่..."
                                />
                                <button 
                                  onClick={handleAIEdit} 
                                  disabled={!aiEditPrompt.trim()}
                                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg transition-all active:scale-95 disabled:opacity-30 shrink-0"
                                >
                                  EDIT 🪄
                                </button>
                              </div>
                              <p className="text-[7px] text-slate-600 italic">Cost: {CREDIT_COSTS.AI_EDIT} ✨ per edit.</p>
                           </div>
                        </div>

                        {/* MASTER BLUEPRINT REFINEMENT */}
                        <div className="space-y-6 border-b border-white/5 pb-8 mb-4">
                           <div className="flex items-center gap-3">
                              <div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div>
                              <h3 className="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em]">Master Blueprint Refinement</h3>
                           </div>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest ml-1">Edit Headline (ภาษาไทย)</label>
                                <input 
                                  value={editableBrief?.headline} 
                                  onChange={(e) => setEditableBrief({...editableBrief!, headline: e.target.value})} 
                                  className="w-full bg-white/5 rounded-xl px-4 py-2 text-xs font-black text-white outline-none border border-white/5 focus:border-indigo-500 transition-all" 
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest ml-1">Edit Sub-Headline (ภาษาไทย)</label>
                                <input 
                                  value={editableBrief?.subheadline} 
                                  onChange={(e) => setEditableBrief({...editableBrief!, subheadline: e.target.value})} 
                                  className="w-full bg-white/5 rounded-xl px-4 py-2 text-[10px] font-bold text-slate-300 outline-none border border-white/5 focus:border-indigo-500 transition-all" 
                                />
                              </div>
                           </div>

                           <div className="space-y-2">
                              <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest ml-1">Visual Refinement (Scene Description)</label>
                              <textarea 
                                value={editableBrief?.visualPrompt} 
                                onChange={(e) => setEditableBrief({...editableBrief!, visualPrompt: e.target.value})} 
                                className="w-full bg-white/5 rounded-xl px-4 py-3 text-[10px] font-medium text-white/80 outline-none border border-white/5 focus:border-emerald-500 transition-all shadow-inner h-20 resize-none custom-scrollbar" 
                                placeholder="บรรยายรายละเอียดภาพที่ต้องการแก้ไข..."
                              />
                           </div>

                           <button onClick={handleRenderAsset} className="w-full py-4 btn-magical text-white rounded-full font-black text-[11px] uppercase shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95 group">
                              <span>RE-RENDER MASTERPIECE</span>
                              <span className="text-lg group-hover:rotate-12 transition-transform">🪄✨</span>
                           </button>
                        </div>

                        {/* FB Section */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-2 flex items-center gap-2">
                              <span className="text-lg">📘</span> FACEBOOK STORYTELLING (THAI)
                            </label>
                            <button onClick={() => handleCopySection(editableBrief?.facebookCaption || '', 'fb')} className="text-[9px] font-black text-white bg-white/10 px-4 py-1.5 rounded-full border border-white/10 hover:bg-white/20 transition-all uppercase">
                              {copyStatus === 'fb' ? 'COPIED ✅' : 'COPY ALL'}
                            </button>
                          </div>
                          <textarea 
                            value={editableBrief?.facebookCaption} 
                            onChange={(e) => setEditableBrief({...editableBrief!, facebookCaption: e.target.value})} 
                            className="w-full bg-white/5 rounded-2xl px-6 py-4 text-xs md:text-sm font-bold text-slate-300 outline-none border border-white/5 focus:border-indigo-500 transition-all shadow-inner resize-none h-32 md:h-40 custom-scrollbar"
                          />
                        </div>

                        {/* TikTok Section */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] font-black text-rose-400 uppercase tracking-widest ml-2 flex items-center gap-2">
                              <span className="text-lg">🎬</span> TIKTOK VIRAL HOOKS (THAI)
                            </label>
                            <button onClick={() => handleCopySection(editableBrief?.tiktokCaption || '', 'tt')} className="text-[9px] font-black text-white bg-white/10 px-4 py-1.5 rounded-full border border-white/10 hover:bg-white/20 transition-all uppercase">
                              {copyStatus === 'tt' ? 'COPIED ✅' : 'COPY ALL'}
                            </button>
                          </div>
                          <textarea 
                            value={editableBrief?.tiktokCaption} 
                            onChange={(e) => setEditableBrief({...editableBrief!, tiktokCaption: e.target.value})} 
                            className="w-full bg-white/5 rounded-2xl px-6 py-4 text-xs md:text-sm font-bold text-slate-300 outline-none border border-white/5 focus:border-rose-500 transition-all shadow-inner resize-none h-24 md:h-28 custom-scrollbar"
                          />
                        </div>

                        {/* Hashtags Section */}
                        <div className="space-y-4">
                          <label className="text-[10px] font-black text-emerald-400 uppercase tracking-widest ml-2 flex items-center gap-2">
                             <span className="text-lg">#️⃣</span> MAXIMIZED HASHTAGS (25+)
                          </label>
                          <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 text-[10px] md:text-xs font-mono text-emerald-500 leading-relaxed max-h-24 overflow-y-auto custom-scrollbar italic">
                            {editableBrief?.hashtags.map(h => `#${h.replace(/^#+/, '')}`).join(' ')}
                          </div>
                        </div>
                     </div>
                   </div>
                </div>
             </div>
           )}

           {phase === 'review' && editableBrief && (
             <div className="max-w-3xl mx-auto space-y-12 py-8 animate-in slide-in-from-right duration-500">
                <div className="flex items-center gap-4 md:gap-6">
                  <button onClick={() => setPhase('ideation')} className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl md:text-2xl shadow-md transition-all active:scale-90">←</button>
                  <h2 className="text-2xl md:text-7xl font-black italic tracking-tighter uppercase">REVIEW <span className="magic-gradient-text">STRATEGY.</span></h2>
                </div>
                <div className="space-y-8">
                   <div className="space-y-3"><p className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-widest">HOOK LINE (ภาษาไทย)</p><input value={editableBrief.headline} onChange={(e) => setEditableBrief({...editableBrief, headline: e.target.value})} className="w-full bg-white/5 border-2 border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 text-xl md:text-4xl font-black text-white outline-none focus:border-emerald-500 transition-all" /></div>
                   <div className="space-y-3"><p className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-widest">THAI STORYTELLING</p><textarea value={editableBrief.facebookCaption} onChange={(e) => setEditableBrief({...editableBrief, facebookCaption: e.target.value})} className="w-full bg-white/5 border-2 border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 text-sm md:text-lg font-medium text-slate-400 min-h-[200px] md:min-h-[250px] resize-none leading-relaxed focus:border-emerald-500 focus:text-white transition-all shadow-inner" /></div>
                   <button onClick={handleRenderAsset} className="w-full py-6 md:py-8 rounded-[2.5rem] md:rounded-[3rem] btn-magical font-black text-lg md:text-3xl uppercase tracking-widest transition-all">RENDER ✨</button>
                </div>
             </div>
           )}

           {phase === 'assets' && (
             <div className="space-y-12 py-8 animate-in slide-in-from-right duration-500">
                <SectionHeader title="MY HUB" color="bg-emerald-500" />
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                   {inventoryAssets.map((asset, i) => (
                     <div key={i} className="group relative bg-white/5 rounded-[2rem] md:rounded-[3rem] overflow-hidden aspect-square border-2 border-white/5 shadow-md hover:border-emerald-500/30 transition-all">
                        <img src={asset.url} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6"><button onClick={() => { setFinalAsset(asset.url); setPhase('final'); }} className="btn-3d-white px-8 py-2.5 rounded-full font-black text-[9px] uppercase tracking-widest transition-colors">VIEW</button></div>
                     </div>
                   ))}
                   {inventoryAssets.length === 0 && <div className="col-span-full py-20 text-center text-slate-600 font-black uppercase tracking-widest">No assets saved yet</div>}
                </div>
             </div>
           )}
        </div>

        {phase === 'ideation' && !showMobileSettings && (
          <div className="fixed md:absolute bottom-6 md:bottom-10 left-4 md:left-6 right-4 md:right-6 z-[1000] pointer-events-none flex justify-center">
             <div className="bg-[#0f172a]/95 backdrop-blur-3xl rounded-[2.2rem] md:rounded-[3rem] p-4 md:p-6 border border-white/10 shadow-2xl flex-1 max-w-4xl flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-6 pointer-events-auto">
                <div className="flex-1 space-y-1 md:space-y-2">
                   <div className="flex items-center justify-between">
                      <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        {subjData ? 'VISION COMMAND' : '✨ MASTER DESIGN COMMAND (THAI)'}
                      </p>
                      <button onClick={() => handleMagicScan()} className="text-[7px] md:text-[8px] font-black text-emerald-400 bg-emerald-500/10 px-2 md:px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest transition-all active:scale-95">
                        {subjData ? 'MAGIC SCAN 📸' : 'AI PRODUCT DESIGN 🪄'}
                      </button>
                   </div>
                   <textarea value={lifestyleCmd} onChange={(e) => setLifestyleCmd(e.target.value)} className="w-full bg-transparent text-[11px] md:text-sm font-medium text-white outline-none resize-none h-12 md:h-16 placeholder:text-slate-700" placeholder={subjData ? "พิมพ์คำบรรยายสินค้า..." : "บรรยายโฆษณาเป็นภาษาไทยที่อยากให้ AI สร้างสรรค์..."} />
                </div>
                <button onClick={handleInstantProduction} disabled={!lifestyleCmd.trim()} className="h-14 md:h-24 px-6 md:px-10 rounded-[1.8rem] md:rounded-[2rem] btn-magical text-white text-sm md:text-lg font-black uppercase tracking-widest shadow-[0_15px_40px_-5px_rgba(236,72,153,0.5)] disabled:opacity-20 flex flex-col items-center justify-center transition-transform leading-tight">
                  <span>PRODUCE</span>
                  <span className="text-[8px] opacity-70">🪄✨</span>
                </button>
             </div>
          </div>
        )}
      </main>
      
      {showKeyDialog && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl">
           <div className="bg-[#0a0f1e] border border-white/10 rounded-[2.5rem] md:rounded-[3rem] w-full max-w-xl p-8 md:p-14 text-center space-y-8 shadow-2xl animate-in zoom-in duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500 text-white rounded-2xl md:rounded-3xl flex items-center justify-center text-3xl md:text-4xl mx-auto shadow-xl">💎</div>
              <h3 className="text-2xl md:text-4xl font-black uppercase text-white tracking-tighter">ACTIVATE PRO ENGINE</h3>
              <p className="text-slate-400 text-xs md:text-lg italic leading-relaxed">"ฟีเจอร์ความละเอียดสูงและการเปลี่ยนชุดต้องใช้ API Key ส่วนตัวที่มี Billing แล้วครับ"</p>
              <div className="space-y-8">
                 <button onClick={handleConnectApi} className="w-full py-5 md:py-6 btn-3d-white rounded-full font-black text-base md:text-lg uppercase shadow-xl transition-all">CONNECT PRO ENGINE ✨</button>
                 <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="block text-[8px] md:text-[10px] font-black text-slate-600 uppercase underline tracking-widest hover:text-slate-400">LEARN ABOUT BILLING</a>
              </div>
              <button onClick={() => setShowKeyDialog(false)} className="text-slate-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">CLOSE</button>
           </div>
        </div>
      )}

      {showCreditModal && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-[#0a0f1e] border border-white/10 rounded-[3rem] md:rounded-[4rem] w-full max-w-4xl p-6 md:p-14 overflow-y-auto max-h-[90vh] custom-scrollbar relative shadow-4xl animate-in slide-in-from-bottom-10 duration-500">
              <button onClick={() => setShowCreditModal(false)} className="absolute top-6 right-6 md:top-8 md:right-8 text-slate-500 text-xl md:text-2xl hover:text-white transition-colors font-black">✕</button>
              <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter text-center mb-10 md:mb-12 uppercase">RECHARGE <span className="magic-gradient-text">POWER.</span></h3>
              <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-3 md:space-y-4">
                   {PACKAGES.map(pkg => (
                     <div key={pkg.id} onClick={() => { handleBtnClick(); setSelectedPkgForPay(pkg); }} className={`bg-white/5 border-2 rounded-[1.8rem] md:rounded-[2.5rem] p-4 md:p-6 transition-all cursor-pointer active:scale-95 ${selectedPkgForPay?.id === pkg.id ? 'border-indigo-500 bg-indigo-500/10 shadow-lg' : 'border-white/5 hover:border-white/10'}`}>
                        <div className="flex justify-between items-center">
                           <div className="flex items-center gap-3 md:gap-4">
                              <span className="text-3xl md:text-4xl">{pkg.icon}</span>
                              <h4 className="font-black text-white text-sm md:text-lg uppercase tracking-tight">{pkg.title}</h4>
                           </div>
                           <p className="text-emerald-500 font-black text-lg md:text-xl italic">฿{pkg.price}</p>
                        </div>
                     </div>
                   ))}
                </div>
                <div className="space-y-6 md:space-y-8">
                   <div className="p-6 md:p-8 bg-indigo-600/10 border border-indigo-500/20 rounded-[2rem] md:rounded-[2.5rem] space-y-4 shadow-inner">
                      <p className="text-[8px] md:text-[9px] font-black text-indigo-400 uppercase tracking-widest">PROMO CODE</p>
                      <div className="flex gap-4">
                         <input type="text" className="flex-1 bg-black/40 border border-indigo-500/30 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-400 transition-all" placeholder="รหัสโค้ด..." value={promoInput} onChange={(e) => setPromoInput(e.target.value)} />
                         <button onClick={handleRedeemInStudio} className="btn-3d-indigo text-white px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all shadow-md">OK</button>
                      </div>
                   </div>
                   {selectedPkgForPay && (
                     <div className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] flex flex-col items-center text-center animate-in zoom-in duration-500 shadow-2xl">
                        <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">SCAN PAY: {selectedPkgForPay.title}</p>
                        <div className="w-40 h-40 md:w-48 md:h-48 bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl mb-6 shadow-xl relative group">
                           <img src={getQRCodeImage(selectedPkgForPay.id)} className="w-full h-full object-contain" />
                        </div>
                        <a href="https://line.me/ti/p/~mylucky14" target="_blank" className="w-full py-4 btn-3d-emerald text-white rounded-full font-black text-center text-[10px] md:text-[11px] uppercase tracking-[0.2em] shadow-lg transition-all">ส่งสลิปผ่านไลน์ ➔</a>
                     </div>
                   )}
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AIStudio;
