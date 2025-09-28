import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface CommentFormProps {
  onSubmit: ({ message, name }: { message: string; name: string }) => void;
  isSubmitting?: boolean; // Add isSubmitting prop
}

const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  isSubmitting = false,
}) => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && name.trim()) {
      onSubmit({ message, name });
      setMessage("");
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama Anda"
        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent mb-4"
        required
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent transition"
        placeholder="Tinggalkan pesan untuk pasangan..."
        rows={4}
      ></textarea>
      <button
        type="submit"
        className={`mt-4 bg-deep-green text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-90 transform hover:scale-105"}`}
        disabled={isSubmitting}
      >
        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
        {isSubmitting ? "Mengirim..." : "Kirim Komentar"}
      </button>
    </form>
  );
};

export default CommentForm;
