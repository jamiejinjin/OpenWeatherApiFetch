
const btn = document.getElementById('btn');
btn.addEventListener('click',weather);

async function weather(){
    const cityName = document.getElementById("cityName");    
     const city = cityName.value;
    const weatherResponse = await fetch(`/weather?city=${city}`);
    const weatherData = await weatherResponse.json();
    console.log(weatherData);

    let temp = weatherData.main.temp;
    let wind = weatherData.wind.speed;
    let newDiv = document.createElement('div');
    newDiv.innerHTML = `<p>The weather in ${city} is ${temp}F now, and wind speed is ${wind}</p>`;

    let body = document.querySelector('body')
    body.append(newDiv);
}



