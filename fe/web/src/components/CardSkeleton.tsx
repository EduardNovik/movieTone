import { Skeleton } from '@movieTone/ui';

interface CardSkeletonProps {
  numOfCards: number;
}

const CardSkeleton = ({ numOfCards }: CardSkeletonProps) => {
  const arr = Array(numOfCards).fill(0);
  return arr.map((_, i) => (
    <div
      key={i}
      className="w-full p-4 flex flex-col items-center md:w-1/2 gap-4"
    >
      <Skeleton className="w-full h-[362px]" />
      <Skeleton className="w-full h-[40px]" />
    </div>
  ));
};

export default CardSkeleton;
