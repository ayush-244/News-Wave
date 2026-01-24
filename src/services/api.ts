import axios from "axios";
import { Article } from "@/utils/mockData";

const API_BASE_URL = "http://localhost:3001";

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Category {
  slug: string;
  name: string;
  icon: string;
}

// Article API functions
export const articleApi = {
  // GET all articles
  getAll: async (): Promise<Article[]> => {
    const response = await apiClient.get<Article[]>("/articles");
    return response.data;
  },

  // GET article by ID
  getById: async (id: string): Promise<Article> => {
    const response = await apiClient.get<Article>(`/articles/${id}`);
    return response.data;
  },

  // GET articles by category
  getByCategory: async (category: string): Promise<Article[]> => {
    const response = await apiClient.get<Article[]>("/articles", {
      params: { category },
    });
    return response.data;
  },

  // CREATE new article
  create: async (article: Omit<Article, "id">): Promise<Article> => {
    const response = await apiClient.post<Article>("/articles", article);
    return response.data;
  },

  // UPDATE article
  update: async (id: string, article: Partial<Article>): Promise<Article> => {
    const response = await apiClient.patch<Article>(`/articles/${id}`, article);
    return response.data;
  },

  // DELETE article
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/articles/${id}`);
  },
};

// Category API functions
export const categoryApi = {
  // GET all categories
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>("/categories");
    return response.data;
  },

  // GET category by slug
  getBySlug: async (slug: string): Promise<Category> => {
    const response = await apiClient.get<Category[]>("/categories", {
      params: { slug },
    });
    return response.data[0];
  },
};

