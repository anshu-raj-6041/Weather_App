console.log("Anshu");

const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

async function fetchWeatherDetails() {
    try {
        // let latitude = 15.3333;
        // let longitude = 74.0833;
        let city = "goa";

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        // json (javascript object notation) format me convert krna hai
        const data = await response.json();
        console.log("Weather data => ", data);

        // let newPara = document.createElement('p');
        // newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`;
        // document.body.appendChild(newPara);

        // to show in UI
        renderWeatherInfo(data);
    }
    // ydi error ata hai to
    catch (err) {
        // handle the error

    }
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric


}

async function getCustomWeatherDetails() {
    try {
        let lat = 15.6333;
        let lon = 18.3333;

        let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await result.json();

        console.log(data);

    }
    catch (err) {
        console.log("Error Found", err);

    }


}


// removal and addition of user class
function switchTab(clickedTab) {
    apiErrorContainer.classList.remove("active");

    if (clickedTab != currentTab) {
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        if (!searchForm.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
        }
    }

}

// my location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        console.log("No geolocation Support");


    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let longi = position.coords.longitude;

    console.log(lat);
    console.log(longi);

}
