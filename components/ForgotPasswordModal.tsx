"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForgotPasswordModal({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) {
  const { supabase } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    setIsLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password#`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to send reset email"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>

        {success ? (
          <div className="space-y-4">
            <p className="text-green-600 dark:text-green-400">
              Reset link has been sent to your email address. Please check your
              inbox.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2 px-4 bg-primary-darker text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-brand focus:outline-none focus:ring-brand sm:text-sm"
                required
              />
            </div>
            <div className="flex justify-between space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-primary hover:text-primary-dark transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                disabled={isLoading}
                className="flex justify-center rounded-md border border-transparent bg-brand px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
