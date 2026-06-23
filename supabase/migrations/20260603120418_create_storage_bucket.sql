/*
  # Create Storage Bucket for Basket Images

  Creates a public storage bucket for product and gallery images
  with appropriate RLS policies.
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'basket-images',
  'basket-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view basket images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'basket-images');

CREATE POLICY "Admin can upload basket images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'basket-images');

CREATE POLICY "Admin can update basket images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'basket-images');

CREATE POLICY "Admin can delete basket images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'basket-images');
