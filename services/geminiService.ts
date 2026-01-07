import { GoogleGenAI, Type, Modality } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export interface CreativeBrief {
  headline: string;
  subheadline: string;
  heroText: string; 
  productDetail: string; 
  productMaterial: string;
  visualPrompt: string; 
  insights: string;
  vibe: string;
  artDirection: string;
  backgroundStrategy: string;
  lightingTechnique: string;
  hasModel: boolean;
  caption: string; 
  facebookCaption: string; 
  tiktokCaption: string; 
  seoKeywords: string[]; 
  hashtags: string[]; 
  adScript: string;
  bigIdea?: string;
  targetAudience?: string;
}

export interface MagicScanResult {
  visualPrompt: string;
  suggestedArtDir: string;
  suggestedVibe: string;
  analysis?: string;
}

export interface GroomingOptions {
  beard: 'original' | 'groomed' | 'removed';
  faceRetouch: 'natural' | 'smooth' | 'luxury_makeup';
  hairStyle?: string;
}

export interface SignageOptions {
  customText: string;
  enabled: boolean;
  showHeadline: boolean;
}

export const cleanText = (text: string) => {
  if (!text) return "";
  return text
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .replace(/\*\*/g, '')
    .replace(/##/g, '')
    .replace(/#/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const handleGeminiError = (error: any) => {
  console.error("Detailed Model Error:", error);
  const errorStr = (error?.message || "").toLowerCase();
  const rawErrorStr = JSON.stringify(error).toLowerCase();
  const combinedError = errorStr + " " + rawErrorStr;

  if (combinedError.includes("requested entity was not found") || combinedError.includes("404")) {
    throw new Error("RESELECT_KEY");
  }

  if (combinedError.includes('403') || combinedError.includes('permission_denied') || combinedError.includes('permission') || combinedError.includes('billing') || combinedError.includes('api key not found')) {
    throw new Error("PRO_ENGINE_REQUIRED");
  }
  
  const finalMessage = error?.message || "ระบบขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง";
  throw new Error(finalMessage);
};

// --- WORLD-CLASS THAI AGENCY ROLE DEFINITION ---
const AGENCY_CORE_INSTRUCTION = `
คุณคือ "AI Global Creative Director" ประจำสาขาประเทศไทย ของเอเจนซี่โฆษณาระดับโลก
หน้าที่ของคุณคือการสร้างสรรค์งานโฆษณา แฟชั่น และภาพลักษณ์แบรนด์สำหรับ "ตลาดประเทศไทย" โดยเฉพาะ

🔹 กฎเหล็กด้านภาษา (Language Protocol):
1. ข้อความที่จะปรากฏบนภาพ (Headline, Subheadline): ต้องเป็นภาษาไทยที่ทรงพลัง สละสลวย และดูแพง
2. แคปชั่น Facebook & TikTok: ต้องเป็นภาษาไทย 100% เขียนแบบมืออาชีพ (Storytelling / Viral Hook)
3. Visual Prompt: บรรยายเป็นภาษาอังกฤษ (เพื่อความแม่นยำของ Model) แต่ต้องระบุว่าข้อความบนภาพคือ "THAI SCRIPT"

มาตรฐานคุณภาพ: Campaign Quality (สวยมาก, ดูแพง, มีระดับ, เหมาะกับแบรนด์ระดับสูง)
`;

export const getCreativeBrief = async (userInput: string, currentVibe: string, currentArtDir: string, isProductMode: boolean = false): Promise<CreativeBrief> => {
  const ai = getAIClient();
  const modelName = 'gemini-3-flash-preview'; 
  
  const systemInstruction = `${AGENCY_CORE_INSTRUCTION}
  สร้าง Creative Brief และเนื้อหาโซเชียลที่เน้นกลุ่มเป้าหมายคนไทย
  - Headline/Subheadline: ภาษาไทยที่หยุดนิ้วคน
  - Facebook: ภาษาไทยระดับพรีเมียม เล่าเรื่องให้น่าสนใจ
  - TikTok: ภาษาไทยแบบวัยรุ่น/ไวรัล แต่ยังคงความแพง
  - Visual Prompt: รายละเอียดมุมกล้องและแสงระดับโลก (English)`;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bigIdea: { type: Type.STRING },
            targetAudience: { type: Type.STRING },
            headline: { type: Type.STRING, description: 'Thai language only' },
            subheadline: { type: Type.STRING, description: 'Thai language only' },
            heroText: { type: Type.STRING },
            visualPrompt: { type: Type.STRING },
            vibe: { type: Type.STRING },
            artDirection: { type: Type.STRING },
            facebookCaption: { type: Type.STRING, description: 'Professional Thai storytelling' },
            tiktokCaption: { type: Type.STRING, description: 'Viral Thai hooks' },
            seoKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
            adScript: { type: Type.STRING }
          },
          required: ["headline", "subheadline", "facebookCaption", "tiktokCaption", "visualPrompt", "bigIdea"]
        },
        systemInstruction: systemInstruction,
      },
      contents: `สร้างแคมเปญระดับโลกสำหรับสินค้า/บริการ: "${userInput}". สไตล์: ${currentVibe}, ทิศทางศิลปะ: ${currentArtDir}. 
      ทุกข้อความที่เป็นตัวอักษรต้องเป็นภาษาไทยที่ดูแพงที่สุด`,
    });

    const parsed = JSON.parse(response.text || "{}");
    return {
      ...parsed,
      headline: cleanText(parsed.headline),
      subheadline: cleanText(parsed.subheadline),
      facebookCaption: cleanText(parsed.facebookCaption),
      tiktokCaption: cleanText(parsed.tiktokCaption),
      caption: cleanText(parsed.facebookCaption)
    };
  } catch (error) {
    throw handleGeminiError(error);
  }
};

export const analyzeProductImage = async (imageBase64: string): Promise<MagicScanResult> => {
  const ai = getAIClient();
  const imagePart = getImagePart(imageBase64);
  
  const prompt = `${AGENCY_CORE_INSTRUCTION}
  วิเคราะห์ภาพนี้ในฐานะ Creative Director เพื่อวางแผนโฆษณาในไทย:
  1. วิเคราะห์ Brand Personality สำหรับลูกค้าคนไทย
  2. 'visualPrompt': บรรยายฉากโฆษณาพรีเมียม (English)
  3. 'suggestedArtDir': ทิศทางศิลปะระดับไฮเอนด์
  4. 'suggestedVibe': บรรยากาศที่ถูกจริตคนไทยระดับพรีเมียมที่สุด
  คืนค่าเป็น JSON เท่านั้น`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            visualPrompt: { type: Type.STRING },
            suggestedArtDir: { type: Type.STRING },
            suggestedVibe: { type: Type.STRING }
          },
          required: ["visualPrompt", "suggestedArtDir", "suggestedVibe"]
        }
      },
      contents: { parts: [imagePart, { text: prompt }] },
    });
    
    if (!response.text) throw new Error("AI returned empty result");
    return JSON.parse(response.text);
  } catch (error) {
    throw handleGeminiError(error);
  }
};

export const generateAdAsset = async (
  subjectImage: string | null,
  refImage: string | null,
  brief: CreativeBrief,
  fontStyle: string,
  aspectRatio: string = "1:1",
  imageSize: "1K" | "2K" | "4K" = "1K",
  productionMode: 'human' | 'product' = 'human',
  outputStyle: 'clean' | 'adtext' = 'clean',
  seed?: number,
  logoImage?: string,
  enhancementMode: 'enhanced' = 'enhanced',
  subjectProcessing: 'retouch' = 'retouch',
  lightingStyle: string = 'Studio',
  designPalette: string = 'GOLD',
  clothingStyle?: string,
  grooming?: GroomingOptions
) => {
  const ai = getAIClient();
  const parts: any[] = [];
  const modelName = 'gemini-3-pro-image-preview';

  let textDesignPrompt = "";
  if (outputStyle === 'adtext') {
    let paletteInstruction = "";
    if (designPalette === 'GOLD') {
      paletteInstruction = `3D Typography in polished 24k Thai Gold, sharp edges, luxury lighting.`;
    } else if (designPalette === 'WHITE') {
      paletteInstruction = `3D Minimalist Silk White Thai Typography.`;
    } else if (designPalette === 'PROMO') {
      paletteInstruction = `Bold 3D Commercial Thai Typography in Ruby Red and Gold.`;
    } else if (designPalette === 'SILVER') {
      paletteInstruction = `Polished Chrome Silver Thai Typography.`;
    } else if (designPalette === 'ROSE') {
      paletteInstruction = `Elegant Rose Gold Thai Typography.`;
    }

    textDesignPrompt = `
      AGENCY TYPOGRAPHY PROTOCOL (STRICT THAI SCRIPT):
      - RENDER MAIN HEADLINE IN THAI SCRIPT: "${brief.headline}" using ${paletteInstruction}.
      - RENDER SUB-HEADLINE IN THAI SCRIPT: "${brief.subheadline}" in matching premium style.
      - Ensure the Thai characters are clear, correctly spelled, and artistically placed according to high-end design standards.
    `;
  }

  // ELITE PRODUCTION PROTOCOLS
  const identityProtocol = `
    IDENTITY_LOCK_PROTOCOL:
    1. SUBJECT_SOURCE: Maintain 1:1 likeness to the Thai person in SUBJ.
    2. DETAIL: Preserve authentic facial structure and skin texture.
  `;

  const styleProtocol = `
    STYLE_DNA_EXTRACTION:
    1. REFERENCE_DOMINANCE: The REF image is the absolute blueprint for lighting and atmosphere.
    2. ATTRIBUTES: Exact lighting angle, colors, and art style from REF.
  `;

  const finalPrompt = `
    [GLOBAL THAI CAMPAIGN MASTER BLUEPRINT]
    CONCEPT: ${brief.bigIdea || 'High-end Thai commercial'}
    SCENE: ${brief.visualPrompt}
    ART_DIRECTION: ${brief.artDirection} | VIBE: ${brief.vibe}
    
    VISUAL REQUIREMENTS:
    - Campaign Quality: Looks like a Vogue Thailand or high-end billboard.
    - Lighting: Cinematic, volumetric, professional studio.
    
    ${outputStyle === 'adtext' ? textDesignPrompt : ''}
    ${subjectImage ? identityProtocol : ''}
    ${refImage ? styleProtocol : ''}
    ${clothingStyle ? `CLOTHING: ${clothingStyle}. Must be a premium matching set.` : ''}
    
    FINAL GOAL: Generate a world-class advertising visual with accurate THAI SCRIPT typography on the image.
  `;

  if (subjectImage) parts.push(getImagePart(subjectImage)); 
  if (refImage) parts.push(getImagePart(refImage));         
  if (logoImage) parts.push(getImagePart(logoImage));
  parts.push({ text: finalPrompt });
  
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: { parts },
      config: { 
        imageConfig: { 
          aspectRatio: aspectRatio as any,
          imageSize: imageSize 
        } 
      }
    });

    const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    return imagePart ? `data:image/png;base64,${imagePart.inlineData.data}` : null;
  } catch (error: any) {
    throw handleGeminiError(error);
  }
};

export const getStylingAdvice = async (userInput: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Provide high-value styling advice from a Global Fashion Director for: ${userInput}. Return in professional Thai language.`,
      config: { tools: [{ googleSearch: {} }] }
    });
    return {
      text: response.text || "",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    throw handleGeminiError(error);
  }
};

export const generateCinematicVideo = async (prompt: string, imageBase64: string, aspectRatio: string) => {
  const ai = getAIClient();
  const imagePart = getImagePart(imageBase64);
  let finalRatio: '16:9' | '9:16' = '16:9';
  if (aspectRatio === '9:16' || aspectRatio === '3:4') finalRatio = '9:16';

  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Premium Thai Campaign Motion: ${prompt}. Cinematic quality.`,
      image: {
        imageBytes: imagePart.inlineData.data,
        mimeType: imagePart.inlineData.mimeType,
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: finalRatio
      }
    });
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    throw handleGeminiError(error);
  }
};

export const editImageAsset = async (imageBase64: string, prompt: string) => {
  const ai = getAIClient();
  const imagePart = getImagePart(imageBase64);
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [imagePart, { text: `Professional Retouching: ${prompt}. Keep Thai text accurate if present.` }]
      }
    });
    const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    return part ? `data:image/png;base64,${part.inlineData.data}` : null;
  } catch (error) {
    throw handleGeminiError(error);
  }
};

export const getSocialMediaStrategy = async (goal: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Develop high-value premium social strategy in Thai language for: ${goal}.`,
      config: { tools: [{ googleSearch: {} }] }
    });
    return {
      text: response.text || "",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    throw handleGeminiError(error);
  }
};

export const generateCoupleImage = async (
  userImage: string, 
  partnerDesc: string, 
  scenario: string, 
  ratio: string, 
  grooming: GroomingOptions, 
  signage: SignageOptions
) => {
  const ai = getAIClient();
  const imagePart = getImagePart(userImage);
  const prompt = `Premium Thai Couple Portrait. Thai user and partner (${partnerDesc}) in ${scenario}. Match faces 1:1. Use professional lighting. Any text must be Thai Script.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [imagePart, { text: prompt }]
      },
      config: { imageConfig: { aspectRatio: ratio as any } }
    });
    const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    return part ? `data:image/png;base64,${part.inlineData.data}` : null;
  } catch (error) {
    throw handleGeminiError(error);
  }
};

export const generateFacebookContent = async (brief: any) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create high-value Thai language campaign copy for: ${JSON.stringify(brief)}. Vogue style storytelling.`,
    });
    return response.text || "";
  } catch (error) {
    throw handleGeminiError(error);
  }
};

export const getPersonalBrandAnalysis = async (niche: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze personal branding opportunities in Thai for: ${niche}.`,
      config: { tools: [{ googleSearch: {} }] }
    });
    return {
      text: response.text || "",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    throw handleGeminiError(error);
  }
};

const getImagePart = (dataUrl: string) => {
  if (!dataUrl.startsWith('data:')) {
     return { inlineData: { data: dataUrl, mimeType: 'image/jpeg' } };
  }
  const parts = dataUrl.split(',');
  const mimeType = parts[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const base64Data = parts[1];
  return { inlineData: { mimeType, data: base64Data } };
};
