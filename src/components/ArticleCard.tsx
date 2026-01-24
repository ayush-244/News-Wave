import { formatDistanceToNow } from "date-fns";
import { Heart, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Article } from "@/utils/mockData";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

interface ArticleCardProps {
  article: Article;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const ArticleCard = ({ article, isFavorite, onToggleFavorite }: ArticleCardProps) => {
  const getCategoryClass = (category: string) => {
    return `category-${category.toLowerCase()}`;
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/article/${article.id}`}>
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className={`category-badge ${getCategoryClass(article.category)}`}>
              {article.category}
            </span>
          </div>
        </div>
      </Link>

      <CardHeader className="space-y-2">
        <Link to={`/article/${article.id}`}>
          <h3 className="text-lg font-bold leading-tight line-clamp-2 transition-colors hover:text-primary">
            {article.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {article.description}
        </p>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <span className="font-medium">{article.source.name}</span>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite();
          }}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorite ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
