import { useState } from "react";
import { Download, Upload } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { exportFavorites, importFavorites } from "@/utils/favorites";
import ArticleCard from "@/components/ArticleCard";
import EmptyState from "@/components/EmptyState";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Favorites = () => {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFavorites = favorites.filter((article) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(query) ||
      article.description.toLowerCase().includes(query)
    );
  });

  const handleExport = () => {
    const data = exportFavorites();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newswave-favorites-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Favorites exported successfully!");
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          const success = importFavorites(content);
          if (success) {
            toast.success("Favorites imported successfully!");
            window.location.reload();
          } else {
            toast.error("Failed to import favorites. Invalid file format.");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Saved Articles</h1>
          <p className="text-muted-foreground text-lg">
            Your favorite articles are saved and available offline
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Search saved articles..."
            />
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={handleImport}>
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
            </div>
          </div>
        )}

        {filteredFavorites.length === 0 ? (
          <EmptyState type="favorites" />
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              {filteredFavorites.length} saved {filteredFavorites.length === 1 ? "article" : "articles"}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFavorites.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  isFavorite={isFavorite(article.id)}
                  onToggleFavorite={() => toggleFavorite(article)}
                />
              ))}
            </div>
          </>
        )}
      </main>
  );
};

export default Favorites;
