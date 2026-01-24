import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Heart, Share2, ExternalLink, Clock, User } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useArticle, useArticlesByCategory } from "@/hooks/useArticles";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { toast } from "sonner";

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { data: article, isLoading, error } = useArticle(id);
  const { data: relatedArticles = [] } = useArticlesByCategory(article?.category || "");

  if (isLoading) {
    return <Loader />;
  }

  if (error || !article) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Article not found</h2>
          <p className="text-muted-foreground mb-4">
            {error ? "Error loading article. Please make sure the JSON server is running." : "The article you're looking for doesn't exist."}
          </p>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </main>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const favorited = isFavorite(article.id);

  return (
    <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <article className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className={`category-badge ${`category-${article.category}`}`}>
              {article.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="font-medium">{article.author || article.source.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <time>{format(new Date(article.publishedAt), "MMMM d, yyyy 'at' h:mm a")}</time>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-8">
            <Button
              variant={favorited ? "default" : "outline"}
              onClick={() => {
                toggleFavorite(article);
                toast.success(favorited ? "Removed from favorites" : "Added to favorites");
              }}
            >
              <Heart className={`mr-2 h-4 w-4 ${favorited ? "fill-current" : ""}`} />
              {favorited ? "Saved" : "Save"}
            </Button>
            
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>

            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" />
                Source
              </Button>
            </a>
          </div>

          <div className="relative h-96 mb-8 rounded-xl overflow-hidden">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {article.description}
            </p>
            
            <div className="article-content">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Published by</p>
            <p className="font-semibold text-lg">{article.source.name}</p>
            {article.author && (
              <p className="text-sm text-muted-foreground mt-1">By {article.author}</p>
            )}
          </div>
        </article>

        {/* Related Articles */}
        <section className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6">More from {article.category}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedArticles
              .filter((a) => a.id !== article.id)
              .slice(0, 3)
              .map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/article/${relatedArticle.id}`}
                  className="group"
                >
                  <div className="relative h-32 rounded-lg overflow-hidden mb-2">
                    <img
                      src={relatedArticle.urlToImage}
                      alt={relatedArticle.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {relatedArticle.title}
                  </h3>
                </Link>
              ))}
          </div>
        </section>
      </main>
  );
};

export default ArticlePage;
