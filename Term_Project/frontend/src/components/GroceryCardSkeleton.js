import React from 'react';

function GroceryCardSkeleton() {
    return (
        <div className=" w-2/3 flex flex-col animate-pulse justify-between bg-gray-200 h-24 rounded-lg p-4 gap-4">
            <div className="flex gap-2 w-full justify-between">
                <p className="text-white font-bold text-xl"></p>
                <p className="text-white font-bold  text-xl"></p>
            </div>

            <div className="flex w-full ">
                <div className="flex flex-col w-full justify-between">
                    <p className="text-white font-medium text-md"></p>
                    <p className="text-white font-medium text-md"></p>
                </div>
                <div className='flex gap-4 items-center'>


                </div>
            </div>
        </div>
    );

}

export default GroceryCardSkeleton;