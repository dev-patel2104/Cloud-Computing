import React, { useEffect, useState } from 'react';
import GroceryCard from '../components/GroceryCard';
import GroceryCardSkeleton from '../components/GroceryCardSkeleton';
import { getGroceryByEmail, addGroceryItem } from '../services/GroceryServices';
import GroceryAlertBox from '../components/GroceryAlertBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function GroceryList() {
    const [groceryData, setGroceryData] = useState([]);
    const [toBuyItems, setToBuyItems] = useState([]);
    const [boughtItems, setBoughtItems] = useState([]);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState("false");

    const [newItem, setNewItem] = useState({
        name: '',
        category: '',
        quantity: '',
        expiry_date: '',
        status: 'To Buy',
        email: ''
    });

    const getGroceryItems = async () => {
        const email = localStorage.getItem('email')
        const allItems = await getGroceryByEmail(email);
        setGroceryData(allItems);
        if (allItems) {
            setToBuyItems(allItems.filter((item) => item.status === 'To Buy'));
            setBoughtItems(allItems.filter((item) => item.status === 'Bought'));
        }
        setIsDataLoaded("true");
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
        const temp = newItem;

        if (temp.expiry_date) {
            const [month, day, year] = temp.expiry_date.split('/');
            temp.expiry_date = new Date(`${year}-${month}-${day}`).getTime();
        }

        const response = await addGroceryItem(newItem);

        temp.grocery_id = response.grocery_id;

        

        console.log(temp);
        setNewItem((prevItem) => ({ ...prevItem, grocery_id: response.grocery_id }));
        const updatedToBuyItems = toBuyItems.slice();
        const updatedBoughtItems = boughtItems.slice();

        if (newItem.status === 'To Buy') {
            updatedToBuyItems.push(temp);
        } else if (newItem.status === 'Bought') {
            updatedBoughtItems.push(temp);
        }

        setToBuyItems(updatedToBuyItems);
        setBoughtItems(updatedBoughtItems);
        // Close the alert after submitting
        handleAlertClose();
    }


    useEffect(() => {
        const email = localStorage.getItem('email')
        setNewItem((prevItem) => ({ ...prevItem, email: email }));
        getGroceryItems();

        console.log("To buy Items", toBuyItems);
        console.log("Bought Items", boughtItems);
        console.log("allItems", groceryData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='mx-auto p-4 w-screen bg-customBackground h-full' style={{ height: '92vh' }} >
            <div className='flex justify-center'>
                <h1 className="text-3xl font-bold mb-4">Grocery Items</h1>
            </div>

            {/* To Buy Section */}
            <div className='flex flex-col'>
                <div className='flex flex-row justify-center items-center gap-5 my-4'>
                    <h2 className="text-2xl text-text font-bold">To Buy</h2>
                    <button onClick={() => handleAlertOpen('To Buy')} className="shadow-md shadow-gray-400 rounded-md py-1 px-2 font-bold">
                        <FontAwesomeIcon icon={faPlus} className="text-text transform hover:scale-150 transition-transform" />
                    </button>
                </div>
                <div className="flex flex-col gap-4 items-center">
                    {
                        isDataLoaded === "true"
                            ?
                            (toBuyItems && toBuyItems.length === 0
                                ? (
                                    <div className="bg-gray-200 p-4 rounded-md text-center">
                                        No items added yet.
                                    </div>
                                )
                                : (
                                    toBuyItems.map((grocery) => (
                                        <GroceryCard key={grocery.grocery_id} {...grocery} getGroceryItems={getGroceryItems} setIsDataLoaded={setIsDataLoaded} />
                                    ))
                                ))
                            :
                            (<><GroceryCardSkeleton />
                                <GroceryCardSkeleton /></>)
                    }
                </div>
            </div>

            {/* Bought Section */}
            <div className='flex flex-col'>
                <div className='flex flex-row justify-center items-center gap-5 mt-12 mb-4'>
                    <h2 className="text-2xl font-bold">Bought</h2>
                    <button onClick={() => handleAlertOpen('Bought')} className=" shadow-md shadow-gray-400 rounded-md py-1 px-2 font-bold">
                        <FontAwesomeIcon icon={faPlus} className="text-text transform hover:scale-150 transition-transform" />
                    </button>
                </div>
                <div className="flex flex-col gap-4 items-center">
                    {
                        isDataLoaded === "true"
                            ? (boughtItems && boughtItems.length === 0
                                ? (
                                    <div className="bg-gray-200 p-4 rounded-md text-center">
                                        No items added yet.
                                    </div>
                                )
                                : (boughtItems.map((grocery) => (
                                    <GroceryCard key={grocery.grocery_id} {...grocery} getGroceryItems={getGroceryItems} setIsDataLoaded={setIsDataLoaded} />
                                )))
                            )
                            : (<><GroceryCardSkeleton />
                                <GroceryCardSkeleton /></>)
                    }

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
