


    
    const container = document.querySelector("[data-container]");
    const input = document.querySelector("[data-input]") ; 
    const btn = document.getElementById('btn'); 

    let cityName  ="Toronto"; // TODO change to current location city
    let url = 'https://api.weatherapi.com/v1/current.json?key=0cbb7e4fc1764d81ae3154623230704&q=' + cityName +'&aqi=no';
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
      let hello = document.getElementById('hello'); 
      let city = document.getElementById('city');
      let currentTemperature = data.current.temp_c;
      console.log(`The current temperature is ${currentTemperature} degrees Celsius.`);
      hello.textContent = currentTemperature + '˚';
      city.textContent = data.location.name;
    })
    .catch(error => console.error(error));
    
    function handleClick(){
      cityName =document.getElementById('inp').value;
      document.getElementById('inp').value = "";
      let url = 'http://api.weatherapi.com/v1/current.json?key=0cbb7e4fc1764d81ae3154623230704&q=' + cityName +'&aqi=no';
      
      fetch(url)
      .then(response => response.json())
      .then(data => {
        let hello = document.getElementById('hello'); 
        let city = document.getElementById('city');
        let currentTemperature = data.current.temp_c;
        console.log(`The current temperature is ${currentTemperature} degrees Celsius.`);
        hello.textContent = currentTemperature + '˚';
        city.textContent = data.location.name;
      })
      .catch(error => console.error(error));
    
    }

     



