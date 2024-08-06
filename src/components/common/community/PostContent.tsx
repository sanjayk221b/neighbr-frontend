const PostContent = ({ content, images }) => {
  return (
    <div className="mb-4">
      <p className="text-sm mb-2">{content}</p>
      {images &&
        images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Post content"
            className="w-full rounded-lg"
          />
        ))}
    </div>
  );
};

export default PostContent;
