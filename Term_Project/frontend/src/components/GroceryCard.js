import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { editGroceryItem, deleteGroceryItem } from '../services/GroceryServices';
import GroceryAlertBox from './GroceryAlertBox'; // Import your alert box component
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GroceryCard(props) {
    const { grocery_id, name, category, status, quantity, expiry_date, email } = props;
    const { getGroceryItems } = props;
    // State variables for edit dialog
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [editedItem, setEditedItem] = useState({
        grocery_id: '',
        name: '',
        category: '',
        quantity: '',
        expiry_date: '',
        status: 'To Buy',
        email: ''
    });

    // Function to open edit dialog and set the item being edited
    const handleEditOpen = () => {
        console.log(editedItem);
        setEditDialogOpen(true);
    };

    // Function to close edit dialog
    const handleEditDialogClose = () => {
        console.log(editedItem);
        setEditDialogOpen(false);
    };

    const handleFormSubmit = async () => {
        // Add your logic to submit the form data
        console.log(editedItem);
        await editGroceryItem(editedItem);
        await getGroceryItems();
        //await addGroceryItem(newItem);

        // Close the alert after submitting
        handleEditDialogClose();
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedItem((prevItem) => ({ ...prevItem, [name]: value }));
    }

    const handleDelete = async () => {
        try {
            console.log(editedItem);
            await deleteGroceryItem(editedItem);
            await getGroceryItems();
            console.log("delete is called");
            // Show a success toast
            toast.success('Item deleted successfully', {
                position: 'top-right',
                autoClose: 3000, // Duration in milliseconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            // Handle error and show an error toast if necessary
            toast.error('Error deleting item', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }

    useEffect(() => {
        setEditedItem({
            grocery_id: grocery_id || '',
            name: name || '',
            category: category || '',
            status: status || '',
            quantity: quantity || '',
            expiry_date: expiry_date || '',
            email: email || '',
        });
    }, [])

    return (
        <>
            <div className=" w-2/3 flex flex-col justify-between bg-blue-900 shadow-gray-800 shadow-md max-h-100px rounded-lg p-4 gap-4">
                <div className="flex gap-2 w-full justify-between">
                    <p className="text-white font-bold text-xl">{name}</p>
                    <p className="text-white font-bold  text-xl">{category}</p>
                </div>

                <div className="flex w-full ">
                    <div className="flex flex-col w-full justify-between">
                        <p className="text-white font-medium text-md">Quantiy: {quantity}</p>
                        {expiry_date && <p className="text-white font-medium text-md">Expiry Date: {expiry_date}</p>}
                    </div>
                    <div className='flex gap-4 items-center'>
                        <FontAwesomeIcon
                            icon={faEdit}
                            style={{ fontSize: '22px', color: 'white', cursor: 'pointer' }}
                            onClick={handleEditOpen} // Call the edit click handler
                            className='transform hover:scale-125 transition-transform'
                        />
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            style={{ fontSize: '22px', color: 'white', cursor: 'pointer' }}
                            onClick={handleDelete}
                            className='transform hover:scale-125 transition-transform'
                        />
                    </div>
                </div>
            </div>

            {/* Edit Dialog */}
            <GroceryAlertBox
                isAlertOpen={isEditDialogOpen}
                handleAlertClose={handleEditDialogClose}
                newItem={editedItem}
                handleInputChange={handleInputChange}
                handleFormSubmit={handleFormSubmit}
            // Add any other necessary props for handling edits
            />

            <ToastContainer />
        </>
    );
}

export default GroceryCard;
