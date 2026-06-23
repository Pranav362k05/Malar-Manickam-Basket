import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  size: string;
  image_url: string;
  available: boolean;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'replied' | 'archived';
  created_at: string;
};

export type GalleryImage = {
  id: string;
  image_url: string;
  title: string;
  category: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
};
