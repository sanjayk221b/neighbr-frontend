import ShimmerPostCard from "./ShimmerPostCard";
import ShimmerNewPostInput from "./ShimmerNewPostInput";

const ShimmerCommunityFeed = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <ShimmerNewPostInput />
      {[...Array(5)].map((_, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-4">
          <ShimmerPostCard />
        </div>
      ))}
    </div>
  );
};

export default ShimmerCommunityFeed;
