export type OperatingTier = 'lean_base_reference' | 'modular_studio';

export type ProjectArchetype =
  | 'social_ugc'
  | 'explainer'
  | 'cinema'
  | 'commercial'
  | 'animation_2d'
  | 'music_video';

export type AspectRatio = '16:9' | '9:16' | '1:1' | '21:9';

export type VisualStyleId =
  | 'social_ugc_video'
  | 'vector_stick_figure'
  | 'live_action_cinema'
  | 'commercial_tabletop'
  | 'traditional_2d_anime'
  | 'stylized_3d_cgi'
  | 'vintage_retro_film'
  | 'stop_motion_claymation';

export type AudioPathway = 'pathway_a_native_veo' | 'pathway_b_external_audio';

export type AudioDeliveryMode = 'separate_script_first' | 'separate_all_at_once' | 'embedded';

export type FlowVideoModel = 'veo-3.1';
export type FlowImageModel = 'imagen-4';
export type FlowDirectorModel = 'gemini-1.5-pro';

export interface FlowOrchestration {
  video_model: FlowVideoModel;
  image_model: FlowImageModel;
  director_model: FlowDirectorModel;
}

export interface OpenProducerConfig {
  $comment?: string;
  project_name: string;
  archetype: ProjectArchetype | string;
  tier: OperatingTier;
  visual_style: VisualStyleId | string;
  aspect_ratio: AspectRatio | string;
  resolution: string;
  target_duration_seconds: number;
  flow_orchestration: FlowOrchestration;
  audio_pathway: AudioPathway | string;
  audio_delivery_mode: AudioDeliveryMode | string;
  language: string;
  linter_profile: string;
  story_template_id?: string;
  package_template_id?: string;
}

export interface StageTracker {
  propose_complete: boolean;
  produce_complete: boolean;
  clips_generated: boolean;
  base_image_locked: boolean;
  audio_script_locked: boolean;
  clips_rendered: boolean;
  assembly_complete: boolean;
}

export interface InteractiveGuidance {
  enabled: boolean;
  active_step: string;
}

export interface OpenProducerState {
  $comment?: string;
  project_name: string;
  tier: OperatingTier | string;
  current_stage: 'init' | 'explore' | 'proposed' | 'produced' | 'guiding' | 'completed' | string;
  stages: StageTracker;
  interactive_guidance: InteractiveGuidance;
  template_loaded: string;
  created_at: string;
  updated_at: string;
}

export type LinterStatus = 'PASS' | 'WARN' | 'FAIL' | 'PENDING';

export interface LinterEntry {
  status: LinterStatus;
  [key: string]: unknown;
}

export interface OpenProducerManifest {
  $comment?: string;
  project_name: string;
  linter_suite_version: string;
  audit_timestamp: string;
  certification_status: 'CERTIFIED' | 'WARNINGS' | 'FAILED' | 'PENDING';
  linters: Record<string, LinterEntry>;
}

export interface InitOptions {
  directory?: string;
  name?: string;
  archetype?: ProjectArchetype | string;
  tier?: OperatingTier;
  aspectRatio?: AspectRatio | string;
  style?: VisualStyleId | string;
  audio?: AudioPathway | string;
  delivery?: AudioDeliveryMode | string;
  template?: string;
  yes?: boolean;
  interactive?: boolean;
  force?: boolean;
  offline?: boolean;
  token?: string;
}

export interface DoctorResult {
  certified: boolean;
  passedCount: number;
  warningCount: number;
  failureCount: number;
  results: Array<{
    id: string;
    name: string;
    status: LinterStatus;
    details: string;
  }>;
}

export interface SeriesTemplate {
  template_id: string;
  name: string;
  archetype: ProjectArchetype | string;
  tier?: OperatingTier | string;
  aspect_ratio: AspectRatio | string;
  resolution?: string;
  audio_pathway: AudioPathway | string;
  audio_delivery_mode?: AudioDeliveryMode | string;
  visual_dna: {
    style_id?: string;
    master_style_anchor: string;
    negative_prompt: string;
  };
  subject_dna?: {
    name?: string;
    biometrics?: string;
    wardrobe?: string;
    expression_profile?: string;
  };
  environment_dna?: {
    setting?: string;
    spatial_description?: string;
    lighting_rig?: string;
    acoustics?: string;
  };
  pacing_profile?: {
    default_clip_duration?: number;
    speech_pacing?: number;
    vocal_attack?: string;
    voice_preset?: string;
  };
  motion_graphics?: {
    font_family?: string;
    primary_color?: string;
    accent_color?: string;
    style?: string;
  };
  raw_content?: string;
}

export type StoryArchetype =
  | 'pure_narration'
  | 'dialogue_heavy'
  | 'hybrid'
  | 'silent_visual'
  | string;

export interface StoryTemplate {
  template_id: string;
  type: 'story';
  name: string;
  narrative_archetype: StoryArchetype;
  voice_persona?: string;
  target_wpm?: number;
  pacing_structure?: Array<{
    section: string;
    duration_target: string;
    rule: string;
  }>;
  dialogue_rules?: {
    sentence_cadence?: string;
    expression_tags?: string[];
    banned_cliches?: string[];
  };
  raw_content?: string;
}

export interface TemplateInfo {
  id: string;
  path: string;
  group: string;
}

export interface GenericTemplate {
  template_id: string;
  group: string;
  type?: string;
  name: string;
  raw_content?: string;
  metadata?: Record<string, any>;
}


