import { useState } from "react";
import { Trash, Image, Video, FileText } from "lucide-react";

const NewPostInput = ({ onSubmit, currentUser }) => {
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim()) {
      const formData = new FormData();
      formData.append("content", postContent);
      if (selectedImage) {
        formData.append("images", selectedImage);
      }
      onSubmit(formData);
      setPostContent("");
      setSelectedImage(null);
      setIsExpanded(false);
    }
  };

  const handleImageSelect = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <img
          src={currentUser.image}
          alt={currentUser.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <span className="font-semibold text-gray-700">{currentUser.name}</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className={`border border-gray-300 rounded-lg ${
            isExpanded ? "p-3" : ""
          }`}
          onClick={() => setIsExpanded(true)}
        >
          <textarea
            className="w-full resize-none outline-none"
            rows={isExpanded ? 4 : 1}
            placeholder="What do you want to talk about?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
        </div>
        {isExpanded && (
          <div className="flex flex-col mt-3">
            {selectedImage && (
              <div className="relative mb-2">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="w-full h-auto rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleImageRemove}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            )}
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <label
                  htmlFor="image-upload"
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <Image className="h-6 w-6" />
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageSelect}
                  />
                </label>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Video className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FileText className="h-6 w-6" />
                </button>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200"
                disabled={!postContent.trim()}
              >
                Post
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewPostInput;
