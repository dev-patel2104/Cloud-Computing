import React from 'react';
import GroceryCard from '../components/GroceryCard';

const groceryData = [
    { id: 1, name: 'Item 1', category: 'Category 1', status: 'To Buy', quantity: "10" },
    { id: 2, name: 'Item 2', category: 'Category 2', status: 'Bought', quantity: "5", expiry_date: '2023-11-30' },
    { id: 3, name: 'Item 1', category: 'Category 1', status: 'To Buy', quantity: "10" },
    { id: 4, name: 'Item 2', category: 'Category 2', status: 'Bought', quantity: "5", expiry_date: '2023-11-30' },
    { id: 5, name: 'Item 1', category: 'Category 1', status: 'To Buy', quantity: "10" },
    { id: 6, name: 'Item 2', category: 'Category 2', status: 'Bought', quantity: "5", expiry_date: '2023-11-30' },
    // Add more grocery items as needed
];

function GroceryList() {
    // Separate items into two arrays based on their status
    const toBuyItems = groceryData.filter((item) => item.status === 'To Buy');
    const boughtItems = groceryData.filter((item) => item.status === 'Bought');

    return (
        <div className="mx-auto p-4 w-screen">
            <div className='flex justify-center'>
                <h1 className="text-3xl font-bold mb-4">Grocery Items</h1>
            </div>

            {/* To Buy Section */}
            <div className='flex flex-col'>
                <div className='flex justify-center'>
                    <h2 className="text-2xl font-bold my-4">To Buy</h2>
                </div>
                <div className="flex flex-col gap-4 items-center">
                    {toBuyItems.map((grocery) => (
                        <GroceryCard key={grocery.id} {...grocery} />
                    ))}
                </div>
            </div>

            {/* Bought Section */}
            <div className='flex flex-col'>
                <div className='flex justify-center'>
                    <h2 className="text-2xl font-bold mt-12 mb-4">Bought</h2>
                </div>
                <div className="flex flex-col gap-4 items-center">
                    {boughtItems.map((grocery) => (
                        <GroceryCard key={grocery.id} {...grocery} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GroceryList;
