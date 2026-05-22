import client from './client.js';

async function init() {
    await client.set('msg:1', 'Hello, from node js!');
    const result = await client.get('msg:1');
    const expired = await client.expire('msg:1', 1);

    console.log(result, 'result');
    console.log(expired, 'expired');
}

init();