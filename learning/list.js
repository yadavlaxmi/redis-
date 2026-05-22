import client from './client.js';

async function init() {
    const result = await client.blpop('msg', 40);
    console.log(result, 'result');
}

init();