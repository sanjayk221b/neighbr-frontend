import { useState } from "react";
import { Smile, Paperclip, Send } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleEmojiClick = (emojiObject: any) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t relative">
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
          // onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
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
