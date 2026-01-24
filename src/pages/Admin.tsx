import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useArticles, useDeleteArticle } from "@/hooks/useArticles";
import { Article } from "@/utils/mockData";
import ArticleForm from "@/components/ArticleForm";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/Loader";
import { toast } from "sonner";

const Admin = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);

  const { data: articles = [], isLoading } = useArticles();
  const deleteMutation = useDeleteArticle();

  const handleCreate = () => {
    setSelectedArticle(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (article: Article) => {
    setSelectedArticle(article);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (article: Article) => {
    setArticleToDelete(article);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (articleToDelete) {
      try {
        await deleteMutation.mutateAsync(articleToDelete.id);
        toast.success("Article deleted successfully!");
        setDeleteDialogOpen(false);
        setArticleToDelete(null);
      } catch (error) {
        toast.error("Failed to delete article");
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Article Management</h1>
          <p className="text-muted-foreground text-lg">
            Create, update, and delete articles
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Create Article
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8"
                  onClick={() => handleEdit(article)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8"
                  onClick={() => handleDeleteClick(article)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardHeader>
              <div className="mb-2">
                <span className={`category-badge category-${article.category}`}>
                  {article.category}
                </span>
              </div>
              <CardTitle className="line-clamp-2">{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {article.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <ArticleForm
        article={selectedArticle}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the article
              "{articleToDelete?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default Admin;

