/*
  # Create Core Tables for Malar Manickam Plastic Wire Baskets

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - product name
      - `description` (text) - product description
      - `price` (numeric) - price in INR
      - `size` (text) - size description
      - `image_url` (text) - main product image URL
      - `available` (boolean) - availability status
      - `featured` (boolean) - featured on homepage
      - `sort_order` (integer) - display order
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `inquiries`
      - `id` (uuid, primary key)
      - `name` (text) - customer name
      - `email` (text) - customer email
      - `phone` (text) - customer phone
      - `message` (text) - inquiry message
      - `status` (text) - new/replied/archived
      - `created_at` (timestamptz)

    - `gallery_images`
      - `id` (uuid, primary key)
      - `image_url` (text) - image URL
      - `title` (text) - image title
      - `category` (text) - category label
      - `featured` (boolean) - featured in gallery
      - `sort_order` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public can SELECT products and gallery_images (published content)
    - Public can INSERT inquiries (contact form)
    - Only authenticated admin can manage all data

  3. Seed Data
    - Two initial products using uploaded images
*/

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  price numeric(10,2) NOT NULL DEFAULT 0,
  size text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  available boolean NOT NULL DEFAULT true,
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit inquiry"
  ON inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can view all inquiries"
  ON inquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can update inquiry status"
  ON inquiries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete inquiries"
  ON inquiries FOR DELETE
  TO authenticated
  USING (true);

-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'general',
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gallery images"
  ON gallery_images FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert gallery images"
  ON gallery_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update gallery images"
  ON gallery_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete gallery images"
  ON gallery_images FOR DELETE
  TO authenticated
  USING (true);

-- Seed initial products
INSERT INTO products (name, description, price, size, image_url, available, featured, sort_order)
VALUES
  (
    'Classic Purple Wire Basket Set',
    'A stunning set of 5 handcrafted plastic wire baskets in rich purple and cream tones. Perfect for home storage, gifting, and decoration. Features a signature diamond weave pattern on the sides and a woven lid, with elegant silver metal handles. Available in multiple sizes from compact to large.',
    4500.00,
    'Set of 5 (Small to Large)',
    '/WhatsApp_Image_2026-06-03_at_3.11.35_PM.jpeg',
    true,
    true,
    1
  ),
  (
    'Golden Brown Wire Basket Set',
    'An exquisite set of 5 handcrafted plastic wire baskets in warm golden-brown and white tones. Crafted with a beautiful lattice weave pattern and fitted with premium silver handles. Ideal for kitchen storage, home organization, and elegant gifting. Durable, lightweight, and long-lasting.',
    4500.00,
    'Set of 5 (Small to Large)',
    '/WhatsApp_Image_2026-06-03_at_3.11.34_PM.jpeg',
    true,
    true,
    2
  )
ON CONFLICT DO NOTHING;

-- Seed gallery images from products
INSERT INTO gallery_images (image_url, title, category, featured, sort_order)
VALUES
  ('/WhatsApp_Image_2026-06-03_at_3.11.35_PM.jpeg', 'Purple Wire Basket Set', 'collections', true, 1),
  ('/WhatsApp_Image_2026-06-03_at_3.11.34_PM.jpeg', 'Golden Brown Wire Basket Set', 'collections', true, 2)
ON CONFLICT DO NOTHING;
