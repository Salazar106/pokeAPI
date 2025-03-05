import { Card, Skeleton } from '@nextui-org/react';


export const SkeletonCard = () => {
  return (
        <Card className="w-full space-y-5 p-4" radius="lg">
            <div className='flex flex-col gap-2'>
                <Skeleton className="rounded-lg flex  ">
                    <div className="h-80 rounded-full bg-gray-500"></div>
                </Skeleton>
            </div>    
        </Card>
  );
};
