export interface TToolDetailRes {
  message: string;
  data: TTool;
  success: boolean;
}

export interface TToolRes {
  message: string;
  data: TToolData;
  success: boolean;
}

export interface TToolData {
  tools: TTool[];
  tags: TToolTag[];
}

export interface TTool {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  name: string;
  pathUrl: string;
  ogImageUrl: string;
  iconUrl: string;
  description: string;
  rate: number;
  usageCount: number;
  favoriteCount: number;
  isHot: boolean;
  status: string;
  suggestData: string[];
  author: TToolAuthor;
  tags: TToolTag[];
}

export interface TToolAuthor {
  id: string;
  username: string;
}

export interface TToolTag {
  id: string;
  name: string;
  slug: string;
  color: string;
}
