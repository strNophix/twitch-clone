export interface Pagination {
  cursor: string;
}

export interface UserFollow {
  followed_at: string;
  from_id: string;
  from_login: string;
  from_name: string;
  to_id: string;
  to_login: string;
  to_name: string;
}

export interface UserFollows {
  total: number;
  data: UserFollow[];
  pagination: Pagination;
}

export interface Stream {
  game_id: string;
  game_name: string;
  id: string;
  language: string;
  started_at: string;
  tag_ids: string[];
  thumbnail_url: string;
  title: string;
  type: string;
  user_id: string;
  user_login: string;
  user_name: string;
  viewer_count: number;
  is_mature: boolean;
}

export interface FollowedStreams {
  data: Stream[];
  pagination: Pagination;
}

export interface Category {
  id: string;
  name: string;
  box_art_url: string;
}

export interface SearchCategories {
  data: Category[];
  pagination: Pagination;
}
