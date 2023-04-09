

    
    const container = document.querySelector("[data-container]");
    const input = document.querySelector("[data-input]") ; 
    const btn = document.getElementById('btn'); 

    // let cityName  ="Toronto"; // TODO change to current location city
    
    let cityName = ""

    let url = 'https://api.weatherapi.com/v1/current.json?key=0cbb7e4fc1764d81ae3154623230704&q=' + cityName +'&aqi=no';
    let hello = document.getElementById('hello'); 
    let city = document.getElementById('city');
    let condition = document.getElementById('condition');
    let country = document.getElementById('country'); 

    // window.onload = () => getWeather(url); 
    window.onload = () =>{
      getAddress()
      .then(i => {
        cityName = i.city 
        console.log(cityName)
        url = 'https://api.weatherapi.com/v1/current.json?key=0cbb7e4fc1764d81ae3154623230704&q=' + cityName +'&aqi=no';
        getWeather(url); 
      })

    }; 

    
    function handleClick(){
      cityName =document.getElementById('inp').value;
      document.getElementById('inp').value = "";
       url = 'https://api.weatherapi.com/v1/current.json?key=0cbb7e4fc1764d81ae3154623230704&q=' + cityName +'&aqi=no';
      
      getWeather(url); 
    }

    async function getWeather(url){
      await fetch(url)
      .then(response => response.json())
      .then(data => {

        console.log(data); 
        country.textContent = data.location.region + ', '+ data.location.country; 
        condition.textContent = data.current.condition.text; 
        let currentTemperature = data.current.temp_c;
        console.log(`The current temperature is ${currentTemperature} degrees Celsius.`);
        hello.textContent = parseInt(currentTemperature) + '˚';
        city.textContent = data.location.name;
        document.getElementById('icon').src = data.current.condition.icon;
      })
      .catch(error => console.error(error));
    }





async  function getAddress(){
  let link = 'https://ipinfo.io/json?token=be81657bc7091e';
  let address = {}; 
  let city = await fetch(link)
  .then(item  => item.json())
  .then(data => {
    console.log(data); 

     address = {
      city : data.city, 
      country: data.country, 
      region: data.region 
    }
    
    // console.log('this is after fetch', address); 
    // return data.city;
    return address
  })
  return city

}

     



