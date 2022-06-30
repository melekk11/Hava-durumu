const url = 'https://api.openweathermap.org/data/2.5/';
const key = '2f478901973b3e18410001ee1b50e254';
const url2 = 'http://api.openweathermap.org/geo/1.0/';
const navurl =  'https://maps.googleapis.com/maps/api/'
const navkey =  'AIzaSyCVthblQ2YE7Hab2NTwA2YbBiWxErpe9yA'

//konum ile sorgulama 
const button = document.querySelector('.button')
button.onclick = function()
{
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showposition,showerror)
    
} else {
    console.log("tarayıcı desteklemiyor")
}
}

const showposition = (position) =>{
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    weather(lat,lon)
}

const showerror=(error) => console.log(error);


//şehir ismiyle sorgulama
const setquery = (e) =>{
   if(e.keyCode == '13' ){
    getresult(searchbar.value)
   }
}

const getresult = (cityname) =>{
 let link =  `${url2}direct?q=${cityname}&appid=${key}`
 fetch(link)
 .then(json => {
   return json.json()
 })
 .then(tolat)
}

const tolat  = (result) =>{
    console.log(result)
    let lat = result[0].lat;
    let lon = result[0].lon;
    weather(lat,lon)
 
}

const weather =(lat,lon) =>{
  let link2 =  `${url}weather?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${key}&units=metric&lang=tr`
  fetch(link2)
  .then(response =>{
    return response.json()
  })
  .then(showresult)

}

const showresult =(result)=>{
    console.log(result)
    const sehir = document.querySelector('.sehir')
    sehir.innerText =  `${result.name + " , "  + result.sys.country}`;

    const temp = document.querySelector('.temp')
    temp.innerText =   `${Math.round(result.main.temp)}°C`;

    const minmax = document.querySelector('.minmax')
    minmax.innerText =  `${(Math.round(result.main.temp_min))} °C/ ${(Math.round(result.main.temp_max))}°C`;

    const desc = document.querySelector('.desc')
    desc.innerText =  `${result.weather[0].description}`;

    const feel = document.querySelector('.feel')
    feel.innerText =  ` Hissedilen: ${Math.round(result.main.feels_like )} °C`;
     
    const icon = document.querySelector('.icon')
    icon.src=  `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`

   

}

const searchbar = document.getElementById('inputt')
searchbar.addEventListener('keypress', setquery);