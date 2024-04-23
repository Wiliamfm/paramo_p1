export enum NewsType {
  title = "title",
  subtitle = "subtitle",
  content = "content",
  bannerImage = "bannerImage",
  images = "images",
  videos = "video",
}

export enum NewsInputType {
  title = "title",
  subtitle = "subtitle",
  description = "description",
  banner = "banner",
  carousel = "carousel",
  video = "video",
}

export interface NewsComponent {
  type: NewsType;
  value: string | string[];
  order: number;
}

export interface News{
  id?: number;
  title: string;
  components: NewsComponent[];
  last_modification?: Date;
}
