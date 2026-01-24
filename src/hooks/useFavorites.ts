import { useState, useEffect } from "react";
import { Article } from "@/utils/mockData";
import * as favoritesUtil from "@/utils/favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Article[]>([]);

  useEffect(() => {
    setFavorites(favoritesUtil.getFavorites());
  }, []);

  const addFavorite = (article: Article) => {
    favoritesUtil.addFavorite(article);
    setFavorites(favoritesUtil.getFavorites());
  };

  const removeFavorite = (articleId: string) => {
    favoritesUtil.removeFavorite(articleId);
    setFavorites(favoritesUtil.getFavorites());
  };

  const toggleFavorite = (article: Article) => {
    if (favoritesUtil.isFavorite(article.id)) {
      removeFavorite(article.id);
    } else {
      addFavorite(article);
    }
  };

  const isFavorite = (articleId: string) => {
    return favoritesUtil.isFavorite(articleId);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
};
