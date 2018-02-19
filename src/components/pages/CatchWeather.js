import React, {Component} from 'react';
import SimpleMap from './../mapComponent/map';
const axios = require('axios');
var $ = require('jquery');


class CatchWeather extends Component {
  constructor() {
    super();
    this.state = {
      term: 'Kaunas',
      temperature: '',
      header: '',
      currentTime: '',
      isLoading: false,
      dailyWeather: [],
      center: {
           lat: 54.8985207,
           lng: 23.9035965
         }
    };
    this.fetchWeather();

  }

  onChange = (event) => {
    this.setState({
      term: event.target.value
    });
  }
  handleClick = (event) => {
    this.setState({
      term: event.target.value
    });
    setTimeout(() => {
      $('.formButton').click();
    }, 100);
  }



  fetchWeather = (event) => {
    if (event){
      event.preventDefault(event);

    }

    this.setState({
      isLoading: true,
       icon: '',
       temperature: '',
       dailyWeather: ''
     });

    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.term}`;

    axios.get(geocodeUrl).then((response) => {
      if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
      }

      var lat = response.data.results[0].geometry.location.lat;
      var long = response.data.results[0].geometry.location.lng;
      var weatherUrl = `https://api.darksky.net/forecast/052e6d70c203846bb952f6d81f70772c/${lat},${long}`
      var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      var header = response.data.results[0].formatted_address;

      $('.formInput').val("");

      this.setState({
        header: header,
        center: {
             lat: lat,
             lng: long
           }
      });

      return axios.get(proxyUrl + weatherUrl);

    }).then((response) => {

    let dailyWeather = response.data.daily.data.map((i, index) => {
      var lowTemperature = Math.round((i.temperatureHigh - 32) * 5 / 9);
      var highTemperature = Math.round((i.temperatureLow - 32) * 5 / 9);
      var date = new Date(i.time*1000); var day = date.getDate(); var month = date.getMonth();
      return (<li key={index}>
          <p>{month}-{day}</p>
          <p className="hightTemperature">{lowTemperature}<span>&#8451;</span></p>
          <p className="lowTemperature">{highTemperature}<span>&#8451;</span></p>
        </li>)
    });

    var date = new Date(response.data.currently.time*1000); var day = date.getDate(); var month = date.getMonth(); var year = date.getUTCFullYear();
    var currentlyTemperature = Math.round((response.data.currently.temperature - 32) * 5 / 9);
    //var apparentTemperature = Math.round((response.data.currently.apparentTemperature - 32) * 5 / 9);
    var icon = response.data.currently.icon;
    let temperature = <span className="weatherSearchHeader">{currentlyTemperature}<span>&#8451;</span> </span>
    let currentTime = {year,month,day}
    this.setState({
      isLoading: false,
      icon: icon,
      temperature: temperature,
      dailyWeather: dailyWeather,
      currentTime: currentTime
    })

    }).catch((e) => {
      if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers');
      } else {
        console.log(e.message);
      }
    });
  }

  render() {
    var {isLoading, icon} = this.state;

    function renderMessage() {
      if (isLoading) {
        return <img alt="spinningWheel" src='https://www.drupal.org/files/issues/throbber_13.gif' className="spinningWheel"/>;
      }
    }
    function renderIcon() {
      if (icon === 'fog' || icon === 'wind') {
        return <img src="https://image.ibb.co/iBwnGS/fog.png" alt="fog" border="0" className="weaatherIcon"/>;
      } else if (icon === 'snow') {
        return <img src="https://image.ibb.co/dEwMbS/snow.png" alt="fog" border="0" className="weaatherIcon"/>;
      } else if (icon === 'clear-night') {
        return <img src="https://image.ibb.co/n9a3qn/clear_night.png" alt="fog" border="0" className="weaatherIcon"/>;
      } else if (icon === 'clear-day') {
        return <img src="https://image.ibb.co/d8gMbS/clear_day.png" alt="fog" border="0" className="weaatherIcon"/>;
      } else if (icon === 'cloudy') {
        return <img src="https://image.ibb.co/h1ipVn/cloudy.png" alt="fog" border="0" className="weaatherIcon"/>;
      } else if (icon === 'partly-cloudy-day') {
        return <img src="https://image.ibb.co/fiSiqn/partly_cloudy_day.png" alt="fog" border="0" className="weaatherIcon"/>;
      } else if (icon === 'partly-cloudy-night') {
        return <img src="https://image.ibb.co/iTzwAn/partly_cloudy_night.png" alt="fog" border="0" className="weaatherIcon"/>;
      } else if (icon === 'sleet') {
        return <img src="https://image.ibb.co/gnUJO7/sleet.png" alt="fog" border="0" className="weaatherIcon"/>;
      }
    }

    return (<div className="weatherApp">
      <div className="searchBlockWeather">
        <form className="weatherForm" onSubmit={this.fetchWeather}>
          <input placeholder="Enter city" className="formInput" onChange={this.onChange}/>
          <button className="formButton">Search!</button>
        </form>
      </div>
      <div className="weatherButtons">
        <button value="kaunas" onClick={this.handleClick}>Kaunas</button>
        <button value="vilnius" onClick={this.handleClick}>Vilnius</button>
        <button value="klaipeda" onClick={this.handleClick}>Klaipėda</button>
        <button value="Panevezys" onClick={this.handleClick}>Panevežys</button>
        <button value="london" onClick={this.handleClick}>London</button>

      </div>
      <div className="weatherBlock">
        <div className="googleMap">
          <SimpleMap center={this.state.center} />
        </div>
        <h4 className="searchHeader">{this.state.header}</h4>
        <h5>{this.state.currentTime.year}  {this.state.currentTime.month}  {this.state.currentTime.day}</h5>

        {renderMessage()}
        <h1><span>{renderIcon()}</span>{this.state.temperature}</h1>
        <ul className="dailyList">{this.state.dailyWeather}</ul>
      </div>
    </div>);
  }
}



export default CatchWeather;
