import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function InquiryForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError('');

    try {
      // Save to database
      const { error: dbError } = await supabase.from('inquiries').insert({
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        message: data.message,
        status: 'new',
      });

      if (dbError) throw dbError;

      // Send email via Edge Function
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      await fetch(`${supabaseUrl}/functions/v1/send-inquiry-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify(data),
      });

      setSuccess(true);
      reset();
    } catch {
      setError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-10 shadow-lg text-center border border-green-100"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-gray-800 mb-3">Inquiry Submitted!</h3>
        <p className="text-gray-600 leading-relaxed">
          Thank you for contacting Malar Manickam Plastic Wire Baskets. Your inquiry has been successfully submitted. We will get back to you soon.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 btn-primary"
        >
          Send Another Inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
      <h2 className="font-serif text-2xl font-bold text-gray-800 mb-1 text-center">Inquiry Form</h2>
      <div className="gold-divider mb-6" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Your Name <span className="text-rose-500">*</span>
          </label>
          <input
            {...register('name', { required: 'Name is required' })}
            type="text"
            placeholder="Enter your full name"
            className={`input-field ${errors.name ? 'border-rose-400 ring-2 ring-rose-100' : ''}`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
            })}
            type="email"
            placeholder="your@email.com"
            className={`input-field ${errors.email ? 'border-rose-400 ring-2 ring-rose-100' : ''}`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Phone Number
          </label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Message <span className="text-rose-500">*</span>
          </label>
          <textarea
            {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Message must be at least 10 characters' } })}
            rows={5}
            placeholder="Describe your inquiry, custom order requirements, or any questions..."
            className={`input-field resize-none ${errors.message ? 'border-rose-400 ring-2 ring-rose-100' : ''}`}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-rose-500">{errors.message.message}</p>
          )}
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-rose-600 text-white py-4 rounded-xl font-semibold tracking-widest uppercase text-sm hover:bg-rose-700 transition-all duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
