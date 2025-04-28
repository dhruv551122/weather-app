document.addEventListener('DOMContentLoaded', () => {
    const inputCity = document.querySelector('#city-name')
    const clickButton = document.querySelector('button')
    const displayCity = document.querySelector('#City')
    const displayTemprature = document.querySelector('#Temprature')
    const displayWeather = document.querySelector('#Weather')
    const displayHumidity = document.querySelector('#Humidity')
    const displayWindSpeed = document.querySelector('#Wind-speed')
    const weatherInfo = document.querySelector('.weather-info')
    const errorMessage = document.querySelector('.error')
    const displayDate = document.querySelector('#date')
    const dayTime = document.querySelector('#day-time')
    API_KEY = 'baa7b77954cf8d6d949add8a188cecfc'

    
    clickButton.addEventListener('click', async () => {
        const city = inputCity.value.trim()
        if(!city) return showError();
        // console.log(city)
        try {
            const weatherData = await fetchWeather(city)
            // console.log(weatherData)
            displayWeatherData(weatherData)
        } catch (error) {
            showError()
        }
    })
    async function fetchWeather(city){
            response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
            // console.log(response)
            if(!response.ok){
                throw new error('City is not found')
            }
            const data = await response.json()
             return data
            // return data

    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const weatherData = await fetchWeatherByCoords(latitude, longitude);
                displayWeatherData(weatherData);
            } catch (error) {
                showError();
            }
        }, () => {
            // If user denies location access or error occurs
            showError();
        });
    }

    async function fetchWeatherByCoords(lat, lon) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Location weather not found');
        }
        const data = await response.json();
        return data;
    }

    function updateTime(){
    const now = new Date();
    const dayNames = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ]
    const day = dayNames[now.getDay()];
    dateNum = now.getDate()
    monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const month = monthNames[now.getMonth()];
    const date = `${dateNum}, ${month}`

    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const time = `${hours} : ${minutes}`

    displayDate.innerHTML = `${date}`
    dayTime.innerHTML = `${day}, ${time}`
    }
    setInterval(updateTime(), 1000)


    function displayWeatherData(data){
        console.log(data)
                 displayCity.innerHTML = `<span>City : </span> ${data.name}`
                 displayHumidity.innerHTML = `<span>Humidity : </span> ${data.main.humidity} %`
                 displayTemprature.innerHTML = `<span>Temprature : </span> ${data.main.temp} °C`
                 displayWeather.innerHTML = `<span>Weather : </span> ${data.weather[0].main}`
                 displayWindSpeed.innerHTML = `<span>Wind Speed : </span> ${data.wind.speed} m/s`
                 weatherInfo.classList.remove('hidden')
                 errorMessage.classList.add('hidden')
    }
    function showError(){
          errorMessage.classList.remove('hidden')
          weatherInfo.classList.add('hidden')    
    }

})