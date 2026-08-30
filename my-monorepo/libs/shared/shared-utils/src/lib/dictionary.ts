import type { DictionaryEntry } from '@myorg/shared-types';

// 1. Private state (Internal to this file)
let dictionaryData: DictionaryEntry[] = [];

// 2. The Setter (Called by your App once)
export function setDictionaryData(data: DictionaryEntry[]): void {
  dictionaryData = data;
}

// 3. The Lookup Functions (Pure, no side effects)
export function getEntryById(id: number): DictionaryEntry | undefined {
  return dictionaryData.find(entry => entry.id === id);
}

export function getDescriptionById(id: number): string {
  const entry = getEntryById(id);
  return entry ? entry.description : `Unknown ID: ${id}`;
}

export function getTitleById(id: number): string {
  const entry = getEntryById(id);
  return entry ? entry.title : `Unknown ID: ${id}`;
}