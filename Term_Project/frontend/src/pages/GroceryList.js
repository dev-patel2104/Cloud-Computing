import React from 'react';
import GroceryCard from '../components/GroceryCard';
import { getGroceryByEmail } from '../services/GroceryServices';
import { useEffect, useState } from 'react';

function GroceryList() {
    // Separate items into two arrays based on their status
    const [groceryData, setGroceryData] = useState([]);
    const [toBuyItems, setToBuyItems] = useState([]);
    const [boughtItems, setBoughtItems] = useState([]);

    const getGroceryItems = async () => {
        const email = "dev2104patel@gmail.com" // later will get this email from the local storage
        const allItems = await getGroceryByEmail(email);
        setGroceryData(allItems);
        setToBuyItems(allItems.filter((item) => item.status === 'To Buy'));
        setBoughtItems(allItems.filter((item) => item.status === 'Bought'));
    }

    useEffect(() => {
        getGroceryItems();
        //console.log(toBuyItems);
    }, []);

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
                        <GroceryCard key={grocery.grocery_id} {...grocery} />
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
                        <GroceryCard key={grocery.grocery_id} {...grocery} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GroceryList;
