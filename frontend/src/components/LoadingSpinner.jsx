import { FourSquare } from "react-loading-indicators";


const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-50">
      <FourSquare color="#32cd32" size="medium" />
    </div>
  );
};

export default LoadingSpinner;
