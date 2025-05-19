document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        document.querySelector("#weather").classList.remove('show');
        showAlert('Por favor, Digite uma cidade!');
        return;
    }

    const ApiKey = `b6518bab1c1980fb84b2bc5c803affaf`;
    const ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${ApiKey}&units=metric&lang=pt_br`;

    try {
        const Results = await fetch(ApiUrl);
        const json = await Results.json();

        if (json.cod === 200) {
            showInfo({
                city: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                description: json.weather[0].description,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                humidity: json.main.humidity,
            });
        } else {
            document.querySelector("#weather").classList.remove('show');
            showAlert(`
                Não foi possível localizar
                <img src="assets/imagem/undraw_workspace_s6wf.png" />
            `);
        }
    } catch (error) {
        document.querySelector("#weather").classList.remove('show');
        showAlert('Ocorreu um erro ao buscar a previsão do tempo.');
        console.error("Erro na requisição:", error);
    }
});


function showInfo(json) {
    showAlert('');
    document.querySelector("#weather").classList.add('show');
    document.querySelector("#weather h1").innerHTML = `${json.city}, ${json.country}`;
    document.querySelector("#temp_value").innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector("#temp_description").innerHTML = `${json.description}`;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)} km/h`;
}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}