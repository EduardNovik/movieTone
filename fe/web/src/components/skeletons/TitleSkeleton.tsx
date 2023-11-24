import { Skeleton } from '@movieTone/ui';

interface CardSkeletonProps {
  numOfCards: number;
}

const TitleSkeleton = ({ numOfCards }: CardSkeletonProps) => {
  const arr = Array(numOfCards).fill(0);
  return arr.map((_, i) => (
    <div key={i} className="w-full flex flex-col items-center md:w-1/2 gap-4">
      <Skeleton className="h-auto w-full aspect-video" />
      <Skeleton className="w-full h-[25px]" />
    </div>
  ));
};

export default TitleSkeleton;
