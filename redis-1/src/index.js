import express from 'express';
import axios from 'axios';
import Redis from 'ioredis';
import mongoose from 'mongoose';

const app = express();
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6381');
const PORT = Number(process.env.PORT || 9000);

app.get('/redis', async (req, res) => {
    const reply = await redis.ping();
    return res.json({ message: reply });
});

app.get('/', async(req, res) => {
    const cacheValue = await redis.get('todos');
    if (cacheValue) {
        return res.json(JSON.parse(cacheValue));
    }
   const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/');
   await redis.set("todos",JSON.stringify(data)); 
    await redis.expire("todos", 30);

 
   return res.json(data);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/mongo', async (req, res) => {
    const url = process.env.MONGO_URL || 'mongodb://localhost:27018/test';

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(url);
    }

    return res.json({ mongo: 'connected', database: mongoose.connection.name });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});