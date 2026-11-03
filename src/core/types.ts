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
  current_stage: 'explore' | 'proposed' | 'produced' | 'guiding' | 'completed' | string;
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
  aspect_ratio: AspectRatio | string;
  audio_pathway: AudioPathway | string;
  visual_dna: {
    master_style_anchor: string;
    negative_prompt: string;
  };
  subject_dna?: {
    name: string;
    biometrics: string;
  };
  environment_dna?: {
    setting: string;
  };
  pacing_profile?: {
    default_clip_duration: number;
    words_per_second: number;
    onset: string;
  };
}

