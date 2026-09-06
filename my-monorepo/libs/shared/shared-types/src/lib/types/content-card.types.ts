export interface ContentCardEntry {
  id: number;
  title: string;
  description?: string;
}

export interface ContentCardItem {
  title: string;
  subtitle?: string;
  items: ContentCardEntry[];
}