// import  Selections  from "./Selections.mjs";




const container = document.querySelector("[data-container]");
const input = document.querySelector("[data-input]");
const btn = document.getElementById("btn");

let country_selection = document.getElementById('country_selection'); 
let city_selection = document.getElementById('city_selection'); 
let state_selection = document.getElementById('state_selection') ;


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


window.addEventListener("DOMContentLoaded", () => {
  displayCountries(); 
  
  
})



function setSelection(){
  let c = document.getElementById('country_selection'); 
  co = c.options[c.selectedIndex].value.toString(); 

  console.log(co)
  displayRegion(co) 
  setCity()
}

// setCity();
function setCity(){
  let c = document.getElementById('country_selection'); 
  co = c.options[c.selectedIndex].value.toString(); 

  let r = document.getElementById('state_selection'); 
  r = r.options[r.selectedIndex].value.toString(); 
  console.log(r, 'region')
  displayCities(co, r) 

}






function handleClick() {
  let textField = document.getElementById('inp').value; 
  if(textField === ''){ 
    
    let cntry = document.getElementById('country_selection')
    cntry =cntry == null ? '': cntry.options[cntry.selectedIndex].value + ' '; 
    

    let st = document.getElementById('state_selection'); 
    st = st == null ? '' : st.options[st.selectedIndex].text + ' '; 
    let ct = document.getElementById('city_selection'); 
    ct = ct == null ? '' : ct.options[ct.selectedIndex].text ; 
    cityName = cntry + st + ct ; 

  }else{
    cityName = textField;
  }
    
  if(cityName === ''){
    location.reload(); 
  }else{
    document.getElementById("inp").value = ""
    document.getElementById("inp").placeholder = "Enter Location"
    // document.getElementById("inp").classList.add("my_input")
    // inputEvent(); 
    url =
    "https://api.weatherapi.com/v1/current.json?key=0cbb7e4fc1764d81ae3154623230704&q=" +
    cityName +
    "&aqi=no";
    getWeather(url);
  }
}




async function getWeather(url) {
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // console.log(data.current.is_day);
      isDay(data.current.is_day); 
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
          hello.style.marginLeft = "1rem";
          hello.style.marginRight = "1rem";
        } else {
          hello.style.marginLeft = "0.2rem";
          hello.style.marginRight = "0.2rem";
          hello.style.fontSize = "155px";
        }
        console.log(hello.style.marginLeft);
      } else {
        temperature *= -1;
        if (temperature < 10) {
          hello.style.marginLeft = "2rem";
          hello.style.marginRight = "2rem";
        } else {
          hello.style.marginLeft = "-1.2rem";
          hello.style.marginRight = "-1.2rem";
          hello.style.fontSize = "155px";
        }
      }
      // end of extraction

      // hello.textContent = parseInt(currentTemperature) + "˚";
      hello.textContent = parseInt(currentTemperature);
      city.textContent = data.location.name;
      document.getElementById("icon").src = data.current.condition.icon;
    })
    .catch((error) => console.error(error));
}

function isDay(time_of_day){
  if(time_of_day){
    document.getElementsByClassName('overlay')[0].style.background = ""; 
  }else{
    document.getElementsByClassName('overlay')[0].style.background = "rgba(0, 0, 0, 0.4)"; 
  }
}


function changeBGImg(condition) {
  fetch("./weather_conditions.json")
    .then((a) => a.json())
    .then((a) => {
      console.log(a);
      let component1  = document.getElementsByClassName("container")[0]; 
      let component2  = document.getElementsByClassName("temp")[0]; 
      let component3 = document.getElementsByClassName("overlay")[0]; 

      let root = document.documentElement; 
      for(i = 0 ; i<  a.length ; i++){
        if(a[i].day === condition || a[i].night === condition){
          component1.style.backgroundImage = `url('${a[i].dayColor}')`; 
          component1.style.color = a[i].color; 
          component2.style.border = `1px solid ${a[i].color}`; 
          component3.style.color = a[i].color; 
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


// display selections 

function displayCountries(){

  let a = getCountries(); 
   a.then(item =>{
   let c =  item.map(item =>{
      return `<option value = ${item.short}>${item.name} </option>`;
    })
    country_selection.innerHTML = c.join(" "); 
  })
  console.log("Success initializing countries selection")

}

function getRequestOptions(){

  let apiKey = "YVlIM05RNzIyeU9LY3djM2U3ZDVxb1FtOWJzeXpNTmVaYU9jNjlOMQ=="; 
  var headers = new Headers();
  headers.append("X-CSCAPI-KEY", apiKey);
  
  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };

  return requestOptions; 
}

function getCountries(){
  
  // gets all the countries 

  let a =  fetch("https://api.countrystatecity.in/v1/countries", getRequestOptions())
  .then(response => response.text())
  .then(result => {

    let c = eval(result); 
    c = c.map(i => {
      let res = {
        name: i.name , 
        short : i.iso2
       }
      //  console.log(res)
       return res
    })
    return c; 
  })
  .catch(error => console.log('error', error));

    return a; 
}

function getCities(country, region){
  let a = fetch(`https://api.countrystatecity.in/v1/countries/${country}/states/${region}/cities`, getRequestOptions())
  .then(response => response.text())
  .then(result =>{

    // console.log(eval(result));
    let stringed = eval(result); 
    let content = stringed.map(i => i.name); 
    // console.log(content);
    return content 
  })
  .catch(error => console.log('error', error));
    return a; 
}

getCities("CA", "ON")

function displayCities(country, region){
  let a = getCities(country, region).then(item => {
    console.log(item)
    let c = item.map(item => {
      return `<option value =${item}> ${item} </option>`
    })
    city_selection.innerHTML = c.join(" ")

  })

}





function getStateByCountry(country){
   let arr = fetch(`https://api.countrystatecity.in/v1/countries/${country}/states`, getRequestOptions())
  .then(response => response.text())
  .then(result => { 
    let c = eval(result).map(i =>{
            let obj = {
              name: i.name,
              short: i.iso2 
            }
              return obj
        })
        // console.log(c)
      return c; 
  })
  .catch(error => console.log('error', error));
  return arr ; 
}

// displayRegion("CA")
function displayRegion(country){
  let arr = getStateByCountry(country).then(i => {
        let c = i.map(item => {
          // console.log(item.short); 
          return `<option value =${item.short}> ${item.name} </option>`
        })
        state_selection.innerHTML = c.join(" "); 
      })
  
}

// displayRegion("CA")
// displayCities("CA", "ON")






