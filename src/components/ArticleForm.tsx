import { useState, useEffect } from "react";
import { Article } from "@/utils/mockData";
import { useCreateArticle, useUpdateArticle } from "@/hooks/useArticles";
import { useCategories } from "@/hooks/useArticles";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";

interface ArticleFormProps {
  article?: Article;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ArticleForm = ({ article, open, onOpenChange }: ArticleFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    url: "",
    urlToImage: "",
    category: "",
    author: "",
    sourceName: "",
  });

  const { data: categories = [] } = useCategories();
  const createMutation = useCreateArticle();
  const updateMutation = useUpdateArticle();

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        description: article.description,
        content: article.content,
        url: article.url,
        urlToImage: article.urlToImage,
        category: article.category,
        author: article.author || "",
        sourceName: article.source.name,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        content: "",
        url: "",
        urlToImage: "",
        category: "",
        author: "",
        sourceName: "",
      });
    }
  }, [article, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    const articleData = {
      title: formData.title,
      description: formData.description,
      content: formData.content || formData.description,
      url: formData.url || "https://example.com/article",
      urlToImage: formData.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
      publishedAt: new Date().toISOString(),
      source: {
        name: formData.sourceName || "NewsWave",
      },
      category: formData.category,
      author: formData.author || undefined,
    };

    try {
      if (article) {
        await updateMutation.mutateAsync({
          id: article.id,
          article: articleData,
        });
        toast.success("Article updated successfully!");
      } else {
        await createMutation.mutateAsync(articleData);
        toast.success("Article created successfully!");
      }
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to save article");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{article ? "Edit Article" : "Create New Article"}</DialogTitle>
          <DialogDescription>
            {article ? "Update the article details below." : "Fill in the details to create a new article."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={6}
              placeholder="Article content (paragraphs separated by blank lines)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.slug} value={cat.slug}>
                      {cat.icon} {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sourceName">Source Name</Label>
            <Input
              id="sourceName"
              value={formData.sourceName}
              onChange={(e) => setFormData({ ...formData, sourceName: e.target.value })}
              placeholder="NewsWave"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">Article URL</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://example.com/article"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="urlToImage">Image URL</Label>
            <Input
              id="urlToImage"
              type="url"
              value={formData.urlToImage}
              onChange={(e) => setFormData({ ...formData, urlToImage: e.target.value })}
              placeholder="https://images.unsplash.com/photo-..."
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {createMutation.isPending || updateMutation.isPending
                ? "Saving..."
                : article
                  ? "Update"
                  : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleForm;

