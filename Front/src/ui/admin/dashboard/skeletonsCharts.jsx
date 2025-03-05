import { Skeleton } from '@nextui-org/react';

/**
 * @Author : Daniel Salazar,   @date 2024-11-02 12:08:08
 * @description :charts Skeletons loadings
 * @Props :null
 */

export const SkeletonsCharts = () => {
  return (
    <div className='w-full flex flex-col items-center gap-2'>
        <Skeleton className="rounded-lg w-80">
            <div className="h-10 w-56 rounded-full bg-gray-500">
            </div>
        </Skeleton>
        <Skeleton className="rounded-lg w-full">
            <div className="h-80 rounded-full bg-gray-500"></div>
        </Skeleton>
    </div>
  );
};
