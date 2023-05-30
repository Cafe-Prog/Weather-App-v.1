
// Get And Set Weather Information //

const input = document.querySelector('input');
const form = document.querySelector('form');

const key = 'edc228562ac0a8aa3116d41c0687cf56';
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputValue = input.value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${key}&units=metric`;

    const weatherBoxContainer = document.querySelector('.weather-box-container');

    fetch(url)
        .then(res => res.json())
        .then(data => {

            const { weather, main, wind, sys, name } = data;

            const weatherBox = document.createElement('div');
            weatherBox.classList.add('boxes');

            const temp = main.temp;
            const tempRound = Math.round(temp);

            let imageSrc;

            switch (weather[0]['main']) {
                case 'Clear':
                    imageSrc = './src/img/clear.png'
                    break;
                case 'Clouds':
                    imageSrc = './src/img/cloud.png'
                    break;
                case 'Mist':
                    imageSrc = './src/img/mist.png'
                    break;
                case 'Rain':
                    imageSrc = './src/img/rain.png'
                    break;
                case 'Snow':
                    imageSrc = './src/img/snow.png'
                    break;
            };

            weatherBox.innerHTML = `<div class="boxes-container">
            <div class="close-box">
                <span></span>
                <span></span>
            </div>
            <div class="city-name">
                <span class="city">${name}</span>
                <span class="country">${sys.country}</span>
            </div>
            <div class="image">
                <img src=${imageSrc} alt="">
            </div>
            <div class="temp-sky-status">
                <p>${tempRound}°C</p>
                <p>${weather[0]['description']}</p>
            </div>
            <div class="humidity-wind-speed">
                <div class="humidity-wind-speed-boxes humidity flex-align-center">
                    <i class="fa-solid fa-water"></i>
                    <div class="humidity-info">
                        <p>${main.humidity}%</p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div class="humidity-wind-speed-boxes wind-speed flex-align-center">
                    <i class="fa-solid fa-wind"></i>
                    <div class="wind-info">
                        <p><span>${wind.speed}</span>Km/h</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>`;

            input.value = '';
            weatherBoxContainer.appendChild(weatherBox);

        })
        .catch(() => {
            let timer = 0;
            const alertBox = document.querySelector('.alert');
            alertBox.classList.add('active');
            const setTimerInterval = setInterval(() => {
                timer++
                if (timer >= 3) {
                    clearInterval(setTimerInterval);
                    alertBox.classList.remove('active');
                };
            }, 1000);

            input.value = '';
        });
    if (weatherBoxContainer.children.length >= 1) {
        removeLastBox();
    };
});

// Remove Last WeatherBox //

function removeLastBox() {
    const weatherBoxContainer = document.querySelector('.weather-box-container');
    weatherBoxContainer.removeChild(weatherBoxContainer.children[0]);
};