import { Skeleton } from '@nextui-org/react';

/**
 * @Author : Daniel Salazar,   @date 2024-10-28 15:32:03
 * @description :Loading Section for Profile Page
 * @Props :
 */

export const SkeletonInformationData = () => {
  return (
    <div className="flex flex-wrap md:flex-nowrap w-[70vw] gap-5 justify-center">
      <div className='p-10 flex flex-col gap-2 items-center border rounded-lg'>
        <Skeleton className="flex rounded-full w-56 h-56"/>
        <Skeleton className="h-3 w-10 rounded-lg"/>
        <Skeleton className="h-3 w-4/5 rounded-lg"/>
      </div>  
      <div className="w-full p-5  justify-center items-center flex flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg"/>
        <Skeleton className="h-3 w-4/5 rounded-lg"/>
        <Skeleton className="h-3 w-3/5 rounded-lg"/>
        <Skeleton className="h-3 w-4/5 rounded-lg"/>
        <div className='w-full mt-10 flex justify-center gap-2'>
            <Skeleton className="h-10 w-40 rounded-lg"/>
            <Skeleton className="h-10 w-40 rounded-lg"/>
        </div>
      </div>
    </div>
  );
};
