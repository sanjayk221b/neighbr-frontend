interface ShimmerEffectProps {
  className?: string;
}

const ShimmerEffect: React.FC<ShimmerEffectProps> = ({ className }) => (
  <div
    className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 ${className}`}
  ></div>
);

export default ShimmerEffect;
