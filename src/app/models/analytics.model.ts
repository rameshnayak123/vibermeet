export interface UserBehavior {
  user_id: string;
  behavior_analysis: {
    total_actions: number;
    peak_hours: number[];
    activity_score: number;
  };
  content_preferences: { [key: string]: number };
  optimal_posting_times: number[];
  user_segment: string;
}

export interface EngagementPrediction {
  predicted_engagement_rate: number;
  confidence_score: number;
  optimization_suggestions: {
    best_posting_time: number;
    recommended_hashtags: string[];
    content_improvements: string[];
  };
}

export interface AnalyticsDashboard {
  user_id: string;
  content_stats: {
    total_posts: number;
    total_reels: number;
    total_likes: number;
    total_views: number;
    average_engagement_rate: number;
  };
  ml_insights: {
    activity_score: number;
    peak_hours: number[];
    content_preferences: { [key: string]: number };
    predicted_growth_rate: number;
    audience_sentiment: string;
  };
  recommendations: {
    content_strategy: string[];
    posting_schedule: number[];
    trending_topics: string[];
  };
}