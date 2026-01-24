import { Article } from "./mockData";

const FAVORITES_KEY = "newswave:favorites";

export const getFavorites = (): Article[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading favorites:", error);
    return [];
  }
};

export const addFavorite = (article: Article): void => {
  try {
    const favorites = getFavorites();
    const exists = favorites.some((fav) => fav.id === article.id);
    
    if (!exists) {
      favorites.unshift(article);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
};

export const removeFavorite = (articleId: string): void => {
  try {
    const favorites = getFavorites();
    const filtered = favorites.filter((fav) => fav.id !== articleId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
};

export const isFavorite = (articleId: string): boolean => {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.id === articleId);
};

export const exportFavorites = (): string => {
  const favorites = getFavorites();
  return JSON.stringify(favorites, null, 2);
};

export const importFavorites = (jsonString: string): boolean => {
  try {
    const imported = JSON.parse(jsonString);
    if (Array.isArray(imported)) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(imported));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error importing favorites:", error);
    return false;
  }
};
