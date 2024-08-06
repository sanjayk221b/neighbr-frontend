import ShimmerEffect from "./ShimmerEffect";

const ShimmerNewPostInput = () => (
  <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
    <div className="flex items-center mb-2">
      <ShimmerEffect className="w-10 h-10 rounded-full mr-3" />
      <ShimmerEffect className="h-4 w-32" />
    </div>
    <ShimmerEffect className="h-12 w-full rounded-lg mb-3" />
    <div className="flex justify-between items-center">
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <ShimmerEffect key={i} className="h-6 w-6" />
        ))}
      </div>
      <ShimmerEffect className="h-8 w-16 rounded-full" />
    </div>
  </div>
);

export default ShimmerNewPostInput;
