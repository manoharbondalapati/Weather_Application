



let inputele = document.getElementById('input');
let tempele = document.getElementById('report-temp');
let loc = document.getElementById('report-city'); // Corrected id
let feeling = document.getElementById('report-feelslike'); // Corrected id
let wind = document.getElementById('report-wind');
let img = document.getElementById('report-img');
let audioElement = document.getElementById('audio-element');

let butn = document.getElementById('button');

const apikey = "03d004676f5a9cd28236935340a50552";

butn.onclick = function () {
    if (inputele.value === "") {
        alert("Please Enter some Location");
    } else {
        const location = inputele.value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const { name } = data;
                const { feels_like } = data.main;
                const { description } = data.weather[0];
                const { speed } = data.wind;

                tempele.innerText = Math.floor(feels_like - 273);
                loc.innerText = name;
                feeling.innerText = description;
                wind.innerText = `Wind: ${speed} m/s`;
                updateImage(Math.floor(feels_like - 273));
                
                // Play the audio
                audioElement.play();

                // Stop the audio after 5 seconds (adjust the duration as needed)
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
    // Set image source based on temperature range
    if (temperature >= 30) {
        img.src = "./sunny-img.png";
    } else if (temperature >= 20 && temperature < 30) {
        img.src = "./cloudy-img.png";
    } else if (temperature >= 10 && temperature < 20) {
        img.src = "./rainy-img.png";
    } else {
        // Corrected image source for colder temperatures
        img.src = "./windy-img.png";
    }
}
