import ShimmerEffect from "./ShimmerEffect";

const ShimmerPostCard = () => (
  <div className="border-b border-gray-200 p-4">
    <div className="flex items-center mb-4">
      <ShimmerEffect className="w-10 h-10 rounded-full mr-3" />
      <div>
        <ShimmerEffect className="h-4 w-32 mb-2" />
        <ShimmerEffect className="h-3 w-24" />
      </div>
    </div>
    <ShimmerEffect className="h-16 w-full mb-4" />
    <ShimmerEffect className="h-48 w-full rounded-lg mb-4" />
    <div className="flex items-center mb-4">
      <ShimmerEffect className="h-6 w-16 mr-4" />
      <ShimmerEffect className="h-6 w-16" />
    </div>
    <div className="mt-4">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex items-start mb-4">
          <ShimmerEffect className="w-8 h-8 rounded-full mr-2" />
          <div className="flex-grow">
            <ShimmerEffect className="h-4 w-24 mb-2" />
            <ShimmerEffect className="h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ShimmerPostCard;
