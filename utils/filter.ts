// utils/filter.ts
import { PostData } from "@/types/post";

export interface FilterState {
  selectedCategories: string[];
  statusFilter: string; // Endret fra dateFilter til statusFilter
  showMyPosts: boolean;
  showJoinedPosts: boolean;
  searchText: string;
}

export const defaultFilterState: FilterState = {
  selectedCategories: [],
  statusFilter: "alle", // Endret
  showMyPosts: false,
  showJoinedPosts: false,
  searchText: "",
};

export const categories = [
  "Nabolag",
  "Fritidsklubb",
  "Skole",
  "Kultur",
  "Idrett",
  "Miljø",
  "Annet",
];

export const statusFilters = [
  { value: "alle", label: "Alle" },
  { value: "kommende", label: "Kommende" },
  { value: "pågående", label: "Pågående" },
  { value: "tidligere", label: "Tidligere" },
];

export const hasActiveFilters = (filters: FilterState): boolean => {
  return filters.selectedCategories.length > 0 || 
         filters.statusFilter !== "alle" || // Endret
         filters.showMyPosts || 
         filters.showJoinedPosts;
};

export const resetFilters = (): FilterState => {
  return { ...defaultFilterState };
};

export const toggleCategory = (category: string, currentFilters: FilterState): FilterState => {
  const newCategories = currentFilters.selectedCategories.includes(category)
    ? currentFilters.selectedCategories.filter(c => c !== category)
    : [...currentFilters.selectedCategories, category];
  
  return { ...currentFilters, selectedCategories: newCategories };
};