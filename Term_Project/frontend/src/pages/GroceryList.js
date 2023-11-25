import React, { useEffect, useState } from 'react';
import GroceryCard from '../components/GroceryCard';
import { getGroceryByEmail, addGroceryItem } from '../services/GroceryServices';
import GroceryAlertBox from '../components/GroceryAlertBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function GroceryList() {
    const [groceryData, setGroceryData] = useState([]);
    const [toBuyItems, setToBuyItems] = useState([]);
    const [boughtItems, setBoughtItems] = useState([]);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '',
        category: '',
        quantity: '',
        expiry_date: '',
        status: 'To Buy',
        email: ''
    });

    const getGroceryItems = async () => {
        const email = "dev2104patel@gmail.com"; // get this value from the local storage
        const allItems = await getGroceryByEmail(email);
        setGroceryData(allItems);
        setToBuyItems(allItems.filter((item) => item.status === 'To Buy'));
        setBoughtItems(allItems.filter((item) => item.status === 'Bought'));
    }

    const handleAlertOpen = (status) => {
        setIsAlertOpen(true);
        setNewItem((prevItem) => ({ ...prevItem, status }));
    }

    const handleAlertClose = () => {
        setIsAlertOpen(false);
        setNewItem((prevItem) => ({
            grocery_id: '',
            name: '',
            category: '',
            quantity: '',
            expiry_date: '',
            status: 'To Buy',
            email: prevItem.email,
        }));
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
    }

    const handleFormSubmit = async () => {
        // Add your logic to submit the form data
        console.log(newItem);
        await addGroceryItem(newItem);

        const updatedToBuyItems = toBuyItems.slice();
        const updatedBoughtItems = boughtItems.slice();

        if (newItem.status === 'To Buy') {
            updatedToBuyItems.push(newItem);
        } else if (newItem.status === 'Bought') {
            updatedBoughtItems.push(newItem);
        }

        setToBuyItems(updatedToBuyItems);
        setBoughtItems(updatedBoughtItems);

        // Close the alert after submitting
        handleAlertClose();
    }

    useEffect(() => {
        //const storedEmail = localStorage.getItem('user_email')
        setNewItem((prevItem) => ({ ...prevItem, email: 'dev2104patel@gmail.com' }));
        getGroceryItems();
    }, []);

    return (
        <div className="mx-auto p-4 w-screen">
            <div className='flex justify-center'>
                <h1 className="text-3xl font-bold mb-4">Grocery Items</h1>
            </div>

            {/* To Buy Section */}
            <div className='flex flex-col'>
                <div className='flex flex-row justify-center items-center gap-5 my-4'>
                    <h2 className="text-2xl font-bold">To Buy</h2>
                    <button onClick={() => handleAlertOpen('To Buy')} className="shadow-md shadow-gray-400 rounded-md py-1 px-2 font-bold">
                    <FontAwesomeIcon icon={faPlus} className="text-black transform hover:scale-150 transition-transform" />
                    </button>
                </div>
                <div className="flex flex-col gap-4 items-center">
                    {toBuyItems.map((grocery) => (
                        <GroceryCard key={grocery.grocery_id} {...grocery} getGroceryItems={getGroceryItems} />
                    ))}
                </div>
            </div>

            {/* Bought Section */}
            <div className='flex flex-col'>
                <div className='flex flex-row justify-center items-center gap-5 mt-12 mb-4'>
                    <h2 className="text-2xl font-bold">Bought</h2>
                    <button onClick={() => handleAlertOpen('Bought')} className=" shadow-md shadow-gray-400 rounded-md py-1 px-2 font-bold">
                        <FontAwesomeIcon icon={faPlus} className="text-black transform hover:scale-150 transition-transform" />
                    </button>
                </div>
                <div className="flex flex-col gap-4 items-center">
                    {boughtItems.map((grocery) => (
                        <GroceryCard key={grocery.grocery_id} {...grocery} getGroceryItems={getGroceryItems} />
                    ))}
                </div>
            </div>

            {/* Alert Dialog */}
            <GroceryAlertBox
                isAlertOpen={isAlertOpen}
                handleAlertClose={handleAlertClose}
                newItem={newItem}
                handleInputChange={handleInputChange}
                handleFormSubmit={handleFormSubmit}
            />
        </div>
    );
}

export default GroceryList;
