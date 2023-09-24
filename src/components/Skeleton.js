import { BsImageAlt } from "react-icons/bs";

export const SkeletonSectionData = ({ className }) => {
  return (
    <div className={className ? className : "mt-10"}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="card w-80 card-compact shadow bg-gray-300 animate-pulse">
      <figure>
        <div className="w-full h-32 justify-center items-center flex">
          <BsImageAlt className="text-6xl text-gray-200" />
        </div>
      </figure>
      <div className="card-body space-y-4">
        <div className="w-16 h-3 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-56 h-4 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="card-actions justify-start items-center">
          <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-200 animate-pulse">
          </div>
        </div>
      </div>
    </div>
  );
};
