export interface ContentItem {
  title: string;
  image: string;
  video: string;
  content: string;
  created_at_jalali: string;
  updated_at_jalali: string;
}

export interface Funny {
  title: string;
  slug: string;
  description: string;
  poster: string;
  video: string;
  text: string;
  views: number;
  created_at_jalali: string;
  updated_at_jalali: string;
  content: ContentItem[];
}
