export interface DictionaryEntry {
  id: number;
  title: string;
  description: string;
  category?: string;
}

// You can also define the shape of your API request/response here
export interface DictionaryResponse {
  data: DictionaryEntry[];
  total: number;
}