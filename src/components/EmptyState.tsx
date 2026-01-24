import { FileX, Heart } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  type?: "search" | "favorites";
}

const EmptyState = ({ message, type = "search" }: EmptyStateProps) => {
  const Icon = type === "favorites" ? Heart : FileX;
  const defaultMessage = type === "favorites" 
    ? "No saved articles yet. Start exploring and save your favorites!"
    : "No articles found. Try a different search or category.";

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Icon className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Nothing here yet</h3>
      <p className="text-muted-foreground max-w-md">
        {message || defaultMessage}
      </p>
    </div>
  );
};

export default EmptyState;
