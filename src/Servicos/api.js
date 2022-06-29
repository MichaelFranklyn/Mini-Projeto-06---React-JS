import axios from 'axios';

export default axios.create({
    baseURL: 'https://cubos-api-contacts.herokuapp.com',
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json'
    }
});