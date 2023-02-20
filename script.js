let city = document.querySelector("#city");
document.querySelector("button").addEventListener("click", getWeatherMap);
async function getWeatherMap() {
    if (city.value != "") {
        let cityName = city.value;
        let api_key = "e3674fa776355d3b4d567cac8c883732";
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`;
        let response = await fetch(url);
        let result = await response.json();
        displayData(result);

        //Map handling

        let mapUrl = `https://maps.google.com/maps?q=${cityName}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

        document.querySelector("iframe").src = mapUrl;
        let upperCaseCity = "";
        for (let i = 1; i < cityName.length; i++) {
            upperCaseCity += cityName[i].toLowerCase();
        }
        upperCaseCity = cityName[0].toUpperCase() + upperCaseCity;
        document.querySelector("#map-city").innerHTML = upperCaseCity;
        city.value = "";
    }
}

function displayData(obj) {

    document.querySelector("#left-content").innerHTML = "";
    document.querySelector("#right-content").innerHTML = "";

    let h2ElementArr = [];

    for (let i = 0; i < 8; i++) {
        let x = document.createElement("h2");
        h2ElementArr.push(x);
    }

    let h3ElementArr = [];

    for (let i = 0; i < 8; i++) {
        let x = document.createElement("h3");
        h3ElementArr.push(x);
    }
    //   for left content

    h2ElementArr[0].innerText = "Current Temp";
    h2ElementArr[1].innerText = "Temp Max";
    h2ElementArr[2].innerText = "Temp Min";
    h2ElementArr[3].innerText = "Pressure";
    h3ElementArr[0].innerHTML = `${(obj.main.temp - 273.15).toFixed(1)}&#176;C`;
    h3ElementArr[1].innerHTML = `${(obj.main.temp_max - 273.15).toFixed(1)}&#176;C`;
    h3ElementArr[2].innerHTML = `${(obj.main.temp_min - 273.15).toFixed(1)}&#176;C`;
    h3ElementArr[3].innerHTML = `${obj.main.pressure} Pa`;
    document.querySelector("#left-content").append(h2ElementArr[0], h3ElementArr[0], h2ElementArr[1], h3ElementArr[1], h2ElementArr[2], h3ElementArr[2], h2ElementArr[3], h3ElementArr[3]);

    // for right content

    h2ElementArr[4].innerText = "Visibility";
    h2ElementArr[5].innerText = "Humidity";
    h2ElementArr[6].innerText = "Country";
    h2ElementArr[7].innerText = "Weather";
    h3ElementArr[4].innerText = `${obj.visibility}`;
    h3ElementArr[5].innerText = `${obj.main.humidity}`;
    h3ElementArr[6].innerText = `${obj.sys.country}`;
    h3ElementArr[7].innerText = `${obj.weather[0].description}`;
    document.querySelector("#right-content").append(h2ElementArr[4], h3ElementArr[4], h2ElementArr[5], h3ElementArr[5], h2ElementArr[6], h3ElementArr[6], h2ElementArr[7], h3ElementArr[7]);

}