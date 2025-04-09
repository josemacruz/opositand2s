import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
const DeleteModal = ({
  isDeleteModalOpen,
  onClose,
}: {
  isDeleteModalOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAccount = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/user/delete?userId=${user.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete account");
      }

      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Delete account error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to delete account"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    isDeleteModalOpen && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
          <h3 className="text-xl font-semibold mb-4">Delete Account?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            This action cannot be undone. All your data will be permanently
            deleted.
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAccount}
              disabled={isLoading}
              className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50"
            >
              {isLoading ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteModal;
