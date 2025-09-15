export interface Post {
  post_id: string;
  user_id: string;
  username: string;
  content: string;
  category: string;
  hashtags: string[];
  media_urls: string[];
  likes: number;
  comments: number;
  shares: number;
  created_at: string;
  sentiment_analysis: {
    sentiment: string;
    score: number;
  };
}

export interface Reel {
  reel_id: string;
  user_id: string;
  username: string;
  title: string;
  description: string;
  category: string;
  video_url: string;
  thumbnail_url: string;
  duration: number;
  hashtags: string[];
  music_id: string;
  effects: string[];
  views: number;
  likes: number;
  comments: number;
  shares: number;
  created_at: string;
  sentiment_analysis: {
    sentiment: string;
    score: number;
  };
  engagement_rate: number;
}

export interface CreatePostRequest {
  user_id: string;
  content: string;
  category: string;
  hashtags?: string[];
  media_urls?: string[];
}

export interface CreateReelRequest {
  user_id: string;
  content: string;
  description?: string;
  category: string;
  video_url: string;
  thumbnail_url?: string;
  duration?: number;
  hashtags?: string[];
  music_id?: string;
  effects?: string[];
}

export interface SentimentAnalysis {
  text: string;
  sentiment: {
    sentiment: string;
    score: number;
  };
  ml_insights: {
    word_count: number;
    predicted_engagement: number;
    content_quality_score: number;
    toxicity_score: number;
    readability_score: number;
  };
}

export interface Recommendation {
  type: string;
  categories?: string[];
  sample_posts?: Post[];
  recommended_users?: any[];
  algorithm: string;
}