import type { DictionaryEntry } from '@myorg/shared-types';

export class DictionaryService {
  static getMockData(): DictionaryEntry[] {
    return [
      { id: 1, title: "Vue", description: "The Progressive Framework", category: "frontend" },
      { id: 2, title: "Nx", description: "Smart Build System", category: "devtools" },
      { id: 3, title: "Megaport", description: "Network as a Service", category: "cloud" }
    ];
  }

  static filterByCategory(items: DictionaryEntry[], category: string): DictionaryEntry[] {
    return items.filter(item => item.category === category);
  }
}