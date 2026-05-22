import express from 'express';
import axios from 'axios';
import client from './client.js';

const app = express();
const PORT = Number(process.env.PORT || 9001);

app.get('/', async (req, res) => {
    const cacheValue = await client.get('todos');

    if (cacheValue) {
        return res.json(JSON.parse(cacheValue));
    }

    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/');
    await client.set('todos', JSON.stringify(data));
    await client.expire('todos', 30);

    return res.json(data);
});

app.listen(PORT, () => {
    console.log(`Learning server is running on port ${PORT}`);
});