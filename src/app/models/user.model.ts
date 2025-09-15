export interface User {
  user_id: string;
  username: string;
  email: string;
  bio?: string;
  profile_picture_url?: string;
  followers?: number;
  following?: number;
  posts_count?: number;
  reels_count?: number;
  created_at?: string;
  preferences?: {
    content_types: string[];
    privacy_level: string;
  };
  behavior_insights?: {
    total_actions: number;
    peak_hours: number[];
    activity_score: number;
  };
}

export interface CreateUserRequest {
  username: string;
  email: string;
  bio?: string;
  interests?: string[];
  privacy_level?: string;
}

export interface UpdateUserRequest {
  user_id: string;
  username?: string;
  bio?: string;
  preferences?: {
    content_types: string[];
    privacy_level: string;
  };
}