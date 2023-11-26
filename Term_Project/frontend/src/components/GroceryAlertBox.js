import React, { useEffect } from 'react';

const GroceryAlertBox = ({ isAlertOpen, handleAlertClose, newItem, handleInputChange, handleFormSubmit }) => {

    const isExpiryDateValid = () => {
        if (newItem.status === 'Bought' && newItem.expiry_date) {
            const currentDate = new Date();
            const selectedDate = new Date(newItem.expiry_date);
            return selectedDate > currentDate;
        }
        return true;
    };



    // useEffect(() => {

    //     const date = new Date(parseInt(newItem.expiry_date, 10));
    //     const month = (date.getMonth() + 1).toString().padStart(2, '0');
    //     const day = date.getDate().toString().padStart(2, '0');
    //     const year = date.getFullYear();
    //     newItem.expiry_date = `${month}/${day}/${year}`;
    //     //return `${month}/${day}/${year}`;
    // }, [])

    return (
        <>
            {isAlertOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-md">
                        <h2 className="text-2xl font-bold mb-4">Add New Item</h2>

                        {/* Form Fields */}
                        <div className="flex flex-col gap-4">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={newItem.name}
                                onChange={handleInputChange}
                                className="border border-gray-400 rounded-md p-2"
                            />

                            <label htmlFor="category">Category:</label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={newItem.category}
                                onChange={handleInputChange}
                                className="border border-gray-400 rounded-md p-2"
                            />

                            <label htmlFor="quantity">Quantity:</label>
                            <input
                                type="text"
                                id="quantity"
                                name="quantity"
                                value={newItem.quantity}
                                onChange={handleInputChange}
                                className="border border-gray-400 rounded-md p-2"
                            />

                            {newItem.status && (
                                <>
                                    <label htmlFor="status">Status:</label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={newItem.status}
                                        onChange={handleInputChange}
                                        className="border border-gray-400 rounded-md p-2"
                                    >
                                        <option value="To Buy">To Buy</option>
                                        <option value="Bought">Bought</option>
                                    </select>
                                </>
                            )}

                            {newItem.status === 'Bought' && (
                                <>
                                    <label htmlFor="expiry_date">Expiry Date:</label>
                                    <input
                                        type="text"
                                        id="expiry_date"
                                        name="expiry_date"
                                        value={newItem.expiry_date}
                                        onChange={handleInputChange}
                                        className="border border-gray-400 rounded-md p-2"
                                        placeholder="MM/dd/yyyy"
                                    />
                                </>
                            )}
                            {/* Submit Button */}
                            <button
                                onClick={handleFormSubmit}
                                className="bg-blue-600 text-white rounded-md p-2"
                                disabled={!isExpiryDateValid()}
                            >
                                Submit
                            </button>
                        </div>

                        {/* Close Button */}
                        <button onClick={handleAlertClose} className="mt-4 text-sm text-gray-500 hover:text-gray-700">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default GroceryAlertBox;
