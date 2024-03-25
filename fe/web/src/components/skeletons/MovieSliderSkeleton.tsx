import { Skeleton } from '@movieTone/ui';

const MovieSliderSkeleton = ({
  classNameCustom,
}: {
  classNameCustom: string;
}) => {
  return <Skeleton className={`${classNameCustom} w-full `} />;
};

export default MovieSliderSkeleton;
