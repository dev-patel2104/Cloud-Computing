import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

function GroceryCard(props) {
    const { grocery_id, name, category, status, quantity, expiry_date } = props;

    return (
        <>
            <div className=" w-2/3 flex flex-col justify-between bg-blue-900 max-h-100px rounded-lg p-4 gap-4">
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
                        <FontAwesomeIcon icon={faEdit} style={{ fontSize: '22px', color: 'white' }} />
                        <FontAwesomeIcon icon={faTrashAlt} style={{ fontSize: '22px', color: 'white' }} />
                    </div>
                </div>


            </div>
        </>
    );
}

export default GroceryCard;
