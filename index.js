// tab switching ke liye active class
const userTab = document.querySelector("[data_userWeather]");
const searchTab = document.querySelector("[data_searchWeather]");
const userContainer = document.querySelector(".weather_container");
const grantAccessContainer = document.querySelector(".grant_location");
const searchForm = document.querySelector("[data_searchForm]");
const loadingScreen = document.querySelector(".loading_container");
const userInfoContainer = document.querySelector(".user_info_container");


// initially variables need
let oldTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add("current_tab");
getfromSessionStorage();




// for shifting background color
function switchTab(newTab) {
    if (newTab != oldTab) {
        oldTab.classList.remove("current_tab");
        oldTab = newTab;
        oldTab.classList.add("current_tab");

        if (!searchForm.classList.contains("active")) {
            // kya search form wla container invisible, if yes make visisble
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }

        else {
            // main pehle search wle tab pe tha, ab weather tab visible krna hai
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            // ab main your weather tab me aa gya hu, toh weather bhi display krna hoga 
            getfromSessionStorage();
        }

    }

}


userTab.addEventListener("click", () => {
    switchTab(userTab);

});
searchTab.addEventListener("click", () => {
    switchTab(searchTab);

});

// check if cordinates are already present in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user_coordinates");
    if (!localCoordinates) {
        // agr local coordinates nhi hai
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    // make grantContainer invisible
    grantAccessContainer.classList.remove("active");
    // make loader visible
    loadingScreen.classList.add("active");

    // API call
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

        );
        const data = response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        // data me se value lkr userInfoContainer me dega
        renderWeatherInfo();
    }
    catch (err) {
        loadingScreen.classList.remove("active");

    }

}

function renderWeatherInfo(weatherInfo) {
    // first we have to fetch the elements
    const cityName = document.querySelector("[data_cityName]");
    const countryIcon = document.querySelector("[data_countryIcon]");
    const desc = document.querySelector("[data_weatherDesc]");
    const weatherIcon = document.querySelector("[data_weatherIcon]");
    const temp = document.querySelector("[data_temp]");
    const windSpeed = document.querySelector("[data_windSpeed]");
    const humidity = document.querySelector("[data_humidity]");
    const cloudiness = document.querySelector("[data_cloud]");


    // fetch value from weatherInfo object and put in UI ele
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = weatherInfo?.main?.temp;
    windSpeed.innerText = weatherInfo?.wind?.speed;
    humidity.innerText = weatherInfo?.main?.humidity;
    cloudiness.innerText = weatherInfo?.clouds?.all;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        // HW 
        // show an alert
    }
}

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user_coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}

// may
const grantAccessButton = document.querySelector("[data_grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data_searchInput]");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if (cityName === "") {
        return;
    }
    else {
        fetchSearchWeatherInfo(cityName);
    }
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch (err) {
        // HW
    }
}

