const express = require('express');
const https = require('https');
const fs = require('fs');
const app=express();
const apiKey = fs.readFileSync('api_key.txt', 'utf8').trim();

app.use(express.static('public'));


// app.get('/', async (req, res) => {
//     let page = fs.readFileSync("app.html", "utf8")
//     console.log(`rendering page ${page}`)
//     res.write(page)
// })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/app.html');
});

app.get('/fetch.js', (req, res) => {
    res.sendFile(__dirname + '/public/fetch.js');
});


app.get('/weather',async(req,res)=>{
    const city = req.query.city;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`
   
        https.get(weatherUrl, weatherResponse => {
            let data = '';
            weatherResponse.on('data', chunk => {
                data += chunk;
            });
            
            weatherResponse.on('end', () => {
                console.log(data)
                const weatherData = JSON.parse(data);
                res.json(weatherData);
            });
    }).on('error',err=>{
        console.error(err);
        res.status(500).send('Error fetching weather data');
    });
})



app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})