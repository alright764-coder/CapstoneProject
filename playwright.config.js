require('dotenv').config();
const config=({
    testDir:'./tests',
    timeout:80*1000,
    expect:{timeout:5000
    },
    fullyParallel: true,
    retries: 1,
    workers: 3,
    reporter:'html',
    use:{
        browserName:'chromium',
        screenshot: 'only-on-failure',
        trace:'on',
        video: 'on',
        headless:false,
        baseURL: process.env.Base_URL
    },
})
module.exports=config;