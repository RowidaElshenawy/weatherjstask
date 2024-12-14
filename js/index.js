let searchInput = document.getElementById("searchInput")
searchInput.addEventListener("input" , function(){
    searchData(searchInput.value)
})
// let country = []
// countries()
// async function countries(term){
//     try{
//         let responce = await fetch(`http://api.weatherapi.com/v1/search.json?key=ad206c2ff0094ef699e234257241212&q=${term}`)
//         if(responce.ok){
//             country = await responce.json()
//             console.log(country);
//             displayData()
//         }
//         else{

//         }
//         console.log(responce)
//     }
//     catch{
//         console.log("eroooor")
//     }
// }
let data ={}
async function searchData(term){
    try{
        let responce = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ad206c2ff0094ef699e234257241212&q=${term}&days=3`)
        if(responce.ok){
            data= await responce.json()
            // console.log(data);
            displayData()
        }
    }
    catch{
        console.log("error2");
        
    }
}
function displayData(){
        cartona = `
        <div class="col-lg-4">
                        <div class="inner">
                            <div class="header d-flex justify-content-between p-2 rounded-top-3">
                                <span>${getDayFromDate(data.forecast.forecastday[0].date)}</span>
                                <span>${formatDate(data.forecast.forecastday[0].date)}</span>
                            </div>
                            <div class="content p-3">
                                <span class="city">${data.location.name}</span>
                                <span class="degree">${data.current.temp_c}<sup>o</sup>C</span>
                                <img src = "${data.current.condition.icon}">
                                <p>${data.current.condition.text}</p>
                            </div>
                            <div class="footer p-3">
                                <span class="pe-3"><i class="fa-solid fa-umbrella pe-1"></i>20%</span>
                                <span class="pe-3"><i class="fa-solid fa-wind pe-1"></i>18km/h</span>
                                <span><i class="fa-regular fa-compass pe-1"></i>East</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-center">
                        <div class="inner text-center">
                            <div class="header-center p-2">
                                <span>${getDayFromDate(data.forecast.forecastday[1].date)}</span>
                            </div>
                            <div class="content-center pt-5">
                                <img src ="${data.forecast.forecastday[1].day.condition.icon}">
                                <span class="content-deg pt-3">${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</span>
                                <span class="num pb-3">${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></span>
                                <p>${data.forecast.forecastday[1].day.condition.text}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="inner text-center">
                            <div class="header p-2 rounded-top-3">
                                <span>${getDayFromDate(data.forecast.forecastday[2].date)}</span>
                            </div>
                            <div class="content pt-5">
                                <img src = "${data.forecast.forecastday[2].day.condition.icon}">
                                <span class="content-deg pt-3">${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</span>
                                <span class="num pb-3">${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></span>
                                <p>${data.forecast.forecastday[2].day.condition.text}</p>
                            </div>
                        </div>
                    </div>
        `
    document.getElementById("rowData").innerHTML = cartona
}
async function getlocation(latitude , longitude){
    try{
        let responce = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ad206c2ff0094ef699e234257241212&q=${latitude},${longitude}&days=3`)
        if(responce.ok){
            data = await responce.json()
            // console.log(data);
            displayData()
            
        }
    }
    catch{
        console.log("error3");
    }
}
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
        let latitude = position.coords.latitude; 
        let longitude = position.coords.longitude;
        // console.log("Latitude: " + latitude + ", Longitude: " + longitude);
        getlocation(latitude , longitude)
    }, function(error) {
    console.error("Error occurred: " + error.message);
    });
} else {
    alert("Geolocation is not supported by this browser.");
}
function getDayFromDate(date) {
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dateObj = new Date(date);
    let dayOfWeek = dateObj.getDay();
    return daysOfWeek[dayOfWeek];
}
function formatDate(date) {
    const dateObj = new Date(date);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayOfMonth = dateObj.getDate();
    const monthName = months[dateObj.getMonth()];
    return `${dayOfMonth} ${monthName}`;
}
