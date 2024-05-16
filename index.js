let inputele = document.getElementById('input');
let tempele = document.getElementById('report-temp');
let loc = document.getElementById('report-city'); 
let feeling = document.getElementById('report-feelslike'); 
let wind = document.getElementById('report-wind');
let img = document.getElementById('report-img');
let audioElement = document.getElementById('audio-element');
let butn = document.getElementById('button');

const apikey = "03d004676f5a9cd28236935340a50552";

// Function to get user's location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchWeatherData(latitude, longitude);
        }, () => {
            alert("Unable to retrieve your location. Please enter a location manually.");
        });
    } else {
        alert("Geolocation is not supported by this browser. Please enter a location manually.");
    }
}

// Function to fetch weather data based on coordinates
function fetchWeatherData(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const { name } = data;
            const { feels_like, temp, humidity } = data.main;
            const { description } = data.weather[0];
            const { speed } = data.wind;

            tempele.innerText = Math.floor(feels_like - 273) + "°C";
            loc.innerText = name;
            feeling.innerText = description;
            wind.innerText = `Wind: ${speed} m/s, Humidity: ${humidity}%`;
            updateImage(Math.floor(feels_like - 273));
            
            // Play the audio
            audioElement.play();

            // Stop the audio after 10 seconds
            setTimeout(() => {
                audioElement.pause();
                audioElement.currentTime = 0;
            }, 10000);
        })
        .catch(() => {
            alert("Unable to fetch weather data for your location. Please try again later or enter a location manually.");
        });
}

// Fetch weather data for user's location by default
getUserLocation();

butn.onclick = function () {
    if (inputele.value === "") {
        alert("Please Enter some Location");
    } else {
        const location = inputele.value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const { name } = data;
                const { feels_like, temp, humidity } = data.main;
                const { description } = data.weather[0];
                const { speed } = data.wind;

                tempele.innerText = Math.floor(feels_like - 273) + "°C";
                loc.innerText = name;
                feeling.innerText = description;
                wind.innerText = `Wind: ${speed} m/s, Humidity: ${humidity}%`;
                updateImage(Math.floor(feels_like - 273));
                
                // Play the audio
                audioElement.play();

                // Stop the audio after 10 seconds
                setTimeout(() => {
                    audioElement.pause();
                    audioElement.currentTime = 0;
                }, 10000);
            })
            .catch(() => {
                alert("Enter a valid location name");
            });

        inputele.value = "";
    }
}

function updateImage(temperature) {
    if (temperature >= 30) {
        img.src = "./sunny-img.png";
    } else if (temperature >= 20 && temperature < 30) {
        img.src = "./cloudy-img.png";
    } else if (temperature >= 10 && temperature < 20) {
        img.src = "./rainy-img.png";
    } else {
        img.src = "./windy-img.png";
    }
}












