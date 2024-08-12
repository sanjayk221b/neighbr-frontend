const ShimmerVisitorCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 animate-pulse"></div>
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>
      </div>
      <div className="space-y-3">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex items-center">
            <div className="w-6 h-6 bg-gray-200 rounded-full mr-3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShimmerVisitorCard;
