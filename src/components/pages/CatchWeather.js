import React, {Component} from 'react';
import DisplaySuggestions from './displaySuggestions';
import WeatherMessage from './weathermessage';
import SimpleMap from './../mapComponent/map';
import GoogleMapReact from 'google-map-react';

const axios = require('axios');
var $ = require('jquery');

// const AnyReactComponent = ({text}) => <div>{text}</div>;
//
// class SimpleMap extends Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       center: {
//         lat: props.lat,
//         lng: props.long
//       },
//       zoom: 12
//
//     }
//   }
//   static defaultProps = {
//     center: {
//       lat: 59.95,
//       lng: 30.33
//     },
//     zoom: 12
//   };
//   render() {
//     console.log('MAP Component state: ',this.state.center)
//     return (
//       <GoogleMapReact bootstrapURLKeys={{key: 'AIzaSyBlfbw45vPnP31tcI17YMIc92NInBqf6XI'}} defaultCenter={this.state.center} defaultZoom={this.state.zoom}>
//
//         {/* <AnyReactComponent lat={this.props.lat} lng={this.props.long} text={'Kreyser Avrora'} /> */}
//
//       </GoogleMapReact>
//     );
//   }
// }

class CatchWeather extends Component {
  constructor() {
    super();
    this.state = {
      term: '',
      temperature: '',
      header: 'Search for a city',
      isLoading: false,
      dailyWeather: [],
      lat: 54.8985207,
      long: 23.9035965
    };
  }
  onChange = (event) => {
    this.setState({term: event.target.value});
  }

  handleClick = (event) => {
    this.setState({term: event.target.value});
    setTimeout(() => {
      $('.formButton').click();
    }, 100);
  }

  fetchWeather = (event) => {
    event.preventDefault(event);
    this.setState({isLoading: true, icon: '', temperature: ''});

    var encodedComponent = encodeURIComponent();
    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.term}`;

    axios.get(geocodeUrl).then((response) => {
      if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
      }
      var lat = response.data.results[0].geometry.location.lat;
      var long = response.data.results[0].geometry.location.lng;
      var weatherUrl = `https://api.darksky.net/forecast/052e6d70c203846bb952f6d81f70772c/${lat},${long}`
      var header = response.data.results[0].formatted_address;
      console.log(response.data.results[0]);
      console.log('Parent state before request: ',this.state.lat);
      //console.log(lat, long);
      $('.formInput').val("");
      this.setState({header: header, lat: lat, long: long})
      console.log('Parent state after request: ',this.state.lat);
      var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      return axios.get(proxyUrl + weatherUrl);
    }).then((response) => {

      let dailyWeather = response.data.daily.data.map((i, index) => {
        return (<li key={index}>
          <p>{i.windSpeed}</p>
        </li>)
      });

      var currentlyTemperature = Math.round((response.data.currently.temperature - 32) * 5 / 9);
      var apparentTemperature = Math.round((response.data.currently.apparentTemperature - 32) * 5 / 9);
      var icon = response.data.currently.icon;
      let temperature = <div>It's currently {currentlyTemperature}
        degree celcius in {this.state.header}.
        <hr/>
        It feels like {apparentTemperature}
        degree celcius in {this.state.header}.</div>
      this.setState({isLoading: false, icon: icon, temperature: temperature, dailyWeather: dailyWeather})
    }).catch((e) => {
      if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers');
      } else {
        console.log(e.message);
      }
    });
  }

  render() {
    var {
      isLoading,
      temperature,
      icon
    } = this.state;

    function renderMessage() {
      if (isLoading) {
        return <img src='https://www.drupal.org/files/issues/throbber_13.gif' className="spinningWheel"/>;
      }
    }

    function renderIcon() {
      if (icon === 'fog' || icon === 'wind') {
        return <img src="https://image.ibb.co/iBwnGS/fog.png" alt="fog" border="0" className="spinningWheel"/>;
      } else if (icon === 'snow') {
        return <img src="https://image.ibb.co/dEwMbS/snow.png" alt="fog" border="0" className="spinningWheel"/>;
      } else if (icon === 'clear-night') {
        return <img src="https://image.ibb.co/n9a3qn/clear_night.png" alt="fog" border="0" className="spinningWheel"/>;
      } else if (icon === 'clear-day') {
        return <img src="https://image.ibb.co/d8gMbS/clear_day.png" alt="fog" border="0" className="spinningWheel"/>;
      } else if (icon === 'cloudy') {
        return <img src="https://image.ibb.co/h1ipVn/cloudy.png" alt="fog" border="0" className="spinningWheel"/>;
      } else if (icon === 'partly-cloudy-day') {
        return <img src="https://image.ibb.co/fiSiqn/partly_cloudy_day.png" alt="fog" border="0" className="spinningWheel"/>;
      } else if (icon === 'partly-cloudy-night') {
        return <img src="https://image.ibb.co/iTzwAn/partly_cloudy_night.png" alt="fog" border="0" className="spinningWheel"/>;
      } else if (icon === 'sleet') {
        return <img src="https://image.ibb.co/gnUJO7/sleet.png" alt="fog" border="0" className="spinningWheel"/>;
      }
    }

    return (<div className="weatherApp">
      <div className="searchBlock">
        <form className="weatherForm" onSubmit={this.fetchWeather}>
          <input placeholder="Enter city" className="formInput" onChange={this.onChange}/>
          <button className="formButton">Search!</button>
        </form>
        <div className="weatherButtons">
          <button value="kaunas" onClick={this.handleClick}>Kaunas</button>
          <button value="vilnius" onClick={this.handleClick}>Vilnius</button>
          <button value="klaipeda" onClick={this.handleClick}>Klaipėda</button>
          <button value="london" onClick={this.handleClick}>London</button>
          <button value="Panevezys" onClick={this.handleClick}>Panevežys</button>
        </div>
      </div>
      <hr/>
      <h3 className="searchHeader">{this.state.header}</h3>
      <hr/> {renderMessage()}
      {renderIcon()}
      <ol className="TrumpList">{this.state.temperature}</ol>
      {this.state.icon}<ul>{this.state.dailyWeather}</ul>


      <SimpleMap lat={this.state.lat} long={this.state.long}/>
    </div>);
  }
}



export default CatchWeather;
