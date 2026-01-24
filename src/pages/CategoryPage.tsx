import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";
import { useArticlesByCategory, useCategory } from "@/hooks/useArticles";
import ArticleCard from "@/components/ArticleCard";
import SearchBar from "@/components/SearchBar";
import EmptyState from "@/components/EmptyState";
import Loader from "@/components/Loader";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();
  const { data: category, isLoading: categoryLoading } = useCategory(slug);
  const { data: articles = [], isLoading: articlesLoading, error: articlesError } = useArticlesByCategory(slug || "");

  const filteredArticles = useMemo(() => {
    let filtered = articles;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [slug, searchQuery, articles]);

  if (categoryLoading || articlesLoading) {
    return <Loader />;
  }

  if (articlesError) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Error loading articles</h2>
          <p className="text-muted-foreground">
            Please make sure the JSON server is running on port 3001
          </p>
        </div>
      </main>
    );
  }

  if (!category) {
    return (
      <main className="container mx-auto px-4 py-8">
        <EmptyState message="Category not found" />
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-5xl">{category.icon}</span>
            <h1 className="text-4xl font-bold">{category.name}</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Latest {category.name.toLowerCase()} news and updates
          </p>
        </div>

        <div className="mb-6">
          <SearchBar 
            onSearch={setSearchQuery}
            placeholder={`Search ${category.name.toLowerCase()} articles...`}
          />
        </div>

        {filteredArticles.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                isFavorite={isFavorite(article.id)}
                onToggleFavorite={() => toggleFavorite(article)}
              />
            ))}
          </div>
        )}
      </main>
  );
};

export default CategoryPage;
