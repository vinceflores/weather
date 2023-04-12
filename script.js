const container = document.querySelector("[data-container]");
const input = document.querySelector("[data-input]");
const btn = document.getElementById("btn");

// let cityName  ="Toronto"; // TODO change to current location city

let cityName = "";

let url =
  "https://api.weatherapi.com/v1/current.json?key=0cbb7e4fc1764d81ae3154623230704&q=" +
  cityName +
  "&aqi=no";
let hello = document.getElementById("hello");
let city = document.getElementById("city");
let condition = document.getElementById("condition");
let country = document.getElementById("country");

// window.onload = () => getWeather(url);
window.onload = () => {
  getAddress().then((i) => {
    cityName = i.city;
    console.log(cityName);
    url =
      "https://api.weatherapi.com/v1/current.json?key=0cbb7e4fc1764d81ae3154623230704&q=" +
      cityName +
      "&aqi=no";
    getWeather(url);
    
  });


  
};


function handleClick() {
  cityName = document.getElementById("inp").value;
  document.getElementById("inp").value = "";
  url =
    "https://api.weatherapi.com/v1/current.json?key=0cbb7e4fc1764d81ae3154623230704&q=" +
    cityName +
    "&aqi=no";

  getWeather(url);
}




async function getWeather(url) {
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      country.textContent = data.location.region + ", " + data.location.country;
      let con = data.current.condition.text;
      condition.textContent = con;
      changeBGImg(con);
      let currentTemperature = data.current.temp_c;
      console.log(
        `The current temperature is ${currentTemperature} degrees Celsius.`
      );
      let temperature = parseInt(currentTemperature);
      // extract method
      if (temperature >= 0) {
        if (temperature < 10) {
          hello.style.marginLeft = "3rem";
        } else {
          hello.style.marginLeft = "1.5rem";
          hello.style.fontSize = "155px";
        }
        console.log(hello.style.marginLeft);
      } else {
        temperature *= -1;
        if (temperature < 10) {
          hello.style.marginLeft = "2rem";
        } else {
          hello.style.marginLeft = "-1.2rem";
          hello.style.fontSize = "155px";
        }
      }
      // end of extraction

      hello.textContent = parseInt(currentTemperature) + "˚";
      city.textContent = data.location.name;
      document.getElementById("icon").src = data.current.condition.icon;
    })
    .catch((error) => console.error(error));
}

function changeBGImg(condition) {
  fetch("./weather_conditions.json")
    .then((a) => a.json())
    .then((a) => {
      console.log(a);
      let component1  = document.getElementsByClassName("container")[0]; 
      let component2  = document.getElementsByClassName("temp")[0]; 

      let root = document.documentElement; 
      for(i = 0 ; i<  a.length ; i++){
        if(a[i].day === condition || a[i].night === condition){
          component1.style.backgroundImage = `url('${a[i].dayColor}')`; 
          component1.style.color = a[i].color; 
          component2.style.border = `1px solid ${a[i].color}`; 
          console.log(a[i]); 
        }
      }

      
    });
}

async function getAddress() {
  let link = "https://ipinfo.io/json?token=be81657bc7091e";
  let address = {};
  let city = await fetch(link)
    .then((item) => item.json())
    .then((data) => {
      console.log(data);

      address = {
        city: data.city,
        country: data.country,
        region: data.region,
      };

      // console.log('this is after fetch', address);
      // return data.city;
      return address;
    });
  return city;
}



