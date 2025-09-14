import React from "react";

export default function SubscriptionModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Upgrade to Pro</h2>
        <p className="mb-6">Unlock unlimited generations, 4K downloads, and team features for your business.</p>
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
