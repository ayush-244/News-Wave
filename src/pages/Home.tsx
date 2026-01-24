import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useArticles, useCategories } from "@/hooks/useArticles";
import ArticleCard from "@/components/ArticleCard";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import EmptyState from "@/components/EmptyState";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();
  const { data: articles = [], isLoading: articlesLoading, error: articlesError } = useArticles();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const filteredArticles = useMemo(() => {
    let filtered = articles;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((article) => article.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query) ||
          article.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery, articles]);

  const topStory = articles[0];

  if (articlesLoading || categoriesLoading) {
    return <Loader />;
  }

  if (articlesError) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Error loading articles</h2>
          <p className="text-muted-foreground mb-4">
            Please make sure the JSON server is running on port 3001
          </p>
          <p className="text-sm text-muted-foreground">
            Run: npm run server
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Top Story</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 bg-card rounded-xl overflow-hidden shadow-lg">
            <div className="relative h-64 md:h-auto">
              <img
                src={topStory.urlToImage}
                alt={topStory.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <span className={`category-badge ${`category-${topStory.category}`} w-fit mb-4`}>
                {topStory.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {topStory.title}
              </h1>
              <p className="text-muted-foreground mb-6 text-lg">
                {topStory.description}
              </p>
              <Link to={`/article/${topStory.id}`}>
                <Button size="lg">Read Full Story</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Category Shortcuts */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.slug} to={`/category/${category.slug}`}>
                <div className="group p-6 bg-card rounded-lg border transition-all hover:shadow-md hover:border-primary">
                  <div className="text-4xl mb-2 transition-transform group-hover:scale-110">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest News Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Latest News</h2>
          
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              <SearchBar onSearch={setSearchQuery} />
            </div>

            {filteredArticles.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.slice(1).map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    isFavorite={isFavorite(article.id)}
                    onToggleFavorite={() => toggleFavorite(article)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
  );
};

export default Home;
