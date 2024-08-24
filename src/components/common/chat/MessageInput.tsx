import React, { useState, useRef } from "react";
import { Smile, Paperclip, Send, X } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { InputChangeEvent } from "@/types";

interface MessageInputProps {
  onSendMessage: (content: string, file?: File) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() || selectedFile) {
      onSendMessage(message, selectedFile || undefined);
      setMessage("");
      setSelectedFile(null);
    }
  };

  const handleEmojiClick = (emojiObject: any) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const handleFileChange = (e: InputChangeEvent) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const renderFilePreview = (file: File) => {
    const isImage = file.type.startsWith("image/");
    return (
      <div className="relative inline-block mr-2 mb-2">
        {isImage ? (
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="w-20 h-20 object-cover rounded"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded">
            <span className="text-xs text-center break-words p-1">
              {file.name}
            </span>
          </div>
        )}
        <button
          onClick={removeFile}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
        >
          <X size={12} />
        </button>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t relative">
      {selectedFile && (
        <div className="mb-2 flex flex-wrap">
          {renderFilePreview(selectedFile)}
        </div>
      )}
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="mr-2 text-gray-500 hover:text-gray-700"
        >
          <Smile size={24} />
        </button>
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          ref={fileInputRef}
          accept="image/*,.pdf,.doc,.docx,.txt"
        />
        <label
          htmlFor="file-upload"
          className="mr-2 cursor-pointer text-gray-500 hover:text-gray-700"
        >
          <Paperclip size={24} />
        </label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition"
        >
          <Send size={24} />
        </button>
      </div>
      {showEmojiPicker && (
        <div className="absolute bottom-full right-0 mb-2">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </form>
  );
};

export default MessageInput;
