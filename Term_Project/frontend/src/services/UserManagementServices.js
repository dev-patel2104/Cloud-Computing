const url = process.env.REACT_APP_API_GATEWAY_URL;

export const getUserByEmail = async (email) => {
    try {
        const response = await fetch(`${url}/users/${email}`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error while fetching the grocery items by email', error);
        return null;
    }
}

export const addUser = async (item) => {
    try {
        const putOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        }

        const response = await fetch(`${url}/users`, putOptions);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error while adding the grocery item');
        return null;
    }
}

export const subscribe = async (item) => {
    try {
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        }

        const response = await fetch(`${url}/subscribe`, postOptions);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error while sending the subscribe request to the user');
        return null;
    }
}