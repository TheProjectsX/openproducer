import {
  AspectRatio,
  AudioDeliveryMode,
  AudioPathway,
  FlowOrchestration,
  OperatingTier,
  ProjectArchetype,
  VisualStyleId
} from './types';

export const DEFAULT_FLOW_ORCHESTRATION: FlowOrchestration = {
  video_model: 'veo-3.1',
  image_model: 'imagen-4',
  director_model: 'gemini-1.5-pro'
};

export const OPERATING_TIERS: Array<{
  value: OperatingTier;
  title: string;
  description: string;
}> = [
    {
      value: 'lean_base_reference',
      title: 'Tier 1: Lean Base-Reference (Recommended)',
      description: '1 Subject + 1 Setting (Social UGC, Solo Explainer, Stick Figure, Product Ad)'
    },
    {
      value: 'modular_studio',
      title: 'Tier 2: Modular Studio',
      description: 'Multi-Character / Multi-Location short films, episodic anime, narrative drama'
    }
  ];

export const PROJECT_ARCHETYPES: Array<{
  value: ProjectArchetype;
  title: string;
  description: string;
}> = [
    {
      value: 'social_ugc',
      title: 'Social UGC / Short-form',
      description: 'Fast-paced TikTok / Reels / Shorts with punchy visual hooks'
    },
    {
      value: 'explainer',
      title: 'Explainer / Educational',
      description: 'Minimalist stick-figure, vector essay, or conceptual breakdown'
    },
    {
      value: 'cinema',
      title: 'Narrative Short Film / Cinema',
      description: 'Dramatic storytelling, 35mm cinematics, natural human acting'
    },
    {
      value: 'commercial',
      title: 'Commercial / Product Showcase',
      description: 'Tabletop macro advertising, high-gloss lighting, razor-sharp details'
    },
    {
      value: 'animation_2d',
      title: '2D Cel Anime / Hand-Drawn',
      description: 'Authentic anime linework, expressive character framing, watercolor washes'
    },
    {
      value: 'music_video',
      title: 'Music Video / Lyric Visualizer',
      description: 'Rhythm-synced kinematics, dreamlike lighting, abstract transitions'
    }
  ];

export const ASPECT_RATIOS: Array<{
  value: AspectRatio;
  title: string;
  description: string;
}> = [
    { value: '9:16', title: '9:16 (Vertical)', description: 'TikTok, Instagram Reels, YouTube Shorts' },
    { value: '16:9', title: '16:9 (Widescreen)', description: 'YouTube, Television, Standard Cinema' },
    { value: '1:1', title: '1:1 (Square)', description: 'Social Feeds, Square Advertisements' },
    { value: '21:9', title: '21:9 (Cinematic Ultrawide)', description: 'Epic theatrical anamorphic aspect ratio' }
  ];

export const VISUAL_STYLES: Array<{
  value: VisualStyleId;
  title: string;
  masterAnchor: string;
  negativePrompt: string;
}> = [
    {
      value: 'social_ugc_video',
      title: 'Social UGC & Mobile Video',
      masterAnchor: 'Crisp 4K mobile smartphone front-facing camera video aesthetic, natural ambient daylight, punchy lifelike saturation, handheld micro-jitter motion cadence, direct creator eye-contact framing.',
      negativePrompt: 'blurry, distorted facial features, plastic skin, CGI, film halation, vintage tint, over-processed, watermarks.'
    },
    {
      value: 'vector_stick_figure',
      title: 'Minimalist Vector / Stick Figure',
      masterAnchor: 'Stylized cartoon vector illustration animation. Minimalist stick-figure face on clean pure white #FFFFFF canvas. Crisp uniform black outlines (~3px stroke), single shadow tone per object, zero background gradients.',
      negativePrompt: 'photorealistic, 3D render, realistic skin texture, pupils, eyebrows, nose, gradient shading, ambient occlusion, background scenery, floor lines, ground shadows.'
    },
    {
      value: 'live_action_cinema',
      title: 'Photorealistic Live-Action Cinema',
      masterAnchor: 'Shot on 35mm film stock, organic fine grain, shallow depth of field, anamorphic prime lens flare, subtle natural film halation, rich cinematic color grading with lifelike human skin textures.',
      negativePrompt: '3D CGI render, cartoon, anime, plastic skin, oversaturated, harsh flash, warped limbs, camera equipment, tripod, text, watermarks.'
    },
    {
      value: 'commercial_tabletop',
      title: 'Commercial Tabletop Advertising',
      masterAnchor: 'Commercial advertising cinematography, macro 100mm cine prime lens, razor-sharp edge definition, studio softbox diffusion with crisp metallic rim highlights, high-contrast glossy color grading, ultra-clean commercial realism.',
      negativePrompt: 'film grain, dust, scratches, low-res, dull reflections, fingerprints, camera gear, tripod in frame, watermarks, text.'
    },
    {
      value: 'traditional_2d_anime',
      title: 'Traditional 2D Japanese Cel Anime',
      masterAnchor: 'Authentic 2D hand-drawn Japanese anime aesthetic, clean ink line-art with tapering stroke dynamics, traditional cel shading with hard-edged split toning, warm keylight highlights, and subtle hand-painted watercolor background washes.',
      negativePrompt: '3D CGI, live-action photography, plastic action figure, realistic skin pores, photoreal rendering, western comic halftones, messy linework.'
    },
    {
      value: 'stylized_3d_cgi',
      title: 'Stylized 3D CGI Animation',
      masterAnchor: 'High-end stylized 3D feature animation, soft subsurface scattering on stylized characters, tactile velvety cloth textures, global illumination with warm bounce lighting, Pixar-quality expressive rendering.',
      negativePrompt: 'photorealistic human, uncanny valley, flat 2D cartoon, low polygon, rough textures, video game UI, text.'
    },
    {
      value: 'vintage_retro_film',
      title: 'Vintage & Retro Film Archival',
      masterAnchor: '16mm vintage kodachrome film stock aesthetic, authentic analog grain, gentle gate weave, optical warmth, desaturated shadows, nostalgic analog patina.',
      negativePrompt: 'digital 4K, ultra-clean digital sensor, modern smartphone video, plastic sheen, CGI, text, watermarks.'
    },
    {
      value: 'stop_motion_claymation',
      title: 'Stop-Motion & Claymation',
      masterAnchor: 'Tactile handmade stop-motion claymation, authentic sculpted plasticine texture with subtle fingerprint impressions, physical armature joints, stepped 12fps motion cadence, miniature studio lighting.',
      negativePrompt: 'smooth 60fps digital motion, CGI, flat 2D cartoon, photoreal human skin, liquid melting, motion blur.'
    }
  ];

export const AUDIO_PATHWAYS: Array<{
  value: AudioPathway;
  title: string;
  description: string;
}> = [
    {
      value: 'pathway_a_native_veo',
      title: 'Pathway A: Native Veo Soundscape & Dialogue',
      description: 'Veo 3.1 synthesizes audio, foley, and spoken lines directly from prompt instructions'
    },
    {
      value: 'pathway_b_external_audio',
      title: 'Pathway B: External Audio & Separate Script Track',
      description: 'Audio recorded/generated externally (ElevenLabs/TTS), prompts lip-synced or edited to track'
    }
  ];

export const AUDIO_DELIVERY_MODES: Array<{
  value: AudioDeliveryMode;
  title: string;
  description: string;
}> = [
    {
      value: 'separate_script_first',
      title: 'Script First (Recommended for External Audio)',
      description: 'Creates production/audio_script.txt first, locks dialogue and timing before clips'
    },
    {
      value: 'separate_all_at_once',
      title: 'All Together',
      description: 'Generates audio_script.txt and all clip prompts in a single coordinated pass'
    },
    {
      value: 'embedded',
      title: 'Embedded in Video Prompts',
      description: 'Inlines all dialogue directly inside each clip video prompt text'
    }
  ];

export const LINTER_REGISTRY = [
  { id: 'L01', name: 'Descriptive Completeness (Uncapped Depth)', target: 'video_prompt' },
  { id: 'L02', name: 'Equipment Noun Ban (tripod, dolly, crane)', target: 'all_prompts' },
  { id: 'L03', name: 'Pure Creative Prompt (no technical config tokens)', target: 'all_prompts' },
  { id: 'L04', name: 'Asymmetric Token Decay (viewport framing first 30)', target: 'video_prompt' },
  { id: 'L05', name: 'Single Camera Verb Rule', target: 'video_prompt' },
  { id: 'L06', name: 'Audio Soundscape Closure (Audio: ...)', target: 'video_prompt' },
  { id: 'L07', name: 'Photo-First Reference Lock (Ingredient mapping)', target: 'clips' },
  { id: 'L08', name: 'Facial Landmark Invariance', target: 'character_prompts' },
  { id: 'L09', name: 'Expression Decoupling Guard', target: 'character_prompts' },
  { id: 'L10', name: 'Biomechanical Energy Parity', target: 'video_prompt' },
  { id: 'L11', name: 'Three-Plane Depth Rig', target: 'environment_prompts' },
  { id: 'L12', name: 'Motivated Lighting Vectors', target: 'all_prompts' },
  { id: 'L13', name: 'Acoustic Ambience Signature', target: 'audio_script' },
  { id: 'L14', name: 'Temporal Quantum Pacing (4s/6s/8s/10s)', target: 'scratchbook' },
  { id: 'L15', name: 'Multi-Character Clean Singles', target: 'clips' },
  { id: 'L16', name: 'Spatial Handoff Vectors & Eyelines', target: 'clips' },
  { id: 'L17', name: 'Audio Bridge & BGM Dynamic Handover', target: 'audio_script' },
  { id: 'L18', name: 'Pluggable Style Injection', target: 'all_prompts' },
  { id: 'L19', name: 'Trust & Safety False-Positive Guard', target: 'all_prompts' }
];

export const BANNED_EQUIPMENT_NOUNS = [
  'tripod',
  'on tripod',
  'on a tripod',
  'camera rig',
  'camera rig on',
  'dolly track',
  'crane rig',
  'gimbal rig',
  'camera mount',
  'camera operator',
  'steadicam rig',
  'studio rig'
];

export const BANNED_TECHNICAL_TOKENS = [
  '16:9',
  '9:16',
  '1:1',
  '21:9',
  '1080p',
  '4k',
  '24fps',
  '30fps',
  '60fps',
  '8s',
  '6s',
  '4s'
];


