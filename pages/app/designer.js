import { useState } from 'react';
import AppLayout from '../../components/app/AppLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';

export default function Designer() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [promptText, setPromptText] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Image upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.match(/^image\/(png|jpg|jpeg)$/)) {
      setError('Please upload a PNG or JPG image');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadedImage(ev.target.result);
      setError(null);
    };
    reader.onerror = () => setError('Failed to read image file');
    reader.readAsDataURL(file);
  };

  // Generate image handler
  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    try {
      // ...existing code...
      const res = await fetch('/api/generateImage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText, imageData: uploadedImage }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate image');
      setGeneratedImage(data.generatedImage || data.result || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-10 drop-shadow-lg text-center"
        >
          AI Room Designer
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-2xl"
        >
          <Card className="mb-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8">
            <div className="mb-6 flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="flex-1">
                <label className="block text-lg font-semibold text-white mb-2">Upload your room image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-white bg-white/20 rounded-xl p-2 focus:outline-none" />
                <AnimatePresence>
                  {uploadedImage && (
                    <motion.img
                      key="uploaded-img"
                      src={uploadedImage}
                      alt="Uploaded"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="mx-auto rounded-xl mt-4 max-h-56 shadow-lg border border-white/30"
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-lg font-semibold text-white mb-2">Describe your desired style</label>
              <textarea
                className="w-full p-4 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={promptText}
                onChange={e => setPromptText(e.target.value)}
                placeholder="e.g. Modern Scandinavian, cozy, lots of natural light..."
              />
            </div>
            <Button
              className="w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-lg font-bold rounded-xl shadow-lg hover:scale-105 transition-transform duration-200"
              onClick={handleGenerate}
              disabled={isLoading || !uploadedImage || !promptText}
            >
              {isLoading ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-2"
                >
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                  Generating...
                </motion.span>
              ) : 'Generate AI Design'}
            </Button>
            <AnimatePresence>
              {error && (
                <motion.div
                  key="error-msg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-center py-4 text-red-400 font-semibold"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="loading-anim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
            >
              <div className="p-8 bg-white/10 rounded-2xl shadow-xl flex flex-col items-center">
                <svg className="animate-spin h-10 w-10 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                <span className="text-white text-lg font-semibold">Generating your dream room...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {generatedImage && (
            <motion.div
              key="generated-img"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="w-full max-w-2xl mt-8"
            >
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8">
                <h4 className="font-semibold mb-4 text-white text-xl text-center">Generated Room Design</h4>
                <motion.img
                  src={generatedImage}
                  alt="Generated"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  className="mx-auto rounded-xl max-h-96 shadow-xl border border-white/30"
                />
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
