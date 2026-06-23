import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LogOut, Package, Image, MessageSquare, Plus, Trash2, Edit3, CheckCircle,
  Search, Eye, EyeOff, ShoppingBag, BarChart3, Upload, X, Loader2, RefreshCw
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, type Product, type Inquiry, type GalleryImage } from '../../lib/supabase';

type Tab = 'overview' | 'products' | 'gallery' | 'inquiries';

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    const [pRes, iRes, gRes] = await Promise.all([
      supabase.from('products').select('*').order('sort_order'),
      supabase.from('inquiries').select('*').order('created_at', { ascending: false }),
      supabase.from('gallery_images').select('*').order('sort_order'),
    ]);
    setProducts(pRes.data ?? []);
    setInquiries(iRes.data ?? []);
    setGallery(gRes.data ?? []);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin');
  };

  const newInquiries = inquiries.filter((i) => i.status === 'new').length;

  const tabs = [
    { id: 'overview' as Tab, label: 'Overview', icon: BarChart3 },
    { id: 'products' as Tab, label: 'Products', icon: Package },
    { id: 'gallery' as Tab, label: 'Gallery', icon: Image },
    { id: 'inquiries' as Tab, label: `Inquiries${newInquiries > 0 ? ` (${newInquiries})` : ''}`, icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800">Admin Dashboard</div>
                <div className="text-xs text-gray-400 hidden sm:block">{user?.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={loadAll} className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Refresh">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-rose-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-rose-50"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:block">Sign Out</span>
              </button>
            </div>
          </div>
          {/* Tab Nav */}
          <nav className="flex gap-1 pb-px overflow-x-auto">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === id
                    ? 'border-rose-500 text-rose-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-rose-400" />
          </div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <OverviewTab products={products} inquiries={inquiries} gallery={gallery} newInquiries={newInquiries} />
            )}
            {activeTab === 'products' && (
              <ProductsTab products={products} onRefresh={loadAll} />
            )}
            {activeTab === 'gallery' && (
              <GalleryTab gallery={gallery} onRefresh={loadAll} />
            )}
            {activeTab === 'inquiries' && (
              <InquiriesTab inquiries={inquiries} search={searchQuery} setSearch={setSearchQuery} onRefresh={loadAll} />
            )}
          </>
        )}
      </main>
    </div>
  );
}

/* ─── Overview ─── */
function OverviewTab({ products, inquiries, gallery, newInquiries }: {
  products: Product[]; inquiries: Inquiry[]; gallery: GalleryImage[]; newInquiries: number;
}) {
  const stats = [
    { label: 'Total Products', value: products.length, sub: `${products.filter(p => p.available).length} available`, color: 'bg-blue-50 text-blue-600' },
    { label: 'Gallery Images', value: gallery.length, sub: `${gallery.filter(g => g.featured).length} featured`, color: 'bg-amber-50 text-amber-600' },
    { label: 'Total Inquiries', value: inquiries.length, sub: `${newInquiries} new`, color: 'bg-rose-50 text-rose-600' },
    { label: 'Replied', value: inquiries.filter(i => i.status === 'replied').length, sub: 'inquiries replied', color: 'bg-green-50 text-green-600' },
  ];

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-2xl p-5`}>
            <div className="text-3xl font-bold font-serif">{stat.value}</div>
            <div className="text-sm font-medium mt-1">{stat.label}</div>
            <div className="text-xs opacity-70 mt-0.5">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Recent Inquiries</h3>
        </div>
        {inquiries.slice(0, 5).map((inq) => (
          <div key={inq.id} className="p-4 border-b border-gray-50 flex items-start gap-3">
            <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${inq.status === 'new' ? 'bg-rose-500' : 'bg-green-400'}`} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm text-gray-800">{inq.name}</span>
                <span className="text-xs text-gray-400">{inq.email}</span>
              </div>
              <p className="text-xs text-gray-500 truncate">{inq.message}</p>
            </div>
            <span className="text-xs text-gray-400 flex-shrink-0">
              {new Date(inq.created_at).toLocaleDateString('en-IN')}
            </span>
          </div>
        ))}
        {inquiries.length === 0 && (
          <div className="p-8 text-center text-gray-400 text-sm">No inquiries yet</div>
        )}
      </div>
    </div>
  );
}

/* ─── Products Tab ─── */
function ProductsTab({ products, onRefresh }: { products: Product[]; onRefresh: () => void }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await supabase.from('products').delete().eq('id', id);
    onRefresh();
  };

  const toggleAvailability = async (product: Product) => {
    await supabase.from('products').update({ available: !product.available }).eq('id', product.id);
    onRefresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-bold text-gray-800">Products</h2>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-rose-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-rose-600 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {showForm && (
        <ProductForm
          product={editing}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSave={() => { setShowForm(false); setEditing(null); onRefresh(); }}
        />
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="relative aspect-[4/3] bg-gray-50">
              <img src={product.image_url} alt={product.name} className="w-full h-full object-contain p-3" />
              <div className="absolute top-2 right-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${product.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {product.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 text-sm mb-0.5 truncate">{product.name}</h3>
              <p className="text-xs text-gray-400 mb-1">{product.size}</p>
              <p className="font-bold text-rose-600">₹{product.price.toLocaleString('en-IN')}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => toggleAvailability(product)}
                  className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    product.available
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {product.available ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  {product.available ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => { setEditing(product); setShowForm(true); }}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                >
                  <Edit3 className="w-3 h-3" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex items-center justify-center gap-1 py-1.5 px-3 bg-rose-50 text-rose-500 rounded-lg text-xs font-medium hover:bg-rose-100 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {products.length === 0 && (
        <div className="text-center py-16 text-gray-400">No products yet. Add your first product.</div>
      )}
    </div>
  );
}

/* ─── Product Form ─── */
function ProductForm({ product, onClose, onSave }: {
  product: Product | null; onClose: () => void; onSave: () => void;
}) {
  const [form, setForm] = useState({
    name: product?.name ?? '',
    description: product?.description ?? '',
    price: product?.price?.toString() ?? '',
    size: product?.size ?? '',
    image_url: product?.image_url ?? '',
    available: product?.available ?? true,
    featured: product?.featured ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(product?.image_url ?? '');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    let imageUrl = form.image_url;

    if (imageFile) {
      const ext = imageFile.name.split('.').pop();
      const fileName = `products/${Date.now()}.${ext}`;
      const { data, error } = await supabase.storage
        .from('basket-images')
        .upload(fileName, imageFile, { upsert: true });
      if (!error && data) {
        const { data: urlData } = supabase.storage.from('basket-images').getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }
    }

    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      size: form.size,
      image_url: imageUrl,
      available: form.available,
      featured: form.featured,
      updated_at: new Date().toISOString(),
    };

    if (product) {
      await supabase.from('products').update(payload).eq('id', product.id);
    } else {
      await supabase.from('products').insert(payload);
    }
    setSaving(false);
    onSave();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-xl font-bold text-gray-800">{product ? 'Edit Product' : 'Add New Product'}</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <div
              className="relative aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 overflow-hidden cursor-pointer hover:border-rose-300 transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-4" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-sm">Click to upload image</span>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            <div className="mt-2">
              <input
                type="text"
                value={form.image_url}
                onChange={(e) => { setForm(f => ({ ...f, image_url: e.target.value })); setImagePreview(e.target.value); }}
                placeholder="Or enter image URL"
                className="input-field text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input
              value={form.name}
              onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
              className="input-field"
              placeholder="e.g. Purple Wire Basket Set"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))}
                className="input-field"
                placeholder="4500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <input
                value={form.size}
                onChange={(e) => setForm(f => ({ ...f, size: e.target.value }))}
                className="input-field"
                placeholder="Set of 5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
              rows={4}
              className="input-field resize-none"
              placeholder="Describe the product..."
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.available}
                onChange={(e) => setForm(f => ({ ...f, available: e.target.checked }))}
                className="w-4 h-4 rounded text-rose-500"
              />
              <span className="text-sm text-gray-700">Available</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm(f => ({ ...f, featured: e.target.checked }))}
                className="w-4 h-4 rounded text-rose-500"
              />
              <span className="text-sm text-gray-700">Featured</span>
            </label>
          </div>

          <button
            onClick={handleSave}
            disabled={saving || !form.name || !form.price}
            className="w-full bg-rose-600 text-white py-3 rounded-xl font-semibold hover:bg-rose-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : 'Save Product'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Gallery Tab ─── */
function GalleryTab({ gallery, onRefresh }: { gallery: GalleryImage[]; onRefresh: () => void }) {
  const [showForm, setShowForm] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('general');
  const [featured, setFeatured] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    let finalUrl = imageUrl;

    if (imageFile) {
      const ext = imageFile.name.split('.').pop();
      const fileName = `gallery/${Date.now()}.${ext}`;
      const { data, error } = await supabase.storage
        .from('basket-images')
        .upload(fileName, imageFile, { upsert: true });
      if (!error && data) {
        const { data: urlData } = supabase.storage.from('basket-images').getPublicUrl(fileName);
        finalUrl = urlData.publicUrl;
      }
    }

    await supabase.from('gallery_images').insert({
      image_url: finalUrl,
      title,
      category,
      featured,
    });
    setSaving(false);
    setShowForm(false);
    setImageFile(null);
    setImagePreview('');
    setImageUrl('');
    setTitle('');
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    await supabase.from('gallery_images').delete().eq('id', id);
    onRefresh();
  };

  const toggleFeatured = async (img: GalleryImage) => {
    await supabase.from('gallery_images').update({ featured: !img.featured }).eq('id', img.id);
    onRefresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-bold text-gray-800">Gallery</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-rose-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-rose-600 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-xl font-bold text-gray-800">Add Gallery Image</h3>
              <button onClick={() => setShowForm(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div
                className="aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 overflow-hidden cursor-pointer hover:border-rose-300 transition-colors"
                onClick={() => fileRef.current?.click()}
              >
                {imagePreview || imageUrl ? (
                  <img src={imagePreview || imageUrl} alt="Preview" className="w-full h-full object-contain p-4" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-sm">Click to upload</span>
                  </div>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => { setImageUrl(e.target.value); setImagePreview(e.target.value); }}
                placeholder="Or enter image URL"
                className="input-field text-sm"
              />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Image title"
                className="input-field"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field"
              >
                <option value="general">General</option>
                <option value="collections">Collections</option>
                <option value="new arrivals">New Arrivals</option>
                <option value="featured">Featured</option>
              </select>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-rose-500"
                />
                <span className="text-sm text-gray-700">Mark as Featured</span>
              </label>
              <button
                onClick={handleSave}
                disabled={saving || (!imageFile && !imageUrl)}
                className="w-full bg-rose-600 text-white py-3 rounded-xl font-semibold hover:bg-rose-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : 'Add to Gallery'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((img) => (
          <div key={img.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden group">
            <div className="relative aspect-square bg-gray-50">
              <img src={img.image_url} alt={img.title} className="w-full h-full object-contain p-3" />
              {img.featured && (
                <span className="absolute top-2 left-2 bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">Featured</span>
              )}
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-gray-800 truncate">{img.title || 'Untitled'}</p>
              <p className="text-xs text-gray-400 capitalize mb-2">{img.category}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFeatured(img)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    img.featured ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {img.featured ? 'Unfeature' : 'Feature'}
                </button>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="py-1.5 px-3 bg-rose-50 text-rose-500 rounded-lg text-xs font-medium hover:bg-rose-100 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {gallery.length === 0 && (
        <div className="text-center py-16 text-gray-400">No gallery images yet.</div>
      )}
    </div>
  );
}

/* ─── Inquiries Tab ─── */
function InquiriesTab({ inquiries, search, setSearch, onRefresh }: {
  inquiries: Inquiry[]; search: string; setSearch: (s: string) => void; onRefresh: () => void;
}) {
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const filtered = inquiries.filter((inq) =>
    !search ||
    inq.name.toLowerCase().includes(search.toLowerCase()) ||
    inq.email.toLowerCase().includes(search.toLowerCase()) ||
    inq.message.toLowerCase().includes(search.toLowerCase())
  );

  const markReplied = async (id: string) => {
    await supabase.from('inquiries').update({ status: 'replied' }).eq('id', id);
    onRefresh();
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: 'replied' } : null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    await supabase.from('inquiries').delete().eq('id', id);
    if (selected?.id === id) setSelected(null);
    onRefresh();
  };

  const statusColor = (status: string) => {
    if (status === 'new') return 'bg-rose-100 text-rose-600';
    if (status === 'replied') return 'bg-green-100 text-green-600';
    return 'bg-gray-100 text-gray-500';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-bold text-gray-800">Inquiries</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries..."
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {/* List */}
        <div className="lg:col-span-2 space-y-2">
          {filtered.map((inq) => (
            <div
              key={inq.id}
              onClick={() => setSelected(inq)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selected?.id === inq.id ? 'border-rose-300 bg-rose-50' : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="font-medium text-sm text-gray-800">{inq.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(inq.status)}`}>
                  {inq.status}
                </span>
              </div>
              <p className="text-xs text-gray-400 truncate">{inq.message}</p>
              <p className="text-xs text-gray-300 mt-1">{new Date(inq.created_at).toLocaleDateString('en-IN')}</p>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">No inquiries found.</div>
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{selected.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(selected.status)}`}>
                    {selected.status}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(selected.created_at).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex gap-2">
                  <span className="text-gray-400 w-16 flex-shrink-0">Email:</span>
                  <a href={`mailto:${selected.email}`} className="text-rose-500 hover:text-rose-600">{selected.email}</a>
                </div>
                {selected.phone && (
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-16 flex-shrink-0">Phone:</span>
                    <span className="text-gray-700">{selected.phone}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-400 block mb-1">Message:</span>
                  <div className="bg-gray-50 rounded-xl p-4 text-gray-700 leading-relaxed">{selected.message}</div>
                </div>
              </div>
              <div className="flex gap-3">
                {selected.status !== 'replied' && (
                  <button
                    onClick={() => markReplied(selected.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-100 text-green-700 rounded-xl text-sm font-medium hover:bg-green-200 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" /> Mark as Replied
                  </button>
                )}
                <a
                  href={`mailto:${selected.email}?subject=Re: Your Inquiry - Malar Manickam Plastic Wire Baskets`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors"
                >
                  Reply via Email
                </a>
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="py-2.5 px-4 bg-rose-50 text-rose-500 rounded-xl text-sm font-medium hover:bg-rose-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400 sticky top-24">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-200" />
              <p className="text-sm">Select an inquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
